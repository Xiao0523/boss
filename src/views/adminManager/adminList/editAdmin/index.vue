<template>
  <div>
    <el-dialog :title="'编辑管理员'" :visible.sync="dialogFormVisible" :show-close="false" :modal="false">
      <el-form :model="adminDetails">
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="adminDetails.realname" auto-complete="off" required="required"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="adminDetails.phone"
                    auto-complete="off"
                    @blur.prevent='checkMobileFn'
                    required="required"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="adminDetails.password" auto-complete="off"
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
    name: "editAdmin",
    components: {
// someComponent
    },
    props:{
      source:{
        type:String
      },
      adminDetails:{
        type:Object
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
        let params={}
        params.id=this.adminDetails.id
        params.phone=this.adminDetails.phone
        params.password=this.adminDetails.password
        params.realname=this.adminDetails.realname
        this.$req.post('updateBackUser',params).then(res=>{
//          console.log(res);
          this.$success(res.data.message)
          this.$emit('editSuccessFn') // 关闭弹窗
        }).catch(err=>{
          this.$emit('editSuccessFn') // 关闭弹窗
          console.log(err);
        })
      },
      checkMobileFn(){
        checkMobile(this.adminDetails.phone)
      },
      cancelFn(){
        this.$emit('cancelFn')
      }
    },
    watch:{
      adminDetails(v){
        console.log('v',v);
      }
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>

