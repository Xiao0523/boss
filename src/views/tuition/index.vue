<template>
  <div>
    <el-row>
      <el-select v-model="selectVal" @change="selectChange">
        <el-option
          v-for="item in options"
          :value="item.label"
          :key="item.label"
        >
        </el-option>
      </el-select>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="studentId" label="学员编号" />
      <el-table-column align="center" prop="studentName" label="学员名称" />
      <el-table-column align="center" prop="curriculumId" label="课程编号" />
      <el-table-column align="center" prop="curriculumName" label="课程名称" />
      <el-table-column align="center" prop="enterpriseId" label="机构编号" />
      <el-table-column align="center" prop="enterpriseName" label="机构名称" />
      <el-table-column align="center" prop="payPrice" label="实际支付金额" />
      <el-table-column align="center" prop="scholarship" label="奖学金金额" />
      <el-table-column align="center" label="店铺对学员的评价">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.scholarshipStatus == 2" type="danger" size="mini" @click="audit(scope.row)">审核</el-button>
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
        <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
        <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getscholarShipList, getScholarShipStatus} from '@/api/scholarShip'
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
    statusStr(val) {
      return val == 0 ? '超棒' : val == 1 ? '很棒' : val == 2 ? '不错' : val == 3 ? '还行' : '不佳'
    }
  },
  methods: {
    selectChange() {
      for(let item of this.options) {
        if (item.label === this.selectVal) {
          this.status = item.value
          this.fetchList()
          return
        }
      }
    },
    audit(obj) {
      this.activeAudit = obj
      if (obj.scholarshipStatus != 2) {
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
        id: this.activeAudit.id,
        status: this.activeAudit.status
      }
      auditObj.status = flag === 'success' ? 3 : 5
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    auditFn(obj) {
      getScholarShipStatus(obj).then(res => {
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
        status: this.status,
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10
      }

      getscholarShipList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.totalNum = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
    },

    // 点击搜索 获取文章列表 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return
        this.pageNo = 1
        this.fetchList()
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
