<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="name" label="学员" />
      <el-table-column align="center" prop="status" label="手机号" />
      <el-table-column align="center" prop="status" label="交费日期" />
      <el-table-column align="center" prop="status" label="交费金额" />
      <el-table-column align="center" label="课程名称" />
      <el-table-column align="center" label="退款时间">
        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'TuitionLog', query:{id: scope.row.id}}">
            <el-button
              v-if="!scope.row.status"
              type="danger"
              size="mini"
              @click="audit(scope.$index, scope.row)"
            >待审核</el-button>
          </router-link>
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

    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" label-width="80px" title="订单审核" >
      <el-form>
        <div>本单信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学员姓名">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单金额">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单编号">1</el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="8">
            <el-form-item label="联系方式">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款时间">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款时间">1</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单课程">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实收金额">1</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="课时总数">1</el-form-item>
          </el-col>
        </el-row>
        <div>审批退款</div>
        <el-form-item label="审批结论">
          <el-radio label="1">通过</el-radio>
          <el-radio label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="退款金额">
          <el-input/>
        </el-form-item>
        <el-form-item label="审核备注">
          <el-input type="textarea"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import {getPublishList} from '@/api/mediaPublish'
import pageNum from '@/components/pageNum'
export default {
  name: 'RefundLog',
  components: {
    pageNum
  },
  data() {
    return {
      list: [], // 列表数据
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                }
              ]
            }
          ]
        }
      ],
      keyWord: {
        // 搜索关键字
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
      },
      dialogVisible: true
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

    // 点击搜索 获取文章列表 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return
        this.pageNo = 1
        this.fetchList()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
