<template>
  <div>
    <advTemplet
      :form="data"
      :source="'edit'"
      @confirmFn="confirmFn"
    ></advTemplet>
  </div>
</template>

<script>
  import advTemplet from '../advTemplet'
  import {setSession,getSession} from '@/utils/session'
  export default {
    name: "advEdit",
    components: {
      advTemplet
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
          searchParame:{},
        }
      }
    },
    watch:{
    },
    methods: {
      confirmFn(val){
//        console.log(val);
/*        let realname = JSON.parse(this.userInfo).realname
        let params={
          id:val.id,
          coin:val.coin,
          link:val.link,
          targetLink:val.targetLink,
          title:val.title,
          type:val.type,
          updator:realname,
          layoutType:val.layoutType,
          isTitleShow:val.isTitleShow,
          business:val.business,
          tagIds:val.tagIds
        }*/

        this.$req.post(`v2/shareAdv/update`,val).then(res=>{
          console.log(res);
          this.$success('更新成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      },
      inintData(){
        this.$req.get(`v2/shareAdv/detail/${this.query.id}`).then(res=>{
          this.data=  res.data.data
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
      this.query = this.$route.query
      // console.log(JSON.stringify(this.query.searchParame))
      this.inintData()
    },

  }
</script>

<style lang="scss" scoped>

</style>


