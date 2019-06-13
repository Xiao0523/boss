<template>
  <section>
    <el-row>
      <el-button type="success" @click="activeTagFn(0)">日</el-button>
      <el-button type="warning"  @click="activeTagFn(1)">周</el-button>
      <el-button type="danger"  @click="activeTagFn(2)">月</el-button>
    </el-row>
    <newAddCharts :chartData=pageData :active="active"></newAddCharts>
  </section>
</template>

<script>
    import newAddCharts from './newAddCharts'
    export default {
        name: "deposit",
        components: {
          newAddCharts
        },
        computed: {},
      data() {
        return {
          active: 0,
          pageData: {},
          readNums: [],
          forwardNums: []
        }
      },
      methods: {
        activeTagFn(index){
          this.active=index

        },
        // 日，周，月阅读转发数
        initData(){
          let url = ''
          if (this.active == 0) {
            url ='statistics/artMemberCashByDay'
          } else if (this.active == 1) {
            url ='statistics/artMemberCashByWeek'
          } else if (this.active == 2){
            url ='statistics/artMemberCashByMonth'
          }
          this.$req.get(url).then(res=>{
            this.pageData=res.data.data
            // console.log(this.pageData)
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      watch:{
        active(val){
          this.initData()
        }
      },
      created() {
        this.initData()
      }

    }
</script>

<style lang="scss" scoped>

</style>
