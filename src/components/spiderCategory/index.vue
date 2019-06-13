<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="param.status" placeholder="请选择类目" clearable @change="stateChangeFn">
          <el-option
            v-for="item in stateOptions"
            :key="item.id"
            :label="item.cname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-col>
      <el-col :span="12">
        <section class="ruler">
          <h1 class="ruler-title">抓取规则：</h1>
          <section>
            <section>
              <h1 class="ruler-item" style="margin-top:0!important">抓取格式</h1>
              <p class="ruler-content">关键词#过滤词1,过滤词2,....过滤词n</p>
            </section>
            <section>
              <h1 class="ruler-item">比如</h1>
              <p class="ruler-content">朱元璋#朱德,朱自清</p>
            </section>
            <section>
              <h1 class="ruler-item">意思</h1>
              <p class="ruler-content">抓取标题为朱元璋的文章，并且不能带有朱德、朱自清的标题。过滤词使用半角逗号分隔。</p>
            </section>
          </section>
        </section>
      </el-col>
      <!-- <el-button type="primary" @click="filter">筛选</el-button> -->

    </el-row>
  </div>
</template>

<script>
import { checkMobile, trim } from "@/utils/validate.js";
import { setSession, getSession, clearOneSession } from "@/utils/session";
export default {
  name: "kuaKuaMiNav",
  props: {
    from: {
      type: String // 来自哪个页面，根据这个参数的不同，调用不同的接口
    },
    ids: {
      type: Array // 多选的id
    },
    param: {
      type: Object,
      default() {
        return {
          nickname: "",
          code: "",
          status: "",
          startDay: "",
          endDay: "",
          pageSize: 10,
          pageNum: 1
        };
      }
    }
  },
  computed: {
    // 登录信息
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  data() {
    return {
      stateOptions: []
    };
  },
  watch: {},
  methods: {
    stateChangeFn(val) {
      if (this.param.status === "") {
        return;
      }
      this.param.status = val;

      // setSession('currentPage',1);
      this.searchFn();
    },
    searchFn(event) {
      for (let prop in this.param) {
        if (this.param[prop] === "" || this.param[prop] === null) {
          delete this.param[prop];
        }
      }
      this.param.pageNum = 1;
      setSession("param", this.param);
      this.$emit("searchFn", getSession("param"));
    },
    submit(){
      this.$emit("submit");
    },
    getTagList() {
      this.$req
        .get(`v2/shareCategory/1/999`)
        .then(res => {
            console.log(res);
            this.stateOptions=res.data.data.records;
          //this.tagList = res.data.data.records;
          // console.log('tagList', this.tagList)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getTagList();
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.input {
  width: 210px;
}
.input-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    display: inline-block;
    width: 160px;
    box-sizing: border-box;
    text-align: center;
  }
}
.ruler{
  display:flex;
}
.ruler-title{
  font-size:1.5em;
  color:#f00;
  margin-top:0;
}
.ruler-item{
  font-size:1em;
  margin-top:0.5em!important;
  margin-bottom:0.5em!important;
  color:#f00;
  text-indent: 1em;
}
.ruler-content{
  font-size:1em;
  margin-top:0em!important;
  margin-bottom:1em!important;
  color:#f00;
  text-indent: 1em;
}
</style>


