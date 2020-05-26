<template>
  <div>
    <el-row>
      <el-form
        :inline="true"
        ref="noveForm"
        :rules="rules"
        class="novel"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model.trim="title" placeholder="请输入文章标题" clearable style="width: 600px;"></el-input>
        </el-form-item>
        <el-form-item label="文章类目：" prop="category">
          <el-select v-model="category" clearable placeholder="请选择文章类目" style="width: 600px;">
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        :inline="true"
        class="novel"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="发布人：" prop="publisher">
          <el-input v-model.trim="publisher" placeholder="请输入发布人" clearable style="width: 600px;"></el-input>
        </el-form-item>

        <el-form-item label="文章状态：" prop="status">
          <el-select v-model="status" clearable placeholder="请选择文章状态" style="width: 600px;">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章简要：" prop="simpleContext">
          <el-input
            type="textarea"
            :rows="4"
            v-model="simpleContext"
            placeholder="请输入文章简要"
            style="width: 600px;"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        :inline="true"
        ref="noveForm"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="正文" prop="context">
          <quill-editor
            ref="myQuillEditor"
            v-model="context"
            :options="editorOption"
            @change="onEditorChange($event)"
          />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        :inline="true"
        class="novel"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="文章封面" prop="pic">
          <el-upload
            ref="uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="fileError"
            :on-change="fileChange"
            class="img-uploader"
            name="multipartFile"
          >
            <img v-if="pic" :src="pic" class="novel_img" />
            <i v-else class="el-icon-plus img-uploader-icon" />
            <el-input v-model.trim="context.introduction" style="display: none" />
          </el-upload>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="onSubmit" style=" text-align: center;">提交</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="info" @click="cancel" style="left:100px">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory, AddArticle } from "@/api/consultation";
import { UploadUrl } from "@/http/url";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      title: "",
      categoryList: [],
      publisher: "",
      statusList: [
        { id: "0", name: "显示" },
        { id: "1", name: "不显示" }
      ],
      status: "",
      category: "",
      rules: {
        title: [
          {
            required: true,
            type: "string",
            message: "请填写文章标题！",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            type: "string",
            message: "请选择文章类目！",
            trigger: "blur"
          }
        ],
        publisher: [
          {
            required: true,
            type: "string",
            message: "请填写发布人！",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            type: "string",
            message: "请选择文章状态！",
            trigger: "blur"
          }
        ],
        context: [
          {
            required: true,
            type: "string",
            message: "请填写正文！",
            trigger: "blur"
          }
        ],
        pic: [
          {
            required: true,
            type: "string",
            message: "请上传文章封面！",
            trigger: "blur"
          }
        ],
        simpleContext: [
          {
            required: true,
            type: "string",
            message: "请填写文章简要！",
            trigger: "blur"
          }
        ]
      },

      context: "",
      editorOption: {
        // Some Quill options...
        height: "500px"
      },
      uploadUrl: UploadUrl,
      pic: "",
      simpleContext:""
    };
  },
  components: {
    quillEditor
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      getCategory().then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }

        this.categoryList = res.data.data;
      });
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.context = html;
    },
    // 上传成功
    uploadSuccess(res, file) {
      this.pic = res.data;
    },

    // 封面图片大小限制
    fileChange(file) {
      const sizeBase = 1024;
      const isLarge = file.size / sizeBase > 300;
      if (isLarge) {
        this.$wran("文件大于 300kb");
        this.$refs["uploader"].clearFiles();
      }
      return isLarge;
    },
    fileError(err, file, fileList) {
      console.log(err.message);
      const data = err.message ? JSON.parse(err.message) : "";
      this.$wran(data && data.data ? data.data : "上传失败");
    },
    cancel() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (!this.title) {
        this.$wran("请输入文章标题");
        return;
      }
      if (!this.category) {
        this.$wran("请选择文章类目");
        return;
      }
      if (!this.publisher) {
        this.$wran("请输入发布人");
        return;
      }
      if (!this.status) {
        this.$wran("请选择文章状态");
        return;
      }
      if (!this.simpleContext) {
        this.$wran("请输入文章简要");
        return;
      }
      if (!this.context) {
        this.$wran("请输入文章正文");
        return;
      }
      if (!this.pic) {
        this.$wran("请上传文章封面");
        return;
      }
      debugger;
      let categoryId = this.category;
      let category = this.categoryList.filter(
        (item, intex) => item.categoryId === categoryId
      );
      let categoryName = category[0].categoryName;
      const data = {
        categoryId,
        categoryName,
        context: this.context,
        createTime: "",
        pic: this.pic,
        publisher: this.publisher,
        simpleContext: this.simpleContext,
        status: this.status,
        title: this.title,
        uuid: ""
      };
      AddArticle(data).then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message);
        }
        this.$success(res.data.message);
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.novel {
  width: 50%;
}
.img-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.img-uploader .el-upload:hover {
  border-color: #409eff;
}
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.novel_img {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
}
.el-button {
  margin-left: 100px;
}
</style>
