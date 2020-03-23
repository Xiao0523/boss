<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="from"
      :rules="rules"
      label-width="120px"
      label-position=" 'left' "
      class="demo-ruleForm">
      <el-col :span="10">
        <el-form-item label="应用名" prop="appname">
          <el-input v-model="from.appname"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="版本" prop="banben">
          <el-input v-model="from.banben" type="number"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="应用封面" prop="apppicurl" class="avatarBox">
          <el-upload
            :action="uploadPic"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            class="avatar-uploader"
            name="multipartFile"
          >
            <!--编辑图片-->
            <img v-if="from.apppicurl && source=='edit'" :src="from.apppicurl" class="avatar">
            <!--新增图片-->
            <img v-if="imgurl && source=='add' " :src="imgurl" class="avatar">
            <i v-if="imgurl=='' && source=='add' " class="el-icon-plus avatar-uploader-icon">封面图</i>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="应用大小" prop="appsize">
          <el-input v-model="from.appsize" type="number"/>
          MB
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="公司" prop="company">
          <el-input v-model="from.company"/>
        </el-form-item>
      </el-col>
      <!--app分类-->
      <el-col :span="10">
        <el-form-item label="分类" prop="apptype">
          <el-select v-model="from.apptype" placeholder="请选择分类">
            <el-option
              v-for="item in appSort"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-col>
      <!--类别-->
      <el-col :span="10">
        <el-form-item label="类别" prop="leibie">
          <el-input v-model="from.leibie"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="开抢时间" prop="timeforopening">
          <el-date-picker
            v-model="from.timeforopening"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期"
            style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="ios下载链接" prop="fenlei">
          <el-input v-model="from.fenlei"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="双平台下载链接" prop="downloadurl">
          <el-input v-model="from.downloadurl"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="android下载链接" prop="shareurl">
          <el-input v-model="from.shareurl"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="语言" prop="yuyan">
          <el-input v-model="from.yuyan" type="text"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="分享总次数" prop="sharingmaxnum">
          <el-input v-model="from.sharingmaxnum" type="number"/>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="开发商" prop="kaifashang">
          <el-input v-model="from.kaifashang" type="text"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="更新时间" prop="gengxinriqi">
          <el-date-picker
            v-model="from.gengxinriqi"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            style="width: 100%;"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="提成金额" prop="money">
          <el-input v-model="from.money" type="number"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="兼容性" prop="jianrongxing">
          <el-input v-model="from.jianrongxing" type="text"/>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="应用简介" prop="yingyongjianjie">
          <el-input
            :autosize="{ minRows: 3, maxRows: 12}"
            v-model="from.yingyongjianjie"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-col>
      <!--标签-->
      <el-col :span="10">
        <el-form-item label="应用标签" prop="cId">
          <span v-show="false">{{ tagId }}</span>
          <el-select v-model="cId" placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :label="item.cName"
              :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <!--应用详情图-->
      <el-col v-if="source== 'add' " :span="20">
        <el-form-item label="应用详情图">
          <el-upload
            :action="uploadPic"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handSuccess"
            :on-error="handError"
            :limit="6"
            :on-exceed="handExceed"
            list-type="picture-card"
            name="multipartFile"
          >
            <i class="el-icon-plus"/>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col v-if="source== 'edit' " :span="20">
        <el-form-item label="应用详情图" class="delBox">
          <el-upload
            :action="uploadPic"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handSuccess"
            :on-error="handError"
            :on-exceed="handExceed"
            name="multipartFile"
          >
            <img v-for="item in from.detailpicurl" :src="item" alt="">
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" width="100%" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="20">
        <el-form-item label="游戏介绍" prop="youxijieshao">
          <Tinymce v-model="from.youxijieshao"/>
        </el-form-item>
      </el-col>
      <el-col :span="20" class="btn-box">
        <el-button type="primary" @click="addAppFn">发布</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'AppEdit',
  components: {
    Tinymce
  },
  props: {
    source: { // 来自哪个页面
      type: String
    },
    from: { // 表单数据
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      uploadPic: 'https://www.my51share.com/boss/upload',
      imgurl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      appSort: [{
        value: '人气应用',
        label: '人气应用'
      }, {
        value: '热门游戏',
        label: '热门游戏'
      }, {
        value: '小程序',
        label: '小程序'
      }],
      tagList: [],
      cId: '', // 标签id
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        /*  name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          apptype: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]*/
      }
    }
  },
  computed: {
    tagId() {
      if (this.from.cId) {
        this.cId = this.from.cId
        return this.from.cId
      }
    }
  },
  watch: {
    from: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }
  },
  created() {
    this.getTagList()
  },
  methods: {
    getTagList() {
      this.$req.get(`v2/shareCategory/1/999`).then(res => {
        this.tagList = res.data.data.records
        //          console.log(this.tagList);
      }).catch(err => {
        console.log(err)
      })
    },
    addAppFn() {
      this.from.cId = this.cId
      this.$emit('upDateFrom', this.from)
    },
    // 上传封面图
    handleAvatarSuccess(res, file) {
      this.imgurl = URL.createObjectURL(file.raw) // 本地url
      this.from.apppicurl = res.data
      console.log(this.from.apppicurl)
    },
    handExceed() {
      this.$wran('最多上传6张详情图')
    },
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传成功
    handSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      const detailPicArr = fileList.map(item => item.response.data)
      this.from.detailpicurl = detailPicArr
      //        this.from.detailpicurl =JSON.stringify(this.from.detailpicurl )
      console.log('详情图数据', this.from.detailpicurl)
      //        console.log(typeof( this.from.detailpicurl ));
      this.dialogImageUrl = response.data
    },
    // 上传失败
    handError() {}

  }

}
</script>

<style type="text/scss" lang="scss" scoped>
  .avatarBox{
    display: flex;
    height: 140px;
    align-items: center;
  }
  .delBox{
    display: flex;
    align-items: center;
    img{
      height: 148px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 20%;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>

