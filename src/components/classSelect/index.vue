<template>
  <div>
    <el-select
      v-model="storeId"
      :remote-method="getList"
      :loading="loading"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <el-select
      v-model="classId"
      placeholder="请输入关键词"
      @change="editClass"
    >
      <el-option
        v-for="item in classList"
        :key="item.value"
        :label="item.name"
        :value="item.id"/>
    </el-select>
  </div>
</template>

<script>
import { getStoreList, getClassList } from '@/api/classSelect'

export default {
  name: 'ClassSelect',
  props: {
    defaultClass: {
      type: String,
      default: () => {
        return ''
      }
    },
    defaultStore: {
      type: String,
      default: () => {
        return ''
      }
    },
    isAdd: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      loading: false,
      options: [],
      storeId: '',
      classList: [],
      classId: ''
    }
  },
  watch: {
    storeId() {
      this.getClass()
    },
    defaultStore() {
      this.storeId = this.defaultStore
      this.getList(this.defaultStore)
    },
    defaultClass() {
      this.classId = this.defaultClass
    }
  },
  created() {
    if (this.defaultStore) {
      this.storeId = this.defaultStore
      this.getList(this.defaultStore)
    }
    if (this.defaultClass) {
      this.classId = this.defaultClass
    }
  },
  methods: {
    getList(query) {
      const getObj = {
        name: query
      }
      getStoreList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.options = data
        if (!this.isAdd) {
          this.getClass(data[0].id)
        }
      })
    },
    getClass(id) {
      const getObj = {
        storeId: id || this.storeId
      }
      getClassList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.classList = data
      })
    },
    editClass() {
      this.$emit('classCb', this.classId)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>

