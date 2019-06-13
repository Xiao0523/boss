<template>
  <div>
    <el-dialog title="菜单权限管理" :visible.sync="dialogMenuVisible" width="30%">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group v-model="menuIds" @change="handleMenuIdsChange" style="display:flex;flex-wrap:wrap;">
        <el-checkbox v-for="(item,id) in menuList" :key="id" :label="item.id" style="width:19.5%">{{item.name}}</el-checkbox>
      </el-checkbox-group>      
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelMenuFn">取 消</el-button>
        <el-button type="primary" @click="confirmMenuFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogMenuVisible: {
      type: Boolean,
      default:false
    },
    roleId:{
        type:Number
    }
  },
  data(){
      return{
          menuList:[],
          menuIds:[],
          checkAll:false,
          isIndeterminate: true,
      }
  },
  watch:{
    dialogMenuVisible(value){
        if(value==true&&this.$route.query.userId){
            this.$req.get(`menu/${this.$route.query.userId}`).then(res=>{
              res.data.data.map((val,index)=>{
                for(let i=0;i<this.menuList.length;i++){
                  if(val===this.menuList[i].url){
                    this.menuIds.push(this.menuList[i].id);
                    break;
                  }
                }
              })
            })
        }
    }
  },
  methods: {
    cancelMenuFn(){
        this.$emit('cancelMenuFn')
    },
    confirmMenuFn(){
        if(this.menuIds.length==0){
          this.$alert("您还未选择相关菜单", "提交失败", { type: "error" });
        }else{
          this.$emit('confirmMenuFn',this.menuIds)
        }
    },
    handleMenuIdsChange(value){
    },
    handleCheckAllChange(val){
      let menuIds = this.menuList.map(item => {
        return item.id;
      });
      this.menuIds = val ? menuIds : [];
      this.isIndeterminate = false;      
    }
  },
  created(){
      this.$req.get('v2.1/auth/menus').then(res=>{
          this.menuList=res.data.data;
      })
  }
};
</script>

<style scoped>
.el-checkbox+.el-checkbox {
    margin-left: 0px!important;
}
</style>
