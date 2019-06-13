<template>
  <div>
    <flotAdvTemplet
      :form="data"
      :source="'edit'"
      @confirmFn="confirmFn"
    ></flotAdvTemplet>
  </div>
</template>

<script>
  import flotAdvTemplet from '../advTemplet/flotAdvTemplet'
  import {setSession,getSession} from '@/utils/session'
  export default {
    name: "advEdit",
    components: {
      flotAdvTemplet
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    data() {
      return {
        query:{},
        data:{
        }
      }
    },
    watch:{
    },
    methods: {
      confirmFn(val){
//        console.log(val);
        let realname = JSON.parse(this.userInfo).realname
        /*let params={
          id:val.id,
          coin:val.coin,
          title:val.title,
          updator:realname,
          startTime:val.startTime,
          endTime:val.endTime,
          categories:val.categories,
          pics:val.pics
        }*/

        this.$req.patch(`updateMarketing`,val).then(res=>{
          console.log(res);
          this.$success('更新成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      },
      inintData(){
        this.$req.get(`getMarketingByMarketingId/${this.query.id}`).then(res=>{
          this.data=  res.data.data
          console.log(this.data)
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.query = this.$route.query
      this.inintData()
    },

  }
</script>

<style lang="scss" scoped>

</style>



