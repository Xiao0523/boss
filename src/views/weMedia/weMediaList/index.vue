<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model.trim="keyWord" placeholder="输入搜索关键字" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form>

    </el-row>
    <el-table
      class="table-box"
      border
      :data="articles"
      :header-cell-style="tabHeader">
      <el-table-column align="center" prop="title" label="文章标题"></el-table-column>
      <el-table-column align="center" prop="href" label="文章链接"></el-table-column>
      <el-table-column align="center" prop="tags" label="文章类目">
         <template slot-scope="scope">{{formatTag(scope.row.tags)}}</template>
      </el-table-column>
      <el-table-column align="center" prop="creator" label="文章作者"></el-table-column>
      
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">修改类目</el-button>
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

    <el-dialog title="文章类目选择" :visible.sync="isShow" width="30%">
      <el-checkbox :indeterminate="isInderminate" v-model="checkAll" @change="checkAllChange">全选</el-checkbox>
      <el-checkbox-group class="checkbox-group" v-model="choosenTags">
        <el-checkbox 
          v-for="item in tags"
          :key="item.id" 
          :label="item.id" 
          style="width:19.5%">{{item.cname}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getArticles, delArticle, patchArticle} from '@/api/weMedia'
import pageNum from '@/components/pageNum'
export default {
  name: 'weMediaList',
  components: {
    pageNum,
  },
  data() {
    return {
      articles: [],//文章列表数据
      keyWord: '',//搜索关键字
      currentArticle: {},//所点击当前文章条目
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
      tags: [],//栏目数据列表
      choosenTags: [],//选中的 栏目
    }
  },
  
  methods: {
    // 格式化 标签 获取到 标签名称
    formatTag(tag) {
      if (!this.tags.length) return
      if (!tag || !tag.length) return

      let tagName = []

      this.tags.forEach(item => {
        if(tag.indexOf(item.id) > -1) {
          tagName.push(item.cname)
        }
      })
      return tagName.join(',')
    },

    //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.fetchArticles()
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.fetchArticles()
    },

    //关闭弹窗
    close() {
      this.isShow = false
    },

    //删除按钮 删除后需要重新获取当前页数据
    del(index, row) {
      delArticle(row.hdId)
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('操作成功')
        this.fetchArticles()
      })
    },

    // 修改类目 按钮 打开弹窗 选中数据 为当前条目
    edit(index, row) {
      this.currentArticle = JSON.parse(JSON.stringify(row))
      this.choosenTags = this.currentArticle.tags
      this.isShow = true
    },

    //弹窗点击确定 更改 类目 类目不可为空
    onSubmit() {
      if(!this.choosenTags || !this.choosenTags.length) {
        return this.$wran('请选中类目')
      }
      let index = this.articles.findIndex(item => item.hdId == this.currentArticle.hdId)
      patchArticle({
        hdId: this.currentArticle.hdId,
        tagIds: this.choosenTags
      }).then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('操作成功')
        this.close()
        this.currentArticle.tags = this.choosenTags
        this.$set(this.articles, index, this.currentArticle)
      })
    },

    // 勾选全选
    checkAllChange(e) {
      this.isInderminate = false
      this.choosenTags = e ? this.tags.map(item => item.id) : []
    },

    // todo 这里应该封装 api接口 便于后期管理
    // 获取 标签数据 
    getTags(){
      this.$req.get(`v2/shareCategory/1/999`).then(res=>{
        this.tags = res.data.data.records
      })
    },

    // 获取文章列表
    fetchArticles() {
      getArticles({
        keyWord: this.keyWord,
        pageNo: this.pageNo,
        pageSize: this.pageSize || 10,
      }).then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        let records = res.data.data.records
        this.articles = records && records.length ? records : []
      })
    },

    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      if(!this.keyWord){
        return this.$wran('请输入搜索关键字')
      }
      this.pageNo = 1
      this.fetchArticles()
    },
  },
  created() {
    this.getTags()
  }
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}
.checkbox-group{
  display:flex;
  flex-wrap:wrap;
}
.el-checkbox + .el-checkbox {
  margin-left: 0px !important;
}
</style>