<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">

        <el-form-item label="提交时间">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />

          <el-form-item label="状态">
            <el-select v-model="keyWord.status">
              <el-option
                v-for="item in statusList"
                :key="item.label"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="店铺名称">
            <el-input v-model="keyWord.orderNoOrCurriculumName" placeholder="请输入店铺名称" />
          </el-form-item>

          <el-button type="primary" @click="fetchList">搜索</el-button>
      </el-form-item></el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" label="提交时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="storeName" label="店铺名称" />
      <el-table-column align="center" prop="storeAddress" label="店铺地址" />
      <el-table-column align="center" prop="storeContact" label="联系人" />
      <el-table-column align="center" prop="storeTelephone" label="联系电话" />
      <el-table-column align="center" prop="operator" label="操作人" />
      <el-table-column align="center" label="最近一次操作时间">
        <template slot-scope="scope">
          {{ scope.row.opLastTime | timeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="openFlag(scope.row.userId, scope.row.status)">状态管理</el-button>
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
    <el-dialog
      :visible.sync="diglogFlag"
      title="审核"
      width="30%"
      center
      class="diglog"
    >
      <div class="model-box">
        <div class="radio-box">
          <el-radio-group v-model="status">
            <el-radio :label="1">跟进</el-radio>
            <el-radio :label="2">无意向</el-radio>
            <el-radio :label="3">已签约</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="button-box">
          <el-button type="primary" @click="editStatus()">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCanvass, editCanvassStatus } from '@/api/canvass'
import pageNum from '@/components/pageNum'
import { fmtDate } from '@/utils/date'
export default {
  name: 'Canvass',
  filters: {
    timeStr(val) {
      return val && fmtDate(val)
    }
  },
  components: {
    pageNum
  },
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
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      keyWord: {
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        status: 0,
        storeName: ''
      },
      status: '',
      total: null,
      statusList: [{
        label: '未处理',
        value: 0
      }, {
        label: '跟进中',
        value: 1
      }, {
        label: '无意向',
        value: 2
      }, {
        label: '已签约',
        value: 3
      }],
      time: '',
      diglogFlag: false,
      userId: ''
    }
  },
  watch: {
    time() {
      const timeArr = this.time
      this.keyWord.beginTime = fmtDate(timeArr[0].getTime())
      this.keyWord.endTime = fmtDate(timeArr[1].getTime())
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      const getObj = this.keyWord
      getObj.storeId = this.viewId
      getCanvass(getObj).then(res => {
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
    },
    openFlag(val, status) {
      this.diglogFlag = true
      this.userId = val
      this.status = Number(status)
    },
    editStatus(val) {
      const getObj = {
        userId: this.userId,
        status: this.status
      }
      editCanvassStatus(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        this.$success('修改成功！')
        this.diglogFlag = false
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
.button-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.radio-box {
  display: flex;
  justify-content: center;
}
</style>
