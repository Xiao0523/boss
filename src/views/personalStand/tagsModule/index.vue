<template>
  <div >
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="ruleForm"
      label-position="right"
      class="demo-ruleForm"
    >
      <!-- <el-form-item>
        <el-input
          v-model.trim="ruleForm.key"
          placeholder="标签名称"
          clearable
          style="width: 200px;"
      /> </el-form-item>
      <el-form-item label="标签状态" >
        <el-select v-model="ruleForm.status" clearable placeholder="请选择状态" style="width: 400px;">
          <el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
        -->
      <el-form-item>
        <!-- <el-button type="primary" @click="search('ruleForm')">搜索</el-button>
        <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
          -->
        <el-button type="success" @click="addCategory">新增标签</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="categoryList" :header-cell-style="tabHeader" class="table-box" border>
      <el-table-column align="center" prop="orderIndex" label="排序"/>
      <el-table-column align="center" prop="nameCn" label="标签名称"/>
      <el-table-column align="center" prop="nameEn" label="英文名称"/>
      <el-table-column align="center" prop="remark" label="备注"/>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === '0'? 'warning' : 'success'"
            disable-transitions
          >{{ scope.row.status === '0' ?"禁用":"启用" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if = "scope.row.status === '0'" type="success" size="mini" @click="enable(scope.row)">启用</el-button>
          <el-button v-if = "scope.row.status === '1'" type="warning" size="mini" @click="disable(scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="operationType" :visible.sync="isShow" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-position="left">
        <el-form-item label="标签名称" prop="nameCn">
          <el-input v-model="form.nameCn" placeholder="请输入标签名称" />
          <el-input v-model="form.uuid" style="display: none" />
        </el-form-item>
        <el-form-item label="英文名称" prop="nameEn">
          <el-input v-model="form.nameEn" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="排序" prop="orderIndex">
          <el-input v-model="form.orderIndex" type="number" placeholder="请输入排序"/>
        </el-form-item>
        <el-form-item label="标签状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入至少5个字符"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close('form')">取消</el-button>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

import { getTags, editTags } from '@/api/personSuppliers'
import pageNum from '@/components/pageNum'

export default {
// import引入的组件需要注入到对象中才能使用
  components: {
    pageNum
  },
  data() {
    // 这里存放数据
    return {
      tabHeader: {
        'background-color': '#F4F4F4',
        color: '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      },
      categoryList: [],
      operationType: '添加标签',
      isShow: false,
      rules: {
        nameCn: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        nameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        orderIndex: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择标签状态', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 5, message: '长度不少于5个字符', trigger: 'blur' }
        ]
      },
      form: {
        nameCn: '',
        nameEn: '',
        status: 1,
        orderIndex: '',
        remark: '',
        uuid: '',
        operator: '',
        createTime: ''
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.fetchCategory()
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    search(formName) {
      this.fetchCategory()
    },
    fetchCategory() {
      getTags().then(res => {
        debugger
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.categoryList = res.data.data
      })
    },
    edit(row) {
      debugger
      this.isShow = true
      this.form = row
      this.operationType = '编辑标签'
      if (row.status === '1') {
        this.form.status = 1
      } else {
        this.form.status = 0
      }
    },
    addCategory() {
      this.isShow = true
      this.form = {
        nameCn: '',
        nameEn: '',
        status: 1,
        orderIndex: '',
        remark: '',
        uuid: '',
        operator: '',
        createTime: ''
      }
    },
    close(formName) {
      this.$refs[formName].resetFields()
      this.isShow = false
      this.fetchCategory()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$wran('请先检查数据是否全部填写')
          return
        }
      })
      editTags(this.form).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success('编辑成功')
        this.close('form')
        this.fetchCategory()
      })
    },
    enable(row) {
      row.status = 1
      editTags(row).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.fetchCategory()
      })
    },
    disable(row) {
      row.status = 0
      editTags(row).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        this.$success(res.data.message)
        this.fetchCategory()
      })
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>
