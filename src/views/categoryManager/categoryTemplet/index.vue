<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" label-position="left" >
      <el-form-item label="分类">
        <el-input v-model="form.cname"/>
      </el-form-item>
      <el-form-item label="类型" >
        <el-radio-group v-model="form.ctype">
          <el-radio :label="0">文章</el-radio>
          <el-radio :label="1">APP</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="索引">
        <el-input v-model="form.index"/>
      </el-form-item>
      <el-form-item label="状态" >
        <el-radio-group v-model="form.status">
          <el-radio :label="0">未启用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认显示">
        <el-radio-group v-model="form.defaults">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="confirmFn">确定</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CategoryAdd',
  components: {
  },
  filters: {
    typeStatus(val) {
      return val == 0 ? '文章' : val == 1 ? 'APP' : '未知'
    }
  },
  props: {
    source: {
      type: String
    },
    form: {
      type: Object,
      default() {
        return {
          defaults: 0 // 默认否
        }
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    console.log(this.form)
  },
  methods: {
    confirmFn() {
      this.$emit('confirmFn', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
