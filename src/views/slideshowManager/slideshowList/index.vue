<template>
  <div>
    <el-row class="btnBox">
      <!--<el-checkbox v-model="checked">全选</el-checkbox>-->
      <!--<el-button type="warning">批量删除</el-button>-->
      <el-button type="primary" @click="addPicFn">添加轮播图</el-button>
    </el-row>
    <div class="picsBox">
      <ul class="listPic">
        <li class="itemPic" v-for="item in listData">
          <img :src="item.picurl" alt @click="openDialog(item)">
          <p class="textBox">
            排序:
            <span>{{item.rank}}</span>
          </p> 
          <p>图片描述:
            <span>{{item.miaoshu}}</span>
          </p>
          <p>
            关联文章:<span>{{item.title}}</span>
          </p>
            <el-button type="text" @click="delPic(item.id)">删除</el-button>
        </li>
      </ul>
    </div>
    <Dialog :isShow="visible" @cancelFn="visible = false" @confirmFn="confirmFn">
      <div slot="upload">
        <span>图片生成链接：{{form.picurl}}</span>
        <div class="picBox">
          <el-upload
            class="avatar-uploader"
            :action="uploadPic"
            name="multipartFile"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <!--<img v-if="form.picurl" :src="form.picurl" class="avatar">-->

            <img v-if="addPicUrl" :src="addPicUrl" class="avatar">


            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-row class="row">
          <el-col :span="3">关联文章标题:</el-col>
          <el-col :span="18"><el-input v-model="form.title" placeholder="请输入图片描述"></el-input>  </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="3">图片描述:</el-col>
            <el-col :span="18"><el-input v-model="form.miaoshu" placeholder="请输入图片描述"></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="3">排序</el-col>
          <el-col :span="7">
            <el-input v-model="form.rank"></el-input>
          </el-col>
        </el-row>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/common/dialog";
export default {
  name: "slideshowList",
  components: {
    Dialog
  },
  computed: {},
  data() {
    return {
      uploadPic: "https://www.my51share.com/boss/upload",
      form: {}, // 弹窗的参数
      listData: [],
      ids: [],
      type: "", // 添加还是修改
      addPicUrl: "",
      oldPicUrl: "", // 替换前的url
      checked: false,
      visible: false,
      options: [
        {
          value: "顶部",
          label: "顶部"
        },
        {
          value: "底部",
          label: "底部"
        }
      ],
      value: "",
      restaurants: [],
      state4: "",
      timeout: null
    };
  },
  methods: {
    // 更新轮播图
    openDialog(item) {
      this.visible = true;
      this.type = "edit";
      let copy = Object.assign({}, item);
      this.form = copy;
      this.addPicUrl = copy.picurl;
    },
    addPicFn() {
      this.visible = true;
      this.type = "add";
      this.form = {};
       this.addPicUrl="";
    },
    // 确认按钮
    confirmFn() {
      let params = {
        picurl: this.form.picurl,
        rank: this.form.rank,
        miaoshu: this.form.miaoshu,
        title: this.form.title // 新增轮播图跳转链接
      };
      // 更新
      let url
      if(this.form.id){
         url= "updateSowing";
        params.id=this.form.id
      }else{
          url = "addSowing";
      }
      console.log(url);
      this.$req
        .post(url, params)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$success(res.data.message);
          } else {
            this.$wran(res.data.message);
          }
          this.visible = false;
          this.initData();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上传图片
    handleSuccess(res, file) {
      this.form.picurl = res.data;
      this.addPicUrl = res.data;
      console.log(this.form.picurl);
    },
    // 上传失败
    handError() {},
    delPic(id) {
      let url = "delSowing";
      this.ids.push(id);
      let idArr = this.ids;
      this.$store.dispatch("delFn", { url, idArr });
    },
    initData() {
      this.$req
        .get("selectSowing")
        .then(res => {
          this.listData = res.data.data;
          console.log(this.listData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.initData();
  },
  mounted() {
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.btnBox {
  margin-bottom: 20px;
}
.picsBox li {
  list-style: none;
  float: left;
}
.row {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
}
.picBox {
  width: 100%;
  height: 300px;
  overflow: hidden;
  .avatar-uploader {
    height: 300px;
    text-align: center;
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
}

.avatar-uploader .el-upload {
  cursor: pointer;
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.itemPic {
  width: 300px;
  float: left;
  margin: 20px;
  border: 1px solid #ccc;
  img {
    height: 200px;
    width: 100%;
  }
  .textBox {
    display: flex;
    span {
      flex: 1;
    }
  }
}
</style>
