<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="讲师名称">
          <el-input v-model="keyWord.name" placeholder="请输入讲师名称" />
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="keyWord.status">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="类目">
          <el-select v-model="keyWord.categoryId">
            <el-option
              v-for="item in categoryList"
              :key="item.categoryName"
              :value="item.categoryId"
              :label="item.categoryName"
            />
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="realName" label="姓名" />
      <el-table-column align="center" prop="categories" label="课程类目" />
      <el-table-column align="center" prop="curriculumAmount" label="累计课程数" />
      <el-table-column align="center" prop="studentAmount" label="累计学生数" />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="score" label="评分" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="comment(scope.row.id)">评论</el-button>
          <router-link :to="{name: 'TeacherDetail', query: { storeId: viewId, id: scope.row.id }}"><el-button type="danger" size="mini">查看</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
    <comment :type="2" :store-id="viewId" :teacher-id="teacherId" :show-flag="showFlag" @editFlags="editFlag" />
  </div>
</template>
<script>
import { getTeacherList } from '@/api/store'
import { category } from '../mixins/getCategory'
import comment from '@/components/comment'
import { comments } from '../mixins/comments'
export default {
  name: 'TeacherComponent',
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
    }
  },
  components: {
    comment
  },
  mixins: [category, comments],
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
        categoryName: '全部',
        categoryId: ''
      }],
      teacherId: '',
      showFlag: false
    }
  },
  watch: {
    val: {
      handler() {
        if (this.val === 'getTeacherList') {
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
    comment(id) {
      this.showFlag = true
      this.teacherId = id
    },
    fetchList() {
      const getObj = this.keyWord
      getObj.storeId = this.viewId
      getTeacherList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
        this.categories = res.data.data.categories && res.data.data.categories.join(',')
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
