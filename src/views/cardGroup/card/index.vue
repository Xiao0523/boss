<template>
  
  <div>

    <el-row>
       <el-button type="primary" @click="addCard" v-if="status == 0">新增卡片</el-button>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="cards"
      :header-cell-style="tabHeader">
      <el-table-column align="center" label="索引" prop="index"></el-table-column>
      <el-table-column align="center" label="卡片图片">
        <template slot-scope="scope">
          <img class="card-img" :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡片概率" prop="probability"></el-table-column>
      <el-table-column align="center" label="卡片备注" prop="remark"></el-table-column>
      <el-table-column align="center" label="操作" v-if="status == 0">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)" v-if="status == 0">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)" v-if="status == 0">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Dialog :title="'卡片编辑'" :width="'40%'" :is-show="isShow" @cancelFn="close('cardForm')" @confirmFn="onSubmit('cardForm')">
      <div slot="upload">
        <div class="picBox">
          <el-upload
            class="avatar-uploader"
            ref="uploader"
            :action="uploadPic"
            name="multipartFile"
            :show-file-list="false"
            :on-change="onFileChange"
            :on-success="uploadSuccess">

            <img class="avatar" v-if="card.img" :src="card.img" >
            
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </div>
        <el-form label-position="left" label-width="120px" :model="card" :rules="rules" ref="cardForm">
          <el-form-item label="卡片图片地址" prop="img">
            <el-input v-model="card.img" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="卡片索引" prop="index">
            <el-input-number controls-position="right" v-model="card.index" :min="0"></el-input-number>
          </el-form-item>

          <el-form-item label="卡片概率" prop="probability">
            <el-input v-model.number.trim="card.probability"></el-input>
          </el-form-item>

          <el-form-item label="卡片备注" prop="remark">
            <el-input type="textarea" v-model.trim="card.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/common/dialog"
import {getCard, postCard, patchCard, delCard} from '@/api/cardGroup'
export default {
  name: 'card',
  components: {
    Dialog
  },
  data() {
    return {
      uploadPic: "https://www.my51share.com/boss/upload",//上传地址 需要建立全局公共配置
      isShow: false,//上传弹窗开关
      cardGroupId: null,//卡组id
      status: null,//卡组状态 0 下架 1 上架
      num: null, //卡组设定的卡片数量
      cards: [],//卡组 卡片列表
      card: {
        cardGroupId: null,//卡组id
        img: '',//图片地址
        index: null,//索引
        probability: null,//概率 0~1
        remark: ''//卡备注
      },
      rules: {
        img: [
          {required: true, type: 'string', message: '请上传卡片图片！', trigger: 'blur'}
        ],
        index: [
          {required: true, type: 'number', message: '请填写卡片索引！', trigger: 'blur'} 
        ],
        probability: [
          {required: true, type: 'number', message: '请填写卡片概率，卡片概率为0~1之间！', trigger: 'blur'},
          {
            pattern: /^(1|0)$|(0\.\d+)$/,
            message: '请填写卡片概率，卡片概率为0~1之间！',
            trigger: 'blur'
          }
        ],
        remark: [
          {required: true, type: 'string', message: '请上传卡片备注！', trigger: 'blur'}
        ]
      },
      
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

  
  methods: {
    // 初始化卡数据
    init() {

      getCard(this.card.cardGroupId)
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if(!res.data.data || !res.data.data.length) return
        this.cards = res.data.data
        
      })
      .catch(err => {})
    },

    // 创建 新卡片
    creatCard(card) {
      
      if(this.status == 1) {
        return this.$wran('该卡片组已上架, 不可新增！')
      }

      postCard(card)
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }

        this.close('cardForm');
        this.$success('操所成功！');
        this.init()
      })
      .catch(err => { })
    },

    //编辑卡片
    editCard(card) {
      if(this.status == 1) {
        return this.$wran('该卡片组已上架，不可编辑！')
      }

      patchCard(card)
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }

        this.close('cardForm');
        this.$success('操所成功！');
        this.init()
      })
      .catch(err => { })
    },

    // 删除卡片
    del(index, row) {
      if(this.status == 1) {
        return this.$wran('该卡片组已上架, 不可删除！')
      }
      this.$confirm('确定要删除该卡片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        // 发起删除
        delCard(row.id)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功！');

          this.cards.splice(index, 1);
        })
        .catch((err) => {})
      })
      .catch((err) => {})
    },

    // 新增卡片点击  新增数量 受限 与 卡组中 设定的 数量
    addCard() {
      if (this.cards.length >= this.num) {
        return this.$wran('该卡片组的卡片已达到' + this.num + '张卡片上限！')
      }
      this.card = {
        cardGroupId: this.cardGroupId,
        img: '',//图片地址
        index: null,//索引
        probability: null,//概率 0~1
        remark: ''//卡备注
      };
      this.isShow = true;
    },

    // 弹窗点击提交 根据 是否有 卡片 id 来判断是 新增还是 修改
    onSubmit(form) {
      this.$refs[form].validate( valid => {
        if(!valid) return

        let card =Object.assign({}, this.card)  
        card.probability = +card.probability

        if(!card.id) {
          return this.creatCard(card)
        }
        this.editCard(card)
      })
    },

    close(form) {
      this.isShow = false;
      this.$refs[form].resetFields();
    },

    // 点击编辑卡片按钮
    edit(index, row) {
      this.card = Object.assign({}, row)
      this.isShow = true
    },

    

    //上传卡片图片
    uploadSuccess(res, file, fileList) {
      this.card.img = res.data;
    },

    // 文件添加时 钩子
    onFileChange(file, fileList) {
      let sizeBase = 1024;
      let isLarge = file.size / 1024 > 100
      if(isLarge) {
        this.$wran('文件大于 100kb')
        this.$refs['uploader'].clearFiles()
      }
      return isLarge
    }
    
  },

  /**
   * 根据 地址传参 
   * 保存卡组传来的参数
   * 获取 卡片组下 的卡片
   */
  created() {
    let query = this.$route.query
    let cardGroupId = query.cardGroupId
    this.status = query.status
    this.num = query.num

    if(!cardGroupId) return
    this.cardGroupId = this.card.cardGroupId = cardGroupId
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}

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


