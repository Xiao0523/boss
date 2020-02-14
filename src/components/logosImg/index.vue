<template>
  <div class="main">
    <el-upload
      :action="UploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarLogsSuccess"
      :before-upload="beforeAvatarUpload"
      class="uploader"
      name="multipartFile"
    >
      <img v-if="list.picUrl" :src="list.picUrl" class="avatar">
      <i v-else class="el-icon-picture uploader-icon" />
    </el-upload>
    <el-input v-model="list.logoName" class="inputs" type="text" @blur="backLog"/>
    <div class="close" @click="del">
      <i class="el-icon-close"/>
    </div>
    <input type="hidden">
  </div>
</template>

<script>
import { UploadUrl } from '@/http/url'
export default {
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    },
    indexs: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      UploadUrl: UploadUrl,
      listPic: {}
    }
  },
  watch: {
    'list'() {
      this.listPic = this.list
    }
  },
  created() {
    this.listPic = this.list
  },
  methods: {
    handleAvatarLogsSuccess(res, file) {
      this.listPic.picUrl = res.data
      this.backLog()
    },
    backLog() {
      this.$emit('handelLogsClick', this.listPic, this.indexs)
    },
    del() {
      this.$emit('handelLogsDel', this.indexs)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss">
.main {
  position: relative;
}
.close {
  position: absolute;
  top: -7px;
  right: 15px;
  cursor: pointer;
}
.inputs {
  width: 128px;
  outline: none;
}
.uploader {
  width: 128px;
  margin-right: 10px;
  & /deep/ {
    & .el-upload {
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: rgba(250, 250, 251, 1);
      &:hover {
        border-color: rgba(0,210,165,1);
      }
    }
  }
  .uploader-icon {
    font-size: 18px;
    color:rgba(222,226,233,1);
    width: 128px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 80px;
    display: block;
    object-fit: scale-down;
  }
}
</style>
