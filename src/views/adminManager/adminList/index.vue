<template>
  <div>
    <searchBar
      :from="'adminList'"
      :param="searchParame"
      @searchFn="searchFn"
      @updateListFn="updateListFn"
      @delsFn="delsFn"
      @addAdmin="isAddAdmin = true"
    ></searchBar>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button  type="warning" @click="setRolesFn">批量设置角色</el-button>
    </el-row>
    <el-table class="table-box"
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
        prop="realname"
        label="真实姓名"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="最后更新时间"
        min-width="120"
        sortable
      >
      </el-table-column>
    <!--  <el-table-column
        label="状态"
        width="200"
      >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-value="1"
              inactive-value="0"
              active-text="启用"
              inactive-text="禁止"
              @change="changeFn($event,scope.$index,scope.row)"
            >
            </el-switch>
          </template>
      </el-table-column>-->

      <el-table-column label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <div class="operation-box">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看/编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleRelevance(scope.$index, scope.row)">设置角色</el-button>
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
    <!--添加管理员的弹窗-->
    <addAdminDialog
      :dialogFormVisible='isAddAdmin'
      @cancelFn="isAddAdmin = false"
      @addAdminFn="addAdminFn"
    ></addAdminDialog>
    <editAdminDialog
      :dialogFormVisible='isEditAdmin'
      :adminDetails="adminDetails"
      @cancelFn="isEditAdmin = false"
      @editSuccessFn="editSuccessFn"
    >
    </editAdminDialog>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import searchBar from '@/components/common/SearchBar'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import addAdminDialog from'./addAdmin'
  import editAdminDialog from'./editAdmin'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "adminList",
    components: {
      searchBar,
      Dialog,
      pageNum,
      addAdminDialog,
      editAdminDialog
    },
    computed: {
      ...mapGetters([
        'roleIds',
        'adminIds'
      ])
    },
    data() {
      return {
        searchParame:{},
        pageNo:1,
        pageSize:10,
        listData:[],
        totalNum:0,
        visible:false,
        isAddAdmin:false,
        isEditAdmin:false,
        adminDetails:{}, // 管理员的xiangqing
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
    methods: {
      ...mapMutations([
        'set_adminIds']),
      // 批量关联角色
      setRolesFn() {
        if(!this.ids.length){
          return this.$wran('请先勾选管理员')
        }
        this.$router.push('/permissionsManager/permissionsList')
      },
      // 重置
      updateListFn(){
        this.ids=[]
        this.initData()
      },
      // 添加管理员确定
      addAdminFn(form) {
        this.$req.post('addBackUser',form).then(res=>{
          console.log(res.data.code);
          console.log(res.data.message);
          this.$success(res.data.message)
          this.isAddAdmin = false
          this.initData()
        }).catch(err=>{
          console.log(err);})
      },
      // 编辑管理员确定
      editSuccessFn(){
        this.isEditAdmin = false
        this.initData()
      },
      // switch
      changeFn($event,index,row){
        let realname = JSON.parse(this.userInfo).realname
        let data={
          id:row.id,
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
      // 确认删除
      confirmFn(){
        this.visible = false
        let url ='deleteBackUser'
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
      SelectionChange(arr) {
        this.ids = arr.map(item => item.bossUserId)
        this.set_adminIds(this.ids)
        console.log(this.ids)
      },
      // 查看编辑
      handleEdit(index,row){
       this.isEditAdmin=true
        this.getAdminDetails(row.id)
      },
      // 详情数据
      getAdminDetails(id){
        this.$req.get('backUserDetail',{id:id}).then(res=>{
          console.log(res.data.data[0]);
          this.adminDetails = res.data.data[0]
        }).catch(err=>{
          console.log(err);})

      },
      // 删除
      handleDelete(index, row) {
        this.visible = true
        let arr=[]
        arr.push(row.id)
        this.ids = arr
      },
      // 设置角色
      handleRelevance(index, row){
        let arr=[]
        arr.push(row.bossUserId)
        this.ids = arr
        this.set_adminIds(this.ids)
        // 获取用户的角色
        this.$router.push({
          path:'/permissionsManager/permissionsList',
          query:{userId:row.bossUserId}
        })
      },
      initData(){
        // 分页查询
        this.searchParame = getSession('param') || {}
        this.searchParame.pageNum = getSession('currentPage') || 1
        this.searchParame.pageSize = getSession('currentSize') || 10
        this.$req.get('fuzzySearchBackUser',this.searchParame).then(res=>{
          console.log(res.data)
          this.listData = res.data.data.backUsers
          this.totalNum = res.data.data.totalNum
        }).catch(err=>{
          console.log(err);})
      },
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
      }
    },

    created() {
      this.initData()

    },
    // 离开列表页
    beforeRouteLeave: function(to, from, next) {
      // console.log('详情页to', to);
      // console.log(this.query.searchParame);
      clearOneSession('param')
      clearOneSession('currentPage')
      next()
    }

  }
</script>

<style lang="scss" scoped>
.table-box{
  margin-top: 20px;
}
</style>
