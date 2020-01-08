<template>
  <div>
    <el-form
      ref="noveForm"
      :model="form"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="作品ID" prop="id">
        <el-input v-model="form.id" disabled />
      </el-form-item>
      <el-form-item label="才艺秀编号" prop="talentShowId">
        <el-input v-model="form.talentShowId" disabled />
      </el-form-item>
      <el-form-item label="作品类型" prop="type">
        {{ form.type | typeStr }}
      </el-form-item>

      <el-form-item v-if="form.type == 0" label="作品图片" prop="talentShowId">
        <div class="img-box">
          <img :src="form.pics" />
        </div>
      </el-form-item>

      <el-form-item v-if="form.type == 1" label="视频封面" prop="talentShowId">
        <div class="img-box">
          <img :src="form.videoCover" />
        </div>
      </el-form-item>

      <el-form-item v-if="form.type == 1" label="视频链接" prop="talentShowId">
        {{ form.videoUrl }}
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCompositionDetail } from '@/api/composition'

export default {
  name: 'compositionDetail',
  data() {
    return {
      form: {
        id: '',
        talentShowId: '',
        type: '',
        videoUrl: '',
        videoCover: '',
        status: '',
        pics: ''
      }
    }
  },
  watch: {},
  created() {
    const id = this.$route.query.id
    if (!id) {
      this.$router.back(-1)
    }
    const getDetail = {
      id: id
    }
    getCompositionDetail(getDetail).then(res => {
      if (res.data.code) {
        return res.data.message && this.$wran(res.data.message)
      }
      if (!res.data.data) return
      const {data} = res.data
      this.form = data
    })
  },
  filters: {
    typeStr(val) {
      return val == 0 ? '图片' : '视频'
    }
  },
  methods: {
    onSubmit() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.novel {
  width: 50%;
  textarea {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    resize: none;
    min-height: 90px;
  }
}

.img-uploader {
    width: 100px;
    &-wraper{
      display: flex;
      align-items: flex-start;
    }
    & /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}

.img-box {
  display: block;
  width: 600px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.img-uploader .el-upload:hover {
  border-color: #409eff;
}
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.novel_img {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: contain;
}

.sponser{
  position: relative;
  & /deep/ .el-input{
    // width: 85%;
    margin-bottom: 20px;
  }
  &-del{
    margin-left: 20px;
  }
  &-btn{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%)
  }
  .del-wraper{
    position: relative;
    height: 100%;
  }
}

.work-uploader{
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
}
.uploader {
  width: 128px;
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
.course-uploader{
  width: 80px;
  .uploader-icon {
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>

