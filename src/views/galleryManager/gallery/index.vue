<template>
  <div>
    <el-row>
      <el-button v-if="!tagId" type="primary" @click="addImg">新增图片</el-button>
      <el-button type="danger" @click="batchDel">批量删除</el-button>

    </el-row>
    <el-table
      :data="imgArr"
      class="table-box"
      :header-cell-style="tabHeader"
      border
      @select="selectHandle"
      @select-all="selectAll">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" prop="describe" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" class="gallery-img" alt="">
        </template>
      </el-table-column>
      <el-table-column v-if="!tagId" align="center" label="图片标签">
        <template slot-scope="scope">{{ scope.row.shareImageTags | formatTag }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="!tagId" type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pageNumBox">
      <pageNum
        :current-page="pageNo"
        :page-size="pageSize"
        :total="totalNum"
        @sizeChange="sizeChangeFn"
        @currentChange="currentPageChange"
      />
    </div>

    <Dialog :title="'编辑图片'" :width="'40%'" :is-show="isImgShow" @cancelFn="close('imgForm')" @confirmFn="onImgSubmit('imgForm')">
      <div slot="upload">
        <div class="picBox">
          <el-upload
            ref="uploader"
            :action="uploadPic"
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="onFileChange"
            name="multipartFile"
            :on-success="uploadSuccess">

            <img v-if="currentImg.imageUrl" :src="currentImg.imageUrl" class="avatar" >

            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </div>
        <el-form ref="imgForm" label-position="left" :model="currentImg" label-width="120px">
          <el-form-item :rules="[{required: true, message: '请上传图片！', trigger: 'blur'}]" label="图片地址" prop="imageUrl">
            <el-input v-model="currentImg.imageUrl" :disabled="true"/>
          </el-form-item>

          <el-form-item :rules="[{required: true, message: '请选择标签！', trigger: 'blur'}]" label="已选标签" prop="tags">
            <el-tag
              v-for="item in currentImg.shareImageTags"
              :key="item.id"
              closable
              style="margin-left: 20px"
              @close="closeTag(item)">{{ item.describe }}</el-tag>
          </el-form-item>

          <div class="tag_checkbox_wraper">
            <a href="javascript:;" class="el-icon-arrow-left btn_arrow" @click="prev"/>
            <div class="tag_checkbox">
              <el-checkbox-group v-model="currentImg.tags" class="checkbox-group tag_checkbox_group">
                <el-checkbox
                  v-for="item in tagArr"
                  :key="item.id"
                  class="tag_checkbox_item"
                  :label="item.id"
                  @change="changeCheck(item,$event)">{{ item.describe }}</el-checkbox>
              </el-checkbox-group>
            </div>
            <a v-if="!islastPageTag" href="javascript:;" class="el-icon-arrow-right btn_arrow" @click="next"/>
          </div>

        </el-form>
      </div>
    </Dialog>
  </div>
</template>
<script>
import { getTags } from '@/api/tagManager'
import { getImgs, postImg, delImgs } from '@/api/galleryManager'
import { UploadUrl } from '@/http/url'
import Dialog from '@/components/common/dialog'
import pageNum from '@/components/pageNum'
export default {
  name: 'Gallery',
  components: {
    pageNum,
    Dialog
  },

  filters: {
    formatTag(tags) {
      if (!tags) return
      return tags.map(tag => tag.describe).join('/')
    }
  },
  data() {
    return {
      tagId: '', // 来自地址上的标签id
      imgArr: [], // 图片列表数据
      totalNum: null, // 数据总条数
      pageNo: 1, // 当前页
      pageSize: 10, // 每页的条数
      tabHeader: {
        'background-color': '#F4F4F4',
        'color': '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      choosenImg: [], // 被选中的 图片 id

      uploadPic: UploadUrl, // 上传地址 需要建立全局公共配置
      isImgShow: false, // 弹窗 显示标识
      currentImg: {// 弹窗中显示 图片数据模型
        imageUrl: '',
        tags: [],
        shareImageTags: []
      },

      tagArr: [], // 标签列表数据
      pageTagNum: 1, // 标签的当前页
      pageTagSize: 10, // 标签的每页条数
      pageTagTotal: null, // 总页数
      islastPageTag: false //
    }
  },

  // 初始化 获取 地址上的标签id 若地址上有标签id 参数 说明时 标签页 进入 页面上 不可新增 编辑 只可删除
  created() {
    const query = this.$route.query
    this.tagId = query.tagId ? query.tagId : ''

    this.initTags()

    this.initImgs()
  },
  methods: {
    // 分页改变 每页数量
    sizeChangeFn(pageSize) {
      this.pageSize = pageSize
      this.initImgs()
    },

    // 分页改变 页面
    currentPageChange(pageNo) {
      this.pageNo = pageNo
      this.initImgs()
    },

    // 关闭标签弹窗
    close(form) {
      this.isImgShow = false
      this.$refs[form].resetFields()
    },

    // table 勾选
    selectHandle(selection, row) {
      this.choosenImg = selection.map(item => item.id)
    },

    // table 全选
    selectAll(selection) {
      this.choosenImg = selection.map(item => item.id)
    },

    // 批量删除 图片
    batchDel() {
      if (!this.choosenImg.length) {
        return this.$wran('请勾选要删除的图片')
      }
      this.$confirm('确定要批量删除图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this._delImgs(this.choosenImg)
        })
        .catch((err) => {})
    },

    // 删除单个 图片
    del(index, row) {
      this.$confirm('确定要删除该图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this._delImgs([row.id])
        })
        .catch((err) => {})
    },

    // 删除 图片逻辑
    _delImgs(idArray) {
      delImgs(idArray)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功')
          this.initImgs()
        })
    },

    // 添加图片 打开弹窗
    addImg() {
      this.isImgShow = true
      this.currentImg = {
        imageUrl: '',
        tags: [],
        shareImageTags: []
      }
    },

    // 编辑图片 打开弹窗
    edit(index, row) {
      this.isImgShow = true
      const currentImg = JSON.parse(JSON.stringify(row))
      currentImg.tags = currentImg.shareImageTags.map(tag => tag.id)

      this.currentImg = currentImg
    },

    // 上传图片
    uploadSuccess(res, file, fileList) {
      this.currentImg.imageUrl = res.data
    },

    // 文件添加时 钩子
    onFileChange(file, fileList) {
      const sizeBase = 1024
      let isLarge = file.size / 1024 > 300
      if (isLarge) {
        this.$wran('文件大于 300kb')
        this.$refs['uploader'].clearFiles()
      }
      return isLarge
    },

    // 添加 图片
    onImgSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        postImg(this.currentImg)
          .then(res => {
            if (res.data.code) {
              return res.data.message && this.$wran(res.data.message)
            }
            this.$success('操作成功')
            this.initImgs()
            this.close('imgForm')
          })
      })
    },

    // 点击标签 箭头 上一页
    prev() {
      if (this.pageTagNum <= 1) return
      this.pageTagNum--
      this.initTags()
    },

    // 点击标签 箭头 下一页
    next() {
      if (this.pageTagNum >= Math.ceil(this.pageTagTotal / this.pageTagSize)) return
      this.pageTagNum++
      this.initTags()
    },

    // 点击关闭标签
    closeTag(tag) {
      this.currentImg.shareImageTags = this.currentImg.shareImageTags.filter(item => item.id !== tag.id)
      this.currentImg.tags = this.currentImg.tags.filter(item => item !== tag.id)
    },

    // 勾选 标签 checkbox
    // 勾选 推入 显示标签上 ， 反选 删除显示标签
    changeCheck(tag, e) {
      if (e) {
        return this.currentImg.shareImageTags.push(tag)
      }

      this.currentImg.shareImageTags = this.currentImg.shareImageTags.filter(item => item.id !== tag.id)
    },

    // 初始化 标签列表
    // 对标签 数据进行缓存 有缓存时 使用缓存数据
    initTags() {
      const selfFn = this.initTags
      if (selfFn[this.pageTagNum]) {
        this.tagArr = selfFn[this.pageTagNum]
        return
      }

      const argsObj = {
        pageNum: this.pageTagNum,
        pageSize: this.pageTagSize,
        keyWord: ''
      }

      getTags(argsObj)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          if (!res.data.data) return
          const data = res.data.data
          this.islastPageTag = data.isLast
          this.pageTagTotal = data.total
          const records = data.records
          this.tagArr = records && records.length ? records : []

        selfFn[this.pageTagNum] = this.tagArr
        })
    },

    // 初始化 图片列表
    // 初始化时列表选中状态应该 同时回复初始化状态 即 置空
    initImgs() {
      this.choosenImg = []

      const argsObj = {
        pageNum: this.pageNo,
        pageSize: this.pageSize
      }

      if (this.tagId) {
        argsObj.tagId = this.tagId
      }
      getImgs(argsObj).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data) return
        this.totalNum = res.data.data.total
        const records = res.data.data.records
        this.imgArr = records && records.length ? records : []
      })
    }
  },
  beforeRouteUpdate(from, to, next) {
    this.$nextTick(() => {
      const query = this.$route.query
      this.tagId = query.tagId ? query.tagId : ''

      this.initTags()

      this.initImgs()
    })
    next()
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

.picBox{margin-bottom: 22px;}
.avatar-uploader {
  height: 300px;
  text-align: center;
  overflow: hidden;
  border: 1px solid #ccc;
  .avatar-uploader-icon {
    display: block;
    font-size: 28px;
    width: 300px;
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
.tag_checkbox_wraper{
  display: flex;
  align-items: center;
  margin-left: 120px

}
.tag_checkbox_group{
  scrollbar-width: none;
  -ms-overflow-style: none
}
.tag_checkbox_group::-webkit-scrollbar{
    height: 0;
  }

.tag_checkbox{
  flex: 1;
  margin: 0 40px
}
.tag_checkbox_item{
  width:20%;
}
.tag_checkbox_item /deep/ .el-checkbox__label{
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.btn_arrow {
  display: block;
  width: 30px;
  text-align: center
}
.el-checkbox+.el-checkbox {
    margin-left: 0;
}
</style>
