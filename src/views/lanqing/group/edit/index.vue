<template>
  <div>
    <el-form
      ref="noveForm"
      :model="form"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="组名">
        <el-input v-model="form.groupName" />
      </el-form-item>
      <el-form-item label="群主用户编号">
        <user-id @backId="saveAppId" />
      </el-form-item>
      <el-form-item label="推荐">
        <el-radio-group v-model="form.recommend">
          <el-radio :label="0">不推荐</el-radio>
          <el-radio :label="1">推荐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组图URL地址">
        <el-upload
          :action="UploadUrl"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="uploader"
          name="multipartFile"
        >
          <img v-if="form.groupIcon" :src="form.groupIcon" class="avatar">
          <i v-else class="el-icon-picture uploader-icon" />
        </el-upload>
        <input type="hidden">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editGroup } from '@/api/group'
import { UploadUrl } from '@/http/url'
import userId from '@/components/userId'

export default {
  name: 'BannerEdit',
  components: {
    userId
  },
  data() {
    return {
      UploadUrl: UploadUrl,
      visible: false,
      uploadList: [{
        value: '首页',
        label: 0
      }, {
        value: '才艺秀',
        label: 1
      }],
      form: {
        groupIcon: '',
        groupManagerId: '',
        groupName: '',
        recommend: ''
      },
      isAdd: true,
      listObj: {}
    }
  },
  created() {
  },
  methods: {
    saveAppId(val) {
      this.form.groupManagerId = val
    },
    handleSuccess(res, file) {
      this.form.groupIcon = res.data
    },
    beforeUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    editSelect(val, key) {
      this.form[key] = val
    },
    onSubmit() {
      const getObj = this.form
      editGroup(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('提交成功！')
        this.$router.push({ name: 'GroupList' })
      })
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
.logosFlex {
  display: flex;
  .add {
    margin-top: 25px;
    i {
      font-size: 20px;
    }
  }
}
</style>
