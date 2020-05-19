<template>
  <div class="main">
    <table width="100%">
      <tr class="title">
        <td width="12%">任务名称</td>
        <td width="50%">票数</td>
        <td width="10%">每日限制</td>
        <td width="8%">状态</td>
        <td width="10%">操作</td>
      </tr>
      <tr>
        <td>邀请好友</td>
        <td>
          <el-input v-model="form.invitationTicket" placeholder="请输入单次票数"/>
        </td>
        <td class="times">
          <el-input v-model="form.invitationTimes" placeholder="0"/>次
        </td>
        <td>{{ form.invitationStatus | statusStr }}</td>
        <td class="btn">
          <el-button @click="save('invitationStatus')">{{ form.invitationStatus | btnStr }}</el-button>
          <el-button @click="save">确定</el-button>
        </td>
      </tr>
      <tr>
        <td>签到</td>
        <td class="week">
          <el-input v-model="form.signIn1" placeholder="第一天"/>
          <el-input v-model="form.signIn2" placeholder="第二天"/>
          <el-input v-model="form.signIn3" placeholder="第三天"/>
          <el-input v-model="form.signIn4" placeholder="第四天"/>
          <el-input v-model="form.signIn5" placeholder="第五天"/>
          <el-input v-model="form.signIn6" placeholder="第六天"/>
          <el-input v-model="form.signIn7" placeholder="第七天"/>
        </td>
        <td/>
        <td>{{ form.signStatus | statusStr }}</td>
        <td class="btn">
          <el-button @click="save('signStatus')">{{ form.signStatus | btnStr }}</el-button>
          <el-button @click="save">确定</el-button>
        </td>
      </tr>
      <tr>
        <td>加客服微信</td>
        <td>
          <el-input v-model="form.addWxTicket" placeholder="请输入单次票数"/>
        </td>
        <td/>
        <td>{{ form.addWxStatus | statusStr }}</td>
        <td class="btn">
          <el-button @click="save('addWxStatus')">{{ form.addWxStatus | btnStr }}</el-button>
          <el-button @click="save">确定</el-button>
        </td>
      </tr>
      <tr>
        <td>上传才艺秀作品</td>
        <td>
          <el-input v-model="form.uploadTalentShowTicket" placeholder="请输入单次票数"/>
        </td>
        <td class="times">
          <el-input v-model="form.uploadTalentShowTimes" placeholder="0"/>次
        </td>
        <td>{{ form.uploadTalentShowStatus | statusStr }}</td>
        <td class="btn">
          <el-button @click="save('uploadTalentShowStatus')">{{ form.uploadTalentShowStatus | btnStr }}</el-button>
          <el-button @click="save">确定</el-button>
        </td>
      </tr>
      <tr>
        <td>分享才艺秀活动</td>
        <td>
          <el-input v-model="form.h5ShareTalentShowTicket" placeholder="请输入单次票数"/>
        </td>
        <td class="times">
          <el-input v-model="form.h5ShareTalentShowTimes" placeholder="0"/>次
        </td>
        <td>{{ form.h5ShareTalentShowStatus | statusStr }}</td>
        <td class="btn">
          <el-button @click="save('h5ShareTalentShowStatus')">{{ form.h5ShareTalentShowStatus | btnStr }}</el-button>
          <el-button @click="save">确定</el-button>
        </td>
      </tr>
    </table>
    <div class="uploads">
      <span>视频上传</span>
      <!-- <el-upload
        :http-request="homepageUpload"
        :limit="1"
        :file-list="fileList"
        class="upload-img"
        list-type="text"
        action="">
        <el-button
          icon="el-icon-upload"
          class="btn-upload"
          circle
        />
      </el-upload> -->
      <div class="upload-box">
        <input v-show="false" ref="input" type="file" accept="video/*" @change="fileChange">
        <el-button :disabled="disableUpload" size="small" type="primary" @click="$refs.input.click()">
          上传视频
        </el-button>
        <el-progress v-show="percentage" :percentage="percentage" :stroke-width="26" :text-inside="true" :color="customColors" class="progress" />
      </div>
      <!-- <el-upload
        :before-upload="uploading"
        :on-remove="handleRemove"
        :on-success="uploadOk"
        :before-remove="beforeRemove"
        :limit="1"
        :file-list="fileList"
        action="videoIdUpload"
        class="upload-demo"
        name="multipartFile"
      >
        <el-button :loading="upload" size="small" type="primary" class="upload-btn">点击上传</el-button>
      </el-upload> -->
      <el-button :loading="upload" class="save-button" @click="save">保存</el-button>
      <div v-show="upload" class="save-tip">请等待视频上传！</div>
    </div>
  </div>
