<template>
  <div>
    <el-row>
      <el-form
        :inline="true"
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-position="right"
        class="demo-ruleForm"
      >
        <el-form-item>
          <el-input
            v-model.trim="ruleForm.key"
            placeholder="公司名称/手机号/用户名"
            clearable
            style="width: 200px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="time"
            :default-time="['00:00:00', '23:59:59']"
            type="datetimerange"
            align="right"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="网站状态">
          <el-select v-model="ruleForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search('ruleForm')">搜索</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="newCategory">新增供应商</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table class="table-box" border :data="suppliersList" :header-cell-style="tabHeader">
      <el-table-column align="center" prop="personName" label="用户名"></el-table-column>
      <el-table-column align="center" prop="mobilePhone" label="手机号"></el-table-column>
      <el-table-column align="center" prop="companyName" label="公司名称"></el-table-column>
      <el-table-column align="center" prop="terminationTime" label="服务有效期"></el-table-column>
      <el-table-column align="center" prop="status" label="供应商状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 0 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.status === 0 ?"关闭":"开启"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="webAddress" label="网址"></el-table-column>
      <el-table-column align="center" prop="createTime" label="添加时间"></el-table-column>
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
import { getSuppliersList } from "@/api/personSuppliers";
import pageNum from "@/components/pageNum";
export default {
  data() {
    return {
      pageNo: 1, //当前页
      pageSize: 10, // 每页的条数
      totalNum:'',
      time: "",
      suppliersList:[],
      ruleForm: {
        key: "",
        time: "",
        status: "",
        beginTime:"",
        endTime:""
      },
      statusList: [
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "1",
          label: "启用"
        },
        {
          value: "2",
          label: "全部"
        }
      ],
      tabHeader: {
        "background-color": "#F4F4F4",
        color: "#666666",
        "border-top": "1px solid #BBBBBB",
        "border-bottom": "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      }
    };
  },
  components: {
    pageNum
  },
  watch: {
    time() {
      const timeArr = this.time;
      this.ruleForm.beginTime = fmtDate(timeArr[0].getTime());
      this.ruleForm.endTime = fmtDate(timeArr[1].getTime());
    }
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
        beginTime: this.ruleForm.beginTime,
        endTime: this.ruleForm.beginTime,
        key: this.ruleForm.beginTime,
        pageNum: this.pageNo,
        pageSize:this.pageSize,
        status:  this.ruleForm.status,
      };
      getSuppliersList(data).then(res => {
        debugger;
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.suppliersList = res.data.data.records;
        this.totalNum = res.data.data.total;
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
    resetForm(formName) {
      debugger;
      this.formName = {
        key: "",
        time: "",
        status: ""
      };
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.fetchCategory();
  }
};
</script>

<style scoped lang="scss">
</style>
