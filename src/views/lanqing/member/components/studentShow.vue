<template>
  <div>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="name" label="参与活动" />
      <el-table-column align="center" label="课程价格">
        <template slot-scope="scope">
          {{ scope.row.beginTime }} - {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="参赛作品">
        <template slot-scope="scope">
          <router-link :to="{ name: 'CompositionDetail', query: { id: scope.row.id } }">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="payTime" label="所获荣誉">
        <template slot-scope="scope">
          {{ scope.row.ranking | rankingStr }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getStudentShow } from '@/api/member'
export default {
  name: 'ShowComponent',
  filters: {
    rankingStr(val) {
      const value = Number(val)
      return value === 1 ? '第一名' : value === 2 ? '第二名' : value === 2 ? '第三名' : '没有名次'
    }
  },
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
        if (this.val === 'getStudentShow') {
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
      getStudentShow(getObj).then(res => {
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
