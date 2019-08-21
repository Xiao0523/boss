<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="keyWord" :rules="rules" ref="searchForm">
        <el-form-item>
          <el-input v-model.trim="keyWord.nickName" placeholder="输入作者" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input 
            v-model.trim="keyWord.phone" 
            placeholder="输入手机" 
            clearable 
            ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select v-model="keyWord.statue" clearable placeholder="请选择提现状态">
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="keyWord.type" clearable placeholder="请选择提现类型">
          <el-option
            v-for="item in typeArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search('searchForm')">筛选</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-table
      class="table-box"
      border
      :data="widthdrawArr"
      :header-cell-style="tabHeader">
      <el-table-column align="center" prop="nickName" label="用户名称"></el-table-column>
      <el-table-column align="center" prop="phone" label="用户手机"></el-table-column>
      <el-table-column align="center" label="提现时间">
        <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" prop="money" label="提现金额（元）"></el-table-column>
      <el-table-column align="center" label="提现状态">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column align="center" label="提现类型">
        <template slot-scope="scope">{{scope.row.type | formatType}}</template>
      </el-table-column>
      <el-table-column align="center" prop="source" label="提现来源"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="audit(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pageNumBox">
      <pageNum :currentPage="pageNo"
               :pageSize="pageSize"
               :total="totalNum"
               @sizeChange="sizeChangeFn"
               @currentChange="currentPageChange"
      ></pageNum>
    </div>

    <Dialog :title="'审核'" :width="'40%'" :is-show="isShow" @cancelFn="close" @confirmFn="onSubmit">
      <el-radio-group v-model="radioStatus">
        <el-radio v-for="item in radioStatusArr" :key="item.value" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </Dialog>
  </div>
</template>

<script>
import {getWithdraw, patchWithdraw} from '@/api/activityWithdraw'
import Dialog from "@/components/common/dialog"
import pageNum from '@/components/pageNum'
export default {
  name: 'activityWithdrawList',
   components: {
      pageNum,
      Dialog
    },
  data() {
    return {
      widthdrawArr: [],//提现列表数据
      isShow: false,//弹窗开关
      radioStatus: null,
      radioStatusArr: [
        {label: '驳回', value: 1},
        {label: '审核通过并放款', value: 2}
      ],
      currentWithdraw: {},
      keyWord: {
        nickName: '',//用户名称
        phone: '',//手机号码
        statue: null,//用户的搜索的状态 0 系统审核中 1 驳回 2 已到账
        type: null,//用户搜索的类型 1新手提现 2 普通用户提现
        
      },
      rules: {
        phone: [{pattern: /^1[\d]{10}$/, message: '请输入11位手机号',trigger: 'blur'}]
      },
      typeArr: [// 提现类型组
        {label: '新手提现', value: 1},
        {label: '普通用户提现', value: 2}
      ],
      statusArr: [//提现状态组
        {label: '审核中', value: 0},
        {label: '驳回', value: 1},
        {label: '已到账', value: 2}
      ],
      totalNum: null, // 数据总条数
      pageNo: 1, //当前页
      pageSize: 10,// 每页的条数
      tabHeader: {
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      }
    }
  },
  filters: {
    formatStatus(val) {
      let status = {
        0: '审核中',
        1: '驳回',
        2: '已到账'
      }

      return status[val] ? status[val] : '未知'
    },
    formatType(val) {
      let type = {
        1: '新手提现',
        2: '普通用户提现'
      }

      return type[val] ? type[val] : '未知'
    }
  },
  methods: {
    // 审核
    audit(index, row) {
      this.currentWithdraw = Object.assign({}, row)
      this.isShow = true
    },

    // 弹窗点击确定
    onSubmit() {
      if(!this.radioStatus) {
        return this.$wran('请选择审核意见！')
      }
      let currentWithdraw = this.currentWithdraw
      patchWithdraw(currentWithdraw.loan, this.radioStatus)
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }

        this.$success('操作成功！')
        this.close()
        this.init()
      })
    },

    // 弹窗关闭
    close() {
      this.radioStatus = null
      this.isShow = false
    },

    //分页改变 每页数量
    sizeChangeFn(pageSize){
      this.pageSize = pageSize
      this.init()
    },

    //分页改变 页面
    currentPageChange(pageNum) {
      this.pageNo = pageNum
      this.init()
    },

    //筛选 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return
        this.pageNo = 1
        this.init()
      })
    },

    /**
     * 初始化 提现列表
     * 获得数据总长度 
     * 以及列表数据
     */
    init() {
      let argsObj = {pageNum: this.pageNo, pageSize: this.pageSize}
      let keyWord = this.keyWord

      if (keyWord.nickName) {
        argsObj.nickName = keyWord.nickName
      }

      if (keyWord.phone) {
        argsObj.phone = keyWord.phone
      }

      // 筛选中有提现状态
      if(keyWord.statue || Object.prototype.toString.call(keyWord.statue) === '[object Number]') {
        argsObj.statue = keyWord.statue
      }

      // 筛选中有 提现 类型
      if(keyWord.type) {
        argsObj.type = keyWord.type
      }
      getWithdraw(argsObj)
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.count
        let activityCashWithdrawalViews = res.data.data.activityCashWithdrawalViews
        this.widthdrawArr = activityCashWithdrawalViews && activityCashWithdrawalViews.length ? activityCashWithdrawalViews : []
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
</style>


