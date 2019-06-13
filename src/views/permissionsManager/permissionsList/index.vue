<template>
  <div>
    <el-row :gutter="20">

      <!--   <el-col :span="5">
           <div class="input-box">
             <span>手机号</span>
             <el-input class="input"
                       placeholder="请输入手机号"
                       clearable>
             </el-input>
           </div>
         </el-col>

         <el-col :span="9">
           <div class="date-box">
             <span>日期</span>
             <el-date-picker
               v-model="startDate"
               type="datetime"
               placeholder="开始日期"
               value-format="yyyy-MM-dd hh:mm:ss"
             >
             </el-date-picker>
             <el-date-picker
               v-model="endDate"
               type="datetime"
               placeholder="结束日期"
               value-format="yyyy-MM-dd hh:mm:ss"
             >
             </el-date-picker>
           </div>
         </el-col>-->
      <el-col :span="20">
        <!--<el-button type="success" @click="searchFn">搜索</el-button>-->
        <el-button type="primary" @click="addFn">添加角色</el-button>
        <el-button type="warning" @click="reSetFn">重置</el-button>
        <!--<el-button type="danger" @click="delsFn">批量删除</el-button>-->
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end">
      <el-button type="warning" @click="setOperaFn">批量设置操作</el-button>
      <el-button type="warning" v-if="isShowRevRolesBtn"  @click="revRolesFn">关联角色</el-button>
      <el-button type="info"  v-if="isShowRevRolesBtn" @click="backFn">返回</el-button>
    </el-row>
    <el-table class="table-box"
              :data="listData"
              empty-text="暂无数据"
              style="width: 100%"
              border
              max-height="700"
              ref="multipleTable"
              :row-key="getRowKeys"
              :header-cell-style="tabHeader"
              @selection-change="SelectionChange"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
      >
      </el-table-column>
      <el-table-column
        prop="roleKey"
        label="角色key"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        sortable
      >
        <template slot-scope="scope">
          <p>{{scope.row.createTime | formatDate}}</p>
        </template>
      </el-table-column>
      <!--  <el-table-column
          label="列表显示isshow"
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
        </el-table-column>-->
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <div class="operation-box">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">更新</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleOpera(scope.$index, scope.row)">设置操作</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleMenu(scope.$index, scope.row)">菜单权限</el-button>
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
    <!--添加角色-->
    <addRole
      :dialogFormVisible="addRoleDialogVisible"
      :form="form"
      :type="type"
      @addRoleFn="addRoleFn"
      @cancelFn="addRoleDialogVisible=false"
    ></addRole>
    <Dialog
      :isShow="visible"
      @cancelFn="visible = false"
      @confirmFn="confirmFn"
    >
      <span slot="del">删除操作不可恢复，确认删除？</span>
    </Dialog>
    <!-- 菜单权限 -->
    <editMenuDialog :dialogMenuVisible='isEditMenu' :roleId='roleId' @cancelMenuFn="cancelMenuFn" @confirmMenuFn="confirmMenuFn"></editMenuDialog>
  </div>
</template>

