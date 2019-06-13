<template>
  <!--<span v-show="false">{{ readNums}}</span>-->
  <div>
    <section>
      <el-row>
        <el-button type="warning"  @click="activeTagFn(1)">周</el-button>
        <el-button type="danger"  @click="activeTagFn(2)">月</el-button>
      </el-row>
    </section>
    <div id="chart" style="width: 100%;height: 350px;"></div>
  </div>

</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "memberChart",
    components: {
    },
    computed: {
      ...mapGetters([
        'memberDetail',
      ])
    },
    props:{
    },
    data() {
      return {
        active: 1,
        myChart:{},
        option:{
          //标题，可选
          title : {
            text : 'ECharts 入门示例'//标题文本
          },
          tooltip : {},//提示，可选
          //图例
          legend : {
            data : [ '一月销量','二月销量']//图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）
          },
          //直角坐标系 grid 中的 x 轴
          xAxis : {
            data : [ "衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子" ]//类目数据，在类目轴（type: 'category'）中有效。
          },
          //直角坐标系 grid 中的 y 轴
          yAxis : {},
          //系列列表。每个系列通过 type 决定自己的图表类型
          series : [ {
            name : '一月销量',
            type : 'bar',
            data : [ 5, 20, 36, 10, 10, 20 ]
          } ,{
            name : '二月销量',
            type : 'bar',
            data : [ 7, 18, 28, 8, 20, 10 ]
          }
          ]
        }
      }
    },
    methods: {
      activeTagFn(index){
        this.active=index
        console.log(this.active)
      },
      resetChartDataFn(val) {
        // console.log('重置', val)
        // console.log(this.active)
        if (this.active == 1) {
          this.forwardNums = val.readAndShareByWeek.forwardNums.map(item => item.count)
          this.readNums = val.readAndShareByWeek.readNums.map(item => item.count)
          this.xText = val.readAndShareByWeek.forwardNums.map(item => item.day)
        }else{
          this.forwardNums = val.readAndShareByMonth.forwardNums.map(item => item.count)
          this.readNums = val.readAndShareByMonth.readNums.map(item => item.count)
          this.xText = val.readAndShareByMonth.forwardNums.map(item => item.day)
        }
        this.setOptions(val)
      },
      setOptions({ expectedData, actualData } = {}) {
         this.myChart.setOption({
           color: ['#29A1F7', '#FF9700'],
           tooltip: {
             trigger: 'axis',
             axisPointer: {
               type: 'shadow'
             }
           },
           xAxis: [
             {
               type: 'category',
               axisTick: { show: false },
               data: this.xText
             }
           ],
           grid: {
             left: 10,
             right: 10,
             bottom: 20,
             top: 30,
             containLabel: true
           },
           tooltip: {
             trigger: 'axis',
             axisPointer: {
               type: 'cross'
             },
             padding: [5, 10]
           },
           yAxis: {
             axisTick: {
               show: false
             }
           },
           legend: {
             data: ['转发数', '阅读数']
           },
           series: [ // data多维度。
             {
               name: '转发数',
               type: 'bar',
               data: this.forwardNums

             },
             {
               name: '阅读数',
               type: 'bar',
               data: this.readNums
             }
           ]
         })
      },
    },
    watch:{
      active(val) {
        this.resetChartDataFn(this.memberDetail)
      }
    },
    created() {
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('chart'))
      this.setOptions(this.memberDetail)
      this.resetChartDataFn(this.memberDetail)
    }
  }
</script>




