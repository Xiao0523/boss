<template>
<div>
  <el-date-picker
    v-model="start"
    type="datetime"
    placeholder="选择开始日期时间"
    value-format="yyyy-MM-dd HH:mm:ss"
  >
  </el-date-picker>
  <span>至</span>
  <el-date-picker
    v-model="end"
    type="datetime"
    placeholder="选择结束日期时间"
    value-format="yyyy-MM-dd HH:mm:ss"
  >
  </el-date-picker>
</div>
</template>

<script>
   import {fmtDate} from '@/utils/date'
  export default {
    name: "dateTimePicker",
    props:{
      startTime:{
        type:String
      },
      endTime:{
        type:String
      },
      type:{
        type:String,
        default:'datetime'
      },
      format:{
        type:String,
        default:'yyyy-MM-dd HH:MM:SS'
      }
    },
    components: {
// someComponent
    },
    computed: {
    },
    data() {
      return {
        start:'',
        end:''
      }
    },
    watch:{
      startTime(v){
        this.start = v
      },
      endTime(v){
        this.end = v
      },
      start(val1){
        this.$emit('startDateFn',val1)
      },
      end(val2){
        this.$emit('endDateFn',val2)
      }
    },
    methods: {

    },
    created() {
//      console.log('start',this.startTime);
    },


  }
</script>

<style type="text/css"  lang="scss" scoped>

</style>
