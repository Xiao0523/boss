(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d9ff"],{L7jo:function(t,e,n){},ew2E:function(t,e,n){"use strict";var o=n("L7jo");n.n(o).a},ktGI:function(t,e,n){"use strict";n.d(e,"e",function(){return c}),n.d(e,"d",function(){return r}),n.d(e,"a",function(){return a}),n.d(e,"f",function(){return s}),n.d(e,"c",function(){return l}),n.d(e,"b",function(){return i});var o=n("+WsE");function r(t){return t.categoryId=t.categoryId||0,t.pageSize=t.pageSize||10,o.a.post("happyRead/notes",t)}function i(){return o.a.get("happyRead/category")}function a(t){return o.a.del("happyRead/note/"+t)}function s(t){return o.a.post("happyRead/categoryNoteRelation",t)}function l(t){return o.a.post("happyRead/noteCategoryRelation/"+t)}function c(t){return o.a.post("happyRead/note",t)}},tilC:function(t,e,n){"use strict";n.r(e);var o=n("ktGI"),r=n("u8Kd"),i={name:"HappyReadAdd",data:function(){return{content:{title:"",author:"",introduction:"",cover:"",xlsUrl:""},rules:{title:[{required:!0,type:"string",message:"请填写小说名称！",trigger:"blur"}],author:[{required:!0,type:"string",message:"请填写小说作者！",trigger:"blur"}],introduction:[{required:!0,type:"string",message:"请填写小说简介！",trigger:"blur"}],cover:[{required:!0,type:"string",message:"请上传小说封面！",trigger:"blur"}],xlsUrl:[{required:!0,type:"string",message:"请上传小说文件！",trigger:"blur"}]},uploadUrl:r.a}},created:function(){},methods:{uploadSuccess:function(t,e){this.content.cover=t.data},fileChange:function(t){var e=t.size/1024>300;return e&&(this.$wran("文件大于 300kb"),this.$refs.uploader.clearFiles()),e},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&Object(o.e)(e.content).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$success("操所成功！")})})},handleRemove:function(t,e){console.log(t,e),this.content.xlsUrl=""},fileSuccess:function(t,e,n){this.content.xlsUrl=t.data},fileError:function(t,e,n){console.log(t.message);var o=t.message?JSON.parse(t.message):"";this.$wran(o&&o.data?o.data:"上传失败")}}},a=(n("ew2E"),n("ZrdR")),s=Object(a.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{ref:"noveForm",staticClass:"novel",attrs:{model:t.content,rules:t.rules,"label-position":"left","label-width":"100px"}},[n("el-form-item",{attrs:{label:"小说名称",prop:"title"}},[n("el-input",{model:{value:t.content.title,callback:function(e){t.$set(t.content,"title","string"==typeof e?e.trim():e)},expression:"content.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"小说作者",prop:"author"}},[n("el-input",{model:{value:t.content.author,callback:function(e){t.$set(t.content,"author","string"==typeof e?e.trim():e)},expression:"content.author"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"小说简介",prop:"introduction"}},[n("el-input",{attrs:{type:"textarea",autosize:""},model:{value:t.content.introduction,callback:function(e){t.$set(t.content,"introduction","string"==typeof e?e.trim():e)},expression:"content.introduction"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"小说封面",prop:"cover"}},[n("el-upload",{ref:"uploader",staticClass:"img-uploader",attrs:{action:t.uploadUrl,"show-file-list":!1,"on-success":t.uploadSuccess,"on-error":t.fileError,"on-change":t.fileChange,name:"multipartFile"}},[t.content.cover?n("img",{staticClass:"novel_img",attrs:{src:t.content.cover}}):n("i",{staticClass:"el-icon-plus img-uploader-icon"}),t._v(" "),n("el-input",{staticStyle:{display:"none"},model:{value:t.content.introduction,callback:function(e){t.$set(t.content,"introduction","string"==typeof e?e.trim():e)},expression:"content.introduction"}})],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"小说文件",prop:"xlsUrl"}},[n("el-upload",{staticClass:"upload-demo",attrs:{action:t.uploadUrl,"on-remove":t.handleRemove,limit:1,"on-success":t.fileSuccess,"on-error":t.fileError,name:"multipartFile"}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("上传小说文件")]),t._v(" "),n("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传xls文件")])],1),t._v(" "),n("el-input",{staticStyle:{display:"none"},model:{value:t.content.xlsUrl,callback:function(e){t.$set(t.content,"xlsUrl","string"==typeof e?e.trim():e)},expression:"content.xlsUrl"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("noveForm")}}},[t._v("提交")])],1)],1)],1)},[],!1,null,"972ed438",null);s.options.__file="index.vue";e.default=s.exports},u8Kd:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return r});var o="https://upload.my51share.com/pic",r="https://upload.my51share.com/file"}}]);