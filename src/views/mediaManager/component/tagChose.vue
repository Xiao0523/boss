<template>
  <div>
    <el-dialog title="文章类目选择" :visible.sync="isShow" width="30%" @close="close">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="choseTagIds"
        @change="handleMenuIdsChange"
        style="display:flex;flex-wrap:wrap;"
      >
        <el-checkbox
          v-for="(item,id) in tags"
          :key="id"
          :label="item.id"
          style="width:19.5%"
        >{{item.cname}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelMenuFn">取 消</el-button>
        <el-button type="primary" @click="confirmMenuFn">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tagMenuShow: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: {}
    },
    tags: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      choseTagIds: [],
      checkAll: false,
      isIndeterminate: true,
      isShow: false
    };
  },
  watch: {
    tagMenuShow(value) {
      this.isShow = value;
      if (value == true) {
        this.choseTagIds = [];
        if (this.row.tagIds && this.row.tagIds.length > 0) {
          this.row.tagIds.map((val, index) => {
            for (let i = 0; i < this.tags.length; i++) {
              if (val === this.tags[i].id) {
                this.choseTagIds.push(this.tags[i].id);
                break;
              }
            }
          });
        }
      }
    }
  },
  methods: {
    cancelMenuFn() {
      this.$emit("cancelMenuFn");
    },
    confirmMenuFn() {
      if (this.choseTagIds.length == 0) {
        this.$alert("您还未选择相关菜单", "提交失败", { type: "error" });
      } else {
        this.row.tagIds = this.choseTagIds;
        this.$emit("confirmMenuFn", this.row, 1);
      }
    },
    handleMenuIdsChange(value) {},
    handleCheckAllChange(val) {
      let choseTagIds = this.tags.map(item => {
        return item.id;
      });
      this.choseTagIds = val ? choseTagIds : [];
      this.isIndeterminate = false;
    },
    close() {
      this.$emit("cancelMenuFn");
    }
  },
  created() {}
};
</script>

<style scoped>
.el-checkbox + .el-checkbox {
  margin-left: 0px !important;
}
</style>
