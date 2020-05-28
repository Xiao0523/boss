<template>
  <div>
    <el-row>
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="ruleForm"
        label-position="right"
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-input
            v-model.trim="ruleForm.key"
            placeholder="公司名称/手机号/用户名"
            clearable
            style="width: 200px;"
          />
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="ruleForm.time"
            :default-time="['00:00:00', '23:59:59']"
            type="datetimerange"
            align="right"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="网站状态">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search('ruleForm')">搜索</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="success" @click="addSuppliers">新增供应商</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="suppliersList" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="personName" label="用户名"/>
      <el-table-column align="center" prop="mobilePhone" label="手机号"/>
      <el-table-column align="center" prop="companyName" label="公司名称"/>
      <el-table-column align="center" prop="terminationTime" label="服务有效期">
        <template slot-scope="scope">{{ scope.row.terminationTime | formatDate }}</template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="供应商状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '0'? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.status === '0' ?"禁用":"启用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="webAddress" label="网址"/>
      <el-table-column align="center" prop="email" label="邮箱"/>
      <el-table-column align="center" prop="createTime" label="添加时间">
        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.uuid)">编辑</el-button>
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
import { getSuppliersList } from '@/api/personSuppliers'
import { fmtDate } from '@/utils/date'
import pageNum from '@/components/pageNum'
export default {
  components: {
    pageNum
  },
  data() {
    return {
      pageNo: 1, // 当前页
      pageSize: 10, // 每页的条数
      totalNum: 0,
      suppliersList: [],
      ruleForm: {
        key: '',
        time: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      statusList: [
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '全部'
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
  watch: {
    time() {
      debugger
      const timeArr = this.time
      if (timeArr) {
        this.ruleForm.beginTime = fmtDate(timeArr[0].getTime())
        this.ruleForm.endTime = fmtDate(timeArr[1].getTime())
      } else {
        this.ruleForm.beginTime = ''
        this.ruleForm.endTime = ''
      }
    }
  },
  created() {
    this.fetchCategory()
  },
  methods: {
    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      this.pageNo = 1
      this.fetchCategory()
    },
    fetchCategory() {
      const status = this.ruleForm.status === '2' ? '' : this.ruleForm.status
      const data = {
        beginTime: this.ruleForm.beginTime,
        endTime: this.ruleForm.endTime,
        key: this.ruleForm.key,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        status
      }
      getSuppliersList(data).then(res => {
        debugger
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.suppliersList = res.data.data.records
        this.totalNum = res.data.data.total
      })
    },
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchCategory()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchCategory()
    },
    resetForm(formName) {
      debugger
      this.ruleForm = {
        key: '',
        time: '',
        status: '',
        beginTime: '',
        endTime: ''
      }
      this.$refs[formName].resetFields()
    },
    addSuppliers() {
      this.$router.push('/personalStand/newSuppliers')
    },
    edit(uuid) {
      this.$router.push({ path: '/personalStand/supplierDetails', query: { id: uuid }})
    }
  }
}
</script>

<style scoped lang="scss">
</style>
