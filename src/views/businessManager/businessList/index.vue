<template>
    <div>
      <searchBar
        :from="'businessList'"
      ></searchBar>
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
          prop="companyName"
          label="公司名称"
        >
        </el-table-column>
        <el-table-column
          prop="principal"
          label="联系人"
        >
        </el-table-column>
        <el-table-column
          prop="principalTel"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="companyAddress"
          label="公司地址"
        >
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="注册日期"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="recentLoginTime"
          label="最近登录时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
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
    </div>
</template>

<script>
  import searchBar from '@/components/common/SearchBar'
  export default {
    name: "businessList",
    components: {
      searchBar
    },
    computed: {
      // 用户信息
      userInfo(){
        return this.$store.getters.userInfo
      },
    },
    data() {
      return {
        pageNo:1,
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
    methods: {
      // switch
      changeFn($event,index,row){
        let realname = JSON.parse(this.userInfo).realname
        let data={id:row.id, state:$event, updateBy:realname}
        this.$req.post('updateBusinessRemind',data).then(res=>{
          this.$success('修改成功')
        }).catch(err=>
          console.log(err)
        )
      },
      // 多选
      SelectionChange(arr){
        this.ids=  arr.map(item=>item.id)
      },
      // 查看编辑
      handleEdit(index,row){
        this.$router.push({
          path:'/AppManager/AppEdit',
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
      initData(){
        this.$req.get('businessSimple',{pageNum:this.pageNo,pageSize:this.pageSize}).then(res=>{
          this.listData = res.data.data.businesses
          this.totalNum = res.data.data.totalNum
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

</style>
