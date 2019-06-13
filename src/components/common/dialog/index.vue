<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    :close-on-click-modal="false"
    :show-close="false"
    :width="width"
   >
    <slot name="del" class="content"></slot>
    <slot name="sort" class="content"></slot>
    <slot name="upload" class="content"></slot>
    <!--穿梭框-->
    <slot name="transfer" class="content"></slot>
    <slot></slot>
    <span slot="footer" class="dialog-footer">
    <el-button  @click="cancelFn">取消</el-button>
    <el-button type="primary" @click="confirmFn">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Dialog_BOX",
    components: {
// someComponent
    },
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      title:{
        type:String,
        default:'提示'
      },
      width: {
        type: String,
        default: '50%'
      }
    },
    computed: {},
    data() {
      return {
      }
    },
    methods: {
      cancelFn(){
        this.$emit('cancelFn')
      },
      confirmFn(){
        this.$emit('confirmFn')
      }
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>
.content{
}
  .dialog-footer{
    display: flex;
    justify-content: space-between;
  }
</style>
