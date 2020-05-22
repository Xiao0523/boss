<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="keyWord" ref="searchForm">
        <span>模糊查找：</span>
        <el-form-item>
          <el-input v-model.trim="keyWord.title" placeholder="标题/发布人" clearable></el-input>
        </el-form-item>

        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
        <span>文章状态：</span>
        <el-form-item>
          <el-select v-model="statusStr" clearable placeholder="请选择文章状态">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <span>发布日期：</span>
        <el-form-item>
          <el-date-picker
            v-model="keyWord.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-button type="success" @click="addNovel">添加文章</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" class="table-box" border>
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
                  >{{ scope.row.content }}</span>
                </p>
              </div>
            </div>
            <div class="ax_default">
              <div class></div>
              <div class="text">
                <p>
                  <span class="label">发布人：{{ scope.row.issuedBy }}</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span class="center">发布时间：{{ scope.row.date }}</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="ax_default shape"
            @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="totalNum" class="pageNumBox">
      <pageNum
        :current-page="fetchObj.pageNum"
        :page-size="fetchObj.pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentChangeFn"
      />
    </div>
  </div>
</template>
<script>
import { getBannerList } from "@/api/lanBanner";
import pageNum from "@/components/pageNum";
export default {
  name: "Articles",
  components: {
    pageNum
  },
  data() {
    return {
      list: [], // 列表数据
      activeName: "first",
      keyWord: {
        // 搜索关键字
        type: "",
        timeRange: ""
      },
      isShow: false, // 弹窗显示标识
      statusStr: "全部",
      statusList: [
        { id: "00", name: "全部" },
        { id: "01", name: "发布1" },
        { id: "02", name: "发布2" },
        { id: "03", name: "发布3" }
      ],
      fetchObj: {
        pageNum: 1,
        pageSize: 5,
        position: "",
        status: "",
        type: ""
      },
      totalNum: 0
    };
  },
  created() {
    this.fetchList();
  },

  methods: {
    // 分页改变 每页数量
    sizeChangeFn(size) {
      this.fetchObj.pageSize = size;
      this.fetchList();
    },
    // currentPage(	当前页) 改变时会触发
    currentChangeFn(page) {
      this.fetchObj.pageNum = page;
      this.fetchList();
    },
    // 获取文章列表
    fetchList() {
      const fetchObj = this.fetchObj;
      debugger;
      getBannerList(fetchObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        if (!res.data.data) return;
        this.totalNum = res.data.data.total;
        const records = res.data.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i].title = "工厂做外贸一直接不到订单怎么办?";
          records[i].content =
            "工厂做外贸一直接不到订单怎么办?其实工作接外贸单子的方法有很多,你需要每一个方法都去认真仔细去研究,这里宁波外贸水手分享一下几个常见的营销方法(百度搜索”宁波外贸水手运营”)1、邮件营销" +
            "利用社交媒体和发开发信的方式来推广应该是所有推广中花费最少的，操作也是简单粗暴，手动或利用软件就能实现群发邮件，但是这种广撒网的方式存在的最大弊端是低客户回报率。想必大多数人也都经历过各类邮箱广告以及社交私信的狂轰乱炸，后果就是邮件屏蔽率上升打开率极低，对于迫切想要开发客户的人来说这种方式应该是直接被pass掉的，当然这可以作为辅助的营销手段。" +
            "2、展会" +
            "展会是最传统的一种外贸推广方式，我们可以直接在展会现场找到意向买家，甚至一些订单在现场就可以拿下，但是目前在一场展会上的投…";
          records[i].date = records[i].beginTime;
          records[i].issuedBy = "王小虎";
        }
        this.list = records && records.length ? records : [];
      });
    },
    addNovel() {},
    handleTabClick(tab, event) {},
    // 点击搜索 获取文章列表 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return;
        this.pageNo = 1;
        this.fetchList();
      });
    },
    handleEdit(index,row){
       console.log(index,row)
          this.$router.push({
              path: '/waimao/toViewArticle',
              query: {
                row: row,
              }
            })
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
</style>
