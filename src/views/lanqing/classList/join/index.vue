<template>
  <div>
    <el-form ref="form" :model="form"  label-position="left"  label-width="140px">
      <el-form-item label="类目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="奖学金币数量">
        <el-input v-model="form.scholarshipIcon" max="127" maxlength="3" @blur="ifScholar"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 0" label="图片地址">
        <el-input v-model="form.logUrl"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 0" label="上传图片生成链接">
        <advImgCropper @uploadFileFn="uploadFileFn" :imageUrl="imageUrl"></advImgCropper>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
    
    <PreviewImgDialog
      :isShow="visible"
      @cancelFn="visible = false"
      @confirmFn="visible = false"
    >
      <img :src="form.logUrl" alt="">
    </PreviewImgDialog>
  </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex'
  import { addList, getTypeList, editList, getListDetail } from '@/api/merchant'
  import advImgCropper from '@/components/common/vue-cropper/advImgCropper'
  import PreviewImgDialog from '@/components/common/dialog'
  export default {
    name: "organizationAdd",
    components: {
      advImgCropper,
      PreviewImgDialog
    },
    computed: {
      // 单图默认回显的ad
      imageUrl() {
        if (this.form.logUrl) {
          return this.form.logUrl
        }
      }
    },
    data() {
      return {
        form: {
          logUrl:'',
          name: '',
          pid: '',
          pname: '',
          scholarshipIcon: 0,
          type: '0',
          status: 0,
          id: ''
        },
        visible: false,
        isSonAdd: false,
        flag: 'add'
      }
    },
    watch: {},
    created() {
      const routeQuery = this.$route.query
      if (routeQuery.pid) {
        this.isSonAdd = true
        this.form.type = '1'
        this.form.pid = routeQuery.pid
      }
      if (routeQuery.flag == 'edit') {
        this.flag = routeQuery.flag
        if (!routeQuery.id) {
          this.$router.push({ name: 'typeList' })
          return
        }
        this.form.id = routeQuery.id
        this.getPname()
      }
    },
    methods: {
      ifScholar() {
        if (this.form.scholarshipIcon > 127) {
          this.form.scholarshipIcon = 127
        }
      },
      uploadFileFn(url){
        this.form.logUrl = url
      },
      // 提交
      submit() {
        const form = this.form
        const addObj = {
          name: form.name,
          type: form.type
        }
        if (!this.isSonAdd) {
          addObj.logUrl = form.logUrl
        }
        if (addObj.type == 1) {
          addObj.pid = form.pid
          addObj.pname = form.pname
          addObj.scholarshipIcon = Number(form.scholarshipIcon)
        }
        if (this.flag === 'add') {
          this.add(addObj)
          return
        }
        addObj.status = form.status
        addObj.id = form.id
        this.edit(addObj)
      },
      // 添加
      add(obj) {
        addList(obj).then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$router.back(-1)
        })
      },
      // 修改
      edit(obj) {
        editList(obj).then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$router.back(-1)
        })
      },
      // 返回
      back() {
        this.$router.back(-1)
      },
      // 获取一级
      getPname() {
        const detailObj = {
          id: this.form.id
        }
        getListDetail(detailObj).then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          const { data } = res.data
          if (!data) return
          this.form = data
        })
      }
    }
  }
</script>

<style lang="scss" >
  .btnBox{
    margin-top: 20px;
  }
</style>
