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
      <el-table-column align="center" prop="id" label="作品编号" />
      <el-table-column align="center" label="作品图片">
        <template slot-scope="scope">
          <div class="pic">
            <img :src="scope.row.pics" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="talentShowId" label="才艺秀编号" />
      <el-table-column align="center" prop="videoCover" label="视频作品封面" />
      <el-table-column align="center" prop="videoUrl" label="视频作品URL地址" />
      <el-table-column align="center" label="作品类型">
        <template slot-scope="scope">
          {{ scope.row.type | typeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{ name: 'CompositionDetail', query: { id: scope.row.id } }">
            <el-button size="mini">查看</el-button>
          </router-link>
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
        <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
        <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCompositionList, getCompositionStatus } from '@/api/composition'
import pageNum from '@/components/pageNum'
import {fmtDate} from '@/utils/date'
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
        label: '待审核'
      }, {
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '审核未通过'
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
      diglogFlag: false,
      talentId: ''
    }
  },
  mounted() {
    const id = this.$route.query.id
    if (!id) {
      this.$router.push({ name: 'Show' })
    }
    this.talentId = id
    this.fetchList()
  },
  filters: {
    typeStr(val) {
      return val == 0 ? '图片' : '视频'
    },
    statusStr(val) {
      return val == 0 ? '待审核' : val == 1 ? '审核通过' : val == 2 ? '审核未通过' : '违规'
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
        ids: [this.activeAudit.id],
        status: this.activeAudit.status
      }
      auditObj.status = flag === 'success' ? 1 : 2
      this.auditFn(auditObj)
      this.diglogFlag = false
    },
    auditFn(obj) {
      getCompositionStatus(obj).then(res => {
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
        talentShowId: this.talentId,
        status: this.status,
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10
      }
      getCompositionList(argsObj).then(res => {
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

.pic {
  display: table-cell;
  width: 100px;
  height: 100px;
  vertical-align: middle;
  margin: auto;
  img {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
