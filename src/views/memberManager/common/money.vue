<template>
    <div>
      <el-form ref="form" :model="form"  :label-position="labelPosition"  label-width="120px">
        <el-row>零钱</el-row>
        <el-form-item label="余额">
          <el-input v-model="form.availableBalance" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="累计赚取零钱">
          <el-input v-model="form.totalearn" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核中的余额">
          <el-input v-model="form.frozenBalance" :disabled="true"></el-input>
        </el-form-item>
        <el-row>纷享币</el-row>
        <el-form-item label="当前纷享币">
          <el-input v-model="form.sharemoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总纷享币">
          <el-input v-model="form.totalsharemoney" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="今日转换">
          <el-input v-model="form.todaycovert" :disabled="true"></el-input>
        </el-form-item>
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="updateForm">确认更新</el-button>-->
        <!--</el-form-item>-->
      </el-form>
    </div>
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: "",
    components: {
// someComponent
    },
    props:{
      form:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        labelPosition:'left'
      }
    },
    methods: {
//      updateForm(){}
    },
    watch:{
      form: {
        handler(newValue, oldValue) {
          console.log(newValue)

        },
        deep: true
      }
    },
    created() {
//      console.log(2);
    }

  }
</script>

<style lang="scss" scoped>

</style>
