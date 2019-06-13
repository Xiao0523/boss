<template>
 <div>
   <el-dialog :title="'添加管理员'" :visible.sync="dialogFormVisible" :show-close="false" :modal="false">
     <el-form :model="form">
       <el-form-item label="真实姓名" :label-width="formLabelWidth">
         <el-input v-model="form.realname" auto-complete="off" required="required"></el-input>
       </el-form-item>
       <el-form-item label="手机号" :label-width="formLabelWidth">
         <el-input v-model="form.phone"
                   auto-complete="off"
                   @blur.prevent='checkMobileFn'
                   required="required"></el-input>
       </el-form-item>
       <el-form-item label="密码" :label-width="formLabelWidth">
         <el-input v-model="form.password" auto-complete="off"
                   type="password"
                   required="required"></el-input>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="cancelFn">取 消</el-button>
       <el-button type="primary" @click="confirmFn">确 定</el-button>
     </div>
   </el-dialog>
 </div>
</template>
<script>
  import {checkMobile} from '@/utils/validate.js'
  export default {
    name: "addAdmin",
    components: {
// someComponent
    },
    props:{
      source:{
        type:String
      },
      dialogFormVisible:{
        type:Boolean,
        default:false
      }
    },
    computed: {
    },
    data() {
      return {
        form:{},
        formLabelWidth: '120px',
        title:'',
      }
    },
    methods: {
      confirmFn(){
        this.$emit('addAdminFn', this.form)
      },
      checkMobileFn(){
        checkMobile(this.form.phone)
      },
      cancelFn(){
        this.$emit('cancelFn')
      }
    },
    watch:{
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>
