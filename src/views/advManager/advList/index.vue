<template>
  <div>
    <advNav
      :from=" 'advList'"
      :param="searchParame"
      :ids="ids"
      @searchFn="searchFn"
     @updateListFn="updateListFn"
    ></advNav>
    <!--<el-button type="warning" plain @click="backAddArtFn">返回文章添加页</el-button>-->
<!--    <el-row :gutter="20">
        <el-button type="primary" @click="addFn">添加广告</el-button>
        &lt;!&ndash;<el-button type="danger" @click="delsFn">批量删除</el-button>&ndash;&gt;
    </el-row>-->
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
        prop="coin"
        label="分享币"
      >
      </el-table-column>
      <el-table-column
        label="类型"
      >
        <template slot-scope="scope">
          <p>{{scope.row.type | typeStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建人"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <p>{{scope.row.createTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="tags"
        label="关联标签"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="link"
        label="图片/视频链接地址"
        min-width="160"
      >
      </el-table-column>

      <el-table-column
        prop="targetLink"
        label="图片跳转链接地址"
        min-width="160"
      >
      </el-table-column>
      <el-table-column
        label="广告布局方式"
        min-width="120"
      >
        <template slot-scope="scope">
          <p>{{scope.row.layoutType | layoutTypeStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <p>{{scope.row.updateTime | formatDate}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="列表显示"
        width="160"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            :active-value=1
            :inactive-value=0
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
      <pageNum :currentPage="searchParame.pageNum"
               :pageSize="searchParame.pageSize"
               :total="totalNum"
               @sizeChange="sizeChangeFn"
               @currentChange="currentChangeFn"
      ></pageNum>
    </div>
    <!--回到顶部-->
    <goTop></goTop>
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
  import advNav from '@/components/advNav'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import goTop from '@/components/common/goTop'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "AppList",
    components: {
      advNav,
      Dialog,
      pageNum,
      goTop
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    data() {
      return {
        searchParame:{},
        listData:[],
        tableIdArr:[],
        getRowKeys(row) {
          return row.id;
        },
        ids:[],
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
      }
    },
    filters:{
      typeStatus(val){
        return val == 0 ? '图片':val == 1 ? '视频' : '未知'
      },
      layoutTypeStatus(val){
        switch(val)
        {
          case 0:
         return '位于详情下部'
          case 1:
            return '位于详情上部'
          case 2:
            return '浮于详情上部'
        }
      }
    },
    methods: {
      backAddArtFn(){
        this.$router.back()
      },
 /*     setSelectRow() {
        if (this.tableIdArr.length) {//这里我先判断从后台查的与会人员id的集合有没有 不然下面length属性会报错。
          for (let j = 0; j < this.tableIdArr.length; j++) {//这里我用到了双重for循环 this.pageUser这是所有人员信息
            for (let i = 0; i < this.ids.length; i++) {
              if (this.tableIdArr[j] == this.ids[i]) {
                if (this.$refs.multipleTable != undefined) {//解决下面用bkUserTable不报错 bkUserTable我是在table ref定义的
                  this.$refs.multipleTable.toggleRowSelection(this.listData[j], true)//这个就是回显的核心
                }
              }
            }
          }
        }
      },*/
      updateListFn() {
        this.ids = []
        this.$refs.multipleTable.clearSelection()
        this.initData()
      },
      // 搜索
      searchFn(parame) {
        this.searchParame = parame
        console.log('父组件接受的参数',this.searchParame);
        this.initData();
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
        this.initData()
      },
      // 确认删除
      confirmFn(){
        this.visible = false
        let url ='v2/shareAdv/del'
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
       console.log('选中的id',this.ids);

      },
      // switch
      changeFn($event,index,row){
        let realname = JSON.parse(this.userInfo).realname
        let ids=[]
        ids.push(row.id)
        let data={
          ids:ids,
          state:$event,
        }
        // console.log(data)
        this.$req.post('v2/shareAdv/PutAwayAdv',data).then(res=>{
          this.$success(res.data.message)
//          console.log(res)
        }).catch(err=>
          console.log(err)
        )
      },
      // 文章列表的switch事件
 /*     changeFn($event, index, row) {
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('updateremind', {
          id: row.id, shifoutixing: $event, updateBy: realname
        }).then(res => {
          this.$success(res.data.message)
          this.initData()
        }).catch(err => {
          console.log(err);
        })
      },*/
      // 查看编辑
      handleEdit(index, row) {
//        console.log(index, row);
        this.$router.push({
          path: '/advManager/advDetails',
          query: {
            id: row.id,
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
        if (this.searchParame === 'undefined' || this.searchParame === undefined) {
          this.searchParame = { pageNum: 1, pageSize: 10 }
        }
        this.$req.post('v2/shareAdv/fuzzySearchAdvertise',this.searchParame).then(res=> {
          this.totalNum = res.data.data.total
          this.listData = res.data.data.records
          this.tableIdArr = this.listData.map(item => item.id)
        /*  setTimeout(() => {
            this.setSelectRow();
          }, 500)*/
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.initData()
    },
    // 离开列表页
    beforeRouteLeave: function(to, from, next) {
      // console.log(to)
      if (to.name != 'advDetails') {
        clearOneSession('param')
        clearOneSession('currentPage')
      }
      next()
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


