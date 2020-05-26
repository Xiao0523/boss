<template>
  <div class="pageBox">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page = "currentPage"
      :pageSizes="[5,10,50,100,200,300,400,500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      v-if="isShow"
    >
    </el-pagination>
  </div>
</template>

<script>
  import {setSession,getSession} from '@/utils/session'
  export default {
    props:{
      // 当前页
      currentPage:{
        type:Number
      },
      //每页显示个数选择器的选项设置
      pageSizes:{
        type:Array,
        default() {
          return []
        }
      },
      // 每页显示条目个数
      pageSize:{
        type:Number
      },
      total:{
        type:Number
      }
    },

    components: {},
    data () {
      return {
        isShow: false
      }
    },
    watch:{
      total(val){
        console.log('total',val);
        if(val != 0){
          this.isShow = true
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        setSession('currentSize', val);
        let currentSize = getSession('currentSize')
        this.$emit('sizeChange', currentSize);
      },
      handleCurrentChange(val) {
        setSession('currentPage', val);
        let currentPage = getSession('currentPage')
        this.$emit('currentChange', currentPage);
      }
    },
    mounted(){

    },
    updated(){
      console.log('分页组件',this.currentPage);
      console.log('分页组件',this.pageSize);

    },
    created () {
    }
  }

</script>
<style lang="scss" scoped>
  .pageBox{
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>
