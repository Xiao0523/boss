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
        {{ form.type | typeStr }}
      </el-form-item>

      <el-form-item label="使用事由">
        <el-input v-model="form.reason" :disabled="true" type="textarea" resize="none"/>
      </el-form-item>

      <el-form-item label="使用时间">
        <el-input v-model="form.useTime" :disabled="true"/>
      </el-form-item>

      <el-form-item label="金额">
        <el-input v-model="form.money" :disabled="true"/>
      </el-form-item>

      <el-form-item label="负责人">
        <el-input v-model="form.chargePerson" :disabled="true"/>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.remark" :disabled="true"/>
      </el-form-item>

      <el-form-item label="附件">
        <div class="img-box">
          <img v-for="item in form.vouchers" :key="item" :src="item" alt="">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOperateDetail } from '@/api/operate'

export default {
  name: 'OperateDetail',
  filters: {
    typeStr(val) {
      const value = Number(val)
      return value === 0 ? '才艺秀' : value === 1 ? 'APP推广' : value === 2 ? '商户推广' : value === 3 ? '红包' : '其它'
    }
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.getDetail(id)
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'Operate'
      })
    },
    getDetail(id) {
      const getTlentObj = {
        id: id
      }
      getOperateDetail(getTlentObj).then(res => {
        if (res.data.code) return res.data.message && this.$wran(res.data.message)
        if (!res.data.data) return
        this.form = res.data.data
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
.img-box {
  display: flex;
  img {
    max-width: 100px;
    max-height: 100px;
    margin-right: 10px;
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
