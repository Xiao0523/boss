<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
     <!--   <el-button type="primary" @click="addFn">添加操作</el-button>-->
        <el-button type="warning" @click="reSetFn">重置</el-button>
        <!--<el-button type="danger" @click="delsFn">批量删除</el-button>-->
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end"  v-if="isShowRevOperaBtn">
      <el-button type="warning"  @click="revOperaFn">关联操作</el-button>
      <el-button type="info"  @click="backFn">返回</el-button>
    </el-row>
    <el-table class="table-box"
              :data="listData"
              empty-text="暂无数据"
              style="width: 100%"
              max-height="700"
              ref="multipleTable"
              :row-key="getRowKeys"
              border
              :header-cell-style="tabHeader"
              @selection-change="SelectionChange"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column
        prop="opName"
        label="操作名称"
      >
      </el-table-column>
      <el-table-column
        prop="opValue"
        label="操作属性"
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

      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <div class="operation-box">
      <!--      <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">更新</el-button>-->
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
    <!--添加操作-->
    <addOperation
      :dialogFormVisible="addRoleDialogVisible"
      :form="form"
      :type="type"
      @addOperationFn="addOperationFn"
      @cancelFn="addRoleDialogVisible=false"
    ></addOperation>
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
  import { mapGetters,mapMutations } from 'vuex'
  import searchNav from '@/components/common/searchNav'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import addOperation from './addOperation'
  export default {
    name: "permissionsList",
    components: {
      searchNav,
      Dialog,
      pageNum,
      addOperation
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
      ...mapGetters([
        'roleIds',
        'operaIds',
      ])
    },
    data() {
      return {
        isShowRevOperaBtn:false,
        addRoleDialogVisible:false,
        form:{}, // 弹框common数据
        type:'',// 区分添加和更新
        listData:[],
        tableIdArr:[],
        OperationIdsByRolo:[],// 角色的所有操作
        ids:[],
        getRowKeys(row) {
          return row.id;
        },
        delId:Number,
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
    filters:{},
    methods: {
      ...mapMutations([
        'set_operaIds'
      ]),
      // 编辑时的回显
      setSelectRow() {
          if (this.tableIdArr !== null) {
            for (let j = 0; j < this.tableIdArr.length; j++) {
              for (let i = 0; i < this.OperationIdsByRolo.length; i++) {
                if (this.tableIdArr[j] == this.OperationIdsByRolo[i]) {
                  if (this.$refs.multipleTable != undefined) {
                    this.$refs.multipleTable.toggleRowSelection(this.listData[j], true)//这个就是回显的核心
                  }
                }
              }
            }
          }
      },
      revOperaFn() {
        if (this.roleIds.length && this.ids.length) {
          this.$req.post('v2.1/auth/role4Operation', {
            roleIds: this.roleIds,
            operationIds: this.ids
          }).then(res => {
            this.$success(res.data.message)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      backFn(){
        this.$router.go(-1)
      },
      reSetFn(){
        this.$refs.multipleTable.clearSelection();
        // this.initData()
      },
      // 添加
      addFn(){
        this.type='add'
        this.addRoleDialogVisible = true
      },
      // 确认添加
      addOperationFn(form) {
        let url = ''
        let param = {
          opName: form.opName,
          opValue: form.opValue
        }
        if (this.type == 'add') {
          url = 'v2.1/auth/operation'
          this.$req.post(url, param).then(res => {
            this.$success(res.data.message)
            this.addRoleDialogVisible = false
            this.form={}
            this.initData()
          }).catch(err => {
            console.log(err)
          })
        } else {
          url = 'v2.1/auth/operation'
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
      // 确认删除
      confirmFn() {
        this.visible = false
        this.$req.del(`v2.1/auth/operation/${this.delId}`).then(res => {
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
      SelectionChange(arr) {
//        console.log(arr);
        this.ids = arr.map(item => item.id)
//        console.log(this.ids);
        this.set_operaIds(this.ids)
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
        this.$req.get(`v2.1/auth/operation`).then(res=> {
          // console.log(res.data)
          this.listData = res.data.data
          this.tableIdArr = this.listData.map(item => item.id)
          setTimeout(() => {
            this.setSelectRow();
          }, 500)
        }).catch(err => {
          console.log(err);
        })
      },
      getOperationIdsByRoleIdFn() {
        this.$req.get(`v2.1/auth/getOperationIdsByRoleId/${this.query.roleId}`).then(res=>{
          this.OperationIdsByRolo=res.data.data
          console.log('操作',res.data.data)}
        ).catch(err=>{
          console.log(err)})
      }
    },
    created() {},
    mounted(){
      this.initData()
      this.query = this.$route.query
      if (this.query.roleId) {
        this.getOperationIdsByRoleIdFn()
      }

    },
    beforeRouteEnter: function(to, from, next) {
      next(vm => {
        if (from.path == '/permissionsManager/permissionsList') {
          vm.isShowRevOperaBtn= true
        }
      })
    },

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