</template>

<script>
import { getSetting, editSetting } from '@/api/setting'
import { getUploadInfo } from '@/api/uploadInfo'
export default {
  name: 'Setting',
  filters: {
    statusStr(val) {
      return Number(val) === 0 ? '开启' : '关闭'
    },
    btnStr(val) {
      return Number(val) === 0 ? '关闭' : '开启'
    }
  },
  data() {
    return {
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#409eff', percentage: 100 }
      ],
      form: {
        addWxStatus: '',
        addWxTicket: 0,
        appLanqingVideoIntroduceId: '',
        h5ShareTalentShowStatus: '',
        h5ShareTalentShowTicket: null,
        h5ShareTalentShowTimes: null,
        invitationStatus: '',
        invitationTicket: null,
        invitationTimes: null,
        signIn1: null,
        signIn2: null,
        signIn3: null,
        signIn4: null,
        signIn5: null,
        signIn6: null,
        signIn7: null,
        signStatus: '',
        trainingTalentShowOverStatus: '',
        trainingTalentShowOverTicket: null,
        uploadTalentShowStatus: '',
        uploadTalentShowTicket: null,
        uploadTalentShowTimes: null
      },
      fileList: [],
      upload: false,
      securityToken: '',
      accessKeyId: '',
      accessKeySecret: '',
      disableUpload: false,
      disableSubmit: true,
      uploadFile: null,
      uploader: null,
      callback: null,
      videoId: '',
      percentage: 0
    }
  },
  mounted() {
    this.getSettingDetail()
  },
  methods: {
    getSettingDetail() {
      getSetting().then(res => {
        if (res.data.code) res.data.message && this.$warn(res.data.message)
        this.form = res.data.data
      })
    },
    save(key) {
      const getObj = this.form
      if (key) {
        getObj[key] = Number(this.form[key]) === 1 ? 0 : 1
      }
      editSetting(getObj).then(res => {
        if (res.data.code) res.data.message && this.$warn(res.data.message)
        this.getSettingDetail()
      })
    },
    handleRemove(file, fileList) {
      this.fileList = []
      this.form.appLanqingVideoIntroduceId = ''
    },
    uploadOk(file) {
      this.form.appLanqingVideoIntroduceId = file.data
    },
    uploading(file) {
      this.upload = true
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    fileChange() {
      if (!event.target.files[0]) {
        return false
      }
      if (!event.target.files[0].type.match('video.*')) {
        this.$message.error('请选择视频文件')
        return false
      }
      this.uploadFile = event.target.files[0]
      this.percentage = 0
      // 上传文件的size的单位为 字节(B)
      // 150兆字节(mb) = 157286400字节(B)
      if (this.uploadFile.size <= 10485760) {
        this.getAuth(() => {
          // 给uploader大佬addFile
          this.getUploder()
          // 以下三个参数默认为空
          // var endpoint = ''
          // var bucket = ''
          // var objectPre = ''
          // if(objectPre)
          // {
          //     object = objectPre +"/"+ event.target.files[i].name
          // }
          // STS的上传方式，需要在userData里指定Title
          var userData = '{"Vod":{"StorageLocation":"","Title":"' + this.uploadFile.name + '","Description":"默认描述信息暂无","CateId":"19","Tags":"测试视频"}}'
          this.uploader.addFile(this.uploadFile, '', '', '', userData)
          this.uploader.startUpload()
          this.disableSubmit = false
        })
      } else {
        this.disableSubmit = true
        this.$message.error('上传的文件大小超过150M，请重新上传')
      }
    },
    getAuth(callback) {
      // 获取上传凭证
      const getObj = {
        uuid: JSON.parse(JSON.parse(localStorage.getItem('userInfo'))).phone
      }
      getUploadInfo(getObj).then(res => {
        if (res.status === 200) {
          this.securityToken = res.data.credentials.securityToken
          this.accessKeyId = res.data.credentials.accessKeyId
          this.accessKeySecret = res.data.credentials.accessKeySecret
          callback()
        } else {
          this.$message.error(res.message)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getUploder() {
      const _this = this
      /* eslint-disable no-undef */
      _this.uploader = new AliyunUpload.Vod({ // 分片大小默认1M，不能小于100K
        userId: '1402947514567452',
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 是否上报上传日志到点播，默认为true
        enableUploadProgress: true,
        // 文件上传失败
        'onUploadFailed': function(uploadInfo, code, message) {
          _this.$message.error(`文件上传失败：${message}`)
          // log(`onUploadFailed: file:${uploadInfo.file.name},code:${code}, message:${message}`)
          _this.disableSubmit = true
          _this.disableUpload = false
        },
        // 文件上传完成
        'onUploadSucceed': function(uploadInfo) {
          // log(uploadInfo)
          // console.log(`onUploadSucceed: ${uploadInfo.file.name}, endpoint:${uploadInfo.endpoint}, bucket:${uploadInfo.bucket}, object:${uploadInfo.object}`)
          _this.form.appLanqingVideoIntroduceId = uploadInfo.videoId
          _this.$message.success('文件上传成功')
          _this.disableSubmit = true
          _this.disableUpload = false
        },
        // 文件上传进度
        'onUploadProgress': function(uploadInfo, totalSize, loadedPercent) {
          _this.percentage = +(loadedPercent * 100).toFixed(0)
          // log(`onUploadProgress:file:${uploadInfo.file.name}, fileSize:${totalSize}, percent:${(loadedPercent * 100.00).toFixed(2)}%`)
        },
        // STS临时账号会过期，过期时触发函数
        'onUploadTokenExpired': function(uploadInfo) {
          console.log('onUploadTokenExpired STS临时账号过期了')
          // 实现时，从新获取STS临时账号用于恢复上传
          // uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, securityToken, expireTime)
        },
        'onUploadCanceled': function(uploadInfo) {
          console.log(`onUploadCanceled:file:${uploadInfo.file.name}`)
        },
        // 开始上传
        'onUploadstarted': function(uploadInfo) {
          var accessKeyId = _this.accessKeyId
          var accessKeySecret = _this.accessKeySecret
          var securityToken = _this.securityToken
          _this.uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, securityToken)
        },
        'onUploadEnd': function(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  tr.title {
    height: 60px;
    line-height: 60px;
    background: rgba(228, 228, 228, 1);
    border: 0;
    border-collapse: collapse;
  }
  tr {
    height: 60px;
    line-height: 60px;
  }
  td {
    border: 0;
    padding-left: 20px;
    box-sizing: border-box;
    &.btn {
      padding-left: 10px;
    }
    &.times {
      /deep/ {
        .el-input {
          width: 60%;
          margin-right: 10%;
        }
      }

    }
    &.week {
      /deep/ {
        .el-input {
          position: relative;
          font-size: 14px;
          display: inline-block;
          width: 12%;
          margin-right: 1%;
        }
      }
    }
  }
}
.uploads {
  padding: 10px;
  box-sizing: border-box;
  .upload-btn {
    margin-top: 20px;
  }
}
.save-button, .save-tip {
  margin-top: 20px;
}
.upload-box {
  margin-top: 20px;
}
.progress {
  margin-top: 10px;
}
</style>
