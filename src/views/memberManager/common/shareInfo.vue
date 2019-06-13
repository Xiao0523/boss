<template>
  <div>
    <el-table
      :data="shareInfo"
      style="width: 100%"
      max-height="700"
    >
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="counts"
        label="数量"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: "memberShareInfo",
    components: {
// someComponent
    },
    props:{
      shareInfo:{
        type:Array,
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
      updateForm(){
//        console.log(form);
        console.log(this.userInfo);
        let realname = JSON.parse(this.userInfo).realname
        console.log(realname);
        // 更新参数
        let param = {
          id:this.form.id,
          address:this.form.address,
          memberLabel:this.form.memberLabel,
          nickname:this.form.nickname,
          phone:this.form.phone,
          sex:this.form.sex,
          delFlag:this.form.delFlag,
          updateBy:realname
        }
//        console.log(param);
        this.$req.post('updateBackMember',param).then(res=>{
          console.log(res);
          this.$success('更新成功')
          this.$router.back()

        }).catch(err=>{
          console.log(err);})
      }
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
    }

  }
</script>

<style lang="scss" scoped>

</style>

