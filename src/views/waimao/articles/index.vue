<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <span>模糊查找：</span>
        <el-form-item>
          <el-input v-model.trim="keyWord" placeholder="标题/发布人" style="width:500px" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true">
        <span>文章状态：</span>
        <el-form-item>
          <el-select v-model="value" clearable placeholder="请选择文章状态" @change="change">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <span>文章类目：</span>
        <el-form-item>
          <el-select v-model="category" clearable placeholder="请选择文章类目" @change="change">
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <span>添加时间：</span>
        <el-form-item>
          <el-date-picker
            v-model="beginTime"
            type="datetime"
            placeholder="开始日期"
            @change="dateChangeBeginTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <span>~</span>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="dateChangeEndTime"
          ></el-date-picker>
        </el-form-item>
        <el-button type="success" @click="addArticle">添加文章</el-button>
      </el-form>
    </el-row>

    <el-table :data="articleList" class="table-box" border>
      <el-table-column :span="20">
        <template slot-scope="scope">
          <div>
            <div class="ax_default _标题">
              <div class></div>
              <div class="text">
                <p>
                  <span>{{ scope.row.title }}</span>
                </p>
              </div>
            </div>
            <div class="ax_default _文本段落">
              <div class></div>
              <div class="text">
                <p>
                  <span
                    style="font-family:'PingFang-SC-Regular', 'PingFang SC';"
                  >{{ scope.row.simpleContext }}</span>
                </p>
              </div>
            </div>
            <div class="_其他">
              <div class="text">
                <p>
                  <span class="_其他" style="width:300px">添加时间：{{ scope.row.createTime | formatDate}}</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span class="center" style="width:400px">
                    文章类目：
                    {{ scope.row.categoryName }}
                  </span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span class="center" style="width:300px">发布人：{{ scope.row.publisher }}</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span class="center">文章状态：</span>
                  <span 
                    :class="scope.row.status ? 'success' : 'danger' "
                  >{{ scope.row.status === '0' ? '显示' :'不显示' }}</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              round
              @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button>
            <el-button
              size="mini"
              type="danger"
              round
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </div>
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
import { getArticleList, getCategory, deleteArticle } from "@/api/consultation";
import pageNum from "@/components/pageNum";
export default {
  name: "Articles",
  components: {
    pageNum
  },
  data() {
    return {
      articleList: [], // 列表数据
      keyWord: "",
      isShow: false, // 弹窗显示标识
      statusList: [
        { id: "0", name: "显示" },
        { id: "1", name: "不显示" },
        { id: "2", name: "全部" }
      ],
      value: "",
      categoryList: [],
      timeRange: "",
      beginTime: "",
      endTime: "",
      category: "",
      pageNo: 1, //当前页
      pageSize: 5, // 每页的条数
      totalNum: null // 数据总条数
    };
  },
  created() {
    this.fetchList();
    this.getCategoryList();
  },

  methods: {
    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize;
      this.fetchList();
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo;
      this.fetchList();
    },
    // 获取文章列表
    fetchList() {
      const status = this.value === "2" ? "" : this.value;
      const fetchObj = {
        beginTime: this.beginTime,
        categoryId: this.category,
        endTime: this.endTime,
        keyword: this.keyWord,
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        status
      };
      getArticleList(fetchObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.totalNum = res.data.data.total;
        this.articleList = res.data.data.records;
      });
    },

    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      this.pageNo = 1;
      this.fetchList();
    },
    change() {
      console.log(this.value);
      this.pageNo = 1;
      this.fetchList();
    },
    dateChangeBeginTime(start) {
      if (!start) {
        return;
      }
      this.beginTime = start;
      this.fetchList();
    },
    dateChangeEndTime(end) {
      if (!end) {
        return;
      }
      this.endTime = end;
      this.fetchList();
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/waimao/toViewArticle",
        query: {
          row: row
        }
      });
    },
    handleDelete(index, row) {
      const getObj = {
        uuid: row.uuid
      };
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteArticle(getObj).then(res => {
            if (res.data.code) {
              return res.data.message && this.$wran(res.data.message);
            }
            this.$success(res.data.message);
            this.fetchList();
          });
        })
        .catch(res => {
          console.log(res);
        });
    },
    addArticle() {
      this.$router.push({
        path: "/waimao/newArticle"
      });
    },
    getCategoryList() {
      getCategory().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.categoryList = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}
.ax_default {
  font-family: "ArialMT", "Arial";
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  letter-spacing: normal;
  color: #333333;
  vertical-align: none;
  text-align: center;
  line-height: normal;
  text-transform: none;
}
._标题 {
  font-family: "ArialMT", "Arial";
  font-weight: bold;
  font-style: normal;
  font-size: 24px;
  text-align: left;
}
._文本段落 {
  text-align: left;
}
.label {
  font-size: 14px;
  text-align: left;
}
#text {
  border-width: 0px;
  white-space: nowrap;
  text-transform: none;
}
.center {
  background-position: center;
}
._其他{
   font-size: 18px;
}
.danger{
  color:#F56C6C
}
.success{
  color: #67C23A
}
</style>
