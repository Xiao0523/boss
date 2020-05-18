<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="curriculumId" label="课程编号" />
      <el-table-column align="center" prop="curriculumName" label="课程名称" />
      <el-table-column align="center" prop="curriculumPayPrice" label="课程支付金额" />
      <el-table-column align="center" prop="id" label="投诉编号" />
      <el-table-column align="center" prop="storeId" label="店铺编号" />
      <el-table-column align="center" prop="storeName" label="店铺名称" />
      <el-table-column align="center" prop="studentId" label="学生编号" />
      <el-table-column align="center" prop="studentName" label="学生名" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="audit(scope.row)">{{ scope.row.status | statusStr }}</el-button>
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
      <span class="diglog-textarea">
        <textarea id="" v-model="unSuccStr" name="" cols="30" rows="10" placeholder="请输入反馈！"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
        <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRefundList, getRefundStatus } from '@/api/refund'
import pageNum from '@/components/pageNum'
export default {
  name: 'Refund',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return Number(val) === 1 ? '审核' : Number(val) === 2 ? '驳回' : '通过'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }]
        }]
      }],
      keyword: {
        // 搜索关键字
        areas: '',
        organization: ''
      },

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
      diglogFlag: false,
      activeAudit: {},
      unSuccStr: ''
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    audit(obj) {
      this.activeAudit = obj
      if (Number(obj.status) !== 1) {
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
        id: activeAudit.id,
        description: this.unSuccStr
      }
      auditObj.status = flag === 'success' ? 3 : 2
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    // 审核接口请求
    auditFn(obj) {
      getRefundStatus(obj).then(res => {
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

    // 获取退款列表
    fetchList() {
      const argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10
      }

      getRefundList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.list = data.records
        this.totalNum = data.total
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
