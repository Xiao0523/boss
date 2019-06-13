<template>
<div>
  <el-upload v-if="!imgurl"
    class="upload-demo"
    drag
    :action="uploadUrl"
    name="multipartFile"
    :onSuccess="successFn1"
    :onError="errorFn"
    :onRemove="removeFn"
    multiple>
    <i class="el-icon-upload"></i>
    <b>封面图上传</b>
    <div class="el-upload__text">将图片拖到此处，或<em>点击上传图片</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
   <img class="coverImg"  v-if="imgurl" :src="imgurl" alt="">
  <el-upload v-if="!detailsImgurl"
             class="upload-demo"
             drag
             :action="uploadUrl"
             name="multipartFile"
             :onSuccess="successFn2"
             :onError="errorFn"
             :onRemove="removeFn"
             multiple>
    <i class="el-icon-upload"></i>
    <b>详情图上传</b>
    <div class="el-upload__text">将图片拖到此处，或<em>点击上传图片</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <img   v-if="detailsImgurl" :src="detailsImgurl" alt="">
</div>
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: "uploadImg",
    components: {
// someComponent
    },
    props:{
    },
    computed: {},
    data() {
      return {
        uploadUrl:'https://www.my51share.com/boss/upload',
        imgurl:'', // 封面图url
        detailsImgurl: '', // 详情图url
      }
    },
    methods: {
      successFn1(response, file, fileList) { // 封面图上传成功
        console.log(response, file, fileList);
        this.imgurl = response.data
        this.$emit('coverImg',response.data ) // 图片的url
      },
      successFn2(response, file, fileList) { // 详情图上传成功
        console.log(response, file, fileList);
        this.detailsImgurl = response.data
        this.$emit('detailsImg',response.data)
      },
      removeFn(file, fileList){
        console.log(file, fileList);
      },
      errorFn(err, file, fileList){
        this.$wran(response.message)
//        console.log(response, file, fileList);
      },
    },
    created() {
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
.coverImg{
  background-color:red;
}
</style>
