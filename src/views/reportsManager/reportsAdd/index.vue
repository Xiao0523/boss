<template>
<div>
  <reportTemplet
    :source=" 'add' "
    @upDateFrom="upDateFromFn"
  ></reportTemplet>
</div>
</template>

<script>
  import reportTemplet from '@/components/common/reportTemplet'
  export default {
    name: "reportsAdd",
    components: {
      reportTemplet
    },
    computed: {},
    data() {
      return {
        fromData:{}
      }
    },
    methods: {
      upDateFromFn(fromData){
        this.fromData=fromData;
        this.addReport();
      },
      addReport(){
        this.$req.post('addbaodao',this.fromData).then(res=>{
//          console.log(res);
          this.$success('发布成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>

</style>
