<template>
  <div>
    <el-form ref="form" :model="form"  label-position="left"  label-width="140px">
      <!--暂不需要-->
 <!--     <el-form-item label="分享币">
        <el-input v-model="form.coin"  type="number"></el-input>
      </el-form-item>-->
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="广告商">
        <el-input v-model="form.business"></el-input>
      </el-form-item>
      <el-form-item label="app内是否显示标题">
        <el-radio-group v-model="form.isTitleShow">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告类型" >
        <el-radio-group v-model="form.type">
          <el-radio :label="0">图片</el-radio>
          <el-radio :label="1">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片/视频链接地址">
        <el-input v-model="form.link" v-if="!imglink"></el-input>
        <el-input v-model="imglink" v-if="imglink"></el-input>
 <!--       <el-upload v-if="form.type==0"
                   class="upload-demo"
                   name="multipartFile"
                   :action="uploadPic"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"

        >
          <el-button size="small" type="primary">上传图片即可生成链接</el-button>
        </el-upload>-->
      </el-form-item>
        <el-form-item label="上传图片生成链接" v-if="form.type==0" >
          <advImgCropper   @uploadFileFn="uploadFileFn" :imageUrl="imageUrl"></advImgCropper>
          </el-form-item>
    <!--  <el-form-item v-if="form.type==0">
        <el-button size="small" type="primary" @click="previewFn">图片预览</el-button>
      </el-form-item>-->
      <el-form-item label="图片跳转的链接地址" v-if="form.type==0">
        <el-input v-model="form.targetLink"></el-input>
      </el-form-item>
      <el-form-item label="广告的布局类型">
        <el-radio-group v-model="form.layoutType">
          <el-radio :label="0">详情下部</el-radio>
          <!--<el-radio :label="1">详情上部</el-radio>-->
          <!--<el-radio :label="2">浮于详情上部</el-radio>-->
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!--关联标签-->
    <section class="relevanceBox">
      <p>关联标签</p>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="tagIds"
      >
        <el-checkbox
          v-for="(item,id) in tagList"
          :key="id"
          :label="item.id"
        >{{item.cname}}
        </el-checkbox>
      </el-checkbox-group>
      <span v-show="false"> {{tag}}{{tagIds}}</span>
    </section>
    <el-row class="btnBox">
      <el-button type="primary" @click="confirmFn">确定</el-button>
      <el-button type="info" @click="backFn">返回</el-button>
    </el-row>
    <PreviewImgDialog
      :isShow="visible"
      @cancelFn="visible = false"
      @confirmFn="visible = false"
    >
      <img :src="imglink" alt="">
    </PreviewImgDialog>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex'
  import advImgCropper from '@/components/common/vue-cropper/advImgCropper'
   import PreviewImgDialog from '@/components/common/dialog'
  export default {
    name: "categoryAdd",
    components: {
      advImgCropper,
      PreviewImgDialog
    },
    props:{
      source:{
        type:String
      },
      form:{
        type:Object,
        default(){
          return {
            coin:500,
            layoutType:0
          }
        }
      }
    },
    computed: {
      // 单图默认回显的ad
      imageUrl() {
        if (this.form.link) {
        return this.form.link
        }
      },
      tag() {
        if (this.source == 'edit') {
          this.tagIds = this.form.tagIds
          return this.form.tagIds
        } else {
          return []
        }
      }
/*      ...mapGetters([
        'tagIds',
      ])*/

    },
    data() {
      return {
        checkAll: false,
        isIndeterminate: true,
        tagList:[],
        tagIds:[],
        CropWidth:670,
        CropHeight:376,
        uploadPic:'http://www.my51share.com/boss/upload',
        imglink:'',
        visible:false
      }
    },
    watch:{
      form: {
        handler(newValue, oldValue) {
          console.log(newValue)

        },
        deep: true
      }
    },
    methods: {
      // 上传图片的预览
/*      previewFn() {
        if ( this.imglink ) {
          this.visible=true
          console.log(this.imglink);
//          this.$router.push({
//            path: '/advManager/previewImg',
//            query: {
//             link:this.form.link
//            }
//          })
        }
      },*/
      // 标签全选
      handleCheckAllChange(val) {
        let alltagIds = this.tagList.map(item => {
          return item.id
        })
        this.tagIds = val ? alltagIds : []
        console.log(this.tagIds)
        this.isIndeterminate = false
      },
      handleCheckedTagsChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.tagList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.tagList.length;
      },
      backFn(){
        this.$router.back()
      },
      getTagList() {
        this.$req.get(`v2/shareCategory/1/999`).then(res => {
          this.tagList = res.data.data.records
          // console.log('tagList', this.tagList)
        }).catch(err => {
          console.log(err);
        })
      },
      uploadFileFn(url){
        this.imglink=url
      },
     /* handleAvatarSuccess(res){
        this.imglink=res.data
      },*/
      confirmFn(){
        if(this.imglink){
          this.form.link=this.imglink
        }
        // 广告关联的tags
        this.form.tagIds = this.tagIds
        this.$emit('confirmFn', this.form)
      }
    },
    created() {
      this.getTagList()
      console.log('adTel',this.tagIds)
    }
  }
</script>

<style lang="scss" >
  .btnBox{
    margin-top: 20px;
  }
</style>


