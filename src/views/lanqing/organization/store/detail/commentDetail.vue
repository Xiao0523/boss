<template>
  <section class="container">
    <div class="wraper">
      <div v-for="item in content.commentSubDetails" :key="item.id" class="guest-box">
        <h3 class="title">
          {{ item.type | typeStr }}
        </h3>
        <div class="img-box">
          <img v-show="item.icon" :src="item.icon" alt="">
          <div class="user-info">
            <span class="title">{{ item.name }}</span>
            <div class="star-box">
              <star :score="item.score" />
            </div>
          </div>
        </div>
        <div class="guest-font">{{ item.commentWords }}</div>
        <div class="form-box"/>
      </div>
    </div>
    <div class="backBtn">
      <el-button @click="goBack">返回</el-button>
    </div>
  </section>
</template>
<script>
import { getCommentDetail } from '@/api/store'
export default {
  name: 'CommentDetail',
  filters: {
    typeStr(val) {
      return Number(val) === 0 ? '机构评价' : Number(val) === 1 ? '课程评价' : '教师评价'
    }
  },
  data() {
    return {
      content: {}
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
      getCommentDetail(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.content = res.data.data
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

.container {
}
.page-head-wraper{
  margin-bottom: 25px;
}
.wraper {
  background: #fff;
  padding: 30px;
}
.btn-box {
  margin-top: 10px;
}
.guest-box {
  width: 100%;
  padding: 30px;
  border-bottom: 1px solid #E2E2EA;
  box-sizing: border-box;
  & > .title {
    position: relative;
    width:64px;
    height:18px;
    font-size:16px;
    font-weight:500;
    color:rgba(23,23,37,1);
    line-height:18px;
    padding: 0;
    margin: 0;
    &::before{
      display: block;
      content: '';
      position: absolute;
      width:6px;
      height:18px;
      background:rgba(0,210,165,1);
      left: -30px;
    }
  }
  .img-box {
    display: flex;
    margin-top: 21px;
    img {
      display: block;
      width: 39px;
      height: 39px;
      margin-right: 12px;
    }
    .user-info {
      span {
        display: block;
        &.title {
          font-size:14px;
          font-weight:600;
          color:rgba(23,23,37,1);
          line-height:20px;
        }
      }
      .star-box {
        display: flex;
        & > span {
          font-size:15px;
          font-weight:500;
          color:rgba(0,210,165,1);
          line-height:15px;
          margin-left: 10px;
        }
      }
    }
  }
  .guest-font {
    margin: 22px 0 16px;
    font-size:14px;
    font-weight:400;
    color:rgba(68,68,79,1);
    line-height:24px;
  }
  .form-box {
    display: flex;
    /deep/ {
      .reply-input .el-input__inner {
        height: 46px;
        line-height: 46px;
        background: rgba(250,250,251,1);
        border-radius: 4px;
        border: 1px solid rgba(241,241,245,1);
      }
      .reply-btn {
        width:150px;
        height:46px;
        color: #fff;
        background:rgba(0,210,165,1);
        border-radius:0px 4px 4px 0px;
        border:1px solid rgba(0,0,0,0.05);
        font-size:14px;
        font-weight:600;
        line-height:20px;
      }
    }
  }
}
.tip {
  display: inline-block;
  font-size:12px;
  font-weight:400;
  color:rgba(157,157,167,1);
  line-height:24px;
  margin-top: 10px;
  i {
    margin-right: 5px;
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
