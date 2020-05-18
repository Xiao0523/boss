<template>
  <div>
    <el-tabs v-model="storeVal">
      <el-tab-pane name="getStudentInfo">
        <span slot="label">基本信息</span>
        <student-info :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getStudentCousor">
        <span slot="label">课程信息</span>
        <student-cursor :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getStudentOrder">
        <span slot="label">订单信息</span>
        <student-order :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getStudentMoney">
        <span slot="label">奖学金信息</span>
        <student-money :val="storeVal" />
      </el-tab-pane>
      <el-tab-pane name="getStudentShow">
        <span slot="label">才艺秀信息</span>
        <student-show :val="storeVal" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import StudentInfo from '../components/studentInfo'
import StudentMoney from '../components/studentMoney'
import StudentCursor from '../components/studentCursor'
import StudentOrder from '../components/studentOrder'
import StudentShow from '../components/studentShow'
export default {
  name: 'StudentDetail',
  components: {
    StudentInfo,
    StudentCursor,
    StudentOrder,
    StudentMoney,
    StudentShow
  },
  data() {
    return {
      storeVal: 'getStudentInfo',
      leave: true
    }
  },
  mounted() {
  },
  methods: {
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
