<template>
  <div>
<!--    <searchNav
      :from=" 'ArticleList' "
      :ids="ids"
      @searchFn="searchFn"
      @delsFn="delsFn"
      @relevanceFn="relevanceFn"
    ></searchNav>-->

    <ArticleNav
      :from=" 'ArticleList' "
      :param="searchParame"
      :ids="ids"
      @searchFn="searchFn"
      @delsFn="delsFn"
      @updateListFn="updateListFn"
    ></ArticleNav>
    <el-table class="table-box"
              :data="tableList"
              empty-text="暂无数据"
              style="width: 100%"
              ref="multipleTable"
              :row-key="getRowKeys"
              border
              :header-cell-style="tabHeader"
              @selection-change="SelectionChange"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        fixed
       >
      </el-table-column>
      <el-table-column
        label="标签"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="广告"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.advTitles }}</span>
        </template>
      </el-table-column>
   <!--   <el-table-column
        label="标签"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        prop="title"
        label="文章标题"
      >
      </el-table-column>
      <el-table-column
        prop="id"
        label="文章id"
      >
      </el-table-column>
      <el-table-column
        prop="articleUrl"
        label="文章链接"
      >
      </el-table-column>
      <el-table-column
        prop="layout"
        label="布局方式"
      >
        <template slot-scope="scope">
          <span >{{ scope.row.layout | layoutStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="topTime"
        label="置顶时间"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="更新时间"
      >
      </el-table-column>
      <el-table-column
        prop="money"
        label="提成金额"
      >
      </el-table-column>
    <!--  <el-table-column
        prop="source"
        label="来源"
      >
      </el-table-column>-->
      <el-table-column
        label="列表显示"
        width="160"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.shifoutixing"
            active-value="1"
            inactive-value="0"
            active-text="显示"
            inactive-text="禁止"
            @change="changeFn($event,scope.$index,scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
     <!-- <el-table-column
        label="投放广告"
        width="160"
      >
        <template slot-scope="scope">
          <el-switch v-if="scope.row.fenlei == '城市合伙人' "
            v-model="scope.row.remind"
            active-value="1"
            inactive-value="0"
            active-text="显示"
            inactive-text="禁止"
            @change="changeCityFn($event,scope.$index,scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>-->

      <el-table-column label="操作"  fixed="right" width="200">
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
  import searchNav from '@/components/common/searchNav'
  import ArticleNav from '@/components/ArticleNav'
  import goTop from '@/components/common/goTop'
  import Dialog from'@/components/common/dialog'
  import pageNum from '@/components/pageNum'
  import { mapState, mapActions } from 'vuex'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
    export default {
        name: "ArticleList",
        components: {
          searchNav,
          ArticleNav,
          Dialog,
          pageNum,
          goTop
        },
        computed: {
          // 用户信息1
          userInfo(){
            return this.$store.getters.userInfo
          }
        },
      filters: {
        layoutStatus(val) {
          if(val == 0){
            return '上下图文'
          }
          if(val == 1){
            return '左右图文'
          }
          if(val == 2){
            return '无图'
          }
          if(val == 3){
            return '3图'
          }
        }
      },
        data() {
            return {
              visible: false,
              ids:[],
              getRowKeys(row) {
                return row.id;
              },
              tableList:[],
              tableIdArr:[],
              searchParame:{}, // 搜索组件传递的参数
              totalNum:null, // 总数
              pageNo: 1, //当前页
              pageSize:10,// 每页的条数
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
          reSetFn() {
            console.log('重置事件')
            this.$refs.multipleTable.clearSelection()
          },
         /* setSelectRow() {
            if (!this.tableIdArr.length || !this.ids.length) {
              return
            }
            for (let j = 0; j < this.tableIdArr.length; j++) {//这里我用到了双重for循环 this.pageUser这是所有人员信息
              for (let i = 0; i < this.ids.length; i++) {
                if (this.tableIdArr[j] == this.ids[i]) {
                  if (this.$refs.multipleTable !== undefined) {//解决下面用bkUserTable不报错 bkUserTable我是在table ref定义的
                    console.log('j', j)
                    // console.log(this.listData[j])
                    // this.$refs.multipleTable.toggleRowSelection(this.listData[j], true);//这个就是回显的核心
                  }
                }
              }
            }
          },*/
          // 更新列表数据
          updateListFn() {
            this.$refs.multipleTable.clearSelection()
            this.initData()
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
          // 城市合伙人显示文案
        /*  changeCityFn($event, index, row){
            let realname = JSON.parse(this.userInfo).realname
            let param={
              id:row.id,
              remind:$event,
              updatepeople: realname
            }
            this.$req.post('updateCityPartner',param).then(res => {
              this.$success('修改成功')
            }).catch(err => {
              console.log(err);
            })
          },*/
          // 文章列表的switch事件
          changeFn($event, index, row) {
            let realname = JSON.parse(this.userInfo).realname
            this.$req.post('updateremind', {
              id: row.id, shifoutixing: $event, updateBy: realname
            }).then(res => {
              this.$success(res.data.message)
              this.initData()
            }).catch(err => {
              console.log(err);
            })
          },
          // 多选
          SelectionChange(selection){
            console.log(selection);
            this.ids=  selection.map(item=>item.hdId)
            console.log(this.ids);

          },
          // 查看编辑
          handleEdit(index,row){
            this.$router.push({
              path: '/ArticleManager/ArticleDetails',
              query: {
                id: row.hdId,
                fenlei:row.fenlei,
              }
            })
          },
          // 删除按钮
          handleDelete(index, row) {
            this.visible = true
            let arr=[]
            arr.push(row.hdId)
            this.ids = arr
          },
          // 确认批量删除
          confirmFn(){
            this.visible = false
            let url ='deleteHuoDong'
            let idArr= this.ids
            console.log(typeof (idArr));
            this.$store.dispatch('delFn', {url, idArr})
            this.initData()
          },
          // 搜索
          searchFn(parame) {
            this.searchParame = parame
            console.log('nav派发父组件接受的参数',this.searchParame);
            this.initData();
          },
          // 批量删除
          delsFn() {
            if (this.ids.length) {
              console.log(this.ids);
              this.visible = true
            }
          },
          // 单个删除
          showDialogFn(index,row,btnId){
            this.ids=row.id
            if ( btnId == 'del') {
            this.visible = true
            }
          },
          initData() {
            // 分页查询
            this.searchParame = getSession('param')
            console.log('列表页搜索参数', this.searchParame);
            if (this.searchParame === 'undefined' || this.searchParame === undefined) {
              this.searchParame = { pageNum: 1, pageSize: 10 }
            }

            // console.log(typeof (this.searchParame));
            // this.searchParame.pageNum = getSession('currentPage') || 1
            // this.searchParame.pageSize = getSession('currentSize') || 10

            this.$req.post('fuzzySearchHuoDong', this.searchParame).then(res => {
              this.totalNum = res.data.data.totalNum
              this.tableList = res.data.data.tbHuodongs
              this.tableIdArr = this.tableList.map(item => item.hdId)
//              console.log(res.data.data.totalNum);
         /*     setTimeout(() => {
                this.setSelectRow();
              }, 200)*/
            }).catch(err => {

            })
          }
        },
        created() {
          this.initData()
        },
      // 离开列表页,去其他侧边栏
      beforeRouteLeave: function(to, from, next) {
        if (to.name != 'ArticleDetails') {
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
