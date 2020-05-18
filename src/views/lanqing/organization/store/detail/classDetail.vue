<template>
  <div class="wraper panel">
    <div class="panel__bd">
      <div class="flex">
        <div class="flex__hd">课程封面</div>
        <div class="flex__bd">
          <img :src="list.cover" class="avatar">
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程名称</div>
        <div class="flex__bd">
          <strong>{{ list.name }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程价格</div>
        <div class="flex__bd">
          <strong>{{ list.price }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">开课时间</div>
        <div class="flex__bd">
          <strong>{{ list.beginDate }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">班型</div>
        <div class="flex__bd">
          <strong>{{ list.enrolment }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程类目</div>
        <div class="flex__bd">
          <strong>{{ list.categoryName }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">适合年龄段</div>
        <div class="flex__bd">
          <strong>{{ list.ageInterval | ageIntervalStr }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课时</div>
        <div class="flex__bd">
          <strong>{{ list.hours }}</strong>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程标签</div>
        <div class="flex__bd">
          {{ list.tags }}
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">推荐讲师</div>
        <div class="flex__bd">
          <div v-for="item of list.teachers" :key="item.name" class="teacher">
            <img :src="item.photo" class="teacher-avatar" alt="头像">
            <div class="teacher-info">
              <h6 class="teacher-name">{{ item.realName }}</h6>
              <div class="teacher-slogan">{{ item.briefIntroduction }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程介绍</div>
        <div class="flex__bd">
          <p class="course-intro" v-html="list.detailWords" />
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">课程大纲</div>
        <div class="flex__bd">
          <a :href="list.outline" target="_blank">
            <el-button type="primary">打开大纲</el-button>
          </a>
        </div>
      </div>
      <div class="flex">
        <div class="flex__hd">学员风采</div>
        <div class="flex__bd">
          <ul class="list">
            <li v-for="item of list.studentStyle" :key="item"><img :src="item" class="list-img" alt=""></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import { getClassDetail } from '@/api/store'
export default {
  name: 'ClassDetail',
  filters: {
    ageIntervalStr(val) {
      const value = Number(val)
      return value === 0 ? '0-3' : value === 1 ? '4-6' : value === 2 ? '7-9' : value === 3 ? '10-12' : value === 4 ? '13-15' : '16-18'
    }
  },
  data() {
    return {
      list: {},
      tagList: []
    }
  },
  mounted() {
    const id = this.$route.query.id
    const storeId = this.$route.query.storeId
    if (id) {
      this.getDetail(storeId, id)
    }
  },
  methods: {
    getDetail(storeId, id) {
      const getObj = {
        storeId: storeId,
        id: id
      }
      getClassDetail(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
        this.tagList = res.data.tags && res.data.tags.split(',')
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 24px;
  font-family: PingFangSC-Semibold,PingFang SC;
  font-weight: 600;
  color: rgba(23,23,37,1);
  line-height: 33px;
  margin: 0;
  margin-bottom: 30px;
}
.wraper {
  background: #fff;
}

.avatar {
  width: 128px;
  height: 80px;
  display: block;
  object-fit: scale-down;
}

.course-avatar {
  display: block;
  width: 80px;
  height: 80px;
}
.course-intro{
  width: 750px;
  font-size: 15px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: bold;
  color: rgba(23,23,37,1);
  line-height: 32px;
  & >>> * {
    display: block;
    max-width: 750px;
  }
}

.teacher{
  display: flex;
  align-items: center;
  width: 390px;
  background: rgba(250,250,251,1);
  border-radius: 2px;
  padding: 10px;
  margin-top: 10px;
  &-avatar{
    width: 48px;
    height: 48px;
  }
  &-info{
    flex: 1;
    margin-left: 10px;
  }
  &-name{
    font-size: 15px;
    margin: 0;
    font-family: PingFangSC-Medium,PingFang SC;
    color: rgba(51,51,51,1);
    line-height: 15px;
  }
  &-slogan{
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(168,168,168,1);
    line-height: 13px;
    margin-top: 9px;
  }
  &-close{
    font-size: 20px;
    color: rgba(168,168,168,1);
  }
}

.panel {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding-bottom: 50px;
  &__hd {
    padding: 22px 30px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
    line-height: 25px;
    border-bottom: 1px solid rgba(226, 226, 234, 1);
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__bd {
    padding: 25px 30px 0;
  }
  &-title{
    margin: 0;
  }
}
.flex{
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  &__hd{
    width: 7em;
    text-align: right;
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(105,105,116,1);
    line-height: 42px;
    margin-right: 30px;
  }
  &__bd{
    font-size: 13px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(23,23,37,1);
    line-height: 42px;
  }
}

/deep/ {
  .el-dialog {
    width: 500px;
  }
  .el-dialog__body {
    padding: 0;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(241,241,245,1);
  }
  .el-radio--medium.is-bordered {
    padding: 0;
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin-left: 0;
  }
  .el-radio-button__inner, .el-radio-group {
    display: flex;
    flex-wrap: wrap ;
  }
}

.list{
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  &-img{
    display: block;
    width: 80px;
    height: 80px;
    background: rgba(216,216,216,1);
    border-radius: 1px;
    margin-right: 10px;
  }
}

.tabs-wraper /deep/ {
  .el-tabs__item {
    line-height: 70px;
    height: 70px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(23, 23, 37, 1);
  }
  .is-active {
    color: rgba(0, 210, 165, 1);
  }
  .el-tabs__active-bar {
    height: 4px;
    background-color: rgba(0, 210, 165, 1);
  }
}

.el-form-item {
  margin: 0;
}

.table-wraper {
  padding: 20px 15px 30px;
  background: #fff;
  border-radius: 2px;
}

.table {
  & /deep/ {
    thead > tr {
      border-radius: 2px;
    }
    & th {
      background: rgba(250, 250, 251, 1);
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(68, 68, 79, 1);
      line-height: 18px;
    }
  }
}
.change {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 210, 165, 1);
  line-height: 24px;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
}

.dialog-title {
  margin: 0;
  font-size:14px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  color:rgba(23,23,37,1);
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(241,241,245,1);
}

.el-alert--error {
  background: transparent;
}

.tags {
  margin-right: 10px;
}

.dialog-btn {
  width:96px;
  height:38px;
  padding: 0;
  line-height: 38px;
  background:rgba(0,210,165,1);
  border-radius:4px;
  border:1px solid rgba(0,0,0,0.05);
}
.backBtn {
  margin: auto;
  text-align: center;
  margin-top: 40px;
}
</style>
