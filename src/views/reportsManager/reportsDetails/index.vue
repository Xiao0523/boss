<template>
  <div>
    <reportTemplet
      :fromMenu=" medias"
      :source=" 'edit' "
      @upDateFrom="upDateFromFn"
    ></reportTemplet>
  </div>
</template>
<script>
  import reportTemplet from'@/components/common/reportTemplet'

  export default {
    name: "reportsDetails",
    components: {
      reportTemplet
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        query: {},
        medias: {},
      }
    },
    methods: {
      upDateFromFn(fromData){
        this.medias=fromData;
        let realname = JSON.parse(this.userInfo).realname
        this.medias.updateBy =realname
        console.log(this.medias);
        this.editReport();
      },
      editReport(){
        this.$req.post('updateBaoDao',this.medias).then(res=>{
//          console.log(res);
          this.$success('更新成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      },
      initData() {
        this.$req.get('BaoDaoDetail', {id: this.query.id}).then(res => {
          this.medias = res.data.data.medias
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.query = this.$route.query
      this.initData()
    }

  }
</script>

<style lang="scss" scoped>

</style>
