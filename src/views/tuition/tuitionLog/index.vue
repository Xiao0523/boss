<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="学员搜索">
          <el-input/>
        </el-form-item>
        <el-form-item label="报读课程">
          <el-select value="" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select value="" />
        </el-form-item>
        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="课程流水" name="first">
        <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
          <el-table-column align="center" prop="name" label="课程名称" />
          <el-table-column align="center" label="付款方式">
            <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="应收金额" />
          <el-table-column align="center" prop="status" label="实收金额" />
          <el-table-column align="center" prop="status" label="结束日期" />
          <el-table-column align="center" prop="status" label="课时总数" />
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
      </el-tab-pane>
      <el-tab-pane label="订单流水" name="second">
        <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
          <el-table-column align="center" prop="name" label="订单号" />
          <el-table-column align="center" prop="name" label="学员" />
          <el-table-column align="center" prop="status" label="手机号" />
          <el-table-column align="center" label="交费日期">
            <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
          </el-table-column>
          <el-table-column align="center" prop="status" label="交费金额" />
          <el-table-column align="center" prop="status" label="课程名称" />
          <el-table-column align="center" prop="status" label="课时总数" />
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


      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
// import {getPublishList} from '@/api/mediaPublish'
import pageNum from '@/components/pageNum'
export default {
  name: 'TuitionLog',
  components: {
    pageNum
  },
  data() {
    return {
      list: [], // 列表数据
      activeName: 'first',
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
      keyWord: {// 搜索关键字
        type: '',
        timeRange: ''
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
      }
    }
  },
  created() {},

  methods: {
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

      const keyWord = this.keyWord
      if (keyWord.nickName) {
        argsObj.nickName = keyWord.nickName
      }
      if (keyWord.phone) {
        argsObj.phone = keyWord.phone
      }

      if (keyWord.timeRange && keyWord.timeRange.length) {
        const getDate = d => {
          const Y = d.getFullYear()
          let M = d.getMonth() + 1
          let D = d.getDate() + 1
          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          return `${Y}-${M}-${D}`
        }

        argsObj.startTime = getDate(keyWord.timeRange[0])
        argsObj.endTime = getDate(keyWord.timeRange[1])
      }

      getPublishList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        const records = res.data.data.records
        this.articles = records && records.length ? records : []
      })
    },

    handleTabClick(tab, event) {
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
</style>
