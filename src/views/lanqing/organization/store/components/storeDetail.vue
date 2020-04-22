<template>
  <div>
    <el-form
      ref="noveForm"
      :model="list"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="店铺logo">
        <img v-show="list.logo" :src="list.logo" class="img-box" >
      </el-form-item>

      <el-form-item v-show="list.covers && list.covers.length" label="店铺封面">
        <div class="tabel-flex">
          <img v-for="(item, index) in list.covers" :key="item + index" :src="item" class="img-box" >
        </div>
      </el-form-item>

      <el-form-item v-show="list.videoInfo && list.videoInfo.videoUrl && list.videoInfo.videoCoverUrl" label="店铺视频">
        <div v-show="list.videoInfo && list.videoInfo.videoUrl && list.videoInfo.videoCoverUrl" class="video">
          <video
            id="video"
            :src="list.videoInfo && list.videoInfo.videoUrl"
            :poster="list.videoInfo && list.videoInfo.videoCoverUrl"
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="false"
            x5-video-orientation="portraint"
            style="object-fit:fill"
            @click="videoPlay"
          />
          <div v-show="!videoPlayFlag" class="mask-bg">
            <div class="video-btn" @click="videoPlay">
              <span/>
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="营业时间" prop="businessHours">
        <el-input v-model.trim="list.businessHours" disabled/>
      </el-form-item>

      <el-form-item label="成立时间" prop="establishmentDate">
        <el-input v-model.trim="list.establishmentDate" disabled/>
      </el-form-item>

      <el-form-item label="联系人" prop="contactName">
        <el-input v-model.trim="list.contactName" disabled/>
      </el-form-item>

      <el-form-item label="联系电话" prop="contactPhone">
        <el-input v-model.trim="list.contactPhone" disabled/>
      </el-form-item>

      <el-form-item label="店铺地址" prop="businessAddress">
        <el-input v-model.trim="list.businessAddress" disabled/>
      </el-form-item>

      <el-form-item label="讲师数" prop="teacherAmount">
        <el-input v-model.trim="list.teacherAmount" disabled/>
      </el-form-item>

      <el-form-item label="累计学员" prop="studentAmount">
        <el-input v-model.trim="list.studentAmount" disabled/>
      </el-form-item>

      <el-form-item label="课程数" prop="curriculumAmount">
        <el-input v-model.trim="list.curriculumAmount" disabled/>
      </el-form-item>

      <el-form-item label="店铺标语" prop="selfDescription">
        <el-input v-model.trim="list.selfDescription" disabled/>
      </el-form-item>

      <el-form-item label="课程类目选择" prop="categoryNames">
        <el-input v-model.trim="list.categoryNames" disabled/>
      </el-form-item>

      <el-form-item label="店铺介绍" prop="introduce">
        <div v-html="list.introduce"/>
      </el-form-item>
    </el-form>
      </el-tab-pane>
    </el-form>
  </div>
</template>
<script>
import { getStoreDetail } from '@/api/store'
export default {
  name: 'StoreComponents',
  props: {
    leave: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      list: {},
      videoPlayFlag: false
    }
  },
  watch: {
    leave() {
      if (!this.leave) {
        video.pause()
      }
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.getDetail(id)
    }
  },
  methods: {
    getDetail(id) {
      const getObj = {
        id: id
      }
      getStoreDetail(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
      })
    },
    videoPlay() {
      this.videoPlayFlag = !this.videoPlayFlag
      if (this.videoPlayFlag) {
        video.play() // 播放控制
        return
      }
      video.pause() // 暂停控制
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.el-date-editor /deep/ .el-range-separator {
  width: initial;
}

.img-box {
  display: block;
  width: 100px;
  height: 100px;
}

.video {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  position: relative;
  background: #000;
  video {
    width: 400px;
    height: 100%;
  }
  .mask-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .video-btn {
      position: absolute;
      width: 60px;
      height: 60px;
      background:rgba(0,0,0,.6);
      border-radius: 100%;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-top: -30px;
      span {
        position: absolute;
        width: 0;
        height: 0;
        border-width: 10px 0 10px 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border-style: solid;
        border-color: transparent transparent transparent #fff;
      }
    }
  }
}
</style>