<script>
  import searchNav from '@/components/common/searchNav'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import addRole from './addRole'
   import editMenuDialog from './editMenu'
  import { mapGetters,mapMutations } from 'vuex'
  export default {
    name: "permissionsList",
    components: {
      searchNav,
      Dialog,
      pageNum,
      addRole,
      editMenuDialog
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
      ...mapGetters([
        'roleIds',
        'adminIds'
      ])
    },
    data() {
      return {
        query:{},
        isShowRevRolesBtn:false,
        addRoleDialogVisible:false,
        // 获取row的key值
        getRowKeys(row) {
          return row.id;
        },
        form:{}, // 弹框common数据
        type:'',// 区分添加和更新
        listData:[],
        tableIdArr:[],
        ids:[],
        userByRoles:[],
        delId:Number,
        startDate:'',
        endDate:'',
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
        roleId:null,
        isEditMenu:false
      }
    },
    filters:{
      typeStatus(val){
        return val == 0 ? '文章':val == 1 ? 'APP' : '未知'
      },
      statusFilter(val){
        return val == 0 ? '未启用':val == 1 ? '启用' : '未知'
      }
    },
    methods: {
      ...mapMutations([
        'set_roleIds'
      ]),
      setSelectRow() {
        if (this.tableIdArr.length) {
          for (let j = 0; j < this.tableIdArr.length; j++) {
            for (let i = 0; i < this.userByRoles.length; i++) {
              if (this.tableIdArr[j] == this.userByRoles[i]) {
                if (this.$refs.multipleTable != undefined) {
                  this.$refs.multipleTable.toggleRowSelection(this.listData[j], true) //回显的核心
                }
              }
            }
          }
        }
      },
      // 批量设置操作
      setOperaFn(){
        if(!this.ids.length){
          return this.$wran('请先勾选角色')
        }
        this.$router.push({
          path:'/operationManager/operationList',
        })
      },
      // 重置
      reSetFn(){
        this.$refs.multipleTable.clearSelection();
        // this.initData()
        // this.set_roleIds([])
      },
      backFn(){
        this.$router.go(-1)
      },
      // 管理员设置角色
      revRolesFn(){
        if(!this.roleIds.length){
          return this.$wran('请先勾选角色')
        }
        this.$req.post('v2.1/auth/user4role', {
          roleIds: this.roleIds,
          userIds: this.adminIds
        }).then(res => {
          this.$success(res.data.message)
        }).catch(err => {
          console.log(err)
        })
      },
      // 设置操作
      handleOpera(index, row) {
        let arr = []
        arr.push(row.id)
        this.ids = arr
        this.set_roleIds(this.ids)
        if(!this.ids.length){
          return this.$wran('请先勾选角色')
        }
        this.$router.push({
          path:'/operationManager/operationList',
          query:{
            roleId:row.id
          }
        })
      },
      // 添加角色
      addFn(){
        this.type='add'
        this.addRoleDialogVisible = true
      },
      // 确认添加
      addRoleFn(form) {
        let url = ''
        let param = {
          roleKey: form.roleKey,
          roleName: form.roleName
        }
        if (this.type == 'add') {
          url = 'v2.1/auth/role'
          this.$req.post(url, param).then(res => {
            this.$success(res.data.message)
            this.addRoleDialogVisible = false
            this.form={}
            this.initData()
          }).catch(err => {
            console.log(err)
          })
        } else {
          url = 'v2.1/auth/role'
          param.id = form.id
          this.$req.patch(url, param).then(res => {
            this.$success(res.data.message)
            this.addRoleDialogVisible = false
            this.initData()
          }).catch(err => {
            console.log(err)
          })

        }
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
      },
      // 搜索
      searchFn(res) {
        this.appList = res.data.data
      },
      // 确认删除
      confirmFn() {
        this.visible = false
        this.$req.del(`/v2.1/auth/role/${this.delId}`).then(res => {
          this.$success(res.data.message)
          this.initData()
        }).catch(err => {
          console.log(err)
        })
      },
      // 批量删除
//      delsFn() {
//        if(this.ids.length){
//          this.visible = true
//        }
//
//      },
      // 多选
      SelectionChange(arr){
//        console.log(arr);
        this.ids=  arr.map(item=>item.id)
        this.set_roleIds(this.ids)

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
      // 查看编辑
      handleEdit(index,row){
       console.log(index, row);
        this.addRoleDialogVisible = true
        this.type='edit'
        this.form=row
      },
      // 删除
      handleDelete(index, row) {
        this.visible = true
        let arr=[]
        arr.push(row.id)
        this.ids = arr
        this.delId=row.id
      },
      initData() {
        this.$req.get(`v2.1/auth/role`).then(res => {
          console.log(res.data)
          this.listData = res.data.data
          this.tableIdArr = this.listData.map(item => item.id)
          setTimeout(() => {
            this.setSelectRow();
          }, 500)
        }).catch(err => {
          console.log(err)
        })
      },
      getRoleIdsByUserIdFn(){
        this.$req.get(`v2.1/auth/getRoleIdsByUserId/${this.query.userId}`).then(res=>{
          this.userByRoles=res.data.data
          console.log('用户角色',res.data.data)}
          ).catch(err=>{
          console.log(err)})
      },
      handleMenu(index, row){
        this.isEditMenu=true;
        this.roleId=row.id;
      },
      cancelMenuFn(){
        this.isEditMenu=false;
      },
      confirmMenuFn(menuIds){
        this.isEditMenu=false;
        this.$req.post(`v2.1/auth/menus`,{
          'menuIds':menuIds,
          'roleId':this.roleId
        }).then(res=>{
          if(res.data.code==0){
            this.$success('提交成功');
          }else{
            this.$message.error('提交失败');
          }
        })
      },
    },
    beforeRouteEnter: function(to, from, next) {
      next(vm => {
        if (from.path == '/adminManager/adminList') {
          vm.isShowRevRolesBtn = true
        }
      })
    },
    watch: {
    },
    created() {
      this.initData()
      this.query=this.$route.query
      if( this.query.userId){
        this.getRoleIdsByUserIdFn()
      }
      // this.set_roleIds([])
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

