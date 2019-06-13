<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :show-close="false" :modal="false">
      <el-form :model="form">
        <el-form-item label="操作属性" :label-width="formLabelWidth">
          <el-input v-model="form.opValue" auto-complete="off" required="required"></el-input>
        </el-form-item>
        <el-form-item label="操作名称" :label-width="formLabelWidth">
          <el-input v-model="form.opName"
                    auto-complete="off"
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
  export default {
    name: "addRole",
    components: {
// someComponent
    },
    props:{
      source:{
        type:String
      },
      form:{
        type:Object,
        default(){
          return{
            opName:'',
            opValue:'',
          }
        }
      },
      dialogFormVisible:{
        type:Boolean,
        default:false
      },
      type:{
        type:String,
        default:''
      }
    },
    computed: {
      title(){
        if(this.type == 'add'){
          return '添加操作'
        }else{
          return '更新操作'
        }
      }
    },
    data() {
      return {
        formLabelWidth: '120px',
      }
    },
    methods: {
      confirmFn(){
        this.$emit('addOperationFn', this.form)
      },
      cancelFn(){
        this.$emit('cancelFn')
      }
    },
    watch:{
      form: {
        handler(newValue, oldValue) {
          console.log(newValue)

        },
        deep: true
      }
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>


