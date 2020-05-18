<template>
  <div>
    <el-row>
      <el-col :span="20">
        <router-link :to="{name: 'ClassJoin' }">
          <el-button type="primary">添加类目</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="name" label="机构名称" />
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'TypeListLevelTwo', query:{id: scope.row.id}}">
            <el-button type="danger" size="mini">所属类目</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handleStatusClick(scope.row.id, scope.row.status, scope.row.name)">{{ scope.row.status | statusStr }}</el-button>
          <router-link :to="{name: 'ClassJoin', query:{id: scope.row.id, flag: 'edit' }}">
            <el-button type="danger" size="mini">编辑</el-button>
          </router-link>
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
  </div>
</template>

<script>
import { getTypeList, editList } from '@/api/merchant'
import pageNum from '@/components/pageNum'
export default {
  name: 'JoinList',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return Number(val) === 0 ? '关闭' : '打开'
    }
  },
  data() {
    return {
      list: [], // 列表数据
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
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleStatusClick(id, status, name) {
      const editObj = {
        status: status,
        id: id,
        name: name
      }
      editObj.status = status == 0 ? 1 : 0
      editList(editObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.getList()
      })
    },
    // 获取一级类目列表
    getList() {
      getTypeList().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        const { data } = res.data
        if (!data) return
        this.list = data
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
</style>
