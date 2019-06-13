<template>
  <div>
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="120px">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.truename" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="所选标签">
        <el-tag type="success">{{form.memberLabel}}</el-tag>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.createDate"
          type="datetime"
          :disabled="true"
          value-format="yyyy-MM-dd hh:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付宝账号">
        <el-input v-model="form.alipayAccount" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付宝姓名">
        <el-input v-model="form.alipayName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="删除标志">
        <el-radio v-model="form.delFlag" label="0">未删除</el-radio>
        <el-radio v-model="form.delFlag" label="1">已删除</el-radio>
        <el-radio v-model="form.delFlag" label="2">已禁用</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // import someComponent from './someComponent'
  import {setSession,getSession} from '@/utils/session'
  export default {
    name: "CommissionDetails",
    components: {
// someComponent
    },
    props:{
/*      form:{
        type:Object,
        default(){
          return {}
        }
      }*/
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        labelPosition:'left',
        query:{},
        form:{}
      }
    },
    methods: {
      commissionDetailsFn(){
        this.$req.post(`selectMemberDetail?alipayId=${this.query.memberAlipayaccount}`).then(res=>{
          this.form= res.data.data.detail
          console.log(this.form)
        }).catch(err=>{
          console.log(err);})
      }
    },
    watch:{
/*      form: {
        handler(newValue, oldValue) {
          console.log(newValue)

        },
        deep: true
      }*/
    },
    created() {
      this.query = this.$route.query
      this.commissionDetailsFn()
    },
    // 详情->列表
    beforeRouteLeave: function (to, from, next) {
      // console.log('详情页to', to);
      // console.log(this.query.searchParame);
      if (to.path === '/commissionRebate/CommissionList') {
        console.log('详情搜索参数',this.query.searchParame);
        setSession('param', this.query.searchParame)
      }
      next();
    },

  }
</script>

<style lang="scss" scoped>

</style>

