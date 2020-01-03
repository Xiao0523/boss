<template>
  <div>
    <el-form
      ref="noveForm"
      :model="content"
      :rules="rules"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="比赛名称" prop="title">
        <el-input v-model.trim="content.title" />
      </el-form-item>
      <el-form-item label="比赛标语" prop="author">
        <el-input v-model.trim="content.author" />
      </el-form-item>

      <el-form-item label="比赛封面" prop="cover">
        <el-upload
          ref="uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange"
          name="multipartFile"
          class="img-uploader"
        >
          <img v-if="content.cover" :src="content.cover" class="novel_img" >
          <i v-else class="el-icon-plus img-uploader-icon" />
          <el-input v-model.trim="content.introduction" style="display: none" />
        </el-upload>
      </el-form-item>
      <el-form-item label="图文介绍" prop="cover">
        <el-upload
          ref="uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange"
          name="multipartFile"
          class="img-uploader"
        >
          <img v-if="content.cover" :src="content.cover" class="novel_img" >
          <i v-else class="el-icon-plus img-uploader-icon" />
          <el-input v-model.trim="content.introduction" style="display: none" />
        </el-upload>
      </el-form-item>
      <el-form-item label="开始时间" prop="author">
        <el-date-picker
          v-model="content.author"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>

      <el-form-item label="结束时间" prop="author">
        <el-date-picker
          v-model="content.author"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>

      <el-form-item label="参赛作品" prop="cover">
        <el-upload
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange"
          class="work-uploader"
          list-type="picture-card"
          name="multipartFile" >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-upload
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange"
          class="work-uploader"
          list-type="picture-card"
          name="multipartFile" >
          <i class="el-icon-plus"/>
        </el-upload>
        <el-upload
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :on-error="fileError"
          :on-change="fileChange"
          class="work-uploader"
          list-type="picture-card"
          name="multipartFile" >
          <i class="el-icon-plus"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="比赛规则" prop="introduction">
        <el-input v-model.trim="content.introduction" type="textarea" autosize/>
      </el-form-item>

      <el-form-item label="赞助商">
        <div class="sponser">
          <el-row :gutter="10">
            <el-col :span="1">1.</el-col>
            <el-col :span="12">
              <el-input class="sponser-input" value="" placeholder="请选择" />
              <el-input class="sponser-input" value="" placeholder="请选择" />
            </el-col>
            <el-col :span="4">
              <el-upload
                ref="uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="fileError"
                :on-change="fileChange"
                name="multipartFile"
                class="img-uploader"
              >
                <img v-if="content.cover" :src="content.cover" class="novel_img" >
                <i v-else class="el-icon-plus img-uploader-icon" />
                <el-input v-model.trim="content.introduction" style="display: none" />
              </el-upload>
            </el-col>

          </el-row>

          <el-row v-for="(item, index) in teacherArr" :gutter="10" :key="index">
            <el-col :span="1">{{ index+2 }}.</el-col>
            <el-col :span="12">
              <el-input class="sponser-input" value="" placeholder="请选择" />
              <el-input class="sponser-input" value="" placeholder="请选择" />
            </el-col>
            <el-col :span="6">
              <div class="img-uploader-wraper">
                <el-upload
                  ref="uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :on-error="fileError"
                  :on-change="fileChange"
                  name="multipartFile"
                  class="img-uploader"
                >
                  <img v-if="content.cover" :src="content.cover" class="novel_img" >
                  <i v-else class="el-icon-plus img-uploader-icon" />
                  <el-input v-model.trim="content.introduction" style="display: none" />
                </el-upload>

                <el-button class="sponser-del" @click="delTeacher(item, index)">删除</el-button>
              </div>
            </el-col>
          </el-row>

          <span class="sponser-btn">
            <el-button icon="el-icon-plus" circle @click="addTeacher" />
          </span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('noveForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postNovel } from '@/api/happRead'
import { UploadUrl } from '@/http/url'
export default {
  name: 'ShowEdit',
  data() {
    return {
      teacherArr: [],
      content: {
        title: '', // 小说名称
        author: '', // 小说作者
        introduction: '', // 小说简介
        cover: '', // 小说封面
        xlsUrl: '' // 小说文件
      },
      rules: {
        title: [
          {
            required: true,
            type: 'string',
            message: '请填写小说名称！',
            trigger: 'blur'
          }
        ],
        author: [
          {
            required: true,
            type: 'string',
            message: '请填写小说作者！',
            trigger: 'blur'
          }
        ],
        introduction: [
          {
            required: true,
            type: 'string',
            message: '请填写小说简介！',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            type: 'string',
            message: '请上传小说封面！',
            trigger: 'blur'
          }
        ],
        xlsUrl: [
          {
            required: true,
            type: 'string',
            message: '请上传小说文件！',
            trigger: 'blur'
          }
        ]
      },
      uploadUrl: UploadUrl
    }
  },
  created() {},
  methods: {
    // 上传成功
    uploadSuccess(res, file) {
      this.content.cover = res.data
    },

    // 封面图片大小限制
    fileChange(file) {
      debugger
      const sizeBase = 1024
      const isLarge = file.size / sizeBase > 300
      if (isLarge) {
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
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操所成功！')
        })
      })
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.content.xlsUrl = ''
    },
    fileSuccess(res, file, fileList) {
      this.content.xlsUrl = res.data
    },
    fileError(err, file, fileList) {
      console.log(err.message)
      const data = err.message ? JSON.parse(err.message) : ''

      this.$wran(data && data.data ? data.data : '上传失败')
    },
    delTeacher(item, index) {
      this.teacherArr.splice(index, 1)
    },
    addTeacher() {
      this.teacherArr.push({})
    }
  }
}
</script>

<style lang="scss" scoped>
.novel {
  width: 50%;
}

.img-uploader {
    width: 100px;
    &-wraper{
      display: flex;
      align-items: flex-start;
    }
    & /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.img-uploader .el-upload:hover {
  border-color: #409eff;
}
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.novel_img {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: contain;
}

.sponser{
  position: relative;
  & /deep/ .el-input{
    // width: 85%;
    margin-bottom: 20px;
  }
  &-del{
    margin-left: 20px;
  }
  &-btn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
  }
  .del-wraper{
    position: relative;
    height: 100%;
  }
}

.work-uploader{
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
}
</style>

