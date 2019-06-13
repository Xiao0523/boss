<template>
 <div>
   <el-row>
     <ul>
       <li @click="tabChange(memberInfo,0)" :class="{'activeTab':activeTab==0}">会员信息</li>
       <li @click="tabChange(memberMoney,1)" :class="{'activeTab':activeTab==1}">会员钱包</li>
       <li @click="tabChange(memberShareInfo,2)" :class="{'activeTab':activeTab==2}">会员分享记录</li>
       <li @click="tabChange(memberChart,3)" :class="{'activeTab':activeTab==3}">会员图表</li>
       <li @click="tabChange(memberRecordDetail,4)" :class="{'activeTab':activeTab==4}">分享记录明细</li>
     </ul>
   </el-row>
   <!--
     动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。
   -->
   <div :is="currentView" :form="infoData.detail" :shareInfo="infoData.shareInfo" :chartPageData="infoData" :memberShareIp="infoData.memberShareIp"></div>
 </div>
</template>

<script>
  import { mapGetters,mapMutations } from 'vuex'
   import memberInfo from '../common/info.vue'
   import memberMoney from '../common/money.vue'
   import memberShareInfo from '../common/shareInfo.vue'
   import memberChart from '../common/chart.vue'
   import memberRecordDetail from '../common/recordTheDetail.vue'
   import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "memberDetails",
    components: {
      memberInfo,
      memberMoney,
      memberShareInfo,
      memberChart,
      memberRecordDetail
    },
    computed: {
    },
    data() {
      return {
        activeTab:0,
        query:{},
        infoData:{}, // 会员信息
        memberInfo:'memberInfo',
        memberMoney:'memberMoney',
        memberShareInfo:'memberShareInfo',
        memberChart:'memberChart',
        memberRecordDetail:'memberRecordDetail',
        currentView:memberInfo // 默认会员信息
      }
    },
    methods: {
      ...mapMutations([
        'set_memberDetail'
      ]),
      initData(){
        this.$req.get('backMemberDetail',{id:this.query.id}).then(res=>{
          this.infoData = res.data.data
          this.set_memberDetail( this.infoData )
        }).catch(err=>{
          console.log(err)
        })
      },
      tabChange(tabItem,activeTab) {
        this.activeTab =activeTab
        this.currentView = tabItem;
      }
    },
    created() {
      this.query = this.$route.query
      this.initData()
    },

  }
</script>

<style lang="scss" scoped>
ul{
  display: flex;
  align-items: center;
  text-align: center;
}
  li{
    list-style: none;
    width: 100px;
    height: 30px;
    margin-right: 20px;
  }
  .activeTab{
    border-bottom: 2px solid #1e6abc;
  }
</style>
