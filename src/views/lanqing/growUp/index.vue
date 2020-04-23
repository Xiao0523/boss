<template>
  <div>

    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-button type="primary" @click="addGrow">新增主题</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="topic" label="主题" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="主题图片">
        <template slot-scope="scope">
          <img v-show="scope.row.pic" :src="scope.row.pic" class="img-box" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'GrowEdit', query: { id: scope.row.uuid }}"><el-button type="danger" size="mini">编辑</el-button></router-link>
          <el-button size="mini" @click="closeStatus(scope.row.uuid)">{{ scope.row.status | btnStr }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getGrowList, closeGrow } from '@/api/grow'
import pageNum from '@/components/pageNum'
export default {
  name: 'OrganizationList',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return Number(val) === 0 ? '显示' : '隐藏'
    },
    btnStr(val) {
      return Number(val) === 0 ? '隐藏' : '显示'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      keyWord: {// 搜索关键字
        status: '',
        name: ''
      },
      diglogFlag: false,
      status: [
        {
          label: '全部',
          value: ''
        }, {
          label: '启用',
          value: '0'
        }, {
          label: '停用',
          value: '1'
        }
      ],
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
    this.fetchList()
  },
  methods: {
    fetchList() {
      const getObj = this.keyWord
      getGrowList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const records = res.data.data
        this.list = records && records.length ? records : []
      })
    },
    addGrow() {
      this.$router.push({ name: 'GrowEdit' })
    },
    closeStatus(id) {
      const getObj = {
        id
      }
      closeGrow(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('操作成功！')
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

.img-box {
  display: block;
  width: 100px;
  height: 100px;
}
</style>
