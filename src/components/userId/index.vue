<template>
  <div>
    <el-select
      v-model="appId"
      :remote-method="getList"
      :loading="loading"
      filterable
      remote
      reserve-keyword
      placeholder="请输入11位手机号"
    >
      <el-option
        v-for="item in options"
        :key="item.nickName"
        :label="item.nickName"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { getAppInfo } from '@/api/classSelect'

export default {
  name: 'TelPhone',
  props: {
    defaultValue: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      options: [],
      appId: '',
      loading: false
    }
  },
  watch: {
    appId() {
      this.$emit('backId', this.appId)
    }
  },
  methods: {
    getList(query) {
      const getObj = {
        phone: query
      }
      if (query.length !== 11) return
      getAppInfo(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.options = [data]
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>

