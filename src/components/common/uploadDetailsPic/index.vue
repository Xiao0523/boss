<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :on-error="handError"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: "uploadDetailsPic",
    components: {
// someComponent
    },
    computed: {},
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      // 移除图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      // 预览图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功
      handSuccess(){

      },
      // 上传失败
      handError(){},
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>
