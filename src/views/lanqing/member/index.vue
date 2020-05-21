<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="手机号">
          <el-input v-model="keyWord.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="注册时间">
          <el-date-picker
            v-model="keyWord.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="请输入省">
          <el-select v-model="provinceCode">
            <el-option
              v-for="item in provinceList"
              :key="item.name"
              :value="item.adcode"
              :label="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请输入市">
          <el-select v-model="keyWord.adcode">
            <el-option
              v-for="item in adList"
              :key="item.name"
              :value="item.adcode"
              :label="item.name"
            />
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="phone" label="手机号" />
      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="way" label="注册方式" />
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="codeName" label="区域" />
      <el-table-column align="center" prop="orderNum" label="订单数量" />
      <el-table-column align="center" label="是否添加客服微信">
        <template slot-scope="scope">
          {{ scope.row.wxCustomer | wxCustomerStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.wxCustomer !== 1" type="danger" size="mini" @click="sureWx(scope.row.id)">已加微信</el-button>
          <router-link :to="{name: 'MemberDetail', query: { id: scope.row.id }}"><el-button type="danger" size="mini">查看</el-button></router-link>
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
import { getStudentList, editStudentWx } from '@/api/member'
import { getChinaCity, getChinaCode } from '@/api/global'
import pageNum from '@/components/pageNum'
import { fmtDate } from '@/utils/date'
export default {
  name: 'MemberList',
  components: {
    pageNum
  },
  filters: {
    wxCustomerStr(val) {
      return Number(val) === 1 ? '已加' : '未加'
    },
    timeStr(val) {
      return val && fmtDate(val)
    }
  },
  data() {
    return {
      list: [], // 列表数据
      keyWord: {// 搜索关键字
        adcode: '',
        beginTime: '',
        endTime: '',
        phone: '',
        timeRange: ''
      },
      provinceCode: '',
      diglogFlag: false,
      provinceList: [{
        name: '全部',
        adcode: ''
      }],
      adList: [{
        name: '全部',
        adcode: ''
      }],
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
      },
      activeAudit: {},
      unSuccStr: '',
      infoObj: []
    }
  },
  watch: {
    provinceCode() {
      this.keyWord.adcode = ''
      this.getChinaCity()
    }
  },
  mounted() {
    this.fetchList()
    this.getCityList()
  },
  methods: {
    sureWx(id) {
      const getObj = {
        studentId: id
      }
      editStudentWx(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.fetchList()
      })
    },
    getCityList() {
      getChinaCity().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data.length) return
        this.provinceList = [
          ...this.provinceList,
          ...res.data.data
        ]
      })
    },
    getChinaCity() {
      if (!this.provinceCode) return
      const getObj = {
        code: this.provinceCode
      }
      getChinaCode(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data.length) return
        this.adList = [
          ...this.adList,
          ...res.data.data
        ]
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
    },

    // 获取文章列表
    fetchList() {
      const argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10,
        ...this.keyWord
      }

      const keyWord = this.keyWord

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

        argsObj.beginTime = getDate(keyWord.timeRange[0])
        argsObj.endTime = getDate(keyWord.timeRange[1])
      }
      getStudentList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        const records = res.data.data.records
        this.list = records && records.length ? records : []
      })
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
</style>
