<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="keyWord" ref="searchForm">
        <el-button type="success" @click="addNovel">添加小说</el-button>

        <el-form-item>
          <el-input v-model.trim="keyWord.title" placeholder="输入小说标题" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="keyWord.categoryId" clearable placeholder="请选择类目">
                <el-option
                    v-for="item in categorys"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-button type="primary" @click="search('searchForm')">搜索</el-button>
      </el-form>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="novels"
      :header-cell-style="tabHeader">
      <el-table-column align="center" prop="title" label="小说标题"></el-table-column>
      <el-table-column align="center" prop="cover" label="小说封面">
        <template slot-scope="scope">
          <img class="gallery-img" :src="scope.row.cover" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="author" label="小说作者"></el-table-column>
      <el-table-column align="center" prop="introdution" label="小说简介"></el-table-column>
      <el-table-column align="center" label="类目">
         <template slot-scope="scope">{{scope.row.categoryInfo | formatCategoryInfo}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑类目</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--分页-->
    <div class="pageNumBox">
      <pageNum :currentPage="pageNo"
               :pageSize="pageSize"
               :total="totalNum"
               @sizeChange="sizeChangeFn"
               @currentChange="currentPageChange"
      ></pageNum>
    </div>

    <el-dialog title="类目选择" :visible.sync="isShow" width="30%">
      <el-checkbox :indeterminate="isInderminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
      <el-checkbox-group class="checkbox-group" v-model="choosenCategory">
        <el-checkbox 
          v-for="item in categorys"
          :key="item.id" 
          :label="item.id" 
          style="width:19.5%">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
<script>
import {getNovelList,getCategoryList, delNovel, postNovelCategoryRelation, getNovelCategoryRelateionById} from '@/api/happRead'
import pageNum from '@/components/pageNum'
import {UploadUrl} from '@/http/url'
import Dialog from "@/components/common/dialog"
export default {
  name: 'happyReadList',
  components: {
    pageNum,
  },
  data() {
    return {
      novels: [],//小说列表数据
      categorys: [],// 类目列表
      keyWord: {//搜索关键字
        title: '',
        categoryId: '',
      },
      currentNovel: {},//所点击当前小说条目
      totalNum: null, // 数据总条数
      pageNo: 1, //当前页
      pageSize: 10,// 每页的条数
      tabHeader: {
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },

      isShow: false,//弹窗显示标识
      isInderminate: true,//全选勾选框未确定状态
      checkAll: false,//全选
      choosenCategory: [],//选中的 栏目
    }
  },
  filters: {
      formatCategoryInfo(val) {
          let result = val.map(item => item.name)
          return result.join('|')
      }
  },
  methods: {

    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchNovels()
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchNovels()
    },

    // 添加小说
    addNovel() {
      this.$router.push({name: 'happyReadAdd'})
    },

    //关闭类目弹窗
    close() {
      this.isShow = false
    },

    // 修改类目 按钮 打开弹窗 选中数据 为当前条目
    edit(index, row) {
      this.currentNovel = JSON.parse(JSON.stringify(row))
      this.choosenCategory = !this.currentNovel.categoryInfo.length ? [] : this.currentNovel.categoryInfo.map(item => item.id)
      this.isShow = true
    },

    // 勾选全选类目
    checkAllChange(e) {
      this.isInderminate = false
      this.choosenCategory = e ? this.categorys.map(item => item.id) : []
    },

    // 提交小说关联类目 并更新该小说的类目
    onSubmit() {
      if(!this.choosenCategory || !this.choosenCategory.length) {
        return this.$wran('请选中类目')
      }
      let index = this.novels.findIndex(item => item.id === this.currentNovel.id)
      postNovelCategoryRelation({
        noteId: this.currentNovel.id,
        categories: this.choosenCategory
      }).then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('操作成功')
        this.close()
        getNovelCategoryRelateionById(this.currentNovel.id)
        .then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          if (!res.data.data) return
          this.currentNovel.categoryInfo = res.data.data.length ? res.data.data : []
          this.$set(this.novels, index, this.currentNovel)
        })
      })
    },

    // 删除小说
    del(index, row) {
        delNovel(row.id)
        .then(res => {
            if(res.data.code) {
                return res.data.message && this.$wran(res.data.message)
            }
            this.$success('操作成功')
            this.fetchNovels()
        })
    },

    // 获取小说列表
    fetchNovels() {
      let argsObj = { 
        pageNum: this.pageNo,
        pageSize: this.pageSize || 10,
      }
      
      let keyWord = this.keyWord
      if(keyWord.title) {
        argsObj.title = keyWord.title
      }
      if (keyWord.categoryId) {
        argsObj.categoryId = keyWord.categoryId
      }

      // 获取小说列表
      getNovelList(argsObj).then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        let records = res.data.data.records
        this.novels = records && records.length ? records : []
      })
    },

    // 点击搜索 获取小说列表 列表置为第一页
    search(form) {
      this.$refs[form].validate(valid => {
        if (!valid) return
        this.pageNo = 1
        this.fetchNovels()
      })
    },
  },
  created() {
    this.fetchNovels()

    // 获取小说的类目
    getCategoryList()
    .then(res => {
      if(res.data.code) {
        return res.data.message && this.$wran(res.data.message)
      }
      if (!res.data.data) return

      this.categorys = res.data.data.length ? res.data.data : []
    })
   }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}

.gallery-img{
  width: 100px;
  height: 80px;
  object-fit: scale-down
}
</style>