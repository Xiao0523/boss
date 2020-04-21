<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item>
          <el-input v-model="keyWord.storeName" placeholder="请输入讲师名称" />
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

        <el-button type="primary" @click="fetchList">搜索</el-button>
        <el-button type="primary" @click="addTeacher">新增讲师</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" label="教师头像">
        <template slot-scope="scope">
          <img v-show="scope.row.teacherPicUrl" :src="scope.row.teacherPicUrl" class="img-box" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="teacherRealName" label="讲师名称" />
      <el-table-column align="center" prop="storeName" label="店铺名称" />
      <el-table-column align="center" prop="storeId" label="店铺编号" />
      <el-table-column align="center" prop="curriculumName" label="课程名称" />
      <el-table-column align="center" prop="curriculumId" label="课程编号" />
      <el-table-column align="center" prop="orderIndex" label="排序" />
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'RecommendedTeacherEdit', query: { id: scope.row.uuid }}"><el-button type="danger" size="mini">编辑</el-button></router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getTeacherList } from '@/api/teacher'
import pageNum from '@/components/pageNum'
export default {
  name: 'OrganizationList',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return val === 0 ? '启用' : '关闭'
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
      getTeacherList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const records = res.data.data
        this.list = records && records.length ? records : []
      })
    },
    addTeacher() {
      this.$router.push({ name: 'RecommendedTeacherEdit' })
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
