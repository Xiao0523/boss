<template>
<div>
  <searchNav
    :from="'AppList'"
    @searchFn="searchFn"
    @delsFn="delsFn"
  ></searchNav>
  <el-table class="table-box"
    :data="appList"
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
      prop="apptype"
      label="分类"
    >
    </el-table-column>
    <el-table-column
      prop="appname"
      label="应用名"
      >
    </el-table-column>
    <el-table-column
      prop="apptype"
      label="应用标签"
      >
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
    >
    </el-table-column>
    <el-table-column
      prop="state"
      label="是否置顶"
    >
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
    >
    </el-table-column>
    <el-table-column
      prop="appshengyu"
      label="剩余件数"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="money"
      label="提成金额"
      sortable
    >
    </el-table-column>
    <el-table-column
      label="列表显示"
      width="200"
    >
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.isshow"
          active-value="1"
          inactive-value="0"
          active-text="显示"
          inactive-text="禁止"
          @change="changeFn($event,scope.$index,scope.row)"
        >
        </el-switch>
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
    <pageNum :currentPage="pageNo"
             :pageSize="pageSize"
             :total="totalNum"
             @sizeChange="sizeChangeFn"
             @currentChange="currentChangeFn"
    ></pageNum>
  </div>
  <Dialog
    :isShow="visible"
    @cancelFn="visible = false"
    @confirmFn="confirmFn"
  >
    <span slot="del">删除操作不可恢复，确认删除？</span>
  </Dialog>
</div>
</template>

<script>
  import searchNav from '@/components/common/searchNav'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  export default {
    name: "AppList",
    components: {
      searchNav,
      Dialog,
      pageNum
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    data() {
      return {
        appList:[],
        ids:[],
        totalNum:null,
        pageNo:1,
        pageSize:10,
        visible:false,
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
    methods: {
      // 翻页
      // pageSize(每页条数) 改变时会触发
      sizeChangeFn(size) {
        this.pageSize= size;
        this.initData()
      },
      // currentPage(	当前页) 改变时会触发
      currentChangeFn(page) {
        this.pageNo=page;
        this.initData()
      },
      // 搜索
      searchFn(res) {
        this.appList = res.data.data
      },
      // 确认删除
      confirmFn(){
        this.visible = false
        let url ='deleteApp'
        let idArr= this.ids
        this.$store.dispatch('delFn', {url, idArr})
        this.initData()
      },
      // 批量删除
      delsFn() {
        if(this.ids.length){
          this.visible = true
        }

      },
      // 多选
      SelectionChange(arr){
//        console.log(arr);
      this.ids=  arr.map(item=>item.appId)
//        console.log(this.ids);

      },
      // switch
      changeFn($event,index,row){
        let realname = JSON.parse(this.userInfo).realname
        let data={
          id:row.appId,
          isShow:$event,
          updateBy:realname
        }

        this.$req.post('updateAppRemind',data).then(res=>{
          this.$success('修改成功')
//          console.log(res)
        }).catch(err=>
          console.log(err)
        )
      },
      // 查看编辑
      handleEdit(index,row){
//        console.log(index, row);
        this.$router.push({
          path:'/AppManager/AppEdit',
          query:{
            id:row.appId
          }
        })
      },
      // 删除
      handleDelete(index, row) {
        this.visible = true
        let arr=[]
        arr.push(row.appId)
        this.ids = arr
      },
      initData(){
        this.$req.get('backappsimple',{pageNum:this.pageNo,pageSize:this.pageSize}).then(res=>{
          this.appList=res.data.data.records
          this.totalNum=res.data.data.total
          console.log(this.totalNum);
        }).catch(err=>{
          console.log(err);})
      }
    },
    created() {
      this.initData()
    }

  }
</script>

<style lang="scss" scoped>
  .operation-box {
    display: flex;
    flex-direction: row;
  }

  .table-box {
    margin-top: 20px;
  }
</style>
