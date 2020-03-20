<template>
  <div>
    <el-select
      v-model="talentId"
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
import { getTalentShow } from '@/api/talentShow'

export default {
  name: 'TalentSelect',
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
      classList: [],
      talentId: ''
    }
  },
  watch: {
    defaultValue() {
      this.talentId = this.defaultValue
    }
  },
  mounted() {
    this.talentId = this.defaultValue
    this.getList()
  },
  methods: {
    getList() {
      getTalentShow().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.classList = data
      })
    },
    editClass() {
      this.$emit('talentSelect', this.talentId)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>

