<template>
  <div>
    <section class="top-box">
      <div class="left">
        <el-form :label-position="labelPosition" label-width="100px" :model="fromMenu">
          <el-form-item label="文章标题">
            <el-input v-model="fromMenu.title"></el-input>
          </el-form-item>
          <el-form-item label="分享总次数">
            <el-input v-model="fromMenu.sharingmaxnum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="提成金额">
            <el-input v-model="fromMenu.money"></el-input>
          </el-form-item>
          <el-form-item label="对应公司">
            <el-input v-model="fromMenu.company"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!--图片-->
      <div class="right">
        <!--封面图-->
        <div class="coverBox">
          <el-upload
            class="avatar-uploader"
            name="multipartFile"
            :action="uploadPic"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
           >
            <!--编辑图片-->
            <img v-if="fromMenu.coverphoto && source=='edit' " :src="fromMenu.coverphoto" class="avatar">
            <!--新增图片-->
            <img v-if="imgurl && source=='add' " :src="imgurl" class="avatar">
            <i v-if="imgurl=='' && source=='add' " class="el-icon-plus avatar-uploader-icon">封面图</i>
          </el-upload>
        </div>
        <!--详情图-->
       <!-- <div class="deltailsBox">
          <el-upload
            class="avatar-uploader"
            name="multipartFile"
            :action="uploadPic"
            :show-file-list="false"
            :on-success="handleDetailsSuccess"
          >
            <img v-if="fromMenu.detaildiagram" :src="fromMenu.detaildiagram" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon">详情图</i>
          </el-upload>
        </div>-->

      </div>
    </section>
    <Tinymce v-model="fromMenu.introduce"></Tinymce>
    <el-row class="btn-box">
      <el-button type="primary" @click="addReportFn">发布</el-button>
    </el-row>

  </div>
</template>

<script>
  import dateTimePicker from '@/components/common/dateTimePicker'
  import Tinymce from'@/components/Tinymce'
  export default {
    name: "report",
    components: {
      dateTimePicker,
      Tinymce
    },
    props:{
      source:{ // 来自哪个页面
        type:String
      },
      fromMenu:{  // 接收的表单数据
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    watch:{
      fromMenu: {
        handler(newValue, oldValue) {
          console.log(newValue)
        },
        deep: true
      }

    },
    data() {
      return {
        uploadPic:'https://www.my51share.com/boss/upload',
        labelPosition: 'left',
        imgurl:''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imgurl = URL.createObjectURL(file.raw); // 本地图片url
        this.fromMenu.coverphoto=res.data
        console.log(this.fromMenu.coverphoto,'表单url');
      },
      handleDetailsSuccess(res, file){
//        this.imgurl2 = URL.createObjectURL(file.raw);
        this.fromMenu.detaildiagram=res.data
        console.log(this.fromMenu.detaildiagram,'表单url2');
      },
      addReportFn(){
        let realname = JSON.parse(this.userInfo).realname
        this.fromMenu.createBy=realname
        this.$emit('upDateFrom',this.fromMenu)
      }
    },
    created() {
      if ( this.source == 'reportsDetails' ) {
//        console.log(this.fromMenu);
//        this.fromMenu.imgurl= this.fromMenu.coverphoto
//        this.fromMenu.imgurl2= this.fromMenu.detaildiagram
      }
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
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
    width: 178px;
    height: 178px;
    display: block;
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
      flex: 2;
      margin-left: 60px;
      text-align: center;
      margin-bottom: 20px;
     .coverBox{
       border: 1px solid #ccc;
       margin: auto;
     }
      .deltailsBox{
        border: 1px solid #ccc;
        margin-top: 20px;
      }
    }
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
