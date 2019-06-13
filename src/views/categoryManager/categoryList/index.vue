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
      <el-col :span="6">
        <!--<el-button type="success" @click="searchFn">搜索</el-button>-->
        <el-button type="primary" @click="addFn">添加标签</el-button>
        <el-button type="warning" @click="reSetFn">重置</el-button>
        <!--<el-button type="danger" @click="delsFn">批量删除</el-button>-->
      </el-col>
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
        prop="cname"
        label="标签"
      >
      </el-table-column>
      <el-table-column
        label="类型"
      >
        <template slot-scope="scope">
         <p>{{scope.row.ctype | typeStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人"
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
      <el-table-column
        prop="index"
        label="索引"
      >
      </el-table-column>
      <el-table-column
        label="更新时间"
        sortable
      >
        <template slot-scope="scope">
          <p>{{scope.row.updateTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <p>{{scope.row.status | statusFilter}}</p>
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
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  import { mapGetters,mapMutations } from 'vuex'
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
        listData:[],
        tableIdArr:[],
        ids:[],
        getRowKeys(row) {
          return row.id;
        },
        startDate:'',
        endDate:'',
        totalNum:null,
        searchParame:{},
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
        'set_tagIds'
      ]),
      // 添加标签
      addFn(){
        this.$router.push('/categoryManager/categoryAdd')
      },
      reSetFn(){
        this.$refs.multipleTable.clearSelection()
      },
      // 翻页
      // pageSize(每页条数) 改变时会触发
      sizeChangeFn(size) {
        this.searchParame.pageSize= size;
        let param =getSession('param');
        if(param==='undefined' || param===undefined){
          param ={}
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;
        setSession('param',param)
        console.log('每页条数改变时触发：'+this.searchParame.pageSize);
        // this.pageSize= size;
        this.initData()
      },
      // currentPage(	当前页) 改变时会触发
      currentChangeFn(page) {
        console.log(this.searchParame)
        this.searchParame.pageNum = page
        let param = getSession('param')
        if (param === 'undefined' || param === undefined) {
          param = {}
        }
        param.pageSize=this.searchParame.pageSize;
        param.pageNum=this.searchParame.pageNum;
        setSession('param', param)
        console.log('页码改变触发' + this.searchParame.pageNo)
        // this.pageNo=page;
        this.initData()
      },
      // 搜索
      searchFn(res) {
        this.appList = res.data.data
      },
      // 确认删除
      confirmFn(){
        this.visible = false
        let url ='v2/shareCategory/del'
        let idArr= this.ids
        this.$store.dispatch('v2DelFn', {url, idArr})
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
//        console.log(index, row);
        this.$router.push({
          path:'/categoryManager/categoryDetails',
          query:{
            id:row.id
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
      initData() {
        // 分页查询
        this.searchParame = getSession('param')
        console.log('列表页搜索参数', this.searchParame)
        if (this.searchParame === 'undefined' || this.searchParame === undefined) {
          this.searchParame = { pageNum: 1, pageSize: 10 }
        }
        // 类目的翻页记录
        this.$req.get(`v2/shareCategory/${this.searchParame.pageNum}/${this.searchParame.pageSize}`).then(res=> {
          this.totalNum = res.data.data.total
          this.listData = res.data.data.records
          this.tableIdArr = this.listData.map(item => item.id)
          // console.log(this.listData);
        }).catch(err => {
          console.log(err);
        })
      }
    },
    // 离开列表页,去其他侧边栏
    beforeRouteLeave: function(to, from, next) {
      if (to.name != 'categoryEdit') {
        clearOneSession('param')
        clearOneSession('currentPage')
      }
      next()
    },
    created() {

/*      this.ids=this.tagIds
      console.log('关联的',this.ids)*/
    },
    mounted(){
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

