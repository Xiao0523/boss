<template>
  <div>
    <el-row>
       <el-button type="primary" @click="addNew">新增</el-button>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="rollList"
      :header-cell-style="tabHeader">
      
      <el-table-column align="center" label="索引" prop="index"></el-table-column>
      <el-table-column align="center" label="标题" prop="title"></el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
      </el-table-column>
      
      <el-table-column align="center" label="操作"> <template slot-scope="scope">
        <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Dialog :title="'添加搜索框滚动标题'" :width="'40%'" :is-show="isShow" @cancelFn="close('rollForm')" @confirmFn="onSubmit('rollForm')">
      <div>
        <el-form label-position="left" label-width="120px" :model="currerntItem" ref="rollForm">
          <el-form-item 
            label="索引" 
            prop="index" 
            :rules="[{required: true, pattern: /^(0)|([1-9]\d?)$/, message: '请填写索引，值应为大于等于0的整数！', trigger: 'blur'}]">
            <el-input v-model.number.trim="currerntItem.index"></el-input>
          </el-form-item>
          <el-form-item 
            label="标题" 
            prop="title" 
            :rules="[{required: true, message: '请填写标题！', trigger: 'blur'}]"> 
            <el-input v-model.trim="currerntItem.title"> </el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>

</template>
<script>
import Dialog from "@/components/common/dialog"
import {getSearchRoll, postSearchRoll, delSearchRoll} from '@/api/searchRoll'
export default {
  name: 'searchRoll',
  components: {
    Dialog
  },
  data() {
    return {
      rollList: [],//列表数据
      currerntItem: {//新增的 数据项
        index: '',
        title: ''
      },
      isShow: false,//弹窗显示标识
      tabHeader: {//表头样式
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },

    }
  },

  methods: {

    // 点击新增按钮
    addNew() {
      this.currerntItem = {
        index: '',
        title: ''
      }
      this.isShow = true
    },

    //点击删除
    del(index, row) {
      this.$confirm('确定要删除该标题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        // 发起删除
        delSearchRoll(row.id)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功！');

          this.rollList.splice(index, 1);
        })
        
      })
      .catch((err) => {})
      
    },

    //弹窗 点击确定 创建新搜索标题
    onSubmit(form) {
      this.$refs[form].validate(isValid => {
        if (!isValid) return
        postSearchRoll(this.currerntItem)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功！');
          this.close('rollForm')
          this.init()
        })

      })
    },

    // 关闭弹窗 重置表单
    close(form) {
      this.isShow = false
      this.$refs[form].resetFields();
    },

    //初始化 获取列表数据
    init() {
      getSearchRoll()
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.rollList = res.data.data  &&  res.data.data.length ? res.data.data : []
      })
    }
  },
  created() {
    this.init()
  }
 }
</script>
<style lang="scss" scoped>
.table-box{
  margin-top: 20px;
}

</style>