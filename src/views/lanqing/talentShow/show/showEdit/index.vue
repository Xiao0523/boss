<template>
  <div>
    <el-form
      ref="noveForm"
      :model="form"
      class="novel"
      label-position="left"
      label-width="100px"
    >
      <el-form-item label="才艺秀名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="作品征集时间" prop="time">
        <el-date-picker
          v-model="time"
          :default-time="['12:00:00', '08:00:00']"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="投票时间" prop="voteTime">
        <el-date-picker
          v-model="voteTime"
          :default-time="['12:00:00', '08:00:00']"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="才艺秀封面">
        <el-upload
          :action="UploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="uploader"
          name="multipartFile"
        >
          <img v-if="form.picCover" :src="form.picCover" class="avatar">
          <i v-else class="el-icon-picture uploader-icon" />
        </el-upload>
        <input type="hidden">
      </el-form-item>

      <el-form-item label="赞助商图标">
        <div class="logosFlex">
          <logosImg v-for="(item, index) in form.logs.length" :key="index" :list="form.logs[item - 1]" :indexs="item - 1" @handelLogsClick="logsCb" @handelLogsDel="delCb"/>
          <div class="add" @click="addList">
            <i class="el-icon-plus"/>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="奖品信息">
        <div class="boxWidth">
          <div class="logosFlex row">
            <gift v-for="(item, index) in form.prizes4Rank.length" :key="index" :list="form.prizes4Rank[item - 1]" :indexs="item - 1" @handelLogsClickVote="logsCbVote" @handelLogsDelVote="delCbVote"/>
          </div>
          <div class="add gift-add" @click="addList('vote')">
            <i class="el-icon-plus"/>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="幸运奖" class="gift">
        <div class="luck-gift">
          <el-input
            v-for="(item, index) in form.prizes4Luck[0].ranks"
            :key="index"
            v-model="form.prizes4Luck[0].ranks[index]"
          />
          <div class="add" @click="addList('luck')">
            <i class="el-icon-plus"/>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="幸运奖信息">
        <div class="boxWidth">
          <el-upload
            :action="UploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarGiftSuccess"
            :before-upload="beforeAvatarUpload"
            class="uploader"
            name="multipartFile"
          >
            <img v-if="form.prizes4Luck[0].cover" :src="form.prizes4Luck[0].cover" class="avatar">
            <i v-else class="el-icon-picture uploader-icon" />
          </el-upload>
          <div class="input-box">
            <el-input v-model="form.prizes4Luck[0].name" class="inputs" type="text" placeholder="奖品名称" />
          </div>
          <div class="input-box">
            <el-input v-model="form.prizes4Luck[0].price" class="inputs" type="text" placeholder="奖品原价" />
          </div>
          <div class="input-box">
            <el-input v-model.number="form.prizes4Luck[0].amount" class="inputs" type="text" placeholder="获奖个数" />
          </div>
        </div>
      </el-form-item>

      <el-form-item label="才艺秀介绍" >
        <textarea v-model="form.picIntroduce" resize="none"/>
      </el-form-item>

      <el-form-item label="才艺秀规则" prop="name">
        <textarea v-model="form.rule"/>
      </el-form-item>

      <el-form-item label="才艺秀标语" prop="name">
        <textarea v-model="form.slogan"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addTlentShow, getTlentShow, editTlentShow } from '@/api/tlentShow'
import { fmtDate } from '@/utils/date'
import { UploadUrl } from '@/http/url'
import logosImg from '@/components/logosImg'
import gift from '@/components/gift'

export default {
  name: 'ShowEdit',
  components: { logosImg, gift },
  data() {
    return {
      UploadUrl: UploadUrl,
      time: '',
      voteTime: '',
      visible: false,
      form: {
        name: '',
        picCover: '',
        picIntroduce: '',
        rule: '',
        slogan: '',
        solicitationBeginTime: '',
        solicitationEndTime: '',
        voteBeginTime: '',
        voteEndTime: '',
        logs: [{
          type: '6',
          picUrl: '',
          logoName: ''
        }],
        prizes4Luck: [
          {
            cover: '',
            level: '',
            name: '',
            orderIndex: 0,
            price: '',
            ranks: [''],
            amount: '',
            type: 1
          }
        ],
        prizes4Rank: [
          {
            amount: '',
            cover: '',
            level: '',
            name: '',
            orderIndex: '',
            price: '',
            type: 0
          }
        ]
      },
      isAdd: true
    }
  },
  watch: {
    time() {
      const timeArr = this.time
      this.form.solicitationBeginTime = fmtDate(timeArr[0].getTime())
      this.form.solicitationEndTime = fmtDate(timeArr[1].getTime())
    },
    voteTime() {
      const timeArr = this.voteTime
      this.form.voteBeginTime = fmtDate(timeArr[0].getTime())
      this.form.voteEndTime = fmtDate(timeArr[1].getTime())
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.isAdd = false
      const getTlentObj = {
        id: id
      }
      getTlentShow(getTlentObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.form = data
        this.form.prizes4Luck[0].ranks = data.prizes4Luck[0].ranks.split(',')
        this.time = [new Date(data.solicitationBeginTime), new Date(data.solicitationEndTime)]
        this.voteTime = [new Date(data.voteBeginTime), new Date(data.voteEndTime)]
      })
    }
  },
  methods: {
    handleAvatarGiftSuccess(res, file) {
      this.form.prizes4Luck[0].cover = res.data
    },
    delCb(index) {
      this.form.logs.splice(index, 1)
    },
    logsCb(objs, index) {
      this.form.logs[index] = objs
    },
    delCbVote(index) {
      this.form.prizes4Rank.splice(index, 1)
    },
    logsCbVote(objs, index) {
      this.form.prizes4Rank[index] = objs
    },
    addList(val) {
      if (val && val === 'vote') {
        this.form.prizes4Rank.push({
          amount: '',
          cover: '',
          level: '',
          name: '',
          orderIndex: '',
          price: '',
          type: 0
        })
        return
      }
      if (val && val === 'luck') {
        this.form.prizes4Luck[0].ranks.push('')
        return
      }
      this.form.logs.push({
        type: '6',
        picUrl: '',
        logoName: ''
      })
    },
    handleAvatarSuccess(res, file) {
      this.form.picCover = res.data
    },
    handleAvatarPrizesSuccess(res, file) {
      this.form.prizes[0].picUrl = res.data
    },
    handleAvatarLogsSuccess(res, file) {
      this.form.logs[0].picUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png')
      if (!isImg) {
        this.$message.error('请上传JPG/PNG格式的图片')
      }
      return isImg
    },
    onSubmit() {
      const addTlentObj = JSON.parse(JSON.stringify(this.form))
      const subFn = this.isAdd ? addTlentShow : editTlentShow
      if (!this.isAdd) {
        addTlentObj.id = this.$route.query.id
      }
      addTlentObj.prizes4Luck[0].ranks = addTlentObj.prizes4Luck[0].ranks.join(',')
      subFn(addTlentObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.$router.push({ name: 'Show' })
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
.luck-gift {
  display: flex;
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
.boxWidth {
  display: flex;
  flex-direction: row;
  width: 1000px;
  .gift-add {
    position: relative;
    width: 20px;
    i {
      position: absolute;
      bottom: 50px;
    }
  }
}
.logosFlex {
  display: flex;
  &.row {
    width: 850px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .add {
    margin-top: 25px;
    i {
      font-size: 20px;
    }
  }
}
.gift {
  width: 940px;
  .el-input {
    width: 100px;
    margin-right: 20px;
  }
}
</style>
