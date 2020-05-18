<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="订单号">
          <el-input v-model="keyWord.trainingStudentCurriculumId" placeholder="请输入订单号" />
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="keyWord.nickName" placeholder="请输入昵称" />
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="nickName" label="用户昵称" />
      <el-table-column align="center" prop="phone" label="用户手机号" />
      <el-table-column align="center" prop="commentTime" label="评价时间" />
      <el-table-column align="center" prop="orderNum" label="订单号" />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.display | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'CommentDetail', query: { storeId: viewId, id: scope.row.trainingStudentCurriculumId }}"><el-button type="danger" size="mini">查看</el-button></router-link>
          <el-button type="danger" size="mini" @click="showHandel(scope.row.display, scope.row.trainingStudentCurriculumId)">{{ scope.row.display | btnStr }}</el-button>
        </template>
      </el-table-column>
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
import { getCommentList, getCommentClose, getCommentOpen } from '@/api/store'
import pageNum from '@/components/pageNum'
export default {
  name: 'CommentComponents',
  filters: {
    statusStr(val) {
      return val === 0 ? '显示' : '隐藏'
    },
    btnStr(val) {
      return val === 0 ? '隐藏' : '显示'
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
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      keyWord: {
        nickName: '',
        pageNum: 1,
        pageSize: 10,
        storeId: '',
        trainingStudentCurriculumId: ''
      },
      total: null,
      status: [{
        label: '全部',
        value: ''
      }, {
        label: '启用',
        value: 0
      }, {
        label: '关闭',
        value: 1
      }]
    }
  },
  watch: {
    val: {
      handler() {
        if (this.val === 'getCommentList') {
          const id = this.$route.query.id
          this.viewId = id
          if (id) {
            this.fetchList(id)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchList(id) {
      const getObj = this.keyWord
      getObj.storeId = this.viewId || id
      getCommentList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data.records.length) return
        this.list = res.data.data.records
      })
    },
    showHandel(val, id) {
      const fn = val === 0 ? getCommentClose : getCommentOpen
      const getObj = {
        id
      }
      fn(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        this.$success('操作成功！！！')
        this.fetchList()
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
</style>
