<template>
  <div>
    <el-form
      ref="noveForm"
      :model="content"
      :rules="rules"
      class="novel"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="企业名称" prop="title">
        <el-input v-model.trim="content.name" disabled/>
      </el-form-item>

      <el-form-item label="银行开户名" prop="bankName">
        <el-input v-model.trim="content.bankName" disabled/>
      </el-form-item>

      <el-form-item label="开户银行号码" prop="bank">
        <el-input v-model.trim="content.bankNo" disabled/>
      </el-form-item>

      <el-form-item label="统一信用代码" prop="bank">
        <el-input v-model.trim="content.unifiedCreditCode" disabled/>
      </el-form-item>

      <el-form-item label="法人身份证" prop="bankName">
        <el-input v-model.trim="content.legalPersonCardId" disabled/>
      </el-form-item>

      <el-form-item label="法人姓名" prop="bank">
        <el-input v-model.trim="content.legalPersonName" disabled/>
      </el-form-item>

      <el-form-item label="工商执照" prop="businessLicense">
        <img v-if="content.businessLicense" :src="content.businessLicense" class="novel_img" >
      </el-form-item>

      <el-form-item label="办学许可证" prop="schoolLicense">
        <img v-if="content.schoolLicense" :src="content.schoolLicense" class="novel_img" >
      </el-form-item>

      <el-form-item>
        <el-button :disabled="content.status !== 0" type="success" @click="audit(content)">审核</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="diglogFlag"
      title="审核"
      width="30%"
      center
    >
      <span class="diglog-textarea">
        <textarea id="" v-model="unSuccStr" name="" cols="30" rows="10" placeholder="驳回请输入反馈！"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="auditFn('1')">审核通过</el-button>
        <el-button @click="auditFn('2')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { postNovel } from '@/api/happRead'
import Dialog from '@/components/common/dialog'
import { UploadUrl } from '@/http/url'
import { getBusinessDetail, getAudit } from '@/api/merchant'
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
      diglogFlag: false,
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
      uploadUrl: UploadUrl,
      activeAudit: {},
      unSuccStr: '',
      viewId: ''
    }
  },
  created() {
    const id = this.$route.query.id
    this.viewId = id
    if (id) {
      this.getView(id)
    }
  },
  methods: {
    // 审核
    audit(obj) {
      this.activeAudit = obj
      if (obj.status !== 0) {
        this.$message({
          message: '请选择待审核的数据',
          type: 'warning'
        })
        return
      }
      this.diglogFlag = true
    },

    // 审核弹框选择
    handelDiglogClick() {
      this.diglogFlag = false
    },

    // 审核接口请求
    auditFn(status) {
      const getObj = {
        status: status,
        rejectReason: this.unSuccStr,
        storeId: this.viewId
      }
      getAudit(getObj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.push({ name: 'OrganizationList' })
      })
    },
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

    getView(id) {
      const getObj = {
        id: id
      }
      getBusinessDetail(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.content = res.data.data
      })
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

.diglog-textarea {
  display: block;
  width: 100%;
  textarea {
    display: block;
    width: 100%;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 30px;
    height: 120px;
  }
}
</style>

