<template>
  <div>
    <el-select
      v-model="storeId"
      :remote-method="getList"
      :loading="loading"
      filterable
      remote
      reserve-keyword
      placeholder="请输入店铺关键词">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select
      v-model="classId"
      placeholder="请输入选择课程"
    >
      <el-option
        v-for="item in classList"
        :key="item.value"
        :label="item.name"
        :value="item.id"/>
    </el-select>
    <el-select
      v-show="teacherShow"
      v-model="teacherId"
      placeholder="请输入讲师"
    >
      <el-option
        v-for="item in teacherList"
        :key="item.value"
        :label="item.name"
        :value="item.id"/>
    </el-select>
  </div>
</template>

<script>
import { getStoreList, getClassList, getTeacherList } from '@/api/classSelect'

export default {
  name: 'ClassSelect',
  props: {
    defaultObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    teacherShow: {
      type: Boolean,
      default: () => {
        return false
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
      classId: '',
      teacherList: [],
      teacherId: '',
      curriculumName: '',
      teacherRealName: '',
      storeName: '',
      teacherFirstFlag: true,
      classFirstFlag: true,
      storeFirstFlag: true
    }
  },
  watch: {
    storeId() {
      this.getClass()
      if (!this.storeFirstFlag) {
        this.classId = ''
        this.curriculumName = ''
        this.teacherRealName = ''
        this.teacherList = []
        this.teacherId = ''
      }
      this.storeFirstFlag = false
      if (this.options.length) {
        for (const item of this.options) {
          if (this.storeId === item.id) {
            this.storeName = item.name
            return
          }
        }
      }
    },
    classId() {
      if (!this.classFirstFlag) {
        this.teacherRealName = ''
        this.teacherId = ''
      }
      this.classFirstFlag = false
      if (this.classList.length) {
        for (const item of this.classList) {
          if (this.classId === item.id) {
            this.curriculumName = item.name
            this.editClass()
            return
          }
        }
      }
    },
    teacherId() {
      this.teacherFirstFlag = false
      if (this.classList.length && this.teacherShow) {
        for (const item of this.teacherList) {
          if (this.teacherId === item.id) {
            this.teacherRealName = item.name
            this.editTeacher()
            return
          }
        }
      }
    },
    defaultObj: {
      handler() {
        this.listObj = this.defaultObj
        if (this.listObj.storeId && this.listObj.storeName) {
          this.getList(this.listObj.storeName)
        }
        if (this.listObj.classId && this.curriculumName) {
          this.getClass(this.listObj.storeId)
        }
        if (this.listObj.teacherId && this.listObj.teacherRealName) {
          this.getTeacher(this.listObj.classId)
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.listObj = this.defaultObj
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
        if (!this.isAdd && this.storeFirstFlag) {
          this.storeId = this.listObj.storeId
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
        if (!this.isAdd && this.classFirstFlag) {
          this.classId = this.listObj.classId
        }
      })
    },
    getTeacher(id) {
      const getObj = {
        id: id || this.classId
      }
      getTeacherList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.teacherList = data
        if (!this.isAdd && this.teacherFirstFlag) {
          this.teacherId = this.listObj.teacherId
        }
      })
    },
    editClass() {
      if (this.teacherShow) {
        this.getTeacher()
        return
      }
      const backObj = {
        curriculumName: this.curriculumName,
        curriculumId: this.classId,
        storeId: this.storeId,
        storeName: this.storeName
      }
      this.$emit('classCb', backObj)
    },
    editTeacher() {
      const backObj = {
        curriculumName: this.curriculumName,
        curriculumId: this.classId,
        storeId: this.storeId,
        storeName: this.storeName,
        teacherRealName: this.teacherRealName,
        teacherId: this.teacherId
      }
      this.$emit('classCb', backObj)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>

