<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item>
          <el-input v-model="keyWord.storeName" placeholder="请输入店铺名称" />
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
          <el-select v-model="keyWord.score">
            <el-option
              v-for="item in score"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
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
    <span>
      全部账号：{{ infoObj.all }}&nbsp;&nbsp;&nbsp;&nbsp;
      已先下架：{{ infoObj.off }}&nbsp;&nbsp;&nbsp;&nbsp;
      已上架：{{ infoObj.on }}&nbsp;&nbsp;&nbsp;&nbsp;
      待审核：{{ infoObj.waiting }}
    </span>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="phone" label="注册手机号" />
      <el-table-column align="center" prop="name" label="店铺名称" />
      <el-table-column align="center" prop="statusString" label="店铺状态" />
      <el-table-column align="center" prop="submitTime" label="提交时间" />
      <el-table-column align="center" prop="lastAuthTime" label="审核完成时间" />
      <el-table-column align="center" prop="score" label="评分" />
      <el-table-column align="center" prop="weight" label="权重" sortable />
      <el-table-column align="center" prop="orderNum" label="订单数"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'StoreDetail', query: { id: scope.row.storeId }}"><el-button type="danger" size="mini">查看</el-button></router-link>
          <el-button :disabled="scope.row.status !== 2 && scope.row.status !== 4" type="danger" size="mini" @click="audit(scope.row)">审核</el-button>
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
        <el-button type="primary" @click="auditFn('1')">审核通过</el-button>
        <el-button @click="auditFn('2')">驳回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreList, getStoreAudit, getStoreInfo } from '@/api/store'
import pageNum from '@/components/pageNum'
export default {
  name: 'StoreList',
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
        timeRange: '',
        status: '',
        storeName: '',
        score: ''
      },
      diglogFlag: false,
      type: [
        {
          label: '全部',
          value: ''
        }, {
          label: '今日',
          value: '0'
        }, {
          label: '按时间区间查询',
          value: '1'
        }
      ],
      status: [{
        label: '全部',
        value: ''
      }, {
        label: '已上架',
        value: '1'
      }, {
        label: '上架待审核',
        value: '2'
      }, {
        label: '上架失败',
        value: '3'
      }, {
        label: '下架待审核',
        value: '4'
      }, {
        label: '下架失败',
        value: '5'
      }, {
        label: '已下架',
        value: '6'
      }],
      score: [{
        label: '全部',
        value: ''
      }, {
        label: '0-1分',
        value: '1'
      }, {
        label: '1.1-2分',
        value: '2'
      }, {
        label: '2.1-3分',
        value: '3'
      }, {
        label: '3.1-4分',
        value: '4'
      }, {
        label: '4.1-5分',
        value: '5'
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
  mounted() {
    this.fetchList()
    this.getInfo()
  },
  methods: {
    // 审核
    audit(obj) {
      this.activeAudit = obj
      this.diglogFlag = true
    },
    getInfo() {
      getStoreInfo().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.infoObj = res.data.data
      })
    },
    // 审核接口请求
    auditFn(status) {
      const getObj = {
        status: status,
        rejectReason: this.unSuccStr,
        storeId: this.activeAudit.storeId
      }
      getStoreAudit(getObj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.fetchList()
        this.diglogFlag = false
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
        pageSize: this.pageSize || 10
      }

      const keyWord = this.keyWord

      if (keyWord.status) {
        argsObj.status = this.keyWord.status
      }

      if (keyWord.storeName) {
        argsObj.storeName = this.keyWord.storeName
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

        argsObj.beginTime = getDate(keyWord.timeRange[0])
        argsObj.endTime = getDate(keyWord.timeRange[1])
      }
      getStoreList(argsObj).then(res => {
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
