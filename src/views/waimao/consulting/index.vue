<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p class="character">代办咨询</p>
          <p class="digital">{{wait}}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <p class="character">回访成功</p>
          <p class="digital">{{success}}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <p class="character">总咨询量</p>
          <p class="digital">{{count}}</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="container">
          <span>咨询列表</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="margin-top: 20px ; float: right">
          <el-radio-group v-model="status" @change="changeTheme">
            <el-radio-button label="-1">全部</el-radio-button>
            <el-radio-button label="0">待办</el-radio-button>
            <el-radio-button label="1">进行中</el-radio-button>
            <el-radio-button label="2">成功</el-radio-button>
            <el-radio-button label="3">终止</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="margin-top: 20px ">
          <el-input placeholder="姓名/联系方式" v-model="keyword" @change="changeTheme">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-table :data="listData" border :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column fixed prop="no" align="center" label="序号" tyle="width: 5%"></el-table-column>
      <el-table-column label="咨询时间" tyle="width: 15%" align="center">
        <template slot-scope="scope">{{ scope.row.createTime | formatDate }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" tyle="width: 10%" align="center"></el-table-column>
      <el-table-column prop="way" label="联系方式" tyle="width: 10%" align="center"></el-table-column>
      <el-table-column prop="detail" label="内容描述" tyle="width: 30%"></el-table-column>
      <el-table-column prop="statusDescription" label="咨询状态" tyle="width: 10%" align="center">
        <template slot-scope="scope">
          <i class="el-icon-chat-dot-round" v-if="scope.row.status === 0"></i>
          <i class="el-icon-loading" v-if="scope.row.status === 1"></i>
          <i class="el-icon-success" v-if="scope.row.status === 2"></i>
          <i class="el-icon-warning" v-if="scope.row.status === 3"></i>
          <span style="margin-left: 10px">{{ scope.row.statusDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" tyle="width: 20%" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            v-if="scope.row.status === 0"
            type="primary"
            size="mini"
            @click="editState(scope.row.uuid,1)"
          >进行中</el-button>

          <el-button
            v-if="scope.row.status === 0 || scope.row.status === 1 "
            type="success"
            size="mini"
            @click="editState(scope.row.uuid ,2)"
          >成功</el-button>

          <el-button
            v-if="scope.row.status === 0 || scope.row.status === 1"
            type="danger"
            size="mini"
            @click="editState(scope.row.uuid ,3)"
          >终止</el-button>

          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pageNumBox">
      <pageNum
        :currentPage="pageNo"
        :pageSize="pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentPageChange"
      ></pageNum>
    </div>
  </div>
</template>

<script>
import { getConsulting, editConsulting } from "@/api/consultation";
import pageNum from "@/components/pageNum";

export default {
  data() {
    return {
      wait: 0, //待办咨询
      success: 0, //	回访成功
      count: 0, //	总数
      listData: [],
      pageNo: 1, //当前页
      pageSize: 5, // 每页的条数
      totalNum: null, // 数据总条数
      tabHeader: {
        "background-color": "#F4F4F4",
        color: "#666666",
        "border-top": "1px solid #BBBBBB",
        "border-bottom": "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
      status: "-1",
      keyword: ""
    };
  },
  components: {
    pageNum
  },
  methods: {
    getConsultingList() {
      let status = this.status === "-1" ? "" : this.status;
      let data = {
        keyword: this.keyword,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        status
      };
      getConsulting(data).then(res => {
        debugger;
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.wait = res.data.data.wait;
        this.success = res.data.data.success;
        this.count = res.data.data.count;
        this.totalNum = res.data.data.pageView.total;
        this.listData = res.data.data.pageView.records;
      });
    },
    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize;
      this.getConsultingList();
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo;
      this.getConsultingList();
    },
    changeTheme(val) {
      console.log(val);
      console.log(this.status);
      this.getConsultingList();
    },
    editState(uuid, status) {
      debugger;
      editConsulting(uuid, status).then(res => {
        debugger;
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.getConsultingList();
      });
    }
  },
  created() {
    this.getConsultingList();
  }
};
</script>

<style scoped lang="scss">
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  position: relative;
  border-radius: 4px;
  min-height: 90px;
  .character {
    padding-top: 10px;
    min-height: 30px;
    text-align: center;
    font-size: 20px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    //font-weight: bold;
    color: rgba(43, 43, 43, 1);
    line-height: 20px;
  }
  .digital {
    text-align: center;
    font-size: 25px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: rgb(252, 247, 247);
    line-height: 25px;
  }
}
.container {
  margin-top: 10px;
  min-height: 50px;
  padding-top: 10px;
  text-align: center;
  font-size: 20px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  line-height: 25px;
}
.db-row {
  background: #d3dce6;
}
.arning-row {
  background: #66b1ff;
}
.success-row {
  background: #67c23a;
}
.termination-row {
  background: #f56c6c;
}
</style>
