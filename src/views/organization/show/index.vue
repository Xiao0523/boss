<template>
  <div class="container">
    <router-link :to="{name: 'ShowEdit'}">
      <el-button type="info">发布才艺秀比赛</el-button>
    </router-link>

    <el-select v-model="keywords.categroy" />

    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column>
        <template slot-scope="scope">
          <div class="row">
            <div class="row__hd list">
              <router-link :to="{name: 'Competition-detail'}">
                <img class="list-img" src="" alt="图片">
              </router-link>
              <div class="list__bd">
                <h6 class="list-title"><span class="list-status">进行中</span>一顺二维古筝比赛</h6>
                <div class="list-content flex">
                  <div class="list-date">
                    <div class="list-start">发布时间：{{ scope.row.time }}2019-10-21</div>
                    <div class="list-end">结束时间：2019-10-21</div>
                  </div>
                  <div class="list-data flex">
                    <div class="list-data-item">
                      <div>0</div>
                      <div>转发数</div>
                    </div>
                    <div class="list-data-item">
                      <div>0</div>
                      <div>参与人数</div>
                    </div>
                    <div class="list-data-item">
                      <div>0</div>
                      <div>总投票数</div>
                    </div>
                    <div class="list-data-item">
                      <div>0</div>
                      <div>申请单</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">立即参加</el-button>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="课程名称" />
      <el-table-column align="center" label="分类" />
      <el-table-column align="center" label="单价" />
      <el-table-column align="center" label="学员数" />
      <el-table-column align="center" label="教师" />
      <el-table-column align="center" label="课时数" />
      <el-table-column align="center" label="起始日期" /> -->
      <!-- <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">立即参加</el-button>
        </template>
      </el-table-column> -->
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

    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="提示" >

      <el-table>
        <el-table-column align="center" label="奖项"/>
        <el-table-column align="center" label="中奖用户"/>
        <el-table-column align="center" label="联系方式"/>
        <el-table-column align="center" label="联系地址"/>
        <el-table-column align="center" label="奖项"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">确认发放</el-button>
          </template>
      </el-table-column></el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog></div>
</template>

<script>
import pageNum from '@/components/pageNum'
export default {
  name: 'Competition',
  components: {
    pageNum
  },
  data() {
    return {
      dialogVisible: true,
      list: [{}],
      keywords: {
        categroy: ''
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
      }
    }
  },
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
    onDel(item) {

    },
    // 分页点击 事件
    pageChange(page) {

    },
    handleClose() {}
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
  &-start{

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
