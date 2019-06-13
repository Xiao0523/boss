<template>
  <div>
    <section>
    <el-row>
      <el-button type="success" @click="activeTagFn(0)">日</el-button>
      <el-button type="warning"  @click="activeTagFn(1)">周</el-button>
      <el-button type="danger"  @click="activeTagFn(2)">月</el-button>
    </el-row>
    <articleCharts :chartData=pageData :active="active"></articleCharts>
    </section>
  </div>
</template>

<script>
  import articleCharts from '../component/articleCharts'
    export default {
        name: "articleContent",
        components: {
          articleCharts, // 日-周-月
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
              url ='statistics/readAndShareByDay'
            } else if (this.active == 1) {
              url ='statistics/readAndShareByWeek'
            } else if (this.active == 2){
              url ='statistics/readAndShareByMonth'
            }
            this.$req.get(url).then(res=>{
              this.pageData=res.data.data
              this.readNums= this.pageData.readNums // 阅读数
              this.forwardNums= this.pageData.forwardNums // 转发数

              console.log(this.pageData)
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
