<template>
  <div class="container">
    <router-link :to="{name: 'ShowEdit'}">
      <el-button type="info">发布才艺秀比赛</el-button>
    </router-link>

    <el-select v-model="status" @change="fetchList">
      <el-option
        v-for="item in options"
        :value="item.value"
        :key="item.value"
        :label="item.label"
      />
    </el-select>

    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="id" label="才艺秀编号" />
      <el-table-column align="center" prop="name" label="名称" />
      <el-table-column align="center" prop="participants" label="参与人数" />
      <el-table-column align="center" label="封面图">
        <template slot-scope="scope">
          <div class="coverImg">
            <img :src="scope.row.picCover" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="reward" label="奖励" />
      <el-table-column align="center" prop="votes" label="投票数" />
      <el-table-column align="center" label="征集时间">
        <template slot-scope="scope">
          {{ scope.row.solicitationBeginTime }} - {{ scope.row.solicitationEndTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="投票时间">
        <template slot-scope="scope">
          {{ scope.row.voteBeginTime }} - {{ scope.row.voteEndTime }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <router-link :to="{name: 'ShowEdit', query: {id: scope.row.id}}">
            <el-button size="mini">编辑</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="onDel(scope.row.id)">关闭</el-button>
          <router-link :to="{name: 'CompositionList', query: {id: scope.row.id}}">
            <el-button size="mini">作品列表</el-button>
          </router-link>
          <router-link :to="{name: 'RewardList', query: {id: scope.row.id}}">
            <el-button size="mini">奖励列表</el-button>
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
  </div>
</template>

<script>
import { getTlentShowList, delTlentShow } from '@/api/tlentShow'
import pageNum from '@/components/pageNum'
export default {
  name: 'Competition',
  components: {
    pageNum
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
      options: [{
        value: 0,
        label: '征集中'
      }, {
        value: 1,
        label: '投票中'
      }, {
        value: 2,
        label: '已结束'
      }, {
        value: 3,
        label: '已下架'
      }],
      status: 0,
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
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    // 关闭才艺秀
    onDel(id) {
      const delObj = {
        id: id
      }
      delTlentShow(delObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.fetchList()
      })
    },
    // 获取列表
    fetchList() {
      const argsObj = {
        status: this.status,
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10
      }
      getTlentShowList(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.totalNum = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
    },
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchList()
    },
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchList()
    },
    handleClose() {}
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.coverImg {
  display: table-cell;
  width: 100px;
  height: 100px;
  vertical-align: middle;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}
.flex,
.row{
  display: flex;
  align-items: center
}
.row{
  &__hd{
    flex: 1;

  }
}
.list{
  display: flex;
  align-items: center;
  &__bd{
    flex: 1;
    height: 100px;
    margin-left: 10px;
  }
  &-img{
    width: 100px;
    height: 100px;
    display: block
  }
  &-title{
    margin: 0 0 10px 0
  }
  &-status{
    margin-right: 30px;
  }
  &-date{
    padding-right: 20px;
    border-right: 1px solid #000;
  }
  &-end{
    margin-top: 10px;
  }
  &-data{
    padding-left: 20px;
    text-align: center;
    &-item{
      width: 100px
    }
  }

}
</style>
