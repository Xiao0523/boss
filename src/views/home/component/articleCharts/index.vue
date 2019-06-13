<template>
   <!--<span v-show="false">{{ readNums}}</span>-->
    <div :class="className" :style="{height:height,width:width}"/>


</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      },
      active:{ // 区分日周月
        type:Number,
        default:0
      }
    },
   /* computed:{
      // 阅读数
      readNums(){
        console.log('计算属性',this.chartData.readNums)
        return this.$store.getters.userInfo
      },
      // 转发数
      forwardNums(){
        return
      }
    },*/
    data() {
      return {
        chart: null,
        sidebarElm: null,
        xText: [],
        readNums: [],
        forwardNums: []
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.resetChartDataFn(val) // 数据重组
        }
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose() // 销毁实例
      this.chart = null
    },
    methods: {
      resetChartDataFn(val){
        console.log('重置',val)
        console.log(this.active)
        if(this.active == 0){
          this.xText = val.readNums.map(item => item.hour)
        }
        if(this.active == 1 || this.active == 2){
          this.xText=  val.readNums.map(item=>item.day)
        }
        this.readNums =val.readNums.map(item => item.count)
        this.forwardNums =val.forwardNums.map(item => item.count)
        this.setOptions(val)
      },
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions({ expectedData, actualData } = {}) {

        this.chart.setOption({
          color: ['#FF9700', '#4DD865'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {show: false},
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
            data: [ '转发数量','阅读数量']
          },
          series: [ // data多维度
            {
              name: '转发数量',
              type: 'bar',
              data: this.forwardNums
            },
            {
              name: '阅读数量',
              type: 'bar',
              data:this.readNums
            }
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    },
    created(){
    }
  }
</script>
