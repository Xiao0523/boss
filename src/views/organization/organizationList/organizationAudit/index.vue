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
      <el-form-item label="企业名称" prop="title">
        <el-input v-model.trim="content.title" />
      </el-form-item>
      <el-form-item label="银行开户名" prop="bankName">
        <el-input v-model.trim="content.bankName" />
      </el-form-item>
      <el-form-item label="开户银行" prop="bank">
        <el-input v-model.trim="content.bank" />
      </el-form-item>

      <el-form-item label="联系人" prop="contact">
        <el-input v-model.trim="content.contact" />
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.trim="content.phone" />
      </el-form-item>

      <el-form-item label="工商执照" prop="businessLicense">
        <img v-if="content.businessLicense" :src="content.businessLicense" class="novel_img" >
      </el-form-item>

      <el-form-item label="办学许可证" prop="permission">
        <img v-if="content.permission" :src="content.permission" class="novel_img" >
      </el-form-item>

      <el-form-item label="民办非企业单位登记证" prop="regist">
        <img v-if="content.regist" :src="content.regist" class="novel_img" >
      </el-form-item>

      <el-form-item label="组织机构代码证" prop="organizeCode">
        <img v-if="content.organizeCode" :src="content.organizeCode" class="novel_img" >
      </el-form-item>

      <el-form-item label="税务登记证" prop="tax">
        <img v-if="content.tax" :src="content.tax" class="novel_img" >
      </el-form-item>

      <el-form-item label="待打款" prop="bank">
        <span>0.05元</span>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="onConfirmAudit('noveForm')">审核通过</el-button>
        <el-button type="danger" @click="onRejectAudit('noveForm')">审核不通过</el-button>
      </el-form-item>
    </el-form>

    <Dialog
      :title="'审核'"
      :width="'40%'"
      :is-show="isShow"
      @cancelFn="close('auditForm')"
      @confirmFn="onSubmit('auditForm')"
    >
      <el-form ref="auditForm" :model="content" :rules="rules" label-width="100px">
        <el-form-item label="备注" prop="status">
          <el-input v-model.trim="content.des" type="textarea" autosize />
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { postNovel } from '@/api/happRead'
import Dialog from '@/components/common/dialog'
import { UploadUrl } from '@/http/url'
export default {
  name: 'OrganizationAudit',
  components: {
    Dialog
  },
  data() {
    return {
      content: {
        title: '', // 企业名称
        bankName: '', // 企业作者
        bank: '', // 企业简介
        cover: '', // 企业封面
        xlsUrl: '' // 企业文件
      },
      isShow: false, // 弹窗开关
      rules: {
        title: [
          {
            required: true,
            type: 'string',
            message: '请填写企业名称！',
            trigger: 'blur'
          }
        ],
        bankName: [
          {
            required: true,
            type: 'string',
            message: '请填写企业作者！',
            trigger: 'blur'
          }
        ],
        bank: [
          {
            required: true,
            type: 'string',
            message: '请填写企业简介！',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            type: 'string',
            message: '请上传企业封面！',
            trigger: 'blur'
          }
        ],
        xlsUrl: [
          {
            required: true,
            type: 'string',
            message: '请上传企业文件！',
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

    // 上传企业内容
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
    close() {
      this.isShow = false
    },

    // 审核通过
    onConfirmAudit() {},

    // 审核不通过
    onRejectAudit() {
      this.isShow = true
    }
  }
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
  border-color: #409eff;
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
  object-fit: contain;
}
</style>

