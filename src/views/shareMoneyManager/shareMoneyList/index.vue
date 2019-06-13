<template>
  <el-form ref="form" :model="form" label-width="180px">
    <el-form-item label="创建者">
      <el-input v-model="form.creator"  disabled></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker
        disabled
        v-model="form.createTime"
        type="datetime"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="上级比例（%）">
      <el-input v-model="form.scale"></el-input>
    </el-form-item>
    <el-form-item label="上上级比例（%）">
      <el-input v-model="form.scaleSecond"></el-input>
    </el-form-item>
    <el-form-item label="邀请一个用户获得纷享币">
      <el-input v-model="form.earning" disabled></el-input>
    </el-form-item>
    <el-form-item label="更新时间">
      <el-date-picker
        disabled
        v-model="form.updateTime"
        type="datetime"
       >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="公司微信号">
      <el-input v-model="form.companyWechatcode"></el-input>
    </el-form-item>
    <el-button type="primary" @click="updateFn">更新</el-button>
  </el-form>
</template>

<script>
    export default {
        name: "shareMoneyList",
        components: {
// someComponent
        },
        computed: {},
        data() {
            return {
              form:{}
            }
        },
      methods: {
        updateFn(){
          let params = {
            earning: this.form.earning,
            id: this.form.id,
            scale: this.form.scale,
            scaleSecond: this.form.scaleSecond,
            companyWechatcode:this.form.companyWechatcode,
            updator: this.form.updator
          }
          this.$req.post('updateEarning',params).then(res => {
          this.$success(res.data.message)
          }).catch(err => {
            console.log(err);
          })
        },

        initData() {
          this.$req.get('earningDetail').then(res => {
            this.form = res.data.data
          }).catch(err => {
            console.log(err);
          })
        }
      },
        created() {
          this.initData()
        }

    }
</script>

<style lang="scss" scoped>

</style>
