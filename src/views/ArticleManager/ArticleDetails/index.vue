<template>
<div>
  <articleTemplet
    :fromMenu="formData"
    :advIdArr="formData.advIds"
    :tagidArr="formData.tagids"
    :source=" 'edit' "
    @upDateFrom="upDateFrom"
  ></articleTemplet>
  <cityPartnerAd
    v-if="fenlei == '城市合伙人' && row.remind == 1 "
    :row="row"
  >

  </cityPartnerAd>
</div>
</template>

<script>
  import articleTemplet from'@/components/common/articleTemplet'
  import cityPartnerAd from'@/components/cityPartnerAd'
  import {setSession,getSession} from '@/utils/session'
  export default {
    name: "ArticleDetails",
    components: {
      articleTemplet,
      cityPartnerAd
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    data() {
      return {
        formData:{},
        row:{},
        query:{},
        fenlei:'', // 是否显示城市合伙人表单
      }
    },
    methods: {
      upDateFrom(newFrom) { // 新的表单数据
        this.formData = newFrom
        let realname = JSON.parse(this.userInfo).realname
//        this.formData.updatepeople = realname
        this.editArticleFn()
      },
      editArticleFn(){
        this.$req.post('updateHuoDong',this.formData).then(res=>{
          console.log(res);
          this.$success('更新成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      },
      initData(){
//        console.log(this.query.id);
        this.$req.get('huoDongDetail',{id:this.query.id}).then(res=>{
         this.formData = res.data.data.article
          let advertisings = res.data.data.advertisings
          let categories = res.data.data.categories
          let covermaps = res.data.data.covermaps
          this.formData.advIds = advertisings.map(item=>item.id)
          this.formData.tagids = categories.map(item=>item.id)
          this.formData.covermaps=covermaps
//          console.log( 'formData',this.formData);

          this.row=res.data.data.article
//          console.log(this.formData);

        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
     this.query = this.$route.query
      this.fenlei = this.query.fenlei // 城市合伙人要用到
      this.initData()
    },

  }
</script>

<style type="text/scss" lang="scss" scoped>
.top-box{
  display: flex;
  justify-content: space-between;
  .left{
    flex: 3;
    background-color: #fff;
    height: 100%;

  }
  .right{
    flex: 1;
    background-color: red;
    height: 300px;
  }
}
</style>
