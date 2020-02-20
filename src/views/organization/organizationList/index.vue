<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item>
          <el-select v-model="searchActive.type" @change="changeSearch('type', searchActive.type)">
            <el-option
              v-for="item in type"
              :key="item.label"
              :value="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="searchActive.status" @change="changeSearch('status', searchActive.status)">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-show="keyWord.type == 2">
          <el-date-picker
            v-model="keyWord.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="enterpriseName" label="机构名称" />
      <el-table-column align="center" prop="contactInformation" label="联系人" />
      <el-table-column align="center" prop="contacts" label="号码"/>
      <el-table-column align="center" label="审核">
        <template slot-scope="scope">
          <p>{{ scope.row.status | statusFilter }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'OrganizationDetail', query: {id: scope.row.enterpriseId}}"><el-button type="danger" size="mini">查看</el-button></router-link>
          <el-button type="danger" size="mini" @click="audit(scope.row)">审核</el-button>
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
    <el-dialog
      :visible.sync="diglogFlag"
      title="审核"
      width="30%"
      center
    >
      <span class="diglog-textarea">
        <textarea id="" v-model="unSuccStr" name="" cols="30" rows="10" placeholder="驳回请输入反馈！"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handelDiglogClick('success')">审核通过</el-button>
        <el-button @click="handelDiglogClick('unSuccess')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getMerchantList, getAudit } from '@/api/merchant'
import pageNum from '@/components/pageNum'
export default {
  name: 'OrganizationList',
  components: {
    pageNum
  },
  filters: {
    statusFilter(val) {
      return val === 0 ? '待审' : val === 1 ? '通过' : '驳回'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      keyWord: {// 搜索关键字
        type: '1',
        auditTypes: '',
        timeRange: ''
      },
      diglogFlag: false,
      type: [
        {
          label: '全部',
          value: '1'
        }, {
          label: '今日',
          value: '0'
        }, {
          label: '按时间区间查询',
          value: '2'
        }
      ],
      searchActive: {
        type: '全部',
        status: '全部'
      },
      status: [{
        label: '全部',
        value: ''
      }, {
        label: '待审',
        value: '0'
      }, {
        label: '审核通过',
        value: '1'
      }, {
        label: '驳回',
        value: '2'
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
      unSuccStr: ''
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    // 审核
    audit(obj) {
      this.activeAudit = obj
      if (obj.status != 0) {
        this.$message({
          message: '请选择待审核的数据',
          type: 'warning'
        })
        return
      }
      this.diglogFlag = true
    },

    // 审核弹框选择
    handelDiglogClick(flag) {
      const activeAudit = this.activeAudit
      if (!activeAudit.enterpriseId) return
      const auditObj = {
        enterpriseId: activeAudit.enterpriseId
      }
      auditObj.status = flag === 'success' ? 1 : 2
      if (auditObj.status == 2) {
        auditObj.rejectReason = this.unSuccStr
      }
      this.auditFn(auditObj)
      this.diglogFlag = false
    },

    // 审核接口请求
    auditFn(obj) {
      getAudit(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.fetchList()
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

    // 搜索
    changeSearch(key, val) {
      for (const item of this[key]) {
        if (item.label === val) {
          this.keyWord[key] = item.value
          break
        }
      }
    },

    // 获取文章列表
    fetchList() {
      const argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10,
        type: this.keyWord.type || '1'
      }

      const keyWord = this.keyWord

      if (keyWord.status) {
        argsObj.status = this.keyWord.status
      }

      if (keyWord.type === '2' && keyWord.timeRange && keyWord.timeRange.length) {
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
      getMerchantList(argsObj).then(res => {
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

        if (this.keyWord.type === '2') {
          if (!this.keyWord.timeRange) {
            return this.$wran('请先选择日期！！！')
          }
        }
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
