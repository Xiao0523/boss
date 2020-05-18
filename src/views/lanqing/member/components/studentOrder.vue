<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="curriculumName" label="课程名" />
      <el-table-column align="center" prop="curriculumPrice" label="课程价格" />
      <el-table-column align="center" prop="orderNum" label="订单编号" />
      <el-table-column align="center" prop="payPrice" label="实际支付价格" />
      <el-table-column align="center" prop="payTime" label="支付时间" />
      <el-table-column align="center" prop="statusDescription	" label="状态描述" />
    </el-table>
  </div>
</template>
<script>
import { getStudentOrder } from '@/api/member'
export default {
  name: 'OrderComponent',
  props: {
    val: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      list: [],
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      }
    }
  },
  watch: {
    val: {
      handler() {
        if (this.val === 'getStudentOrder') {
          const id = this.$route.query.id
          if (id) {
            this.getDetail(id)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getDetail(id) {
      const getObj = {
        id: id
      }
      getStudentOrder(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data) return
        this.list = res.data.data
      })
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

.course-info{
  display: flex;
  &__item{
    width: 100px;
    text-align: center;
    border-left:1px solid rgba(241,241,245,1);
    &:last-child{
      border-right:1px solid rgba(241,241,245,1);
    }
  }
  .info-title{
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(25,25,39,1);
    line-height:20px;
    margin: 0;
    margin-bottom: 6px;
  }
  .info-number{
    font-size:16px;
    font-family:Poppins-SemiBold,Poppins;
    font-weight:600;
    color:rgba(23,23,37,1);
    line-height:25px;
  }
  .green{
   color:rgba(61,213,152,1);
  }
  .red{
    color:rgba(255,73,82,1);
  }
}
</style>
