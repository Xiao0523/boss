<template>
  <div>
    <commissionNav
      :param="searchParame"
      @searchFn="searchFn"
      @submit="submit"
    ></commissionNav>
    <el-row class="btn-box"></el-row>
    <!--回到顶部-->
    <div class="list-box">
      <div class="list-item" v-for="(item,index) in listData" :key="index">
        <div class="list-item-content">
          <p>序号：{{item.index}}</p>
          <input type="text" v-model="listData[index].keyWord">
        </div>
      </div>
    </div>
    <goTop></goTop>
  </div>
</template>

<script>
import commissionNav from "@/components/spiderCategory";
import goTop from "@/components/common/goTop";
import { exportExcel } from "@/utils/validate.js";
import { checkMobile, trim } from "@/utils/validate.js";
import { setSession, getSession, clearOneSession } from "@/utils/session";

export default {
  name: "commissionRebate",
  components: {
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
  methods: {
    // 搜索
    searchFn(parame) {
      this.searchParame = parame;
      console.log("父组件接受的参数", this.searchParame);
      this.initData();
    },
    submit() {
      this.$req
        .patch("v2/reptile/category", {
            cateId:this.searchParame.status,
            categoryDetail4UpdateViews:this.listData
        })
        .then(res => {
            if(res.data.code==0){
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.initData();
            }else{
                this.$message.error('修改失败');
            }
        })
        .catch(err => {
          console.log(err);
        });
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
    initData() {
      this.searchParame = getSession("param");
      this.$req
        .get(`v2/reptile/category/${this.searchParame.status}`)
        .then(res => {
          this.listData = res.data.data.categoryDetailViews;
          //this.listData = res.data.data.kkmCovertViews;

          //this.totalNum = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 审核
    handleAudit(index, row) {
      let realname = JSON.parse(this.userInfo).realname;
      this.$req
        .patch(`kuaKuaMi/covert/${row.id}`)
        .then(res => {
          console.log(res);
          this.$success(res.data.message);
          this.initData();
        })
        .catch(err => {
          console.log(err);
        });
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
    //this.initData();
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
.list-box {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  width: 20%;
}
.list-item-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
