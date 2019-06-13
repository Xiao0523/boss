<template>
<div class="btnBox" v-if="isShow">
  <p class="close" @click="closeFn">x</p>
<p class="row">
  <span>您的姓名（已加密，请您放心填写）</span>
  <el-input v-model="name" placeholder="请输入姓名"></el-input>
</p>
  <p class="row">
    <span>您的电话（已加密，请您放心填写）</span>
    <el-input v-model="phone" placeholder="请输入电话"  @blur.prevent='checkMobileFn'></el-input>
  </p>
  <p class="row">
    <span>手机验证码</span>
    <input class="codeBox" v-model="code">
    <el-button type="text" class="btn" @click="getCodeFn" :disabled="isDisabled">{{codeText}}(s)</el-button>
  </p>
  <p class="row">
    <el-button type="primary" round @click="addAdFn">提交</el-button>
  </p>
</div>
</template>

<script>
   import {checkMobile} from '@/utils/validate.js'
  export default {
    name: "",
    components: {
// someComponent
    },
    props:{
      row:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed: {},
    data() {
      return {
        isShow:true,
        id:'',
        state:'',
        name:'',
        phone:'',
        code:'', // 用户输入的验证码
        verificationCode:'', // 返回的验证码
        codeText:'获取验证码',
        isDisabled:false,
        timer:null

      }
    },
    watch:{
      row(val){
        console.log(val);
      this.id=  val.hdId
        console.log(this.hdId);
        this.state=  val.state
        console.log(this.state);
      }

    },
    methods: {
      // 倒计时
      countDownFn(){
        const timeCount = 60;
       this.codeText= timeCount
        this.isDisabled=true
        clearInterval(this.timer)
        this.timer = setInterval(()=>{
          if(this.codeText>0 && this.codeText<=timeCount){
            this.codeText--
//            console.log(this.codeText);
          }else{
            clearInterval(this.timer)
            this.codeText='重新获取验证码'
            this.isDisabled=false
          }
        },1000)

      },
      getCodeFn(){
        if(!this.phone){
          return
        }
        this.countDownFn()
        this.$req.get('getVerificationCode',{
          phone:this.phone,
          state:'2'
        }).then(res=>{
          this.verificationCode = res.data.data.verificationCode
//          console.log(this.verificationCode);
        }).catch(err=>{
          console.log(err);})
      },
      addAdFn(){
       if(!this.name || !this.phone || this.code !== this.verificationCode){
         return
       }
        this.$req.post('addAdsFromBack',{
          createby:this.id,
          name:this.name,
          state:this.state,
          phone:this.phone
        }).then(res=>{
//          console.log(res);
          this.$success('提交成功')
        }).catch(err=>{
          console.log(err);})
      },
      checkMobileFn(){
       checkMobile(this.phone)
      },
      closeFn(){
        this.isShow=false
      }
    },
    mounted(){
//      console.log(this.row,'ad'); undefined
    },
    created() {
    }

  }
</script>

<style type="text/scss" lang="scss" scoped>
  .btnBox{
    position: fixed;
    right: 20px;
    bottom: 60px;
    width: 300px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 20px;
    z-index: 2;
    background-color: #fff;
    .close{
      position: absolute;
      right: 10px;
      top: 0;
      font-size:18px;
      cursor:pointer;
    }
    .row{
      display: flex;
      flex-direction: column;
      span{
        height: 30px;
      }
      .codeBox{
        width: 100%;
        height: 40px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        position: relative;
        .btn{
          position: absolute;
          right: 10px;
        }
      }

    }
  }
</style>
