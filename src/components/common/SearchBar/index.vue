<template>
  <div>
    <el-row :gutter="20">
      <!--会员nav-->
      <el-col :span="4" v-if="from== 'memberList' ">
        <el-select v-model="param.isActive" clearable placeholder="请选择" @change="isActiveFn">
          <el-option
            v-for="item in memberIsActive"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" v-if="from== 'memberList' ">
        <el-input class="input"
                  :placeholder="placeholder"
                  v-model="param.nickname"
                  @keyup.enter.native="nicknameFn"
                  clearable>
        </el-input>

      </el-col>
      <el-col :span="4" v-if="from== 'memberList' ">
          <el-input class="input"
                    placeholder="请输入手机号"
                    v-model="param.phone"
                    @keyup.enter.native="phoneFn"
                    clearable>
          </el-input>
      </el-col>
      <el-col :span="4" v-if="from== 'memberList' ">
        <el-select v-model="param.sort" clearable placeholder="请选择排序方式" @change="sortByFn">
          <el-option
            v-for="item in memberSort"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <!--管理员nav-->
      <el-col :span="4" v-if="from== 'adminList' ">
          <el-input class="input"
                    placeholder="请输入姓名或手机号"
                    v-model="param.key"
                    @keyup.enter.native="keyFn"
                    clearable>
          </el-input>
      </el-col>
      <!--商家-->
      <el-col :span="9" v-if="from =='businessList' ">
        <div class="date-box">
          <span>日期</span>
          <el-date-picker
            v-model="param.startDate"
            type="datetime"
            placeholder="开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
           >
          </el-date-picker>
          <el-date-picker
            v-model="param.endDate"
            type="datetime"
            placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          >
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button type="warning" @click="resettingFn">重置</el-button>
          <el-button type="primary" @click="addFn" v-if="from !== 'memberList' ">{{btnText}}</el-button>
          <el-button type="danger" @click="delsFn">{{delText}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "searchBar",
    props:{
      from:{
        type:String // 来自哪个页面，根据这个参数的不同，调用不同的接口
      },
      param:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    components: {
    },
    computed: {
      delText(){
        if(this.from =='memberList'){
          return '批量禁用'
        }else{
          return '批量删除'
        }
      }
    },
    data() {
      return {
        memberIsActive: [{
          value: 1,
          label: '活跃用户'
        }, {
          value: 2,
          label: '非活跃/刷单'
        }],
        memberSort:[{
          value: 1,
          label: '总分享数'
        }, {
          value: 2,
          label: '分享币'
        },{
          value: 3,
          label: '一级邀请好友数量'
        }]
      }
    },
    watch:{
    },
    methods: {
      // 重置
      resettingFn(){
        clearOneSession('param')
        clearOneSession('currentPage')
        this.$emit('updateListFn')
      },
      // 活跃非活跃用户搜索
      isActiveFn(){
        if(this.param.isActive=='' ){
          return
        }
       this.searchFn()
      },
      // 排序
      sortByFn(){
        if(this.param.sort=='' ){
          return
        }
        this.searchFn()
      },
      // 昵称搜索
      nicknameFn(){
        if (event.keyCode == "13" && this.param.nickname){
          this.param.nickname = this.param.nickname
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      // 手机号搜索
      phoneFn() {
        if (event.keyCode == '13' && this.param.phone) {
          this.param.phone = this.param.phone
          // setSession('currentPage', 1)
          this.searchFn()
        }
      },
      // 管理员模糊查询
      keyFn(){
        if (event.keyCode == '13' && this.param.key) {
          this.param.key = this.param.key
          // setSession('currentPage', 1)
          this.searchFn()
        }
      },
      addFn(){
        switch ( this.from ) {
          case 'businessList':
            this.$router.push('/ArticleManager/ArticleAdd')
            break;
          case 'adminList':
            this.$emit('addAdmin')

            break;
        }
      },
      // 派发批量删除的事件
      delsFn() {
        this.$emit('delsFn')
      },
      searchFn() {
        for (let prop in this.param) {
          if (this.param[prop] === '' || this.param[prop] === null) {
            delete this.param[prop]
          }
        }
        this.param.pageNum=1
        setSession('param', this.param)
        this.$emit('searchFn', getSession('param'))
      }
    },
    created() {
      console.log(this.param.isActive)
      switch ( this.from ) {
        case 'businessList':
          this.text = '商家昵称'
          this.placeholder = '请输入商家昵称'
          this.btnText='添加商家'

          break;
        case 'memberList':
          this.text = '会员昵称'
          this.placeholder = '请输入会员昵称'
          this.btnText='添加会员'
          break;
        case 'adminList':
          this.text = '报道标题'
          this.btnText='添加管理员'
          break;
      }
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
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

