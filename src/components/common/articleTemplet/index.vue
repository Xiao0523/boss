<template>
  <div>
    <section class="top-box">
      <div class="left">
        <el-form :label-position="labelPosition" label-width="100px" :model="fromMenu">
          <el-form-item label="文章标题">
            <el-input v-model="fromMenu.title"></el-input>
          </el-form-item>
          <!--不需要-->
       <!--   <el-form-item label="分类">
            <el-select v-model="fromMenu.fenlei" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间">
            <dateTimePicker
              :startTime="fromMenu.opentime"
              :endTime="fromMenu.deadline"
              @startDateFn="startDateFn"
              @endDateFn="endDateFn"
            ></dateTimePicker>
          </el-form-item>-->
          <!--暂时不要-->
      <!--    <el-form-item label="家庭住址">
            <v-distpicker @selected="onSelected"></v-distpicker>
          </el-form-item>-->
          <!--暂时不要-->
       <!--   <el-form-item label="分享总次数">

            <el-input v-model="fromMenu.sharingmaxnum" type="number"></el-input>
          </el-form-item>-->
          <el-form-item label="提成金额">
            <el-input v-model="fromMenu.money"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="fromMenu.source"></el-input>
          </el-form-item>
          <el-form-item label="布局方式" >
              <el-radio-group v-model="fromMenu.layout" @change="changeRadio">
                <el-radio :label="0">上下图文</el-radio>
                <el-radio :label="1">左右图文</el-radio>
                <el-radio :label="2">无图</el-radio>
                <el-radio :label="3">多图</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <!--封面图上传-->
    <section class="coverimgBox">
      <!--单张封面-->
      <coverCrop v-if="fromMenu.layout ==0 || fromMenu.layout ==1" @uploadFileFn="uploadFileFn1" :imageUrl="imageUrl"></coverCrop>
      <!--多张封面-->
      <coverCrop v-if="fromMenu.layout ==3" @uploadFileFn="uploadFileFn1" :imageUrl="imageUrl1"></coverCrop>
      <twoCover  v-if="fromMenu.layout == 3" @uploadFileFn="uploadFileFn2" :imageUrl="imageUrl2"></twoCover>
      <threeCover  v-if="fromMenu.layout == 3" @uploadFileFn="uploadFileFn3" :imageUrl="imageUrl3"></threeCover>
    </section>
    <!--关联标签-->
    <section class="relevanceBox">
      <p>关联标签</p>
        <el-checkbox-group
          v-model="tagids"
          @change="checkFn"
        >
          <el-checkbox
            v-for="(item,id) in tagList"
            :key="id"
            :label="item.id"
          >{{item.cname}}
          </el-checkbox>
        </el-checkbox-group>
      <span v-show="false"> {{tag}}{{tagids}}</span>
    </section>
    <!--关联广告-->
    <!--<el-button type="warning" plain @click="goAdListFn">关联广告</el-button>-->
<!--    <section class="relevanceBox">
      <p>关联广告</p>
        <el-checkbox-group
          v-model="advIds"
          @change="selectFn"
        >
          <el-checkbox
            v-for="(item,id) in advList"
            :key="id"
            :label="item.id"
          >{{item.title}}
          </el-checkbox>
        </el-checkbox-group>

    </section>-->
    <Tinymce v-model="fromMenu.introduce"></Tinymce>
    <previewDialog
      :isShow="visible"
      :title="'预览'"
      @cancelFn="visible = false"
      @confirmFn="visible = false"
    >
     <section class="previewContent" v-html="fromMenu.introduce"></section>
    </previewDialog>
    <el-row class="btn-box">
      <el-button type="warning" @click="previewArticleFn">预览</el-button>
      <el-button type="primary" @click="addArticleFn">发布</el-button>
    </el-row>
  </div>
</template>

