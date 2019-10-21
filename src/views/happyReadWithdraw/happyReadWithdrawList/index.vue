<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="keyWord" ref="searchForm">
        <el-form-item>
          <el-input v-model.trim="keyWord.code" placeholder="兑换码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">筛选</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-table
      class="table-box"
      border
      :data="widthdrawArr"
      :header-cell-style="tabHeader">
      <el-table-column align="center" prop="nickName" label="昵称"></el-table-column>
      <el-table-column align="center" prop="code" label="兑换码"></el-table-column>
      <el-table-column align="center" prop="amount" label="金额"></el-table-column>
      <el-table-column align="center" prop="statusDescription" label="状态"></el-table-column>
      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
      </el-table-column>
      <el-table-column align="center" label="审核时间">
        <template slot-scope="scope">{{scope.row.examineTime | formatExamineDate}}</template>
      </el-table-column>
      
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" v-if="!scope.row.status" @click="audit(scope.$index, scope.row)">审核</el-button>
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

    <Dialog :title="'审核'" :width="'40%'" :is-show="isShow" @cancelFn="close('auditForm')" @confirmFn="onSubmit('auditForm')">
      <el-form label-width="100px" :model="currentWithdraw" :rules="rules" ref="auditForm">
        <el-form-item label="支付宝账号" prop="aliPayAccount">
          <el-input v-model.trim="currentWithdraw.aliPayAccount" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="兑换码" prop="code">
          <el-input v-model.trim="currentWithdraw.code" :disabled='true'></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="currentWithdraw.phone" clearable></el-input>
        </el-form-item>

        <el-form-item label="审核意见" prop="status">
          <el-radio-group v-model="currentWithdraw.status" >
            <el-radio v-for="item in radioStatusArr" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import {getWithdraw, postExamine} from '@/api/happyReadWithdraw'
import Dialog from "@/components/common/dialog"
import pageNum from '@/components/pageNum'
export default {
  name: 'happyReadWithdrawList',
  components: {
    pageNum,
    Dialog
  },
  data() {
    return {
      widthdrawArr: [],//提现列表数据
      keyWord: {// 搜索关键字
        code: ''// 提现码
      },
      isShow: false,//弹窗开关
      
      currentWithdraw: {// 当前提现审核
        aliPayAccount: '',//
        code: '',
        phone: '',
        status: '',
      },
      rules: {
        aliPayAccount: [{required: true, message: '请输入支付宝账号', trigger: 'blur'}],
        code: [{required: true, message: '请输入兑奖码', trigger: 'blur'}],
        phone: [{required: true, pattern: /^1[\d]{10}$/, message: '请输入11位手机号',trigger: 'blur'}],
        status: [{required: true, message: '请选择审核意见', trigger: 'blur'}]
      },
      radioStatusArr: [
        {label: '发放', value: 1},
        {label: '拒绝', value: 3}
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
    formatExamineDate(value) {
      if (!value) return
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  methods: {
    // 审核
    audit(index, row) {
      this.currentWithdraw = {
        aliPayAccount: '',
        code: row.code,
        phone: '',
        status: '',
      }
      this.isShow = true
    },

    // 弹窗点击确定
    onSubmit(form) {
      let currentWithdraw = this.currentWithdraw
      this.$refs[form].validate( isValid => {
        if (!isValid) return
        postExamine(currentWithdraw)
        .then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
  
          this.$success('操作成功！')
          this.close(form)
          this.init()
        })
      })
    },

    // 弹窗关闭
    close(form) {
      this.$refs[form].resetFields()
      this.currentWithdraw.status = null
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
    search() {
      this.pageNo = 1
      this.init()
    },

    /**
     * 初始化 提现列表
     * 获得数据总长度 
     * 以及列表数据
     */
    init() {
      let argsObj = {pageNum: this.pageNo, pageSize: this.pageSize}
      let keyWord = this.keyWord

      if (keyWord.code) {
        argsObj.code = keyWord.code
      }

      getWithdraw(argsObj)
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        let records = res.data.data.records
        this.widthdrawArr = records && records.length ? records : []
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


