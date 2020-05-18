<template>
  <div class="main">
    <div class="tabel-flex">
      <el-upload
        :action="UploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarLogsSuccess"
        :before-upload="beforeAvatarUpload"
        class="uploader"
        name="multipartFile"
      >
        <img v-if="list.cover" :src="list.cover" class="avatar">
        <i v-else class="el-icon-picture uploader-icon" />
      </el-upload>
      <div class="input-box">
        <el-input v-model="list.level" class="inputs" type="text" placeholder="获奖名次" @blur="backLog"/>
      </div>
      <div class="input-box">
        <el-input v-model="list.name" class="inputs" type="text" placeholder="奖品名称" @blur="backLog"/>
      </div>
      <div class="input-box">
        <el-input v-model="list.price" class="inputs" type="text" placeholder="奖品原价" @blur="backLog"/>
      </div>
      <div class="input-box">
        <el-input v-model="list.amount" class="inputs" type="text" placeholder="获奖个数" @blur="backLog"/>
      </div>
      <div class="input-box">
        <el-input v-model="list.orderIndex" class="inputs" type="text" placeholder="排序" @blur="backLog"/>
      </div>
    </div>
    <div class="close" @click="del">
      <i class="el-icon-close"/>
    </div>
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
      this.listPic.cover = res.data
      this.backLog()
    },
    backLog() {
      this.$emit('handelLogsClickVote', this.listPic, this.indexs)
    },
    del() {
      this.$emit('handelLogsDelVote', this.indexs)
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    }
  }
}
</script>

<style lang="scss">
.main {
  position: relative;
  display: flex;
  flex-direction: column;
}
.close {
  position: absolute;
  top: -11px;
  right: 10px;
  cursor: pointer;
}
.inputs {
  width: 128px;
  outline: none;
}
.input-box {
  display: flex;
  align-items: center;
  height: 80px;
  margin-right: 10px;
}
.tabel-flex {
  display: flex;
  flex-direction: row;
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
