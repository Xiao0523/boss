<template>
  <div>
    <el-row>
      <el-col :span="24"><el-button type="primary">新增分类</el-button></el-col>
    </el-row>
    <tableList></tableList>
    <div @click="show">点击</div>
    <Dialog
      :isShow= "visible"
      :title="'修改文章分类'"
      @cancelFn="visible=false"
      @confirmFn="confirmFn"
    >
      <div slot="sort">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="序号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="品类名">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import tableList from '@/components/common/tableList'
   import Dialog from '@/components/common/dialog'
  export default {
    name: "ArticleCat",
    components: {
      tableList,
      Dialog
    },
    computed: {},
    data() {
      return {
        visible:false,
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          region: ''
        }
      }
    },
    methods: {
      confirmFn(){
        this.visible =false
      },

      show(){
        this.visible = true
      }
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>
