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
      <el-upload
        :before-upload="uploading"
        :on-remove="handleRemove"
        :on-success="uploadOk"
        :before-remove="beforeRemove"
        :limit="1"
        :file-list="fileList"
        :action="videoIdUpload"
        class="upload-demo"
        name="multipartFile"
      >
        <el-button :loading="upload" size="small" type="primary" class="upload-btn">点击上传</el-button>
      </el-upload>
      <el-button :loading="upload" class="save-button" @click="save">保存</el-button>
      <div v-show="upload" class="save-tip">请等待视频上传！</div>
    </div>
  </div>
</template>

<script>
import { getSetting, editSetting } from '@/api/setting'
import { videoIdUpload } from '@/http/url'
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
      videoIdUpload: videoIdUpload
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
</style>
