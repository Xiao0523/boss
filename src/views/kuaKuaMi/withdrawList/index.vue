<template>
  <div>
    <commissionNav :param="searchParame" @searchFn="searchFn" @updateListFn="updateListFn"></commissionNav>
    <el-row class="btn-box"></el-row>
    <el-table
      id="out-table"
      class="table-box"
      :data="listData"
      empty-text="暂无数据"
      style="width: 100%"
      border
      :header-cell-style="tabHeader"
    >
      <el-table-column align="center" prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column align="center" prop="code" label="提取码"></el-table-column>
      <el-table-column align="center" prop="createTime" label="提现日期"></el-table-column>
      <el-table-column align="center" prop="convertScore" label="提现金额"></el-table-column>
      <el-table-column align="center" prop="finishTime" label="到账时间"></el-table-column>
      <el-table-column align="center" prop="status" label="到账情况"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <div class="operation-box">
            <el-button
              size="mini"
              :disabled="examineDisabled"
              @click="handleAudit(scope.$index, scope.row)"
            >审核</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="pageNumBox">
      <pageNum
        :currentPage="searchParame.pageNum"
        :pageSize="searchParame.pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentChangeFn"
      ></pageNum>
    </div>
    <!--回到顶部-->
    <goTop></goTop>
  </div>
</template>

<script>
import commissionNav from "@/components/kuaKuaMiFilter";
import dateTimePicker from "@/components/common/dateTimePicker";
import pageNum from "@/components/pageNum";
import goTop from "@/components/common/goTop";
import { exportExcel } from "@/utils/validate.js";
import { checkMobile, trim } from "@/utils/validate.js";
import { setSession, getSession, clearOneSession } from "@/utils/session";

export default {
  name: "commissionRebate",
  components: {
    dateTimePicker,
    pageNum,
    goTop,
    commissionNav
  },
  computed: {
    // 登录信息
    userInfo() {
      return this.$store.getters.userInfo;
    },
    status() {
      return this.searchParame.status;
    }
  },
  data() {
    return {
      searchParame: {},
      examineDisabled: false,
      /*      param: {
                Alipayaccount: '',
                phone: '',
                state: '',
                startDay: '',
                endDay: '',
                pageSize: 10,
                pageNum: 1,
              },*/
      listData: [],
      pageNo: null,
      pageSize: null,
      totalNum: null,
      tabHeader: {
        "background-color": "#F4F4F4",
        "color": "#666666",
        "border-top": "1px solid #BBBBBB",
        "border-bottom": "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      }
    };
  },
  methods: {
    // 更新列表数据
    updateListFn() {
      this.ids = [];
      this.initData();
    },
    // 搜索
    searchFn(parame) {
      this.searchParame = parame;
      console.log("父组件接受的参数", this.searchParame);
      this.initData();
    },
    /*   dateChangeBeginTime(start){
        if(!start){return}
        this.param.startDay =start
        setSession('currentPage',1);
      },
      dateChangeEndTime(end){
        if(!end){return}
        this.param.endDay = end
        setSession('currentPage',1);
      },*/
    sizeChangeFn(size) {
      this.searchParame.pageSize = size;
      let param = getSession("param");
      if (param === "undefined" || param === undefined) {
        param = {};
        param.status = 0;
      }
      param.pageSize = this.searchParame.pageSize;
      param.pageNum = this.searchParame.pageNum;
      setSession("param", param);
      console.log("每页条数改变时触发：" + this.searchParame.pageSize);
      this.initData();
    },
    currentChangeFn(page) {
      console.log(this.searchParame);
      this.searchParame.pageNum = page;
      let param = getSession("param");
      if (param === "undefined" || param === undefined) {
        param = {};
        param.status = 0;
      }
      param.pageSize = this.searchParame.pageSize;
      param.pageNum = this.searchParame.pageNum;

      setSession("param", param);
      console.log("页码改变触发" + this.searchParame.pageNo);
      this.initData();
    },

    initData() {
      // 分页查询
      this.searchParame = getSession("param");
      if (
        this.searchParame === "undefined" ||
        this.searchParame === undefined
      ) {
        this.searchParame = { pageNum: 1, pageSize: 10, status: 0 };
      }
      this.$req
        .post("kuaKuaMi/converts", this.searchParame)
        .then(res => {
          this.listData = res.data.data.kkmCovertViews;
          this.totalNum = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 审核
    handleAudit(index, row) {
      let realname = JSON.parse(this.userInfo).realname;
      this.$req.patch(`kuaKuaMi/covert/${row.id}`).then(res => {
          console.log(res)
          this.$success(res.data.message)
          this.initData()
        }
      ).catch(err => {
        console.log(err)
      })
    }
  },
  watch: {
    status(val) {
      if (val !== 0) {
        this.examineDisabled = true;
      } else {
        this.examineDisabled = false;
      }
    }
  },
  created() {
    this.initData();
  },
  // 离开列表页
  beforeRouteLeave: function(to, from, next) {
    if (to.name != "memberDetais") {
      clearOneSession("param");
      clearOneSession("currentPage");
    }
    next();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.input-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    display: inline-block;
    width: 80px;
  }
}
.btn-box {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
