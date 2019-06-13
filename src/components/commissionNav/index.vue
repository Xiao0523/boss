<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="param.state" placeholder="请选择提现状态" clearable
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
        <el-input v-model="param.nickName"
                  placeholder="请输入昵称"
                  @keyup.enter.native="nickNameFn"
                  clearable
        ></el-input>
      </el-col>
      <el-col :span="4">
          <!--<span class="text">手机号</span>-->
          <el-input v-model="param.phone"
                    placeholder="请输入手机号"
                    @keyup.enter.native="inputFn"
                    clearable
          ></el-input>
      </el-col>
      <el-col :span="4">
          <!--<span class="text">支付宝</span>-->
          <el-input
            v-model="param.alipayAccount"
            placeholder="请输入支付宝账号"
            @keyup.enter.native="AlipayaccountFn"
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
      <el-button type="warning" @click="resettingFn">重置</el-button>
    </el-row>
  </div>
</template>

<script>
  import {checkMobile, trim} from '@/utils/validate.js'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "searchNav",
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
            nickName:'',
            alipayAccount: '',
              phone: '',
              state:2,
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
        stateOptions: [{ value: 1, label: '已审核' },
          { value: 2, label: '审核中' }, { value: 3, label: '涉嫌刷单' }]
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
      nickNameFn(){
        if (event.keyCode == "13" && this.param.nickName){
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
      AlipayaccountFn(){
        if (event.keyCode == "13" && this.param.alipayAccount){
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      stateChangeFn(val){
        if(this.param.state === ''){return}
          this.param.state=val

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


