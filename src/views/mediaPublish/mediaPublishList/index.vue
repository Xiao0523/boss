<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="keyWord" :rules="rules" ref="searchForm">
        <el-form-item>
          <el-input v-model.trim="keyWord.nickName" placeholder="输入作者" clearable></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model.trim="keyWord.phone" placeholder="输入手机" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            v-model="keyWord.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="articles"
      :header-cell-style="tabHeader">
      <el-table-column align="center" prop="title" label="文章标题"></el-table-column>
      <el-table-column align="center" prop="href" label="文章链接"></el-table-column>
      <el-table-column align="center" prop="nickName" label="文章作者"></el-table-column>
      <el-table-column align="center" prop="nickName" label="手机号"></el-table-column>
      <el-table-column align="center" label="发布时间">
         <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
      </el-table-column>

    </el-table>

    <!--分页-->
    <div class="pageNumBox">
      <pageNum :currentPage="pageNo"
               :pageSize="pageSize"
               :total="totalNum"
               @sizeChange="sizeChangeFn"
               @currentChange="currentPageChange"
      ></pageNum>
    </div>

    
  </div>
</template>
<script>
import {getPublishList} from '@/api/mediaPublish'
import pageNum from '@/components/pageNum'
export default {
  name: 'mediaPublishList',
  components: {
    pageNum,
  },
  data() {
    return {
      articles: [],//文章列表数据
      keyWord: {//搜索关键字
        nickName: '',
        phone: '',
        timeRange: '',
      },
      rules: {
        phone: [{pattern: /^1[\d]{10}$/, message: '请输入11位手机号',trigger: 'blur'}]
      },
      totalNum: null, // 数据总条数
      pageNo: 1, //当前页
      pageSize: 10,// 每页的条数
      tabHeader: {
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
    }
  },
  
  methods: {

    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchArticles()
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchArticles()
    },

    // 获取文章列表
    fetchArticles() {
      let argsObj = { 
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10,
      }
      
      let keyWord = this.keyWord
      if(keyWord.nickName) {
        argsObj.nickName = keyWord.nickName
      }
      if (keyWord.phone) {
        argsObj.phone = keyWord.phone
      }

      if (keyWord.timeRange && keyWord.timeRange.length) {
        let getDate = (d) => {
          let Y = d.getFullYear()
          let M = d.getMonth() + 1
          let D = d.getDate() + 1
          if(M < 10) {
            M = '0' + M
          }
          if(D < 10) {
            D = '0' + D
          }
          return `${Y}-${M}-${D}`
        }

        argsObj.startTime = getDate(keyWord.timeRange[0])
        argsObj.endTime = getDate(keyWord.timeRange[1])
      }

      getPublishList(argsObj).then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        let records = res.data.data.records
        this.articles = records && records.length ? records : []
      })
    },

    // 点击搜索 获取文章列表 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return
        this.pageNo = 1
        this.fetchArticles()
      })
    },
  },
  created() { }
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