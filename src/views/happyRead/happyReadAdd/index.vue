<template>
  <div>
    <el-form class="novel" label-position="left" :model="content" :rules="rules" label-width="100px" ref="noveForm">
      <el-form-item label="小说名称" prop="title">
        <el-input v-model.trim="content.title"></el-input>
      </el-form-item>
      <el-form-item label="小说作者" prop="author">
        <el-input v-model.trim="content.author"></el-input>
      </el-form-item>
      <el-form-item label="小说简介" prop="introduction">
        <el-input type="textarea" autosize v-model.trim="content.introduction"></el-input>
      </el-form-item>
      
      <el-form-item label="小说封面" prop="cover">
        <el-upload
          class="img-uploader"
          ref="uploader"
          :action="uploadUrl"
          :show-file-list="false"
          name="multipartFile"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange">
          <img v-if="content.cover" :src="content.cover" class="novel_img">
          <i v-else class="el-icon-plus img-uploader-icon"></i>
          <el-input style="display: none" v-model.trim="content.introduction"></el-input>
        </el-upload>
      </el-form-item>

      <el-form-item label="小说文件" prop="xlsUrl">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-remove="handleRemove"
          name="multipartFile"
          :limit="1"
          :on-success="fileSuccess"
          :on-error="fileError">
          <el-button size="small" type="primary">上传小说文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
        </el-upload>
        
        <el-input style="display: none" v-model.trim="content.xlsUrl"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('noveForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import {postNovel} from '@/api/happRead'
import {UploadUrl} from '@/http/url'
export default {
  name: 'happyReadAdd',
  data() {
    return {
      content: {
        title: '',//小说名称
        author: '',// 小说作者
        introduction: '',//小说简介
        cover: '',// 小说封面
        xlsUrl: ''// 小说文件
      },
      rules: {
        title: [{required: true, type: 'string', message: '请填写小说名称！', trigger: 'blur'}],
        author: [{required: true, type: 'string', message: '请填写小说作者！', trigger: 'blur'}],
        introduction: [{required: true, type: 'string', message: '请填写小说简介！', trigger: 'blur'}],
        cover: [{required: true, type: 'string', message: '请上传小说封面！', trigger: 'blur'}],
        xlsUrl: [{required: true, type: 'string', message: '请上传小说文件！', trigger: 'blur'}],
      },
      uploadUrl: UploadUrl,
    }
  },
  methods: {
    // 上传成功
    uploadSuccess(res, file) {
      this.content.cover = res.data 
    },

    // 封面图片大小限制
    fileChange(file) {
      debugger
      let sizeBase = 1024;
      let isLarge = file.size / sizeBase > 300
      if(isLarge) {
        this.$wran('文件大于 300kb')
        this.$refs['uploader'].clearFiles()
      }
      return isLarge
    },

    // 上传小说内容
    onSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        postNovel(this.content).then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操所成功！')
        })
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.content.xlsUrl = ''
    },
    fileSuccess(res, file, fileList) {
      this.content.xlsUrl = res.data
    },
    fileError(err, file, fileList) {
      console.log(err.message)
      let data = err.message ? JSON.parse(err.message) : ''
      
      this.$wran(data && data.data ? data.data : '上传失败')
    }
   
    
  },
  created() { },
}
</script>

<style lang="scss" scoped>
.novel {
  width: 50%;
}

  .img-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .img-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .novel_img {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: contain
  }


</style>

