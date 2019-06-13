<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="param.status" placeholder="请选择提现状态" clearable
                   @change="stateChangeFn"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!--<span class="text">手机号</span>-->
        <el-input v-model="param.nickname"
                  placeholder="请输入昵称"
                  @keyup.enter.native="nicknameFn"
                  clearable
        ></el-input>
      </el-col>
      <el-col :span="4">
          <!--<span class="text">支付宝</span>-->
          <el-input
            v-model="param.code"
            placeholder="请输入提取码"
            @keyup.enter.native="codeFn"
            clearable
          ></el-input>
      </el-col>
      <!--    <el-col :span="10" class="input-box">
            <span class="text">日期</span>
            <dateTimePicker
              @startDateFn="startDateFn"
              @endDateFn="endDateFn"
            ></dateTimePicker>
          </el-col>-->
      <el-date-picker
        v-model="param.startDay"
        type="datetime"
        placeholder="开始日期"
        @change="dateChangeBeginTime"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-date-picker
        v-model="param.endDay"
        type="datetime"
        placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateChangeEndTime"
      >
      </el-date-picker>
      <el-button type="primary" @click="filter">筛选</el-button>
      <el-button type="warning" @click="resettingFn">重置</el-button>
    </el-row>
  </div>
</template>

<script>
  import {checkMobile, trim} from '@/utils/validate.js'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "kuaKuaMiNav",
    props: {
      from: {
        type: String // 来自哪个页面，根据这个参数的不同，调用不同的接口
      },
      ids:{
        type:Array // 多选的id
      },
      param:{
        type:Object,
        default(){
          return {
            nickname:'',
            code: '',
            status:0,
            startDay: '',
            endDay: '',
            pageSize: 10,
            pageNum: 1,
          }
        }
      }
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        stateOptions: [{ value: 0, label: '待审核' },
          { value: 1, label: '已发放' }, { value: 2, label: '已过期' }]
      }
    },
    watch: {},
    methods: {
      resettingFn() {
        clearOneSession('param')
        clearOneSession('currentPage')
        this.$emit('updateListFn')
      },
      // 派发批量删除的事件
      delsFn() {
        this.$emit('delsFn')
      },
      // 昵称搜索
      nicknameFn(){
        if (event.keyCode == "13" && this.param.nickname){
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      // 手机号搜索
      inputFn(){
        if (event.keyCode == "13" && this.param.phone){
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      codeFn(){
        if (event.keyCode == "13" && this.param.code){
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      stateChangeFn(val){
        if(this.param.status === ''){return}
          this.param.status=val

        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeBeginTime(start){
        if(!start){ return}
        this.param.startDay =start
        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeEndTime(end){
        if(!end){ return}
        this.param.endDay = end
        // setSession('currentPage',1);
        this.searchFn()
      },
      searchFn(event) {
        console.log(this.param);
        for (let prop in this.param) {
          if (this.param[prop] === '' ||this.param[prop] ===null ) {
            delete this.param[prop]
          }
        }
        this.param.pageNum = 1
        setSession('param', this.param)
        this.$emit('searchFn',getSession('param'))
      },
      filter(){
          this.searchFn()
      },
    },
    created() {

    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .input{
    width:210px;
  }
  .input-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      display: inline-block;
      width: 160px;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>


