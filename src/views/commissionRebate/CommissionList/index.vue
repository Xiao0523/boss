<template>
<div>
  <commissionNav
    :param="searchParame"
    @searchFn="searchFn"
    @updateListFn="updateListFn"
  ></commissionNav>
<!--  <el-row :gutter="20">
    <el-col :span="4">
      <div class="input-box">
        &lt;!&ndash;<span class="text">手机号</span>&ndash;&gt;
        <el-input v-model="param.phone"
                  @blur.prevent='checkMobileFn'
                  placeholder="请输入手机号"
                  clearable
        ></el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="input-box">
        &lt;!&ndash;<span class="text">支付宝</span>&ndash;&gt;
        <el-input
          v-model="param.Alipayaccount"
          @blur.prevent='trimFn'
          placeholder="请输入支付宝账号"
          clearable
        ></el-input>
      </div>
    </el-col>
    <el-col :span="4" class="input-box">
      &lt;!&ndash;<span class="text">状态</span>&ndash;&gt;
      <el-select v-model="param.state" placeholder="请选择提现状态" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
&lt;!&ndash;    <el-col :span="10" class="input-box">
      <span class="text">日期</span>
      <dateTimePicker
        @startDateFn="startDateFn"
        @endDateFn="endDateFn"
      ></dateTimePicker>
    </el-col>&ndash;&gt;
    <el-date-picker
      v-model="param.startDay"
      type="datetime"
      placeholder="开始更新日期"
      @change="dateChangeBeginTime"
      value-format="yyyy-MM-dd HH:mm:ss"
    >
    </el-date-picker>
    <el-date-picker
      v-model="param.endDay"
      type="datetime"
      placeholder="结束更新日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="dateChangeEndTime"
    >
    </el-date-picker>
    <el-button type="primary"  @click="initData">搜索</el-button>
  </el-row>-->
  <el-row class="btn-box">
    <!--<el-button type="primary">导出待处理</el-button>-->
    <!--<el-button type="info" @click="exportFn">导出所有</el-button>-->
    <!--<el-button type="warning">待处理订单</el-button>-->
    <el-button @click="BatchAudit" :disabled="examineDisabled">批量审核</el-button>
    <el-button type="danger" :disabled="examineDisabled" @click="clickFarmingFn">涉嫌刷单</el-button>
  </el-row>
  <el-table
    id="out-table"
    class="table-box"
    :data="listData"
    empty-text="暂无数据"
    style="width: 100%"
    border
    :header-cell-style="tabHeader"
    @selection-change="SelectionChange"
  >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="会员昵称"
    >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="会员手机号"
    >
    </el-table-column>
    <el-table-column
      prop="amountdate"
      label="提现日期"
    >
    </el-table-column>
    <el-table-column
      prop="amountoperation"
      label="提现金额"
    >
    </el-table-column>
    <el-table-column
      prop="memberAlipayaccount"
      label="支付宝账号"
    >
    </el-table-column>
    <el-table-column
      prop="accountstate"
      label="到账情况"
    >
    </el-table-column>
    <el-table-column
      prop="state"
      label="操作状态"
    >
    </el-table-column>
    <el-table-column
      prop="alipayName"
      label="支付宝姓名"
    >
    </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template slot-scope="scope">
        <div class="operation-box">
          <el-button size="mini" :disabled="examineDisabled" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
          <el-button size="mini" @click="goDetailsFn(scope.$index, scope.row)">详情</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!--分页-->
  <div class="pageNumBox">
    <pageNum :currentPage="searchParame.pageNum"
             :pageSize="searchParame.pageSize"
             :total="totalNum"
             @sizeChange="sizeChangeFn"
             @currentChange="currentChangeFn"
    ></pageNum>
  </div>
  <!--回到顶部-->
  <goTop></goTop>
</div>
</template>

