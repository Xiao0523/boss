<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item>
          <el-input v-model="keyWord.name" placeholder="请输入店铺名称" />
        </el-form-item>

        <el-form-item>
          <el-select v-model="keyWord.status">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="keyWord.categoryId">
            <el-option
              v-for="item in categoryList"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="name" label="课程名称" />
      <el-table-column align="center" prop="categoryName" label="对应类目" />
      <el-table-column align="center" prop="hours" label="课时" />
      <el-table-column align="center" prop="price" label="课程价格（元）" />
      <el-table-column align="center" prop="lastAuthTime" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="score" label="当前评分" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'StoreDetail', query: { id: scope.row.storeId }}"><el-button type="danger" size="mini">查看</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getClassList } from '@/api/store'
export default {
  name: 'StoreComponents',
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    }
  },
  data() {
    return {
      list: [],
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      keyWord: {
        categoryId: '',
        name: '',
        status: ''
      },
      status: [{
        label: '全部',
        value: ''
      }, {
        label: '启用',
        value: 0
      }, {
        label: '关闭',
        value: 1
      }],
      categoryList: [{
        label: '全部',
        value: ''
      }]
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    getClass() {
      const getObj = this.keyWord
      getClassList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
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
.tabel-flex {
  display: flex;
  img {
    margin-right: 20px;
  }
}
</style>
