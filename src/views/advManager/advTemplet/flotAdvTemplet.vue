<template>
  <div>
    <el-form ref="form" :model="form" label-position="left" label-width="140px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="时间区间">
        <!-- <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="开始日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="dateChangeBeginTime"
        ></el-date-picker>至
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="dateChangeEndTime"
        ></el-date-picker>-->
        <el-time-picker
          is-range
          v-model="times"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
           @change="timeChange"
           value-format="HH:mm:ss"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="是否循环">
        <el-switch
          v-model="form.isLoop"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>
      <el-form-item label="时间模式">
        <el-switch
          v-model="form.type"
          :active-value="1"
          :inactive-value="0"
          active-text="日"
          inactive-text="周"
        ></el-switch>
      </el-form-item>
      <el-form-item label="日模式" v-if="form.type==1">
        <el-date-picker
          type="dates"
          v-model="dateSelectionNumber"
          placeholder="选择一个或多个日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="周模式" v-else-if="form.type==0">
        <el-checkbox-group v-model="daySelectionNumber">
          <el-checkbox v-for="day in dayOptions" :label="day" :key="day">{{day}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="上传图片">
        <section class="picsBox">
          <coverCrop @uploadFileFn="uploadFileFn1" :imageUrl="imageUrl1"></coverCrop>
          <twoCover @uploadFileFn="uploadFileFn2" :imageUrl="imageUrl2"></twoCover>
          <threeCover @uploadFileFn="uploadFileFn3" :imageUrl="imageUrl3"></threeCover>
        </section>
      </el-form-item>
      <!-- <el-form-item label="上传动图">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          :action="upload_url"
          :name="upload_name"
          :show-file-list="false"
          multiple
          accept="image/gif"
          :http-request="uploadSectionFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
          <div class="bg-box picsBox">
            <img class="move-pic" v-for="(item,index) in ad_url_list"  :index="index" @dblclick="delPic(index)" :key="index" :src="item" alt="" >
          </div>
      </el-form-item>-->
    </el-form>
    <!--关联标签-->
    <section class="relevanceBox">
      <p>关联标签</p>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="tagIds" @change="handleCheckedTagsChange">
        <el-checkbox v-for="(item,id) in tagList" :key="id" :label="item.id">{{item.cname}}</el-checkbox>
      </el-checkbox-group>
      <span v-show="false">{{tag}}{{tagIds}}</span>
    </section>
    <el-row class="btnBox">
      <el-button type="primary" @click="confirmFn">确定</el-button>
      <el-button type="info" @click="backFn">返回</el-button>
    </el-row>
    <PreviewImgDialog :isShow="visible" @cancelFn="visible = false" @confirmFn="visible = false">
      <img :src="imglink" alt>
    </PreviewImgDialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import coverCrop from "@/components/common/vue-cropper/flotImgCropper1";
import twoCover from "@/components/common/vue-cropper/flotImgCropper2";
import threeCover from "@/components/common/vue-cropper/flotImgCropper3";
import PreviewImgDialog from "@/components/common/dialog";
export default {
  name: "categoryAdd",
  components: {
    coverCrop,
    twoCover,
    threeCover,
    PreviewImgDialog
  },
  props: {
    source: {
      type: String
    },
    form: {
      type: Object,
      default() {
        return {
          isLoop: 1
        };
      }
    }
  },
  computed: {
    // 多图时默认回显的封面图1
    imageUrl1() {
      if (this.form.pics) {
        let covermaps = this.form.pics;
        this.coverArr = covermaps; // 编辑时
        if (covermaps.length) {
          return covermaps[0];
        }
      }
    },
    imageUrl2() {
      if (this.form.pics) {
        let covermaps = this.form.pics;
        this.coverArr = covermaps;
        if (covermaps.length > 1) {
          return covermaps[1];
        }
      }
    },
    imageUrl3() {
      if (this.form.pics) {
        let covermaps = this.form.pics;
        this.coverArr = covermaps;
        if (covermaps.length > 1) {
          return covermaps[2];
        }
      }
    },
    tag() {
      if (this.source == "edit") {
        this.tagIds = this.form.categories;
        return this.form.categories;
      } else {
        return [];
      }
    }
    /*    ...mapGetters([
        'tagIds',
      ])*/
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      times:null,
      tagList: [], // 所有标签
      tagIds: [], // 选中的
      CropWidth: 670,
      CropHeight: 376,
      uploadPic: "https://www.my51share.com/boss/upload",
      imglink: "",
      coverArr: [],
      visible: false,
      isLoop: 0,
      dayOptions: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期天"
      ],
      daySelectionNumber: [],
      dateSelectionNumber: []
      // upload_url: "", //上传动图URL
      // upload_name: "", //动图名称
      // ad_url_list: []
    };
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true
    }
  },
  methods: {
    // 标签全选
    handleCheckAllChange(val) {
      let alltagIds = this.tagList.map(item => {
        return item.id;
      });
      this.tagIds = val ? alltagIds : [];
      console.log(this.tagIds);
      this.isIndeterminate = false;
    },
    handleCheckedTagsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tagList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tagList.length;
    },
    backFn() {
      this.$router.back();
    },
    uploadFileFn1(url) {
      this.coverArr.push(url);
    },
    uploadFileFn2(url) {
      this.coverArr.push(url);
    },
    uploadFileFn3(url) {
      this.coverArr.push(url);
    },
    // dateChangeBeginTime(start) {
    //   if (!start) {
    //     return;
    //   }
    //   this.form.startTime = start;
    // },
    // dateChangeEndTime(end) {
    //   if (!end) {
    //     return;
    //   }
    //   this.form.endTime = end;
    // },
    getTagList() {
      this.$req
        .get(`v2/shareCategory/1/999`)
        .then(res => {
          this.tagList = res.data.data.records;
          // console.log('tagList', this.tagList)
        })
        .catch(err => {
          console.log(err);
        });
    },
    /* handleAvatarSuccess(res){
         this.imglink=res.data
       },*/
    confirmFn() {
      // 广告关联的tags
      this.form.categories = this.tagIds;
      let resArr = this.coverArr.splice(-3);
      this.form.pics = resArr;
      if (this.form.type == 0) {
        if (this.daySelectionNumber.length == 0) {
          this.$alert("请选择星期", "提交失败", { type: "error" });
          return;
        }
        this.form.selectionNumber = this.daySelectionNumber;
        this.$emit("confirmFn", this.form);
      } else if (this.form.type == 1) {
        if (this.dateSelectionNumber.length == 0) {
          this.$alert("请选择日期", "提交失败", { type: "error" });
          return;
        }
        this.form.selectionNumber = this.dateSelectionNumber;
        this.$emit("confirmFn", this.form);
      }
    },
    timeChange(e){
      if(e.length<2){
        return;
      }
      this.form.startTime=e[0];
      this.form.endTime=e[1];
    }
    //上传动图相关
    // uploadSectionFile(params) {
    //   let self = this,
    //     file = params.file,
    //     fileType = file.type,
    //     isMoveImage = fileType.indexOf("image/gif") != -1,
    //     file_url = this.$refs.upload.uploadFiles[0].url;
    //   if (!isMoveImage) {
    //     this.$alert("请选择gif格式的图片!", "上传失败", { type: "error" });
    //     this.$refs.upload.uploadFiles = [];
    //     return;
    //   }
    //   if (isMoveImage) {
    //     var img = new Image();
    //     img.src = file_url;
    //     img.onload = function() {
    //       // if (img.width !== 750 || img.height != 1125) {
    //       //   self.$alert("图片尺寸为750*1125px", "上传失败", { type: "error" });
    //       //   //将上传列表清空
    //       //   self.$refs.upload.uploadFiles = [];
    //       //   return;
    //       // }
    //       //图片上传
    //       self.upload_url = "http://www.my51share.com/boss/upload";
    //       self.upload_name = "file_img[]";
    //       self.uploadFile(file);
    //     };
    //   }
    // },
    // uploadFile(file) {
    //   var self = this,
    //   formData = new FormData();
    //   formData.append('multipartFile', file);
    //   axios
    //     .post(self.upload_url, formData,
    //           {
    //             contentType: false,
    //             processData: false,
    //             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    //           })
    //     .then(res => {
    //       if(res.data.code==0){
    //         self.$success('上传成功');
    //         self.ad_url_list.push(res.data.data);
    //         return
    //       }
    //       self.$alert('上传失败，请重新上传', '提示', { type: 'error' });
    //       self.$refs.upload.uploadFiles = [];
    //     })
    //     .catch(function(err) {
    //       console.error(err);
    //     });
    // },
    // delPic($index){
    //   this.ad_url_list.splice($index,1);
    // }
  },
  updated() {},
  created() {
    this.getTagList();
    // setTimeout(()=>{
    // if(this.form.type==0&&this.form.selectionNumber.length>0){
    //   this.daySelectionNumber=this.form.selectionNumber
    // }else if(this.form.type==1&&this.form.selectionNumber.length>0){
    //   this.dateSelectionNumber=this.form.selectionNumber
    // }
    // },500)
  }
};
</script>

<style lang="scss" >
.picsBox {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  img {
    width: 160px;
  }
}
.btnBox {
  margin-top: 20px;
}
.move-pic {
  width: 60px;
  height: 100px;
  margin-right: 20px;
}
.el-date-editor .el-range-separator{
  width:8%;
}
  .el-dialog{
    margin-top:2vh!important;
  }
  .el-dialog__header{
    display:none!important;
  }
  .el-dialog__body{
    padding:15px 20px!important;
  }
</style>



