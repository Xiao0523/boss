<template>
  <div>
    <el-form
      ref="noveForm"
      :model="list"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="注册方式">
        <el-input v-model.trim="list.way" disabled/>
      </el-form-item>

      <el-form-item label="昵称">
        <el-input v-model.trim="list.nickName" disabled/>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model.trim="list.phone" disabled/>
      </el-form-item>

      <el-form-item label="注册时间">
        <el-input v-model.trim="list.createTime" disabled/>
      </el-form-item>

      <el-form-item label="生日">
        <el-input v-model.trim="list.birthday" disabled/>
      </el-form-item>

      <el-form-item label="性别">
        <el-input v-model.trim="list.sex" disabled/>
      </el-form-item>

      <el-form-item label="所在地">
        <el-input v-model.trim="list.city" disabled/>
      </el-form-item>

      <el-form-item label="简介">
        <el-input v-model.trim="list.introduce" disabled/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getStudentInfo } from '@/api/member'
export default {
  name: 'StudentComponents',
  props: {
    leave: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    val: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      list: {},
      videoPlayFlag: false
    }
  },
  watch: {
    val: {
      handler() {
        if (this.val === 'getStudentInfo') {
          const id = this.$route.query.id
          if (id) {
            this.getDetail(id)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getDetail(id) {
      const getObj = {
        id: id
      }
      getStudentInfo(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}

.img-box {
  display: block;
  width: 100px;
  height: 100px;
}

.video {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  position: relative;
  background: #000;
  video {
    width: 400px;
    height: 100%;
  }
  .mask-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .video-btn {
      position: absolute;
      width: 60px;
      height: 60px;
      background:rgba(0,0,0,.6);
      border-radius: 100%;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top: -30px;
      span {
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px 0 10px 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border-style: solid;
        border-color: transparent transparent transparent #fff;
      }
    }
  }
}
.tabel-flex {
  display: flex;
  img {
    margin-right: 10px;
  }
}
</style>
