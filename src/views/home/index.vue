<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="tip">
        </div>
      </el-col>
    </el-row>
    <PanelGroup
      @changeTab="changeTab"
      :pageData="pageData"
    ></PanelGroup>
    <component :is="currentView"/>
  </div>
</template>
<script>
  import PanelGroup from '@/components/common/PanelGroup'
  import tagContent from './component/tag.vue'
  import articleContent from './component/article.vue'
  import memberContent from './component/member.vue'
  import depositContent from './component/deposit.vue'
  export default {
    data() {
      return {
        pageData:{},
        tagContent:'tagContent',
        articleContent:'articleContent',
        memberContent:'memberContent',
        depositContent:'depositContent',
        currentView: 'tagContent'
      }
    },
    computed:{
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    components: { // 引入组件
      PanelGroup,
      tagContent,
      articleContent,
      memberContent,
      depositContent

    },
    methods: {
      changeTab(type){
        this.currentView = type
      },
      initData(){
        this.$req.get('statistics/info').then(res=>{
          this.pageData=res.data.data
        }).catch(err=>{
          console.log(err);})
      }
    },
    created(){
      this.initData()
    }
  }
</script>
<style  type="text/css" lang="scss" scoped >
.tip{
  background-color:#409EFF;
  line-height: 60px;
  border-radius: 10px;
}
  .numBox{
    margin-top: 20px;
  }
</style>