<script>
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  import dateTimePicker from '@/components/common/dateTimePicker'
  import Tinymce from'@/components/Tinymce'
  import previewDialog from '@/components/common/dialog'
  import coverCrop from '@/components/common/vue-cropper'
  import twoCover from '@/components/common/vue-cropper/twoCover'
  import threeCover from '@/components/common/vue-cropper/threeCover'
  import { mapGetters } from 'vuex'
  export default {
    name: "articleTemplet",
    components: {
      dateTimePicker,
      Tinymce,
      previewDialog,
      coverCrop,
      twoCover,
      threeCover

    },
    props: {
      source: { // 来自哪个页面
        type: String
      },
      fromMenu: {  // 传进来的表单数据
        type: Object,
        default() {
          return {
            sharingmaxnum: 1000,

          }
        }
      },
      advIdArr: {
        type: Array
      },
      tagidArr: {
        type: Array
      }
    },
    computed: {
      // 单图默认回显的封面图
      imageUrl() {
        if (this.fromMenu.covermaps) {
          let covermaps = this.fromMenu.covermaps
          this.coverArr= covermaps // 编辑时
          if (covermaps.length) {
            return covermaps[covermaps.length-1]
          }
        }
      },
      // 多图时默认回显的封面图1
      imageUrl1() {
        if (this.fromMenu.covermaps) {
          let covermaps = this.fromMenu.covermaps
          this.coverArr= covermaps // 编辑时
          if (covermaps.length) {
            return covermaps[0]
          }
        }
      },
      imageUrl2() {
        if (this.fromMenu.covermaps) {
          let covermaps = this.fromMenu.covermaps
          this.coverArr= covermaps
          if (covermaps.length >1) {
            return covermaps[1]
          }
        }
      },
      imageUrl3() {
        if (this.fromMenu.covermaps) {
          let covermaps = this.fromMenu.covermaps
          this.coverArr= covermaps
          if (covermaps.length > 1) {
            return covermaps[2]
          }
        }
      },
      tag() {
        if (this.source == 'edit') {
          console.log(this.fromMenu);
          this.tagids = this.fromMenu.tagids
          return this.fromMenu.tagids
        } else {
          return []
        }
      }
    },
    data() {
      return {
        coverArr: [], // 上传的封面图数组
        options: [{
          value: '热门活动',
          label: '热门活动'
        }, {
          value: '城市合伙人',
          label: '城市合伙人'
        }, {
          value: '资讯传递',
          label: '资讯传递'
        }, {
          value: '视频纷享',
          label: '视频纷享'
        }],
        value: '',
        labelPosition: 'left',
        advList: [],
        tagList: [],
        tagids: [],
        visible: false
      }
    },
    watch: {
      fromMenu: {
        handler(newValue, oldValue) {
          console.log(newValue)
        },
        deep: true
      },
      // coverArr(newValue){
      //   console.log(newValue)
      // },
      layout(val) {
        if (val == 2) {
          this.fromMenu.covermaps = []
        }
      }

    },
    methods: {
      goAdListFn(){
        this.$router.push('/advManager/advList')
      },
      uploadFileFn1(url) {
          if (this.fromMenu.layout !==2) {
            this.coverArr.push(url)
          }

      },
      uploadFileFn2(url) {
          if (this.fromMenu.layout == 3) {
            this.coverArr.push(url)
          }
      },
      uploadFileFn3(url) {

          if (this.fromMenu.layout == 3) {
            this.coverArr.push(url)
          }
      },
      // 预览文章
      previewArticleFn() {
        this.visible = true
//        this.$router.push({path:'ArticleManager/ArticlePreview',query:{id:}})
      },
      changeRadio(val) {
//        console.log(val);
//        this.fromMenu.layout=val
      },
      checkFn(val) {
      },
      selectFn(val) {
        console.log(val);
      },
      // 点击按钮，将数据派发出去
      addArticleFn() {
        this.fromMenu.tagids = this.tagids
       let resArr=[]
        if (this.fromMenu.layout == 0 || this.fromMenu.layout == 1) {
          console.log(this.coverArr)
          resArr = this.coverArr.slice(-1)
          console.log(console.log(this.coverArr))
        }
        if(this.fromMenu.layout == 3){
          resArr= this.coverArr.splice(-3)
        }
        this.fromMenu.covermaps = resArr
        // console.log(this.fromMenu)
        this.$emit('upDateFrom', this.fromMenu)
      },
      // 地址选择器
      /*     onSelected(data) {
       this.fromMenu.zhuanfaurl = data
        console.log(this.fromMenu.zhuanfaurl);
      },*/
      startDateFn(startday) {
//        console.log('start', startday);
        this.fromMenu.opentime = startday // 让fromMenu的时间同步
//        console.log('fromMenu',this.fromMenu.opentime);
      },
      endDateFn(endday) {
        this.fromMenu.deadline = endday
      },
      getTagList() {
        this.$req.get(`v2/shareCategory/1/999`).then(res => {
          this.tagList = res.data.data.records
          // console.log('tagList', this.tagList)
        }).catch(err => {
          console.log(err);
        })
      },
    },

    updated() {
      let imgs = document.getElementsByTagName('img')
      let length = imgs.length
      for (var i = 0; i < length; i++) {
        let img = imgs[i]
        // console.log(img)
        img.style.width = '100%'
      }
    },
    created() {
      this.getTagList()

    },
    mounted() {
    }
  }

</script>

<style type="text/scss" lang="scss">
  .coverimgBox{
    width: 100%;
    display: flex;
    flex-direction: row;

  }
  .covers{
    overflow: hidden;
    .upload_parent{
      height: 200px;
      width: 300px;
      border: 1px solid #ccc;
      text-align: center;
      margin-right: 20px;
      float: left;
      overflow: hidden;
      .defind_img_s{
        position: relative;
        .up_btns{
          position: absolute;
          top: 0;
          left: 0;
        }
        .upbtnGroups{
          position: absolute;
          top: 0;
          right: 0;
        }

      }
    }
  }

  .el-icon-plus avatar-uploader-icon{
    width: 200px !important;
    height: 100px !important;
  }
  .previewContent {
    width: 375px;
    height: 667px;
    padding: 10px;
    border: 1px solid #F5F5F5;
    box-sizing: border-box;
    overflow-y: scroll;
    margin: 0 auto;
  }
  .top-box{
    display: flex;
    justify-content: space-between;
  .left{
    flex: 3;
    background-color: #fff;
    height: 100%;
    el-form-item{
      padding-right: 20px;
    }

  }
  .right{
    flex: 1;
    margin-left: 60px;
    text-align: center;
    .coverBox{
      /*width: 200px;*/
      /*height: 100px;*/
      margin: 0 auto;
      margin-bottom: 10px;
      border: 1px solid #ccc;
    }
    .deltailsBox{
      width: 100%;
      margin: 60px auto;
      border: 1px solid #ccc;
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
      height: 100px;
    }
  }
  }
  .relevanceBox{
    margin-top: 20px;
    .row{
      display: flex;
      align-items: center;
      height: 60px;
      span{
        margin-right: 40px;
      }
    }
    margin-bottom: 60px;
  }
  img{
    background-color: rebeccapurple;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>


