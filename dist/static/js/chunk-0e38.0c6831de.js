(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0e38"],{Duur:function(t,e,o){},QluM:function(t,e,o){"use strict";o.r(e);o("8t5x");var i=o("hJLm"),n=o("kfou"),r=o("DSeF"),a={name:"organizationAdd",components:{advImgCropper:n.a,PreviewImgDialog:r.a},computed:{imageUrl:function(){if(this.form.logUrl)return this.form.logUrl}},data:function(){return{form:{logUrl:"",name:"",pid:"",pname:"",scholarshipIcon:0,type:"0",status:0,id:""},visible:!1,isSonAdd:!1,flag:"add"}},watch:{},created:function(){var t=this.$route.query;if(t.pid&&(this.isSonAdd=!0,this.form.type="1",this.form.pid=t.pid),"edit"==t.flag){if(this.flag=t.flag,!t.id)return void this.$router.push({name:"typeList"});this.form.id=t.id,this.getPname()}},methods:{ifScholar:function(){this.form.scholarshipIcon>127&&(this.form.scholarshipIcon=127)},uploadFileFn:function(t){this.form.logUrl=t},submit:function(){var t=this.form,e={name:t.name,type:t.type};this.isSonAdd||(e.logUrl=t.logUrl),1==e.type&&(e.pid=t.pid,e.pname=t.pname,e.scholarshipIcon=Number(t.scholarshipIcon)),"add"!==this.flag?(e.status=t.status,e.id=t.id,this.edit(e)):this.add(e)},add:function(t){var e=this;Object(i.a)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$router.back(-1)})},edit:function(t){var e=this;Object(i.b)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$router.back(-1)})},back:function(){this.$router.back(-1)},getPname:function(){var t=this,e={id:this.form.id};Object(i.e)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);var o=e.data.data;o&&(t.form=o)})}}},s=(o("wRFn"),o("ZrdR")),l=Object(s.a)(a,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-form",{ref:"form",attrs:{model:t.form,"label-position":"left","label-width":"140px"}},[o("el-form-item",{attrs:{label:"类目名称"}},[o("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),1==t.form.type?o("el-form-item",{attrs:{label:"奖学金币数量"}},[o("el-input",{attrs:{max:"127",maxlength:"3"},on:{blur:t.ifScholar},model:{value:t.form.scholarshipIcon,callback:function(e){t.$set(t.form,"scholarshipIcon",e)},expression:"form.scholarshipIcon"}})],1):t._e(),t._v(" "),0==t.form.type?o("el-form-item",{attrs:{label:"图片地址"}},[o("el-input",{model:{value:t.form.logUrl,callback:function(e){t.$set(t.form,"logUrl",e)},expression:"form.logUrl"}})],1):t._e(),t._v(" "),0==t.form.type?o("el-form-item",{attrs:{label:"上传图片生成链接"}},[o("advImgCropper",{attrs:{imageUrl:t.imageUrl},on:{uploadFileFn:t.uploadFileFn}})],1):t._e(),t._v(" "),o("el-form-item",[o("el-button",{on:{click:t.submit}},[t._v("提交")]),t._v(" "),o("el-button",{on:{click:t.back}},[t._v("返回")])],1)],1),t._v(" "),o("PreviewImgDialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:function(e){t.visible=!1}}},[o("img",{attrs:{src:t.form.logUrl,alt:""}})])],1)},[],!1,null,null,null);l.options.__file="index.vue";e.default=l.exports},cqg4:function(t,e,o){"use strict";var i=o("hVas");o.n(i).a},hJLm:function(t,e,o){"use strict";o.d(e,"f",function(){return n}),o.d(e,"c",function(){return r}),o.d(e,"g",function(){return a}),o.d(e,"h",function(){return s}),o.d(e,"a",function(){return c}),o.d(e,"b",function(){return u}),o.d(e,"e",function(){return l}),o.d(e,"d",function(){return p});var i=o("+WsE");function n(t){return i.a.post("training/business",t)}function r(t){return i.a.post("training/examine",t)}function a(t){return i.a.get("training/category/levelOne",t)}function s(t){return i.a.get("training/category/levelTwo/"+t)}function l(t){var e=t.id;return i.a.get("training/category/detail/"+e)}function c(t){return i.a.post("training/category",t)}function u(t){return i.a.patch("training/category",t)}function p(t){var e=t.id;return i.a.get("training/business/"+e)}},hVas:function(t,e,o){},kfou:function(t,e,o){"use strict";var i=o("Q2cO"),n=o.n(i),r=o("3sdr"),a=o("DSeF"),s={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!1,canMoveBox:!0,autoCrop:!0,autoCropWidth:670,autoCropHeight:376,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(t){t=t||1,this.$refs.cropper.changeScale(t)},finish:function(t){var e=this,o=new FormData;this.$refs.cropper.getCropBlob(function(t){var i=window.URL.createObjectURL(t);e.model=!0,e.modelSrc=i,o.append("multipartFile",t),e.$axios.post(e.uploadImgUrl,o,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){e.$success("上传成功"),e.visible=!1,e.option.img="",e.isShowImg=!1,e.imgUrl=t.data.data,e.$emit("uploadFileFn",t.data.data)}).catch(function(t){console.log(t),e.$wran("上传失败"),e.visible=!1})})},down:function(t){var e=this,o=document.createElement("a");o.download="author-img","blob"===t?this.$refs.cropper.getCropBlob(function(t){e.downImg=window.URL.createObjectURL(t),o.href=window.URL.createObjectURL(t),o.click()}):this.$refs.cropper.getCropData(function(t){e.downImg=t,o.href=t,o.click()})},confirmFn:function(){this.finish()},uploadImg1:function(t,e){var o=this,i=t.target.files[0];if(console.log("one",i.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(t.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var r=new FileReader;r.onload=function(t){var i=void 0;i="object"===n()(t.target.result)?window.URL.createObjectURL(new Blob([t.target.result])):t.target.result,1===e?(o.option.img=i,console.log(o.option.img)):2===e&&(o.example2.img=i)},r.readAsArrayBuffer(i)},realTime:function(t){this.previews=t},imgLoad:function(t){},cropMoving:function(t){this.option.cropData=t}},components:{VueCropper:r.a,Dialog:a.a},created:function(){}},l=(o("cqg4"),o("ZrdR")),c=Object(l.a)(s,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("div",{staticClass:"coverImgBox"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.showFn}},[t._v("点击上传")]),t._v(" "),t.imgUrl?o("img",{staticClass:"imgCover",attrs:{src:t.imgUrl,alt:""}}):t._e(),t._v(" "),t.imageUrl&&t.isShowImg?o("img",{attrs:{src:t.imageUrl,alt:""}}):t._e()],1),t._v(" "),o("Dialog",{attrs:{width:"80%",isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[o("label",{staticClass:"btn",attrs:{for:"uploads1"}},[t._v("选择图片")]),t._v(" "),o("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads1",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(e){t.uploadImg1(e,1)}}}),t._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.changeScale(1)}}},[t._v("+")]),t._v(" "),o("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.changeScale(-1)}}},[t._v("-")]),t._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(e){t.down("blob")}}},[t._v("下载")]),t._v(" "),o("div",{staticClass:"dialogCover"},[o("vueCropper",{ref:"cropper",attrs:{img:t.option.img,outputSize:t.option.size,outputType:t.option.outputType,info:!0,full:t.option.full,canMove:t.option.canMove,canMoveBox:t.option.canMoveBox,fixedBox:t.option.fixedBox,original:t.option.original,autoCrop:t.option.autoCrop,autoCropWidth:t.option.autoCropWidth,autoCropHeight:t.option.autoCropHeight,centerBox:t.option.centerBox,high:t.option.high,infoTrue:t.option.infoTrue,enlarge:t.option.enlarge,mode:t.option.mode},on:{realTime:t.realTime,imgLoad:t.imgLoad,cropMoving:t.cropMoving}}),t._v(" "),o("div",{staticClass:"right"},[o("div",{staticClass:"show-preview",style:{width:t.previews.w+"px",height:t.previews.h+"px",overflow:"hidden",margin:"5px"}},[o("div",{style:t.previews.div},[o("img",{style:t.previews.img,attrs:{src:t.previews.url}})])])])],1)],1)],1)},[],!1,null,null,null);c.options.__file="advImgCropper.vue";e.a=c.exports},wRFn:function(t,e,o){"use strict";var i=o("Duur");o.n(i).a}}]);