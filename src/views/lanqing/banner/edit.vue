<template>
  <div>
    <el-form
      ref="noveForm"
      :model="form"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="banner位置">
        <el-select v-model="uploadStr" placeholder="上传位置" @change="editSelect(uploadStr, 'position')">
          <el-option
            v-for="item in uploadList"
            :key="item.label"
            :label="item.value"
            :value="item.label"/>
        </el-select>
      </el-form-item>
      <el-form-item label="banner描述">
        <el-input v-model="form.bannerDescription" />
      </el-form-item>
      <el-form-item label="banner排序">
        <el-input v-model="form.orderIndex" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :action="UploadUrl"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          class="uploader"
          name="multipartFile"
        >
          <img v-if="form.bannerPic" :src="form.bannerPic" class="avatar">
          <i v-else class="el-icon-picture uploader-icon" />
        </el-upload>
        <input type="hidden">
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="time"
          :default-time="['12:00:00', '08:00:00']"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="banner类型">
        <el-radio-group v-model="form.type">
          <el-radio label="0">课程</el-radio>
          <el-radio label="1">活动</el-radio>
          <el-radio label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="selectStr">
        <classSelect v-show="Number(form.type) === 0" :default-obj="listObj" :is-add="isAdd" @classCb="saveClass"/>
        <talentShowSelect v-show="Number(form.type) === 1" :default-value="form.trainingTalentShowName" @talentSelect="saveTalent" />
        <Tinymce v-show="Number(form.type) === 2" v-model="form.content" class="editor-width"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getBannerView, addClass } from '@/api/lanBanner'
import { fmtDate } from '@/utils/date'
import { UploadUrl } from '@/http/url'
import classSelect from '@/components/classSelect'
import talentShowSelect from '@/components/talentShowSelect'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'BannerEdit',
  components: {
    classSelect,
    talentShowSelect,
    Tinymce
  },
  data() {
    return {
      UploadUrl: UploadUrl,
      time: '',
      visible: false,
      uploadList: [{
        value: '首页',
        label: 0
      }, {
        value: '才艺秀',
        label: 1
      }],
      uploadStr: '',
      form: {
        type: 0,
        bannerPic: '',
        orderIndex: '',
        bannerDescription: '',
        curriculumId: '',
        trainingTalentShowId: '',
        content: ''
      },
      selectStr: '',
      isAdd: true,
      listObj: {}
    }
  },
  watch: {
    time() {
      const timeArr = this.time
      this.form.beginTime = fmtDate(timeArr[0].getTime())
      this.form.endTime = fmtDate(timeArr[1].getTime())
    },
    form: {
      handler() {
        this.selectStr = this.form.type === 0 ? '课程' : this.form.type === 1 ? '活动' : '其他'
      },
      deep: true
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      this.getView(id)
    }
  },
  methods: {
    saveClass(val) {
      this.form = {
        ...this.form,
        ...val
      }
    },
    saveTalent(val) {
      this.form.trainingTalentShowId = val
    },
    handleSuccess(res, file) {
      this.form.bannerPic = res.data
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
      addClass(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.$success('提交成功！')
        this.$router.push({ name: 'BannerList' })
      })
    },
    getView(id) {
      const getObj = {
        id: id
      }
      getBannerView(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.form = data
        for (const item of this.uploadList) {
          if (item.label === Number(this.form.position)) {
            this.uploadStr = item.value
            break
          }
        }
        this.listObj = {
          classId: this.form.curriculumId,
          curriculumName: this.form.curriculumName,
          storeName: this.form.storeName,
          storeId: this.form.storeId
        }
        this.time = [new Date(data.beginTime), new Date(data.endTime)]
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
.editor-width {
  width: 900px;
}
</style>
