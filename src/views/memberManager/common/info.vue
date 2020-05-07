<template>
  <div>
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="120px">
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.truename" :disabled="true" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="所选标签">
        <el-tag type="success">{{ form.memberLabel }}</el-tag>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.createDate"
          :disabled="true"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="支付宝账号">
        <el-input v-model="form.alipayAccount" :disabled="true"/>
      </el-form-item>
      <el-form-item label="支付宝姓名">
        <el-input v-model="form.alipayName" :disabled="true"/>
      </el-form-item>
      <el-form-item label="删除标志">
        <el-radio v-model="form.delFlag" label="0">未删除</el-radio>
        <!--<el-radio v-model="form.delFlag" label="1">已删除</el-radio>-->
        <el-radio v-model="form.delFlag" label="2">已禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateForm">确认更新</el-button>
        <el-button type="info" @click="backFn">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import someComponent from './someComponent'
export default {
  name: 'MemberInfo',
  components: {
    // someComponent
  },
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      labelPosition: 'left'
    }
  },
  computed: {
    // 登录信息
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }
  },
  created() {
    //      console.log(1);
  },
  methods: {
    backFn() {
      this.$router.go(-1)
    },
    updateForm() {
      //        console.log(form);
      console.log(this.userInfo)
      const realname = JSON.parse(this.userInfo).realname
      console.log(realname)
      // 更新参数
      const param = {
        id: this.form.id,
        address: this.form.address,
        memberLabel: this.form.memberLabel,
        nickname: this.form.nickname,
        phone: this.form.phone,
        sex: this.form.sex,
        delFlag: this.form.delFlag,
        updateBy: realname
      }
      //        console.log(param);
      this.$req.post('updateBackMember', param).then(res => {
        console.log(res)
        this.$success('更新成功')
        this.$router.back()
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