<script>
  import commissionNav from '@/components/commissionNav'
  import dateTimePicker from '@/components/common/dateTimePicker'
  import pageNum from '@/components/pageNum'
  import goTop from '@/components/common/goTop'
  import {exportExcel} from '@/utils/validate.js'
  import {checkMobile, trim} from '@/utils/validate.js'
  import {setSession,getSession,clearOneSession} from '@/utils/session'

  export default {
    name: "commissionRebate",
    components: {
      dateTimePicker,
      pageNum,
      goTop,
      commissionNav
    },
    computed: {
      // 登录信息
      userInfo() {
        return this.$store.getters.userInfo
      },
      state(){
        return this.searchParame.state
      }
    },
    data() {
      return {
        searchParame: {},
        examineDisabled: false,
        /*      param: {
                Alipayaccount: '',
                phone: '',
                state: '',
                startDay: '',
                endDay: '',
                pageSize: 10,
                pageNum: 1,
              },*/
        listData:[],
        pageNo:null,
        pageSize:null,
        totalNum:null,
        ids:[],
        tabHeader: {
          "background-color": "#F4F4F4",
          'color': "#666666",
          'border-top': "1px solid #BBBBBB",
          'border-bottom': "1px solid #BBBBBB",
          "font-size": "16px",
          "text-align": "center"
        },
 /*       options: [{
          value: '全部',
          label: '全部'
        },{
          value: '审核中',
          label: '审核中'
        },
          {
          value: '涉嫌刷单',
          label: '涉嫌刷单'
        }, {
          value: '已审核',
          label: '已审核'
        }],
        state:'', // 下拉状态*/
      }
    },
    methods: {
      // 更新列表数据
      updateListFn(){
        this.ids=[]
        this.initData()
      },
      // 搜索
      searchFn(parame) {
        this.searchParame = parame
        console.log('父组件接受的参数',this.searchParame);
        this.initData();
      },
   /*   dateChangeBeginTime(start){
        if(!start){return}
        this.param.startDay =start
        setSession('currentPage',1);
      },
      dateChangeEndTime(end){
        if(!end){return}
        this.param.endDay = end
        setSession('currentPage',1);
      },*/
      goDetailsFn(index,row){
        this.$req.post(`selectMemberDetail?alipayId=${row.memberAlipayaccount}`).then(res => {
        let memberId= res.data.data.detail.id
          console.log(memberId)
          this.$router.push({
            path:'/memberManager/memberDetais',
            query:{
              id:memberId,
            }
          })
        }).catch(err => {
          console.log(err)
        })
  /*      this.$router.push({
          path:'/commissionRebate/CommissionDetails',
          query:{memberAlipayaccount:row.memberAlipayaccount,searchParame:this.searchParame}
        })*/

      },
 /*     trimFn(){
        trim(this.param.Alipayaccount)
      },*/
    /*  checkMobileFn(){
        checkMobile(this.param.phone)
      },
      exportFn(){
        exportExcel();
      },*/
      // 翻页
      // pageSize(每页条数) 改变时会触发
      sizeChangeFn(size) {
        this.searchParame.pageSize= size;
        let param =getSession('param');
        if(param==='undefined' || param===undefined){
          param ={}
          param.state=2;
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;
        setSession('param',param)
        console.log('每页条数改变时触发：'+this.searchParame.pageSize);
        this.initData()
      },
      // currentPage(	当前页) 改变时会触发
      currentChangeFn(page) {
        console.log(this.searchParame)
        this.searchParame.pageNum = page
        let param = getSession('param')
        if (param === 'undefined' || param === undefined) {
          param = {}
          param.state=2;
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;

        setSession('param', param)
        console.log('页码改变触发' + this.searchParame.pageNo)
        this.initData()
      },
      // 搜索
/*      searchFn() {
        for (let key in this.param) {
          if (this.param[key] === '' || this.param[key] === null) {
            delete this.param[key]
          }
        }
        this.$req.post('fuzzySearchCommission', this.param).then(res => {
          console.log(res.data.data);
          this.listData = res.data.data
        }).catch(err => {
          console.log(err);
        })

      },*/

      // 刷单
      clickFarmingFn(){
        if(this.ids.length == 0){
          return
        }
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('clickFarming',{ids:this.ids,backUser:realname}).then(res=>{
          console.log(res);
          this.ids=[]
          this.$success(res.data.message)
          this.initData()
        }).catch(err=>{
          console.log(err);})
      },
      initData(){
        // 分页查询
        this.searchParame = getSession('param')
        if (this.searchParame === 'undefined' || this.searchParame === undefined) {
          this.searchParame = { pageNum: 1, pageSize: 10,state:2 }
        }
        this.$req.post('fuzzySearchCommission', this.searchParame).then(res => {
          this.listData = res.data.data.tixianjilus
          this.totalNum =res.data.data.totalNum
        }).catch(err => {
          console.log(err);
        })
        // this.$req.get('getAllCommission',{pageNum:this.pageNo,pageSize:this.pageSize}).then(res=>{
        //   this.listData=res.data.data.commissions
        //   this.totalNum=res.data.data.totalNum
        // }).catch(err=>{
        //   console.log(err);})
      },
      // 多选
      SelectionChange(arr){
        this.ids=  arr.map(item=>item.id)
      },
      // 审核接口
      AuditApiFn() {
        if (this.ids.length == 0) {
          return
        }
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('auditcompletion', { ids: this.ids, backUser: realname }).then(res => {
            console.log(res)
            this.ids = []
            this.$success(res.data.message)
            this.initData()
          }
        ).catch(err => {
          console.log(err)
        })
      },
      // 审核
      handleAudit(index, row) {
        this.ids.push(row.id)
        this.AuditApiFn()
      },
      // 批量审核
      BatchAudit() {
        this.AuditApiFn()
      },
      // startDateFn(val) {
      // this.startDay = val
      // },
      // endDateFn(val) {
      //   this.endDay = val
      // }
    },
    watch:{
      state(val){
      if(val !== 2){
        this.examineDisabled = true
      }else{
        this.examineDisabled = false
      }
      }
    },
    created() {
      this.initData()
    },
    // 离开列表页
    beforeRouteLeave: function(to, from, next) {
      if (to.name != 'memberDetais') {
        clearOneSession('param')
        clearOneSession('currentPage')
      }
      next()
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
.input-box{
  display: flex;
  justify-content: center;
  align-items: center;
  .text{
    display: inline-block;
    width: 80px;
  }
}
  .btn-box{
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
