<template>
  <div>
    <el-dialog
      :title="relatedType==1?'关联文章类目':'关联爬虫类目'"
      :visible.sync="isShow"
      width="30%"
      @close="close"
    >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="menuIds"
        @change="handleMenuIdsChange"
        style="display:flex;flex-wrap:wrap;"
      >
        <el-checkbox
          v-for="(item,id) in menuList"
          :key="id"
          :label="item.id"
          style="width:19.5%"
        >{{relatedType==1?item.cname:item.categoryName}}</el-checkbox>
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
      default: false
    },
    relatedId: {
      type: String
    },
    relatedType: {
      type: Number
    }
  },
  data() {
    return {
      menuList: [],
      menuIds: [],
      checkAll: false,
      isIndeterminate: true,
      isShow: false
    };
  },
  watch: {
    dialogMenuVisible(value) {
      this.isShow = value;
      if (value) {
        if (this.relatedType == 1) {
          this.$req
            .get(
              `v2/videoCategory/getRelevanceVideoTagAndArticleTagPage?uuid=${
                this.relatedId
              }`
            )
            .then(res => {
              if (res.data.code == 0) {
                this.menuList = res.data.data.articleTags;
                this.$req
                  .get(
                    `v2/videoCategory/getRelevanceVideoTagAndArticleTag?uuid=${
                      this.relatedId
                    }`
                  )
                  .then(res => {
                    this.menuIds = res.data.data;
                  });
              }
            });
        } else {
          this.$req
            .get(
              `v2/videoCategory/getRelevanceVideoTagAndReptileTagPage?uuid=${
                this.relatedId
              }`
            )
            .then(res => {
              if (res.data.code == 0) {
                this.menuList = res.data.data.reptileTags;
                this.$req
                  .get(
                    `v2/videoCategory/getRelevanceVideoTagAndReptileTag?uuid=${
                      this.relatedId
                    }`
                  )
                  .then(res => {
                    this.menuIds = res.data.data;
                  });
              }
            });
        }
      }
      // if(value==true&&this.$route.query.userId){
      //     this.$req.get(`menu/${this.$route.query.userId}`).then(res=>{
      //       res.data.data.map((val,index)=>{
      //         for(let i=0;i<this.menuList.length;i++){
      //           if(val===this.menuList[i].url){
      //             this.menuIds.push(this.menuList[i].id);
      //             break;
      //           }
      //         }
      //       })
      //     })
      // }
    }
  },
  methods: {
    cancelMenuFn() {
      this.$emit("cancelMenuFn");
      this.menuIds = [];
      this.checkAll=false;
    },
    confirmMenuFn() {
      if (this.menuIds.length == 0) {
        this.$alert("您还未选择相关菜单", "提交失败", { type: "error" });
      } else {
        if (this.relatedType === 1) {
          this.$req
            .post(`v2/videoCategory/relevanceVideoTagAndArticleTag`, {
              articleTagIds: this.menuIds,
              uuid: this.relatedId
            })
            .then(res => {
              if (res.data.code == 0) {
                this.$emit("confirmMenuFn");
                this.menuIds = [];
                this.checkAll=false;
              } else {
                this.$message({
                  type: "error",
                  message: "关联失败"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.relatedType === 2) {
          this.$req
            .post(`v2/videoCategory/relevanceVideoTagAndReptileTag`, {
              reptileTagIds: this.menuIds,
              uuid: this.relatedId
            })
            .then(res => {
              if (res.data.code == 0) {
                this.$emit("confirmMenuFn");
                this.menuIds = [];
                this.checkAll=false;
              } else {
                this.$message({
                  type: "error",
                  message: "关联失败"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    handleMenuIdsChange(value) {},
    handleCheckAllChange(val) {
      let menuIds = this.menuList.map(item => {
        return item.id;
      });
      this.menuIds = val ? menuIds : [];
      this.isIndeterminate = false;
    },
    close() {
      this.$emit("cancelMenuFn");
      this.menuIds = [];
      this.checkAll=false;
    }
  },
  created() {
    this.$req
      .get(
        `v2/videoCategory/getRelevanceVideoTagAndArticleTagPage?uuid=${
          this.relatedId
        }`
      )
      .then(res => {});
  }
};
</script>

<style scoped>
.el-checkbox + .el-checkbox {
  margin-left: 0px !important;
}
</style>
