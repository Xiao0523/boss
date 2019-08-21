<template>
  <div>
    <el-row>
       <el-button type="primary" @click="addCardGroup">新增卡片组</el-button>
    </el-row>

    <el-table
      class="table-box"
      border
      :data="cardGroupArr"
      :header-cell-style="tabHeader">
      <el-table-column align="center" label="#" type="index" prop="index" ></el-table-column>
      <el-table-column align="center" label="卡片组名称" prop="name"> </el-table-column>
      <el-table-column align="center" label="卡片组类型" prop="type">
        <template slot-scope="scope">
          {{scope.row.type | formatTypw}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡片数量" prop="num"></el-table-column>
      <el-table-column align="center" label="卡片组状态" prop="type">
        <template slot-scope="scope">
          {{scope.row.status | formatStatus}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="default" size="mini" @click="navToCard(scope.$index, scope.row)">卡片管理</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)" v-if="!scope.row.status">上架</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)" v-if="!scope.row.status">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
import {getCardGroup, delCardGroup, patchCardGroup} from '@/api/cardGroup'
export default {
  name: 'cardGroupList',
  data() {
    return {
      cardGroupArr: [],
      tabHeader: {
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
    }
  },
  filters: {
    formatTypw(val) {
      let type = {
        0: '新手',
        1: '普通'
      }
      return type[val] ? type[val] : '未知'
    },
    formatStatus(val) {
      let status = {
        0: '未上架',
        1: '已上架'
      }

      return status[val] ? status[val] : '未知'
    }
  },
  
  methods: {
    // 添加卡片组
    addCardGroup() {
      this.$router.push({name: 'cardGroupAdd'})
    },

    // 进入卡片管理
    navToCard(index, row) {
      this.$router.push({name: 'card', query: { cardGroupId: row.id, status: row.status, num: row.num}})
    },

    //修改卡片组 -上架操作 已上架不可再操作
    edit(index, row) {
      if(row.status == 1) {
        return this.$wran('该卡片组已上架！')
        
      }

      patchCardGroup(row.id)
      .then(res => {
        if (res.data.code) {
          return this.$wran(res.data.message)
        }

        this.$success('操作成功！');

        let _row = Object.assign(row, {status: 1})
        this.$set(this.cardGroupArr, index, _row)
      })
      .catch((err) => {})
    },

    //删除前 先询问用户 确定后 才发起删除
    del(index, row) {
      if(row.status == 1) {
        return this.$wran('该卡片组已上架, 不可删除！')
      }
      this.$confirm('确定要删除' + row.name + '卡片组吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        // 发起删除
        delCardGroup(row.id)
        .then(res => {
          if (res.data.code) {
            return this.$wran(res.data.message)
          }
          this.$success('操作成功！');

          this.cardGroupArr.splice(index, 1);
        })
        .catch((err) => {})
      })
      .catch((err) => {})
    },
   
  },
  created() {
    // 获取卡组数据
    getCardGroup()
    .then(res => {
      if (res.data.data.code) return
      if (!res.data.data || !res.data.data.length) return
      this.cardGroupArr = res.data.data
    })
    .catch(err => { })
  },

}
</script>
<style lang="scss" scoped>
  .table-box {
    margin-top: 20px;
  }
</style>


