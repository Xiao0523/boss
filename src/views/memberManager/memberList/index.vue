<template>
    <div>
      <searchBar
        :from="'memberList'"
        :param="searchParame"
        @searchFn="searchFn"
        @updateListFn="updateListFn"
        @delsFn="delsFn"
      ></searchBar>
      <el-table class="table-box"
                :data="listData"
                empty-text="暂无数据"
                max-height="700"
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
          prop="nickname"
          label="会员昵称"
          min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="shareNum"
          label="总分享数"
        >
        </el-table-column>
        <el-table-column
          prop="totalsharemoney"
          label="纷享币"
        >
        </el-table-column>

        <el-table-column
          prop="apprenticeNum"
          label="一级邀请好友数量"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="apprenticeSecondNum"
          label="二级邀请好友数量"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="memberLabel"
          label="感兴趣类目"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="注册日期"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="openid"
          label="最近登录时间"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          label="活跃状态"
          prop="status"
        >
          <template slot-scope="scope">
            <span>{{scope.row.status| statusFlagStatus}}</span>
          </template>
        </el-table-column>


        <el-table-column
          label="del状态"
          prop="delFlag"
        >
          <template slot-scope="scope">
            <span>{{scope.row.delFlag | delFlagStatus}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <div class="operation-box">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">查看/编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <!--回顶-->
      <goTop></goTop>
      <Dialog
        :isShow="visible"
        @cancelFn="visible = false"
        @confirmFn="confirmFn"
      >
        <span slot="del">禁用操作不可恢复，确认禁用？</span>
      </Dialog>
    </div>
</template>

<script>
  import searchBar from '@/components/common/SearchBar'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import goTop from '@/components/common/goTop'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "memberList",
    components: {
      searchBar,
      Dialog,
      pageNum,
      goTop
    },
    computed: {},
    data() {
      return {
        searchParame:{},
        isActive:1,
        pageSize:10,
        listData:[],
        totalNum:0,
        visible:false,
        ids:[],
        tabHeader: {
          "background-color": "#F4F4F4",
          'color': "#666666",
          'border-top': "1px solid #BBBBBB",
          'border-bottom': "1px solid #BBBBBB",
          "font-size": "16px",
          "text-align": "center"
        },
      }
    },
    filters:{
      delFlagStatus(val){
        if(val == 0){
          return '未删除'
        }
        if(val == 1){
          return '已删除'
        }
        if(val == 2){
          return '已禁用'
        }
      },
      statusFlagStatus(val){
        if(val == 1){
          return '活跃'
        }
        if(val == 2){
          return '非活跃/刷单'
        }
      }
      },
    methods: {
      updateListFn(){
        this.ids=[]
        this.initData()
      },
      // 确认删除
      confirmFn(){
        this.visible = false
        let url ='batchForbid'
        let idArr= this.ids
        this.$store.dispatch('delFn', {url, idArr})
      },
      // 批量删除
      delsFn() {
        if(this.ids.length){
          this.visible = true
        }
      },
      searchFn(param){
        this.searchParame = param
        console.log('父组件接受的参数',this.searchParame);
        this.initData();
      },
      // 多选
      SelectionChange(arr){
        this.ids=  arr.map(item=>item.id)
        console.log(this.ids);
      },
      // 查看编辑
      handleEdit(index,row){
        this.$router.push({
          path:'/memberManager/memberDetais',
          query:{
            id:row.id,
          }
        })
      },
      // 删除
      handleDelete(index, row) {
        this.visible = true
        let arr=[]
        arr.push(row.id)
        this.ids = arr
      },
      // 翻页
      // pageSize(每页条数) 改变时会触发
      sizeChangeFn(size) {
        this.searchParame.pageSize= size;
        let param =getSession('param');
        if(param==='undefined' || param===undefined){
          param ={}
          param.isActive=1; // 默认活跃用户
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;

        setSession('param',param)
        this.initData()
      },
      // currentPage(	当前页) 改变时会触发
      currentChangeFn(page) {
        console.log(this.searchParame)
        this.searchParame.pageNum = page
        let param = getSession('param')
        if (param === 'undefined' || param === undefined) {
          param = {}
          param.isActive=1; // 默认活跃用户
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;

        setSession('param', param)
        this.initData()
      },
      initData() {
        // 分页查询
        this.searchParame = getSession('param')
        if (this.searchParame === 'undefined' || this.searchParame === undefined) {
          this.searchParame = { pageNum: 1, pageSize: 10,isActive:1 } // 默认活跃用户

        }
        this.$req.post('fuzzyBackMember', this.searchParame).then(res => {
          console.log(res.data)
          this.listData = res.data.data.members
          this.totalNum = res.data.data.totalNum

        }).catch(err => {
          console.log(err)
        })
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

<style lang="scss" scoped>
.table-box{
  margin-top: 20px;
}
</style>
