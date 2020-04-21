<template>
  <div>
    <el-row>
      <el-form ref="searchForm" :inline="true" :model="keyWord">
        <!-- <el-form-item>
          <el-input v-model="keyWord.storeName" placeholder="请输入讲师名称" />
        </el-form-item>

        <el-form-item>
          <el-select v-model="keyWord.status">
            <el-option
              v-for="item in status"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="fetchList">搜索</el-button> -->
        <el-button type="primary" @click="addGroup">创建群组</el-button>
      </el-form>
    </el-row>
    <el-table :data="list" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" label="群聊头像">
        <template slot-scope="scope">
          <img v-show="scope.row.groupIcon" :src="scope.row.groupIcon" class="img-box" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="groupName" label="群聊名称" />
      <el-table-column align="center" prop="createTime" label="创建时间" />
      <el-table-column align="center" label="推荐状态">
        <template slot-scope="scope">
          {{ scope.row.recommend | recommendStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="	群组状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusStr }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'GroupDetail', query: { id: scope.row.groupId }}"><el-button type="danger" size="mini">查看</el-button></router-link>
          <el-button size="mini" @click="deleteOnce(scope.row.groupId)">解散</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getGroupList, delGroup } from '@/api/group'
import pageNum from '@/components/pageNum'
export default {
  name: 'OrganizationList',
  components: {
    pageNum
  },
  filters: {
    statusStr(val) {
      return val === 0 ? '有效' : '解散'
    },
    recommendStr(val) {
      return val === 0 ? '不推荐' : '推荐'
    }
  },
  data() {
    return {
      list: [], // 列表数据
      keyWord: {// 搜索关键字
        // status: '',
        // name: ''
      },
      diglogFlag: false,
      status: [
        {
          label: '全部',
          value: ''
        }, {
          label: '启用',
          value: '0'
        }, {
          label: '停用',
          value: '1'
        }
      ],
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
    fetchList() {
      const getObj = this.keyWord
      getGroupList(getObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const records = res.data.data
        this.list = records && records.length ? records : []
      })
    },
    addGroup() {
      this.$router.push({ name: 'GroupEdit' })
    },
    deleteOnce(val) {
      const getObj = {
        id: val
      }
      this.$confirm('确定要解散吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGroup(getObj).then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('解散成功！')
          this.fetchList()
        })
      }).catch(res => {
        console.log(res)
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

.img-box {
  display: block;
  width: 100px;
  height: 100px;
}
</style>
