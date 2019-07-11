<template>
  <div>
    <el-row :gutter="20">
      <!--   <el-col :span="5">
        <div class="input-box">
          <span>手机号</span>
          <el-input class="input"
                    placeholder="请输入手机号"
                    clearable>
          </el-input>
        </div>
      </el-col>

      <el-col :span="9">
        <div class="date-box">
          <span>日期</span>
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </el-date-picker>
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </el-date-picker>
        </div>
      </el-col>-->
      <el-col :span="6">
        <el-button type="primary" @click="addFn()">添加标签</el-button>
      </el-col>
    </el-row>

    <el-table
      class="table-box"
      :data="listData"
      empty-text="暂无数据"
      style="width: 40%;margin-top:20px"
      max-height="700"
      ref="multipleTable"
      :row-key="getRowKeys"
      :header-cell-style="tabHeader"
    >
      <el-table-column prop="name" align="center" label="标签" width="200"></el-table-column>

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="operation-box">
            <el-button size="mini" @click="handleRelate(scope.$index, scope.row,1)">关联文章类目</el-button>
            <el-button size="mini" @click="handleRelate(scope.$index, scope.row,2)">关联爬虫类目</el-button>
            <el-button size="mini" @click="addFn(scope.$index, scope.row)">修改名称</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Dialog :isShow="visible" @cancelFn="visible = false" @confirmFn="confirmFn">
      <span slot="del">删除操作不可恢复，确认删除？</span>
    </Dialog>
    <!-- 菜单权限 -->
    <relatedMenuDialog
      :dialogMenuVisible="isRelatedMenu"
      :relatedType="relatedType"
      :relatedId="relatedId"
      @cancelMenuFn="cancelMenuFn"
      @confirmMenuFn="confirmMenuFn"
    ></relatedMenuDialog>
  </div>
</template>

<script>
import { setSession, getSession, clearOneSession } from "@/utils/session";
import { mapGetters, mapMutations } from "vuex";
import searchNav from "@/components/common/searchNav";
import Dialog from "@/components/common/dialog";
import pageNum from "@/components/pageNum";
import relatedMenuDialog from "./components/relatedMenuDialog";
export default {
  name: "AppList",
  components: {
    searchNav,
    Dialog,
    pageNum,
    relatedMenuDialog
  },
  computed: {
    // 用户信息
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  data() {
    return {
      listData: [],
      delId: [],
      relatedId: "",
      getRowKeys(row) {
        return row.id;
      },
      startDate: "",
      endDate: "",
      visible: false,
      isRelatedMenu: false,
      tabHeader: {
        "background-color": "#fff",
        color: "#000",
        "font-size": "16px",
        "text-align": "center"
      },
      relatedType: 1
    };
  },
  filters: {
    typeStatus(val) {
      return val == 0 ? "文章" : val == 1 ? "APP" : "未知";
    },
    statusFilter(val) {
      return val == 0 ? "未启用" : val == 1 ? "启用" : "未知";
    }
  },
  methods: {
    ...mapMutations(["set_tagIds"]),
    // 添加标签
    addFn(index, row) {
      let name = row ? row.name : "";
      let uuid = row ? row.id : "";
      this.$prompt("", "标签名称", {
        confirmButtonText: name ? "修改" : "添加",
        cancelButtonText: "取消",
        center: true,
        inputValue: name ? name : ""
      })
        .then(({ value }) => {
          if (!name) {
            this.$req
              .get(`v2/videoCategory/addVideoCategory?tagName=${value}`)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                  this.initData();
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.$req
              .get(
                `v2/videoCategory/updateVideoCategory?tagName=${value}&uuid=${uuid}`
              )
              .then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  this.initData();
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    reSetFn() {
      this.$refs.multipleTable.clearSelection();
    },
    // 搜索
    searchFn(res) {
      this.appList = res.data.data;
    },
    // 确认删除
    confirmFn() {
      this.$req
        .get(`v2/videoCategory/deleteVideoCategory?uuid=${this.delId}`)
        .then(res => {
          if (res.data.code == 0) {
            this.visible = false;
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.initData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看编辑
    handleRelate(index, row, type) {
      //1 关联文章类目   2 关联爬虫类目
      this.relatedType = type;
      this.relatedId = row.id;
      this.isRelatedMenu = true;
      //        console.log(index, row);
      //   this.$router.push({
      //     path: "/categoryManager/categoryDetails",
      //     query: {
      //       id: row.id
      //     }
      //   });
    },
    // 删除
    handleDelete(index, row) {
      this.delId = row.id;
      this.visible = true;
    },
    initData() {
      this.$req
        .get(`v2/videoCategory/getVideoCategory`)
        .then(res => {
          this.listData = res.data.data;
          // console.log(this.listData);
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirmMenuFn() {
      this.isRelatedMenu = false;
      this.$message({
        type: "success",
        message: "关联成功"
      });
    },
    cancelMenuFn() {
      this.isRelatedMenu = false;
    }
  },
  // 离开列表页,去其他侧边栏
  beforeRouteLeave: function(to, from, next) {
    if (to.name != "categoryEdit") {
      clearOneSession("param");
      clearOneSession("currentPage");
    }
    next();
  },
  created() {},
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
.operation-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.table-box {
  margin-top: 20px;
}
</style>

