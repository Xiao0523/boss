<template>
  <div>
    <appTemplet
      :from="from"
      :source="'edit'"
      @upDateFrom="upDateFrom"
    ></appTemplet>
  </div>
</template>

<script>
  import appTemplet from'@/components/common/appTemplet'
    export default {
        name: "AppEdit",
        components: {
          appTemplet
        },
        computed: {
          // 登录信息
          userInfo(){
            return this.$store.getters.userInfo
          }
        },
        data() {
            return {
              from:{}, // 响应的data
              query: {}
            }
        },
        methods: {
          upDateFrom(from){
            this.from=from
//            console.log(this.userInfo);
            let realname = JSON.parse(this.userInfo).realname
            this.from.updateBy =realname
            this.updateApp()
          },
          updateApp(){
            this.$req.post('updateApp', this.from).then(res=>{
              console.log(res);
              this.$success('更新成功')
              this.$router.back()
            }).catch(err=>{
              console.log(err);})
          },
          inintData(){
            this.$req.get('BackAppDetail',{id:this.query.id}).then(res=>{
             this.from=res.data.data
            }).catch(err=>{
              console.log(err);
            })
          }
        },
        created() {
         this.query = this.$route.query
//          console.log(this.query);
          this.inintData()
        }

    }
</script>

<style type="text/scss" lang="scss" scoped>
.top-box{
  display: flex;
  .left{
    flex: 1;
    .coverImg{
      width: 10%;
    }
  }
  .right{
    flex: 1;
  }
}
</style>
