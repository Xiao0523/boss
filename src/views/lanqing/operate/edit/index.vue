<template>
  <div>
    <el-form
      ref="noveForm"
      :model="form"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="费用类型">
        <el-select v-model="form.type">
          <el-option
            v-for="item in type"
            :key="item.label"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="使用事由">
        <el-input v-model="form.reason" type="textarea" resize="none" />
      </el-form-item>

      <el-form-item label="使用时间">
        <el-date-picker
          v-model="form.useTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"/>
      </el-form-item>

      <el-form-item label="金额">
        <el-input v-model="form.money" />
      </el-form-item>

      <el-form-item label="负责人">
        <el-input v-model="form.chargePerson"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remark"/>
      </el-form-item>

      <el-form-item label="附件">
        <el-upload
          :action="UploadUrl"
          :file-list="photoList"
          :on-success="handleStudentSuccess"
          :on-remove="handleStudentRemove"
          :before-upload="beforeUpload"
          list-type="picture-card"
          class="student-uploader"
          name="multipartFile"
        >
          <i class="el-icon-picture" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editOperate } from '@/api/operate'
import { UploadUrl } from '@/http/url'

export default {
  name: 'OperateEdit',
  data() {
    return {
      UploadUrl: UploadUrl,
      time: '',
      visible: false,
      form: {
        chargePerson: '',
        createTime: '',
        money: 0,
        reason: '',
        remark: '',
        type: 0,
        useTime: '',
        vouchers: []
      },
      type: [{
        label: '才艺秀',
        value: 0
      }, {
        label: 'APP推广',
        value: 1
      }, {
        label: '商户推广',
        value: 2
      }, {
        label: '红包',
        value: 3
      }, {
        label: '其它',
        value: 4
      }],
      isAdd: true,
      photoList: []
    }
  },
  methods: {
    handleStudentRemove(file, fileList) {
      if (file.status !== 'success') {
        return this.$warn('删除失败')
      }
      if (!file.url) return
      const index = this.form.vouchers.indexOf(file.url)
      this.form.vouchers.splice(index, 1)
    },
    handleStudentSuccess(res, file) {
      if (res.code) {
        return res.message && this.$warn(res.message)
      }
      if (!res.data) return
      this.form.vouchers.push(res.data)
    },
    beforeUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    onSubmit() {
      const addTlentObj = this.form
      editOperate(addTlentObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$router.push({ name: 'Operate' })
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
