<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model.trim="keyWord" placeholder="请输入类目名称" clearable style="width: 400px;"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search" style="margin-left: 80px">搜索</el-button>
        <el-button type="primary" @click="newCategory" style="margin-left: 80px">新增类目</el-button>
      </el-form>
    </el-row>
    <el-table class="table-box" border :data="Category" :header-cell-style="tabHeader">
      <el-table-column align="center" prop="categoryName" label="类目名称"></el-table-column>
      <el-table-column align="center" prop="articleNum" label="文章数"></el-table-column>
      <el-table-column align="center" prop="orderIndex" label="排序"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status === 0 ?"关闭":"开启"}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button
            type="success"
            size="mini"
            v-if="scope.row.status === 0"
            @click="del(scope.row.uuid,1)"
          >开启</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="scope.row.status === 1"
            @click="del(scope.row.uuid,0)"
          >禁用</el-button>
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
    <el-dialog :title="operationType" :visible.sync="isShow" width="30%">
      <el-form ref="form" label-position="left">
        <el-form-item label="类目名称">
          <el-input v-model="categoryName" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input type="number" v-model="orderIndex" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryList, editCategory, delCategory } from "@/api/consultation";
import pageNum from "@/components/pageNum";
export default {
  data() {
    return {
      keyWord: "",
      Category: [],
      totalNum: null, // 数据总条数
      pageNo: 1, //当前页
      pageSize: 10, // 每页的条数
      tabHeader: {
        "background-color": "#F4F4F4",
        color: "#666666",
        "border-top": "1px solid #BBBBBB",
        "border-bottom": "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
      isShow: false,
      categoryName: "",
      orderIndex: "",
      operationType: "新增类目",
      uuid: ""
    };
  },
  components: {
    pageNum
  },

  methods: {
    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      if (!this.keyWord) {
        return this.$wran("请输入类目名称");
      }
      this.pageNo = 1;
      this.fetchCategory();
    },
    fetchCategory() {
      let data = {
        keyword: this.keyWord,
        pageNum: this.pageNo,
        pageSize: this.pageSize
      };
      getCategoryList(data).then(res => {
        debugger;
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.Category = res.data.data.pager.records;
        this.totalNum = res.data.data.pager.total;
      });
    },
    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize;
      this.fetchCategory();
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo;
      this.fetchCategory();
    },
    newCategory() {
      this.isShow = true;
      this.uuid = "";
      this.operationType = "新增类目";
    },
    edit(row) {
      this.isShow = true;
      this.operationType = "修改类目";
      this.categoryName = row.categoryName;
      this.orderIndex = row.orderIndex;
      this.orderIndex = row.orderIndex;
      this.uuid = row.uuid;
    },
    //删除
    del(uuid, status) {
      delCategory(uuid, status).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.categoryName = "";
        this.orderIndex = "";
        this.uuid = "";
        this.isShow = false;
        this.pageNo = 1;
        this.fetchCategory();
      });
    },
    onSubmit() {
      if (!this.categoryName) {
        return this.$wran("请输入类目名称");
      }
      if (!this.orderIndex) {
        return this.$wran("请输入排序");
      }
      let data = {
        categoryName: this.categoryName,
        orderIndex: this.orderIndex,
        uuid: this.uuid
      };
      editCategory(data).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.categoryName = "";
        this.orderIndex = "";
        this.uuid = "";
        this.isShow = false;
        this.pageNo = 1;
        this.fetchCategory();
      });
    },
    close() {
      this.categoryName = "";
      this.orderIndex = "";
      this.uuid = "";
      this.isShow = false;
    },
    filterTag(value, row) {
      return row.tag === value;
    }
  },
  created() {
    this.fetchCategory();
  }
};
</script>

<style scoped lang="scss">
</style>
