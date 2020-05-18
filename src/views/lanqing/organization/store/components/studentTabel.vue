<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="学员昵称">
          <el-input v-model="keyWord.nickName" placeholder="请输入学员名称" />
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="nickName" label="学员昵称" />
      <el-table-column align="center" prop="phone" label="手机号" />
      <el-table-column align="center" label="课程情况">
        <template slot-scope="scope">
          <div class="course-info">
            <div class="course-info__item">
              <h6 class="info-title">学习中</h6>
              <div class="info-number green">{{ scope.row.studyNum }}</div>
            </div>
            <div class="course-info__item">
              <h6 class="info-title">退款课程</h6>
              <div class="info-number red">{{ scope.row.refundNum }}</div>
            </div>
            <div class="course-info__item">
              <h6 class="info-title">结束课程</h6>
              <div class="info-number">{{ scope.row.completeNum }}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="money" label="消费金额（元）" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'TeacherDetail', query: { storeId: viewId, id: scope.row.id }}"><el-button type="danger" size="mini">查看</el-button></router-link>
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
import { getStudentList } from '@/api/store'
import { category } from '../mixins/getCategory'
import pageNum from '@/components/pageNum'
export default {
  name: 'StudentComponent',
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    }
  },
  components: {
    pageNum
  },
  mixins: [category],
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
      categories: '',
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
        storeId: ''
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
        if (this.val === 'getStudentList') {
          const id = this.$route.query.id
          this.viewId = id
          if (id) {
            this.fetchList()
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    fetchList() {
      const getObj = this.keyWord
      getObj.storeId = this.viewId
      getStudentList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data.records
        this.total = res.data.data.total
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

.course-info{
  display: flex;
  &__item{
    width: 100px;
    text-align: center;
    border-left:1px solid rgba(241,241,245,1);
    &:last-child{
      border-right:1px solid rgba(241,241,245,1);
    }
  }
  .info-title{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(25,25,39,1);
    line-height:20px;
    margin: 0;
    margin-bottom: 6px;
  }
  .info-number{
    font-size:16px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
  }
  .green{
   color:rgba(61,213,152,1);
  }
  .red{
    color:rgba(255,73,82,1);
  }
}
</style>
