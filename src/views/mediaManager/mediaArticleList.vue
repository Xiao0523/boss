<template>
  <div>
    <commissionNav :param="searchParame" @searchFn="searchFn" @updateListFn="updateListFn"></commissionNav>
    <el-row class="btn-box"></el-row>

    <div style="overflow:hidden;">
      <div style="float:left;width:50%">
        <el-table
          id="out-table"
          class="table-box"
          :data="listData"
          empty-text="暂无数据"
          style="width: 100%"
          border
          :header-cell-style="tabHeader"
          @row-click="changepreview"
        >
          <el-table-column width="100" align="center" prop="source" label="用户昵称"></el-table-column>
          <el-table-column align="center" prop="title" label="标题"></el-table-column>
          <el-table-column width="100" align="center" prop="updateTime" label="提交日期"></el-table-column>
          <el-table-column width="100" align="center" prop="convertScore" label="图片">
            <template slot-scope="scope">
              <img class="media-img" :src="scope.row.pics[0]" alt>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center" label="审核状态">
            <template slot-scope="scope">
              <div>{{scope.row.audit_stauts==0?'未审核':scope.row.audit_stauts==1?'审核通过':'审核失败'}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <div class="operation-box">
                <el-button
                  size="mini"
                  type="success"
                  :disabled="examineDisabled"
                  @click.stop="choseTag(scope.row)"
                >审核通过</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  :disabled="examineDisabled"
                  @click.stop="handleAudit(scope.row,2)"
                >审核失败</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="ql-editor"
        style="float:left;width:375px;height:667px;margin-left:100px;border:1px solid #ccc;"
        v-html="previewContent"
      ></div>
    </div>

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
    <!--审核失败原因-->

    <el-dialog title="审核失败原因" :visible.sync="dialogFormVisible">
      <!-- <el-input type="textarea" rows="10" v-model="explain"></el-input> -->
      <el-radio-group v-model="explain">
        <el-radio :label="'文章已有（重复）'">文章已有（重复）</el-radio>
        <el-radio :label="'文章中有涉及广告、色情、不良信息等不符合内容要求的信息'">文章中有涉及广告、色情、不良信息等不符合内容要求的信息</el-radio>
        <el-radio :label="'文章老旧'">文章老旧</el-radio>
        <el-radio :label="'文章存在抄袭嫌疑'">文章存在抄袭嫌疑</el-radio>
        <el-radio :label="'文章内容标题不符'">文章内容标题不符</el-radio>

      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDel">取 消</el-button>
        <el-button type="primary" @click="submitFail">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 类目选择 -->
    <tag-chose
      :tagMenuShow="isEditTag"
      :row="row"
      :tags="tags"
      @confirmMenuFn="handleAudit"
      @cancelMenuFn="cancelMenuFn"
    ></tag-chose>
  </div>
</template>

<script>
import commissionNav from "@/components/mediaManageFilter";
import dateTimePicker from "@/components/common/dateTimePicker";
import pageNum from "@/components/pageNum";
import goTop from "@/components/common/goTop";
import { exportExcel } from "@/utils/validate.js";
import { checkMobile, trim } from "@/utils/validate.js";
import { setSession, getSession, clearOneSession } from "@/utils/session";
import tagChose from "./component/tagChose";
export default {
  name: "commissionRebate",
  components: {
    dateTimePicker,
    pageNum,
    goTop,
    commissionNav,
    tagChose
  },
  computed: {
    // 登录信息
    userInfo() {
      return this.$store.getters.userInfo;
    },
    audit_stauts() {
      return this.searchParame.audit_stauts;
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
        color: "#666666",
        "border-top": "1px solid #BBBBBB",
        "border-bottom": "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
      previewContent: "",
      dialogFormVisible: false,
      row: {},
      explain: "",
      isEditTag: false,
      tags:[]
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
    sizeChangeFn(size) {
      this.searchParame.pageSize = size;
      let param = getSession("param");
      if (param === "undefined" || param === undefined) {
        param = {};
        param.audit_stauts = 0;
      }
      param.pageSize = this.searchParame.pageSize;
      param.pageNum = this.searchParame.pageNum;
      setSession("param", param);
      console.log("每页条数改变时触发：" + this.searchParame.pageSize);
      this.initData();
    },
    currentChangeFn(page) {
      this.searchParame.pageNum = page;
      let param = getSession("param");
      if (param === "undefined" || param === undefined) {
        param = {};
        param.audit_stauts = 0;
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
        this.searchParame = { pageNum: 1, pageSize: 10, audit_stauts: 0 };
      }
      this.$req
        .post("TheBackgroundPage", {
          page: this.searchParame.pageNum,
          pagesize: this.searchParame.pageSize,
          audit_stauts: this.searchParame.audit_stauts
        })
        .then(res => {
          this.listData = res.data.data.rows;
          this.totalNum = res.data.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 审核
    handleAudit(row, status) {
      this.row = row;
      if (status == 1) {
        this.isEditTag = false;
        row.audit_stauts = 1;
        this.$req.post("ReviewTheInterface", row).then(res => {
          if (res.data.code == 0) {
            this.initData();
            this.$success(res.data.message);
          } else {
            row.audit_stauts = 0;
            console.log("提交失败");
          }
        });
      } else if (status == 2) {
        this.dialogFormVisible = true;
      }
    },
    //选择标签
    choseTag(row) {
      this.isEditTag = true;
      this.row = row;
    },
    cancelMenuFn() {
      this.isEditTag = false;
    },
    changepreview(row, event, column) {
      this.previewContent = row.content;
    },
    submitFail() {
      this.dialogFormVisible = false;
      this.row.explain = this.explain;
      this.row.audit_stauts = 2;
      this.$req.post("ReviewTheInterface", this.row).then(res => {
        if (res.data.code == 0) {
          this.explain = "";
          this.$success(res.data.message);
          this.initData();
        } else {
          this.explain;
          this.row.audit_stauts = 0;
          console.log("提交失败");
        }
      });
    },
    submitDel() {
      this.dialogFormVisible = false;
      this.explain = "";
    },
    getTags(){
      this.$req.get(`v2/shareCategory/1/999`).then(res=>{
          this.tags=res.data.data.records;
      })
    }
  },
  watch: {
    // 审核后文章也可重新改变审核状态
    audit_stauts(val) {
      // if (val !== 0) {
      //   this.examineDisabled = true;
      // } else {
      //   this.examineDisabled = false;
      // }
    }
  },
  created() {
    this.initData();
    this.getTags();
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
.media-img {
  width: 51px;
  height: 33px;
  vertical-align: middle;
}
.el-radio{
  display: block;
}
.el-radio+.el-radio{
  margin-left:0px;
  margin-top:10px;
}
</style>
