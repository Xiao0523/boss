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
      <el-table-column align="center" prop="id" label="作品编号" />
      <el-table-column align="center" prop="talentShowId" label="才艺秀编号" />
      <el-table-column align="center" prop="nickName" label="参赛者昵称" />
      <el-table-column align="center" prop="votes" label="票数" />
      <el-table-column align="center" prop="nickName" label="作品类型">
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
          <el-button type="danger" size="mini" @click="changeVotes(scope.row.votes, scope.row.id)">票数管理</el-button>
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
      :visible.sync="voteFlag"
      title="票数"
      width="30%"
      center
      class="diglog"
    >
      <div class="model-box">
        <div class="radio-box vote">
          <span>修改票数：</span>
          <el-input v-model="vote" />
        </div>
        <div slot="footer" class="button-box">
          <el-button type="primary" @click="voteSubmit">确定</el-button>
          <el-button @click="voteFlag = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="diglogFlag"
      title="审核"
      width="30%"
      center
      class="diglog"
    >
      <div class="model-box">
        <div class="radio-box">
          <span>是否需要动态封面：</span>
          <el-radio-group v-model="dynamic">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="button-box">
          <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
          <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCompositionList, getCompositionStatus } from '@/api/composition'
import { changeVote } from '@/api/talentShow'
import pageNum from '@/components/pageNum'
// import { fmtDate } from '@/utils/date'
export default {
  name: 'Tuition',
  components: {
    pageNum
  },
  filters: {
    typeStr(val) {
      return Number(val) === 0 ? '图片' : '视频'
    },
    statusStr(val) {
      const value = Number(val)
      return value === 0 ? '待审核' : value === 1 ? '审核通过' : value === 2 ? '审核未通过' : '违规'
    }
  },
  data() {
    return {
      dynamic: 0,
      vote: 0,
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
      voteFlag: false,
      talentId: '',
      typeVideo: null,
      voteId: ''
    }
  },
  watch: {
    dynamic() {
      if (Number(this.typeVideo) === 1 && Number(this.typeVideo) === 1) return
      this.$wran('只允许视频设置动态封面！！！')
      this.dynamic = 0
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
    changeVotes(val, id) {
      this.voteFlag = true
      this.vote = val
      this.voteId = id
    },
    voteSubmit() {
      const getObj = {
        id: this.voteId,
        votes: this.vote
      }
      changeVote(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        this.$success('修改成功！')
        this.voteFlag = false
        this.fetchList()
      })
    },
    audit(obj) {
      this.activeAudit = obj
      if (Number(obj.status) !== 0) {
        this.$message({
          message: '请选择待审核的数据',
          type: 'warning'
        })
        return
      }
      this.typeVideo = obj.type
      this.dynamic = 0
      this.diglogFlag = true
    },
    // 审核弹框选择
    handelDiglogClick(flag) {
      const activeAudit = this.activeAudit
      if (!activeAudit.id) return
      const auditObj = {
        ids: [this.activeAudit.id],
        status: this.activeAudit.status,
        dynamic: this.dynamic
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
          return res.data.message && this.$warn(res.data.message)
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

.radio-box {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  & > span {
    margin-right: 20px;
  }
}
.vote {
  .el-input {
    width: 70%;
  }
}
.button-box {
  display: flex;
  align-items: center;
  justify-content: center;
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
