<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="订单号">
          <el-input v-model="keyWord.orderNoOrCurriculumName" placeholder="请输入订单号" />
        </el-form-item>

        <el-form-item label="下单时间">
          <el-date-picker
            v-model="keyWord.orderTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"/>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="keyWord.status">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="orderNum" label="订单号" />
      <el-table-column align="center" prop="orderTime" label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.orderTime | orderTimeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="nickName" label="学院昵称" />
      <el-table-column align="center" prop="phone" label="手机号" />
      <el-table-column align="center" prop="statusDescription" label="订单状态" />
      <el-table-column align="center" prop="curriculumName" label="课程名称" />
      <el-table-column align="center" prop="price" label="课程价格" />
      <el-table-column align="center" prop="payPrice" label="实际支付价格" />
    </el-table>
    <div class="pageNumBox">
      <pageNum
        :current-page="keyWord.pageNum"
        :page-size="keyWord.pageSize"
        :total="total"
        @sizeChange="sizeChangeFn"
        @currentChange="currentPageChange"
      />
    </div>
  </div>
</template>
<script>
import { getOrderList } from '@/api/store'
import pageNum from '@/components/pageNum'
import { fmtDate } from '@/utils/date'
export default {
  name: 'OrderComponent',
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    },
    orderTimeStr(val) {
      return val && fmtDate(val)
    }
  },
  components: {
    pageNum
  },
  props: {
    val: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      list: [],
      viewId: '',
      categories: '',
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      keyWord: {
        orderNoOrCurriculumName: '',
        orderTime: '',
        pageNum: 1,
        pageSize: 10,
        status: 0,
        storeId: ''
      },
      total: null,
      status: [{
        label: '全部',
        value: 0
      }, {
        label: '已付款',
        value: 3
      }, {
        label: '已结业',
        value: 4
      }, {
        label: '退款中',
        value: 5
      }, {
        label: '退款完成',
        value: 6
      }]
    }
  },
  watch: {
    val: {
      handler() {
        if (this.val === 'getOrderList') {
          const id = this.$route.query.id
          this.viewId = id
          if (id) {
            this.fetchList()
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchList() {
      const getObj = this.keyWord
      getObj.storeId = this.viewId
      getOrderList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data.records
        this.total = res.data.data.total
      })
    },
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.keyWord.pageSize = pageSize
      this.fetchList()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.keyWord.pageNum = pageNo
      this.fetchList()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}

.diglog-textarea {
  display: block;
  width: 100%;
  textarea {
    display: block;
    width: 100%;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 30px;
    height: 120px;
  }
}
.tabel-flex {
  display: flex;
  img {
    margin-right: 20px;
  }
}

.course-info{
  display: flex;
  &__item{
    width: 100px;
    text-align: center;
    border-left:1px solid rgba(241,241,245,1);
    &:last-child{
      border-right:1px solid rgba(241,241,245,1);
    }
  }
  .info-title{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(25,25,39,1);
    line-height:20px;
    margin: 0;
    margin-bottom: 6px;
  }
  .info-number{
    font-size:16px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
  }
  .green{
   color:rgba(61,213,152,1);
  }
  .red{
    color:rgba(255,73,82,1);
  }
}
</style>
