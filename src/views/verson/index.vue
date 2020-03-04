<template>
  <div>
    <el-form
      ref="noveForm"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="系统">
        <el-radio v-model="radio" label="version_ios">IOS</el-radio>
        <el-radio v-model="radio" label="version_android">安卓</el-radio>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input v-model="form.value"/>
      </el-form-item>
      <el-form-item label="扩展信息">
        <el-input v-model="form.extendInfo" type="textarea" resize="none" rows="4" />
      </el-form-item>
      <el-form-item label="App版本号">
        <el-input v-model="form.versionNum" />
      </el-form-item>
      <el-form-item v-show="radio === 'version_android'" label="Apk下载地址">
        <el-input v-model="form.apkDownloadUrl" :disabled="true"/>
        <el-upload
          :on-success="handleSuccess"
          :file-list="fileList"
          :action="fileUpload"
          :on-remove="handleRemove"
          class="upload-demo"
          name="multipartFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getVerson, editVerson } from '@/api/verson'
import { fileUpload } from '@/http/url'
export default {
  name: 'Verson',

  data() {
    return {
      form: {},
      selectList: [],
      radio: 'version_ios',
      dataList: [],
      fileList: [],
      fileUpload: fileUpload
    }
  },
  watch: {
    'dataList'() {
      this.form = this.selectData(this.radio, this.dataList)
    },
    radio: {
      handler(newKey, oldKey) {
        this.saveEditObj(oldKey)
        this.form = this.selectData(this.radio, this.dataList)
      }
    }
  },
  mounted() {
    this.getViews()
  },
  methods: {
    getViews() {
      getVerson().then(res => {
        if (res.data.code) {
          return res.data.message && this.$warn(res.data.message)
        }
        this.dataList = res.data.data || []
      })
    },
    selectData(key, data) {
      for (const item of data) {
        if (item.key === key) {
          if (key === 'version_android') {
            this.fileList = [{
              name: 'lanqing' + this.form.value + '.apk',
              url: item.apkDownloadUrl
            }]
          }
          return item
        }
      }
    },
    saveEditObj(key = this.radio) {
      for (const index in this.dataList) {
        if (this.dataList[index].key === key) {
          this.dataList.splice(index, 1, this.form)
          break
        }
      }
    },
    handleRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      this.$success('删除成功！！！')
      this.form.apkDownloadUrl = ''
      this.fileLst = []
    },
    handleSuccess(file, fileList) {
      if (file.code) {
        return file.message && this.$warn(file.message)
      }
      this.fileList = [{
        name: 'lanqing' + this.form.value + '.apk',
        url: file.data
      }]
      this.form.apkDownloadUrl = file.data
      this.$success('上传成功！！！')
    },
    onSubmit() {
      this.saveEditObj()
      const editObj = {
        'versions': this.dataList
      }
      editVerson(editObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$warn(res.data.message)
        }
        this.$success(res.data.message)
        this.getViews()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
