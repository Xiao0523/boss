<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="enterpriseId" label="机构编号" />
      <el-table-column align="center" prop="enterpriseName" label="机构名称" />
      <el-table-column align="center" prop="id" label="提现编号" />
      <el-table-column align="center" prop="money" label="提现金额" />
      <el-table-column align="center" label="提现申请时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | createTimeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提现申请通过时间">
        <template slot-scope="scope">
          {{ scope.row.passTime | endTimeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="storeId" label="店铺编号" />
      <el-table-column align="center" prop="storeName" label="店铺名称" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="audit(scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pageNumBox">
      <pageNum
        :current-page="pageNo"
        :page-size="pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentPageChange"
      />
    </div>
    <el-dialog
      title="审核"
      :visible.sync="diglogFlag"
      width="30%"
      center
    >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelDiglogClick()">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getCashOutList, getCashOutStatus} from '@/api/cashOut'
import {fmtDate} from '@/utils/date'
import pageNum from '@/components/pageNum'
export default {
  name: 'Tuition',
  components: {
    pageNum
  },
  data() {
    return {
      list: [], // 列表数据
      options: [{
        value: '0',
        label: '不可申请'
      }, {
        value: '1',
        label: '可领取奖学金'
      }, {
        value: '2',
        label: '审核中'
      }, {
        value: '3',
        label: '审核通过'
      }, {
        value: '4',
        label: '已到账'
      }, {
        value: '5',
        label: '被终止'
      }],
      keyWord: {// 搜索关键字
        type: '',
        timeRange: ''
      },
      selectVal: '审核中',
      status: 2,
      totalNum: null, // 数据总条数
      pageNo: 1, // 当前页
      pageSize: 10, // 每页的条数
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      diglogFlag: false
    }
  },
  created() {
    this.fetchList()
  },
  filters: {
    createTimeStr(val) {
      return fmtDate(val)
    },
    endStr(val) {
      if(val) {
        return fmtDate(val)
      }
      return ''
    }
  },
  methods: {
    audit(obj) {
      this.activeAudit = obj
      if (obj.status != 0) {
        this.$message({
          message: '请选择待审核的数据',
          type: 'warning'
        })
        return
      }
      this.diglogFlag = true
    },
    // 审核弹框选择
    handelDiglogClick(flag) {
      const activeAudit = this.activeAudit
      if (!activeAudit.id) return
      const auditObj = {
        id: this.activeAudit.id
      }
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    auditFn(obj) {
      getCashOutStatus(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.fetchList()
      })
    },
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchList()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchList()
    },

    // 获取文章列表
    fetchList() {
      const argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10
      }

      getCashOutList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.totalNum = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
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
.el-dialog--center .el-dialog__body {
  padding: 0 !important;
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
</style>
