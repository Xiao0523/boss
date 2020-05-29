<template>
  <div>
    <el-row>
      <el-select v-model="selectVal" @change="selectChange">
        <el-option
          v-for="item in options"
          :value="item.label"
          :key="item.label"
        />
      </el-select>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="compositionId" label="被投诉作品编号" />
      <el-table-column align="center" prop="id" label="投诉编号" />
      <el-table-column align="center" prop="nickName" label="app用户昵称" />
      <el-table-column align="center" prop="reason" label="投诉原因" />
      <el-table-column align="center" prop="userId" label="app用户编号" />
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
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
      :visible.sync="diglogFlag"
      title="审核"
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
import { getComplaintList, getComplaintStatus } from '@/api/complaint'
import pageNum from '@/components/pageNum'
import { fmtDate } from '@/utils/date'
export default {
  name: 'Tuition',
  components: {
    pageNum
  },
  filters: {
    timeStr(val) {
      return fmtDate(val)
    },
    statusStr(val) {
      return val == 0 ? '待审核' : val == 1 ? '投诉成功' : '投诉驳回'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      options: [{
        value: '0',
        label: '待处理'
      }, {
        value: '1',
        label: '投诉成功'
      }, {
        value: '2',
        label: '投诉驳回'
      }],
      keyWord: {// 搜索关键字
        type: '',
        timeRange: ''
      },
      selectVal: '待处理',
      status: 0,
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
  methods: {
    selectChange() {
      for (const item of this.options) {
        if (item.label === this.selectVal) {
          this.status = item.value
          this.fetchList()
          return
        }
      }
    },
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
        id: this.activeAudit.id,
        status: this.activeAudit.status
      }
      auditObj.status = flag === 'success' ? 1 : 2
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    auditFn(obj) {
      getComplaintStatus(obj).then(res => {
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

      getComplaintList(argsObj).then(res => {
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
