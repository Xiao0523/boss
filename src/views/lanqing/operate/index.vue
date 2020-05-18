<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="keyWord.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="费用类型">
          <el-select v-model="keyWord.type">
            <el-option
              v-for="item in type"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" label="费用类型">
        <template slot-scope="scope">
          {{ scope.row.type | typeStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="reason" label="使用事由" />
      <el-table-column align="center" prop="useTime" label="费用使用时间" />
      <el-table-column align="center" prop="money" label="金额" />
      <el-table-column align="center" prop="chargePerson" label="负责人" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'OperateDetail', query: { id: scope.row.uuid }}"><el-button type="danger" size="mini">查看</el-button></router-link>
          <el-button type="danger" size="mini" @click="del(scope.row.uuid)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getOperate, delOperate } from '@/api/operate'
export default {
  name: 'MemberList',
  filters: {
    typeStr(val) {
      const value = Number(val)
      return value === 0 ? '才艺秀' : value === 1 ? 'APP推广' : value === 2 ? '商户推广' : value === 3 ? '红包' : '其它'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      keyWord: {// 搜索关键字
        beginDate: '',
        endDate: '',
        type: '',
        timeRange: ''
      },
      diglogFlag: false,
      type: [{
        label: '全部',
        value: ''
      }, {
        label: '才艺秀',
        value: 0
      }, {
        label: 'APP推广',
        value: 1
      }, {
        label: '商户推广',
        value: 2
      }, {
        label: '红包',
        value: 3
      }, {
        label: '其它',
        value: 4
      }],
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
  mounted() {
    this.fetchList()
  },
  methods: {
    del(id) {
      const getObj = {
        id: id
      }
      delOperate(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$wran(res.data.message)
        this.$success('删除成功！')
        this.fetchList()
      })
    },
    add() {
      this.$router.push({
        name: 'OperateEdit'
      })
    },
    fetchList() {
      const argsObj = {
        ...this.keyWord
      }

      const keyWord = this.keyWord

      if (keyWord.timeRange && keyWord.timeRange.length) {
        const getDate = d => {
          const Y = d.getFullYear()
          let M = d.getMonth() + 1
          let D = d.getDate() + 1
          if (M < 10) {
            M = '0' + M
          }
          if (D < 10) {
            D = '0' + D
          }
          return `${Y}-${M}-${D}`
        }

        argsObj.beginTime = getDate(keyWord.timeRange[0])
        argsObj.endTime = getDate(keyWord.timeRange[1])
      }
      getOperate(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
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
</style>
