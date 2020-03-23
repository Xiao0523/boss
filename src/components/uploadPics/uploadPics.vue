<template>
  <div>
    <el-upload ref="upload" :limit="5" :auto-upload="false" :on-exceed="uploadOverrun" :http-request="submitUpload" :on-change="changeUpload" class="upload-demo" action="http://localhost:80">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-button @click = "submitAssess">提交到服务器</el-button>

  </div>
</template>

<script>
// https://blog.csdn.net/a12541254/article/details/79187130
// import someComponent from './someComponent'
export default {
  name: 'UploadPics',
  components: {
    // someComponent
  },
  data() {
    return {
      msg: 'Hello Vue.js'
    }
  },
  computed: {},
  created() {
  },
  methods: {
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    changeUpload: function(file, fileList) { // 预览图片
      this.fileList = fileList
      this.$nextTick(
        () => {
          const upload_list_li = document.getElementsByClassName('el-upload-list')[0].children
          for (let i = 0; i < upload_list_li.length; i++) {
            const li_a = upload_list_li[i].children[0]
            const imgElement = document.createElement('img')
            imgElement.setAttribute('src', fileList[i].url)
            imgElement.setAttribute('style', 'max-width:50%;padding-left:25%')
            if (li_a.lastElementChild.nodeName !== 'IMG') {
              li_a.appendChild(imgElement)
            }
          }
        })
    },
    submitUpload: function(content) { // 自定义的上传图片的方法
      // 1. 创建formData 利用AXIOS传递
      const formData = new FormData()
      formData.append('file', content.file)
      const config = {
        'Content-Type': 'multipart/form-data'
      }
      const var_this = this
      axios.post('/Index/upload', formData, config)
        .then(function(response) {
          if (!response.data.success) {
            var_this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitAssess: function() {
      this.$refs.upload.submit() // 调用submit方法
      // 其他业务代码。
    }

  }

}
</script>

<style lang="scss" scoped>

</style>
