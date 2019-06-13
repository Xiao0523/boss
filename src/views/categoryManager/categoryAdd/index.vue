<template>
 <div>
   <categoryTemplet
     :source="'add'"
     @confirmFn="addFn"
   ></categoryTemplet>
 </div>
</template>

<script>
  import categoryTemplet from '../categoryTemplet'
    export default {
        name: "categoryAdd",
        components: {
          categoryTemplet
        },
        computed: {
            // 登录信息
            userInfo(){
              return this.$store.getters.userInfo
            }
        },
        data() {
            return {
            }
        },
        methods: {
          addFn(val){
            let realname = JSON.parse(this.userInfo).realname
            val.creator = realname
            this.$req.post(`v2/shareCategory/add`,val).then(res=>{
              console.log(res);
              this.$success('添加成功')
              this.$router.back()
            }).catch(err=>{
              console.log(err);})
          }
        },
        created() {
        }

    }
</script>

<style lang="scss" scoped>

</style>
