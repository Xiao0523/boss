(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0613"],{Duur:function(t,e,i){},QluM:function(t,e,i){"use strict";i.r(e);i("8t5x");var o=i("hJLm"),n=i("kfou"),r=i("DSeF"),a={name:"OrganizationAdd",components:{advImgCropper:n.a,PreviewImgDialog:r.a},data:function(){return{form:{logUrl:"",name:"",pid:"",pname:"",scholarshipIcon:0,type:"0",status:0,id:"",index:0},visible:!1,isSonAdd:!1,flag:"add"}},computed:{imageUrl:function(){if(this.form.logUrl)return this.form.logUrl}},watch:{},created:function(){var t=this.$route.query;if(t.pid&&(this.isSonAdd=!0,this.form.type="1",this.form.pid=t.pid),"edit"==t.flag){if(this.flag=t.flag,!t.id)return void this.$router.push({name:"typeList"});this.form.id=t.id,this.getPname()}},methods:{ifScholar:function(){this.form.scholarshipIcon>127&&(this.form.scholarshipIcon=127)},uploadFileFn:function(t){this.form.logUrl=t},submit:function(){var t=this.form,e={name:t.name,type:t.type};this.isSonAdd||(e.logUrl=t.logUrl),1==e.type&&(e.pid=t.pid,e.pname=t.pname,e.scholarshipIcon=Number(t.scholarshipIcon)),"add"!==this.flag?(e.status=t.status,e.id=t.id,this.edit(e)):this.add(e)},add:function(t){var e=this;Object(o.a)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$router.back(-1)})},edit:function(t){var e=this;Object(o.b)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$router.back(-1)})},back:function(){this.$router.back(-1)},getPname:function(){var t=this,e={id:this.form.id};Object(o.f)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);var i=e.data.data;i&&(t.form=i)})}}},s=(i("wRFn"),i("ZrdR")),l=Object(s.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-form",{ref:"form",attrs:{model:t.form,"label-position":"left","label-width":"140px"}},[i("el-form-item",{attrs:{label:"类目名称"}},[i("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),1==t.form.type?i("el-form-item",{attrs:{label:"奖学金币数量"}},[i("el-input",{attrs:{max:"127",maxlength:"3"},on:{blur:t.ifScholar},model:{value:t.form.scholarshipIcon,callback:function(e){t.$set(t.form,"scholarshipIcon",e)},expression:"form.scholarshipIcon"}})],1):t._e(),t._v(" "),i("el-form-item",{attrs:{label:"排序"}},[i("el-input",{model:{value:t.form.index,callback:function(e){t.$set(t.form,"index",e)},expression:"form.index"}})],1),t._v(" "),0==t.form.type?i("el-form-item",{attrs:{label:"图片地址"}},[i("el-input",{model:{value:t.form.logUrl,callback:function(e){t.$set(t.form,"logUrl",e)},expression:"form.logUrl"}})],1):t._e(),t._v(" "),0==t.form.type?i("el-form-item",{attrs:{label:"上传图片生成链接"}},[i("advImgCropper",{attrs:{"image-url":t.imageUrl},on:{uploadFileFn:t.uploadFileFn}})],1):t._e(),t._v(" "),i("el-form-item",[i("el-button",{on:{click:t.submit}},[t._v("提交")]),t._v(" "),i("el-button",{on:{click:t.back}},[t._v("返回")])],1)],1),t._v(" "),i("PreviewImgDialog",{attrs:{"is-show":t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:function(e){t.visible=!1}}},[i("img",{attrs:{src:t.form.logUrl,alt:""}})])],1)},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},cqg4:function(t,e,i){"use strict";var o=i("hVas");i.n(o).a},hJLm:function(t,e,i){"use strict";i.d(e,"g",function(){return n}),i.d(e,"c",function(){return r}),i.d(e,"h",function(){return a}),i.d(e,"i",function(){return s}),i.d(e,"a",function(){return c}),i.d(e,"b",function(){return u}),i.d(e,"f",function(){return l}),i.d(e,"d",function(){return p}),i.d(e,"e",function(){return f});var o=i("+WsE");function n(t){return o.a.post("training/business",t)}function r(t){return o.a.post("training/examine",t)}function a(t){return o.a.get("training/category/levelOne",t)}function s(t){return o.a.get("training/category/levelTwo/"+t)}function l(t){var e=t.id;return o.a.get("training/category/detail/"+e)}function c(t){return o.a.post("training/category",t)}function u(t){return o.a.patch("training/category",t)}function p(t){var e=t.id;return o.a.get("training/business/"+e)}function f(){return o.a.get("training/business/main")}},hVas:function(t,e,i){},kfou:function(t,e,i){"use strict";var o=i("Q2cO"),n=i.n(o),r=i("3sdr"),a=i("DSeF"),s={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!1,canMoveBox:!0,autoCrop:!0,autoCropWidth:670,autoCropHeight:376,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(t){t=t||1,this.$refs.cropper.changeScale(t)},finish:function(t){var e=this,i=new FormData;this.$refs.cropper.getCropBlob(function(t){var o=window.URL.createObjectURL(t);e.model=!0,e.modelSrc=o,i.append("multipartFile",t),e.$axios.post(e.uploadImgUrl,i,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){e.$success("上传成功"),e.visible=!1,e.option.img="",e.isShowImg=!1,e.imgUrl=t.data.data,e.$emit("uploadFileFn",t.data.data)}).catch(function(t){console.log(t),e.$wran("上传失败"),e.visible=!1})})},down:function(t){var e=this,i=document.createElement("a");i.download="author-img","blob"===t?this.$refs.cropper.getCropBlob(function(t){e.downImg=window.URL.createObjectURL(t),i.href=window.URL.createObjectURL(t),i.click()}):this.$refs.cropper.getCropData(function(t){e.downImg=t,i.href=t,i.click()})},confirmFn:function(){this.finish()},uploadImg1:function(t,e){var i=this,o=t.target.files[0];if(console.log("one",o.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(t.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var r=new FileReader;r.onload=function(t){var o=void 0;o="object"===n()(t.target.result)?window.URL.createObjectURL(new Blob([t.target.result])):t.target.result,1===e?(i.option.img=o,console.log(i.option.img)):2===e&&(i.example2.img=o)},r.readAsArrayBuffer(o)},realTime:function(t){this.previews=t},imgLoad:function(t){},cropMoving:function(t){this.option.cropData=t}},components:{VueCropper:r.a,Dialog:a.a},created:function(){}},l=(i("cqg4"),i("ZrdR")),c=Object(l.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("div",{staticClass:"coverImgBox"},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.showFn}},[t._v("点击上传")]),t._v(" "),t.imgUrl?i("img",{staticClass:"imgCover",attrs:{src:t.imgUrl,alt:""}}):t._e(),t._v(" "),t.imageUrl&&t.isShowImg?i("img",{attrs:{src:t.imageUrl,alt:""}}):t._e()],1),t._v(" "),i("Dialog",{attrs:{width:"80%",isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[i("label",{staticClass:"btn",attrs:{for:"uploads1"}},[t._v("选择图片")]),t._v(" "),i("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads1",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(e){t.uploadImg1(e,1)}}}),t._v(" "),i("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.changeScale(1)}}},[t._v("+")]),t._v(" "),i("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.changeScale(-1)}}},[t._v("-")]),t._v(" "),i("el-button",{attrs:{plain:""},on:{click:function(e){t.down("blob")}}},[t._v("下载")]),t._v(" "),i("div",{staticClass:"dialogCover"},[i("vueCropper",{ref:"cropper",attrs:{img:t.option.img,outputSize:t.option.size,outputType:t.option.outputType,info:!0,full:t.option.full,canMove:t.option.canMove,canMoveBox:t.option.canMoveBox,fixedBox:t.option.fixedBox,original:t.option.original,autoCrop:t.option.autoCrop,autoCropWidth:t.option.autoCropWidth,autoCropHeight:t.option.autoCropHeight,centerBox:t.option.centerBox,high:t.option.high,infoTrue:t.option.infoTrue,enlarge:t.option.enlarge,mode:t.option.mode},on:{realTime:t.realTime,imgLoad:t.imgLoad,cropMoving:t.cropMoving}}),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"show-preview",style:{width:t.previews.w+"px",height:t.previews.h+"px",overflow:"hidden",margin:"5px"}},[i("div",{style:t.previews.div},[i("img",{style:t.previews.img,attrs:{src:t.previews.url}})])])])],1)],1)],1)},[],!1,null,null,null);c.options.__file="advImgCropper.vue";e.a=c.exports},wRFn:function(t,e,i){"use strict";var o=i("Duur");i.n(o).a}}]);