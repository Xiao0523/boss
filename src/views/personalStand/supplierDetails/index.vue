<!--  -->
<template>
  <div>
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="24">
          <h2>基本资料</h2>
        </el-col>
      </el-row>
      <el-form-item label="姓名" prop="personName">
        <el-input v-model="ruleForm.personName" style="width: 400px;" placeholder="请填写姓名"/>
        <el-input v-model.trim="ruleForm.uuid" style="display: none" />
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="ruleForm.companyName" style="width: 400px;" placeholder="请填写公司名称"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-input v-model="ruleForm.createTime" :disabled="true" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobilePhone">
        <el-input v-model="ruleForm.mobilePhone" style="width: 400px;" placeholder="请填写手机号"/>
      </el-form-item>
      <el-form-item label="服务有效期" prop="terminationTime">
        <el-date-picker
          v-model="ruleForm.terminationTime"
          type="date"
          placeholder="选择日期"
          style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="供应商状态" prop="status">
        <el-select v-model="ruleForm.status" clearable placeholder="请选择供应商状态" style="width: 400px;">
          <el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" style="width: 1000px;" placeholder="请填写邮箱"/>
      </el-form-item>
      <el-form-item label="网址" prop="webAddress">
        <el-input v-model="ruleForm.webAddress" style="width: 1000px;" placeholder="请填写网址"/>
      </el-form-item>
      <el-row>
        <el-form-item >
          <el-button type="primary" @click="addSuppliers('ruleForm')">提交</el-button>
          <el-button type="info" @click="cancel('ruleForm')">取消</el-button>
        </el-form-item>
      </el-row>
  </el-form></div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { editSupplier, getSupplier } from '@/api/personSuppliers'
import { fmtDate } from '@/utils/date'
export default {
// import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      ruleForm: {
        personName: '',
        companyName: '',
        createTime: '',
        mobilePhone: '',
        terminationTime: '',
        email: '',
        webAddress: '',
        uuid: '',
        status: ''
      },
      rules: {
        personName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        companyName: [{ required: true, message: '请填写公司名称', trigger: 'blur' }],
        mobilePhone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        terminationTime: [{ required: true, message: '请选择日期', trigger: 'change' }],
        webAddress: [{ required: true, message: '请填写网址', trigger: 'blur' }],
        email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
        status: [{ required: true, message: '请选择供应商状态', trigger: 'change' }]
      },
      statusList: [{ value: '0', label: '禁用' }, { value: '1', label: '启用' }]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    debugger
    const uuid = this.$route.query.id
    this.getSupplierDetails(uuid)
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    addSuppliers(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          this.$wran('请先检查数据是否全部填写')
          return false
        }
      })
      const terminationTime = fmtDate(this.ruleForm.terminationTime)
      const data = {
        'companyName': this.ruleForm.companyName,
        'createTime': '',
        'email': this.ruleForm.email,
        'mobilePhone': this.ruleForm.mobilePhone,
        'personName': this.ruleForm.personName,
        'status': '1',
        terminationTime,
        'uuid': this.ruleForm.uuid,
        'webAddress': this.ruleForm.webAddress
      }
      editSupplier(data).then(res => {
        debugger
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.$router.back()
      })
    },
    cancel(formName) {
      this.$router.back()
    },
    getSupplierDetails(uuid) {
      const getObj = {
        uuid: uuid
      }
      getSupplier(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.ruleForm = res.data.data
      })
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
