<template>
  <div>
    <el-tabs v-model="storeVal" @tab-click="leaveClick">
      <el-tab-pane name="getStoreDetail">
        <span slot="label">店铺基本信息</span>
        <store-details :val="storeVal" :leave="leave" />
      </el-tab-pane>
      <el-tab-pane name="getClassList">
        <span slot="label">课程信息</span>
        <class-tabel :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getTeacherList">
        <span slot="label">讲师信息</span>
        <teacher-tabel :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getStudentList">
        <span slot="label">学员信息</span>
        <student-tabel :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getOrderList">
        <span slot="label">订单信息</span>
        <order-tabel :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getCommentList">
        <span slot="label">评论信息</span>
        <comment-tabel :val="storeVal" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import StoreDetails from '../components/storeDetail'
import ClassTabel from '../components/classTabel'
import TeacherTabel from '../components/teacherTabel'
import StudentTabel from '../components/studentTabel'
import OrderTabel from '../components/orderTabel'
import CommentTabel from '../components/commentTabel'
export default {
  name: 'StoreDetail',
  components: {
    StoreDetails,
    ClassTabel,
    TeacherTabel,
    StudentTabel,
    OrderTabel,
    CommentTabel
  },
  data() {
    return {
      storeVal: 'getStoreDetail',
      leave: true
    }
  },
  mounted() {
  },
  methods: {
    leaveClick() {
      if (this.storeVal === 'getStoreDetail') {
        this.leave = true
      } else {
        this.leave = false
      }
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
.diglog-textarea {
  display: block;
  width: 100%;
  textarea {
    display: block;
    width: 100%;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 30px;
    height: 120px;
  }
}
.tabel-flex {
  display: flex;
  img {
    margin-right: 20px;
  }
}
</style>
