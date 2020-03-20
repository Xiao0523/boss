<template>
  <div>
    <el-row class="select-row">
      <div>
        <span>上传位置:</span>
        <el-select v-model="uploadStr" placeholder="上传位置" @change="editSelect(uploadStr, 'position')">
          <el-option
            v-for="item in uploadList"
            :key="item.label"
            :label="item.value"
            :value="item.label"/>
        </el-select>
      </div>
      <div>
        <span>banner类型:</span>
        <el-select v-model="typeStr" placeholder="banner类型" @change="editSelect(typeStr, 'type')">
          <el-option
            v-for="item in typeList"
            :key="item.label"
            :label="item.value"
            :value="item.label"/>
        </el-select>
      </div>
      <div>
        <span>状态:</span>
        <el-select v-model="statusStr" placeholder="状态" @change="editSelect(statusStr, 'status')">
          <el-option
            v-for="item in statusList"
            :key="item.label"
            :label="item.value"
            :value="item.label"/>
        </el-select>
      </div>
      <el-button type="primary" @click="search">查找</el-button>
      <el-button type="primary" @click="addNew">新增</el-button>
    </el-row>
    <el-table
      :data="list"
      :header-cell-style="tabHeader"
      class="table-box"
      border>

      <el-table-column align="center" label="位置">
        <template slot-scope="scope">{{ scope.row.position | positionStr }}</template>
      </el-table-column>
      <el-table-column align="center" label="banner描述" prop="bannerDescription"/>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">{{ scope.row.type | typeStr }}</template>
      </el-table-column>
      <el-table-column align="center" label="排序" prop="orderIndex"/>
      <el-table-column align="center" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.bannerPic" alt="" class="list-img">
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">{{ scope.row.status | statusStr }}</template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" prop="beginTime"/>
      <el-table-column align="center" label="结束时间" prop="endTime"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="" size="mini" @click="edit(scope.row.bannerId)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <div v-show="totalNum" class="pageNumBox">
      <pageNum
        :current-page="fetchObj.pageNum"
        :page-size="fetchObj.pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentChangeFn"
      />
    </div>
  </div>

</template>
<script>
import { getBannerList } from '@/api/lanBanner'
import pageNum from '@/components/pageNum'

export default {
  name: 'SearchRoll',
  components: {
    pageNum
  },
  filters: {
    positionStr(val) {
      return Number(val) === 0 ? '首页' : '才艺秀'
    },
    typeStr(val) {
      return Number(val) === 0 ? '课程' : Number(val) === 1 ? '活动' : '其他'
    },
    statusStr(val) {
      return Number(val) === 0 ? '待上架' : Number(val) === 1 ? '上架中' : '已下架'
    }
  },
  data() {
    return {
      rollList: [], // 列表数据
      currerntItem: {// 新增的 数据项
        index: '',
        title: ''
      },
      isShow: false, // 弹窗显示标识
      tabHeader: {// 表头样式
        'background-color': '#F4F4F4',
        'color': '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      uploadList: [{
        value: '全部',
        label: ''
      },
      {
        value: '首页',
        label: 0
      }, {
        value: '才艺秀',
        label: 1
      }],
      typeList: [{
        value: '全部',
        label: ''
      }, {
        value: '课程',
        label: 0
      }, {
        value: '活动',
        label: 1
      }, {
        value: '其他',
        label: 2
      }],
      statusList: [{
        value: '全部',
        label: ''
      }, {
        value: '待上架',
        label: 0
      }, {
        value: '上架中',
        label: 1
      }, {
        value: '已下架',
        label: 2
      }],
      uploadStr: '全部',
      typeStr: '全部',
      statusStr: '全部',
      list: [],
      fetchObj: {
        'pageNum': 1,
        'pageSize': 10,
        'position': '',
        'status': '',
        'type': ''
      },
      totalNum: 0
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    edit(id) {
      this.$router.push({ path: 'bannerEdit', query: { id: id }})
    },
    editSelect(val, key) {
      this.fetchObj[key] = val
    },
    search() {
      this.fetchObj.pageNum = 1
      this.fetchList()
    },
    addNew() {
      this.$router.push({ name: 'BannerEdit' })
    },
    fetchList() {
      const fetchObj = this.fetchObj
      getBannerList(fetchObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        const { data } = res.data
        this.totalNum = data.total
        const records = data.records
        this.list = records && records.length ? records : []
      })
    },
    sizeChangeFn(size) {
      this.fetchObj.pageSize = size
      this.fetchList()
    },
    // currentPage(	当前页) 改变时会触发
    currentChangeFn(page) {
      this.fetchObj.pageNum = page
      this.fetchList()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-box{
  margin-top: 20px;
}

.select-row {
  display: flex;
  & > button {
    margin-left: 0;
  }
  & > * {
    margin-right: 20px;
    & > span {
      margin-right: 10px;
    }
  }
}

.list-img {
  max-width: 100px;
  max-height: 70px;
}
</style>
