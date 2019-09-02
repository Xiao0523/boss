<template>
  <div>
    <el-row>
      <el-button type="primary" @click="addTag">新增标签</el-button>
      <el-button type="danger" @click="batchDel">批量删除</el-button>
      <el-form :inline="true" style="margin-top: 20px">
        <el-form-item>
          <el-input v-model.trim="keyWord" placeholder="输入搜索关键字" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="tagArr"
      :header-cell-style="tabHeader"
      @select="selectHandle"
      @select-all="selectAll">
      <!-- <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column> -->
      <el-table-column type="selection" width="55" align="center"></el-table-column>
       <el-table-column align="center" prop="describe" label="标签名称"></el-table-column>
      
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
          <el-button type="primary" size="mini" @click="navToImg(scope.$index, scope.row)">图片列表</el-button>
          
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

    <el-dialog title="新增标签" :visible.sync="isShow" width="30%">
      <el-form label-width="80px" :model="currentTag" ref="tagForm">
        <el-form-item label="标签名称" 
        prop="describe"
        :rules="[{required: true, message: '请标签名称！', trigger: 'blur'}]">
          <el-input v-model.trim="currentTag.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close('tagForm')">取消</el-button>
        <el-button type="primary" @click="onSubmit('tagForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getTags, delTags, postTag} from '@/api/tagManager'
import Dialog from "@/components/common/dialog"
import pageNum from '@/components/pageNum'
export default {
  name: 'tagList',
  components: {
    pageNum,
    Dialog
  },
  data() {
    return {
      tagArr: [],//标签列表数据
      keyWord: '',//搜索关键字
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
      choosenTag: [],//被选中的 标签 id
      currentTag: { // 新增标签内容
        describe: ''
      },
      isShow: false,//标签弹窗显示标识
      
      
    }
  },
  methods: {
     //分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.initTags()
    },

    //分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.initTags()
    },

    //关闭标签弹窗
    close(form) {
      this.isShow = false
      this.$refs[form].resetFields()
    },

    // 弹窗点击确定
    onSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        postTag({describe: this.currentTag.describe})
        .then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功')
          this.initTags()
          this.close('tagForm')
        })
      })
    },

    //打开 新增标签 弹窗
    addTag() {
      this.isShow = true
      this.currentTag.describe = ''
    },
    
    // table 勾选
    selectHandle(selection, row) {
      this.choosenTag = selection.map(item => item.id)
    },

    // table 全选
    selectAll(selection) {
      this.choosenTag = selection.map(item => item.id)
    },

    // 批量删除
    batchDel() {
      if (!this.choosenTag.length) {
        return this.$wran('请勾选要删除的标签')
      }
      this.$confirm('确定要批量删除标签吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        delTags(this.choosenTag)
        .then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功')
          this.initTags()
        })
      })
      .catch((err) => {})
    },

    // 删除 标签
    del(index, row) {
      this.$confirm('确定要删除该标签吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        delTags([row.id])
        .then(res => {
          if(res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功')
          this.initTags()
        })
      })
      .catch((err) => {})

    },
    
    navToImg(index, row) {
      this.$router.push({name: 'gallery', query: {tagId: row.id}})
    },

    // 点击搜索 获取文章列表 列表置为第一页
    search() {
      this.pageNo = 1
      this.initTags()
    },

    // 初始化 标签列表
    // 选中标签 初始化 置空
    initTags() {
      let argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize,
        keyWord: this.keyWord
      }
      this.choosenTag = []

      getTags(argsObj)
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        let records = res.data.data.records
        this.tagArr = records && records.length ? records : []
      })
    }
  },
  created() {
    this.initTags()
  }
}
</script>
<style lang="scss" scoped>


.card-img{
  width: 100px;
  height: 80px;
  object-fit: scale-down
}

.picBox{margin-bottom: 22px;}
.avatar-uploader {
  height: 300px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #ccc;
  .avatar-uploader-icon {
    display: block;
    font-size: 28px;
    width: 700px;
    color: #8c939d;
    line-height: 300px;
    text-align: center;
  }
}
.avatar{
  width: 100%;
  height: 300px;
  object-fit: scale-down;
}

.avatar-uploader .el-upload {
  cursor: pointer;
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>