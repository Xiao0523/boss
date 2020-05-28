(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4e73"],{LMeR:function(t,e,r){},ZfBD:function(t,e,r){"use strict";r.r(e);var o=r("evNE"),i=r("u8Kd"),a=(r("p1OT"),r("gJae"),r("FOEY"),{components:{quillEditor:r("lT11").quillEditor},data:function(){return{categoryList:[],publisher:"",statusList:[{id:"0",name:"显示"},{id:"1",name:"不显示"}],status:"",category:"",rules:{title:[{required:!0,type:"string",message:"请填写文章标题！",trigger:"blur"}],categoryId:[{required:!0,type:"string",message:"请选择文章类目！",trigger:"change"}],publisher:[{required:!0,type:"string",message:"请填写发布人！",trigger:"blur"}],status:[{required:!0,type:"string",message:"请选择文章状态！",trigger:"change"}],context:[{required:!0,type:"string",message:"请填写正文！",trigger:"blur"}],pic:[{required:!0,type:"string",message:"请上传文章封面！",trigger:"blur"}],simpleContext:[{required:!0,type:"string",message:"请填写文章简要！",trigger:"blur"}]},uploadUrl:i.a,ruleForm:{title:"",status:"",context:"",pic:"",simpleContext:"",categoryId:"",uuid:"",editorOption:{height:"500px"}}}},created:function(){this.getCategoryList()},mounted:function(){this.ruleForm=this.$route.query.row},methods:{getCategoryList:function(){var t=this;Object(o.g)().then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);var r=e.data.data.filter(function(t,e){return t.categoryId});t.categoryList=r})},onEditorChange:function(t){var e=t.quill,r=t.html,o=t.text;console.log("editor change!",e,r,o),this.ruleForm.context=r},uploadSuccess:function(t,e){this.ruleForm.pic=t.data},fileChange:function(t){var e=t.size/1024>300;return e&&(this.$wran("文件大于 300kb"),this.$refs.uploader.clearFiles()),e},fileError:function(t,e,r){console.log(t.message);var o=t.message?JSON.parse(t.message):"";this.$wran(o&&o.data?o.data:"上传失败")},cancel:function(t){this.$refs[t].resetFields(),this.$router.go(-1)},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return e.$wran("请先检查数据是否全部填写"),!1});var r=this.ruleForm.categoryId,i=this.categoryList.filter(function(t,e){return t.categoryId===r})[0].categoryName,a={categoryId:r,categoryName:i,context:this.ruleForm.context,createTime:"",pic:this.ruleForm.pic,publisher:this.ruleForm.publisher,simpleContext:this.ruleForm.simpleContext,status:this.ruleForm.status,title:this.ruleForm.title,uuid:this.ruleForm.uuid};Object(o.a)(a).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$success(t.data.message),e.$router.go(-1)})}}}),l=(r("tOxC"),r("KHd+")),s=Object(l.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{inline:!0,model:t.ruleForm,rules:t.rules,"label-position":"right","label-width":"100px"}},[r("el-form-item",{attrs:{label:"文章标题：",prop:"title"}},[r("el-input",{staticStyle:{display:"none"},model:{value:t.ruleForm.uuid,callback:function(e){t.$set(t.ruleForm,"uuid","string"==typeof e?e.trim():e)},expression:"ruleForm.uuid"}}),t._v(" "),r("el-input",{staticStyle:{width:"600px"},attrs:{placeholder:"请输入文章标题",clearable:""},model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title","string"==typeof e?e.trim():e)},expression:"ruleForm.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章类目：",prop:"categoryId"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择文章类目"},model:{value:t.ruleForm.categoryId,callback:function(e){t.$set(t.ruleForm,"categoryId",e)},expression:"ruleForm.categoryId"}},t._l(t.categoryList,function(t){return r("el-option",{key:t.categoryId,attrs:{label:t.categoryName,value:t.categoryId}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"发布人：",prop:"publisher"}},[r("el-input",{staticStyle:{width:"600px"},attrs:{placeholder:"请输入发布人",clearable:""},model:{value:t.ruleForm.publisher,callback:function(e){t.$set(t.ruleForm,"publisher","string"==typeof e?e.trim():e)},expression:"ruleForm.publisher"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章状态：",prop:"status"}},[r("el-select",{attrs:{clearable:"",placeholder:"请选择文章状态"},model:{value:t.ruleForm.status,callback:function(e){t.$set(t.ruleForm,"status",e)},expression:"ruleForm.status"}},t._l(t.statusList,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"文章简要：",prop:"simpleContext"}},[r("el-input",{staticStyle:{width:"1000px"},attrs:{rows:4,type:"textarea",placeholder:"请输入文章简要"},model:{value:t.ruleForm.simpleContext,callback:function(e){t.$set(t.ruleForm,"simpleContext",e)},expression:"ruleForm.simpleContext"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"正文",prop:"context"}},[r("quill-editor",{ref:"myQuillEditor",attrs:{options:t.ruleForm.editorOption},on:{change:function(e){t.onEditorChange(e)}},model:{value:t.ruleForm.context,callback:function(e){t.$set(t.ruleForm,"context",e)},expression:"ruleForm.context"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章封面",prop:"pic"}},[r("el-upload",{ref:"uploader",staticClass:"img-uploader",attrs:{action:t.uploadUrl,"show-file-list":!1,"on-success":t.uploadSuccess,"on-error":t.fileError,"on-change":t.fileChange,name:"multipartFile"}},[t.ruleForm.pic?r("img",{staticClass:"novel_img",attrs:{src:t.ruleForm.pic}}):r("i",{staticClass:"el-icon-plus img-uploader-icon"})])],1),t._v(" "),r("el-row",[r("el-form-item",[r("el-button",{staticStyle:{"text-align":"center"},attrs:{type:"primary"},on:{click:function(e){t.onSubmit("ruleForm")}}},[t._v("提交")]),t._v(" "),r("el-button",{staticStyle:{left:"100px"},attrs:{type:"info"},on:{click:function(e){t.cancel("ruleForm")}}},[t._v("取消")])],1)],1)],1)],1)},[],!1,null,"6e7c9496",null);s.options.__file="index.vue";e.default=s.exports},evNE:function(t,e,r){"use strict";r.d(e,"i",function(){return i}),r.d(e,"e",function(){return a}),r.d(e,"h",function(){return l}),r.d(e,"d",function(){return s}),r.d(e,"b",function(){return u}),r.d(e,"f",function(){return n}),r.d(e,"g",function(){return c}),r.d(e,"a",function(){return m}),r.d(e,"c",function(){return p});var o=r("+WsE");function i(t){return o.a.post("waimaoshuishou/consultation",t)}function a(t,e){return o.a.patch("waimaoshuishou/consultation/"+t+"/"+e)}function l(t){return o.a.post("waimaoshuishou/category_list",t)}function s(t){return o.a.post("waimaoshuishou/category",t)}function u(t,e){return o.a.patch("waimaoshuishou/category/"+t+"/"+e)}function n(t){return o.a.post("waimaoshuishou/article_list",t)}function c(){return o.a.get("waimaoshuishou/category")}function m(t){return o.a.post("waimaoshuishou/article",t)}function p(t){var e=t.uuid;return o.a.del("waimaoshuishou/article/"+e)}},tOxC:function(t,e,r){"use strict";var o=r("LMeR");r.n(o).a},u8Kd:function(t,e,r){"use strict";r.d(e,"a",function(){return o}),r.d(e,"b",function(){return i});var o="https://upload.my51share.com/pic",i="https://upload.my51share.com/file"}}]);