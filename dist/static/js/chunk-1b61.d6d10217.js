(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1b61"],{"73UT":function(t,e,o){"use strict";o.r(e);var i={name:"",components:{advTemplet:o("WDeH").a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{}},methods:{addFn:function(t){var e=this,o=JSON.parse(this.userInfo).realname;t.creator=o,this.$req.post("v2/shareAdv/add",t).then(function(t){console.log(t),e.$success("添加成功"),e.$router.back()}).catch(function(t){console.log(t)})}},created:function(){}},n=(o("dix8"),o("KHd+")),a=Object(n.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("advTemplet",{on:{confirmFn:this.addFn}})],1)},[],!1,null,"60a3e302",null);a.options.__file="index.vue";e.default=a.exports},"7OSw":function(t,e,o){},"FL/a":function(t,e,o){},RPIl:function(t,e,o){"use strict";var i=o("FL/a");o.n(i).a},WDeH:function(t,e,o){"use strict";o("L2JU");var i=o("kfou"),n=o("DSeF"),a={name:"categoryAdd",components:{advImgCropper:i.a,PreviewImgDialog:n.a},props:{source:{type:String},form:{type:Object,default:function(){return{coin:500,layoutType:0}}}},computed:{imageUrl:function(){if(this.form.link)return this.form.link},tag:function(){return"edit"==this.source?(this.tagIds=this.form.tagIds,this.form.tagIds):[]}},data:function(){return{checkAll:!1,isIndeterminate:!0,tagList:[],tagIds:[],CropWidth:670,CropHeight:376,uploadPic:"http://www.my51share.com/boss/upload",imglink:"",visible:!1}},watch:{form:{handler:function(t,e){console.log(t)},deep:!0}},methods:{handleCheckAllChange:function(t){var e=this.tagList.map(function(t){return t.id});this.tagIds=t?e:[],console.log(this.tagIds),this.isIndeterminate=!1},handleCheckedTagsChange:function(t){console.log(t);var e=t.length;this.checkAll=e===this.tagList.length,this.isIndeterminate=e>0&&e<this.tagList.length},backFn:function(){this.$router.back()},getTagList:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records}).catch(function(t){console.log(t)})},uploadFileFn:function(t){this.imglink=t},confirmFn:function(){this.imglink&&(this.form.link=this.imglink),this.form.tagIds=this.tagIds,this.$emit("confirmFn",this.form)}},created:function(){this.getTagList(),console.log("adTel",this.tagIds)}},r=(o("RPIl"),o("KHd+")),l=Object(r.a)(a,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-form",{ref:"form",attrs:{model:t.form,"label-position":"left","label-width":"140px"}},[o("el-form-item",{attrs:{label:"标题"}},[o("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"广告商"}},[o("el-input",{model:{value:t.form.business,callback:function(e){t.$set(t.form,"business",e)},expression:"form.business"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"app内是否显示标题"}},[o("el-radio-group",{model:{value:t.form.isTitleShow,callback:function(e){t.$set(t.form,"isTitleShow",e)},expression:"form.isTitleShow"}},[o("el-radio",{attrs:{label:0}},[t._v("不显示")]),t._v(" "),o("el-radio",{attrs:{label:1}},[t._v("显示")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"广告类型"}},[o("el-radio-group",{model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[o("el-radio",{attrs:{label:0}},[t._v("图片")]),t._v(" "),o("el-radio",{attrs:{label:1}},[t._v("视频")])],1)],1),t._v(" "),o("el-form-item",{attrs:{label:"图片/视频链接地址"}},[t.imglink?t._e():o("el-input",{model:{value:t.form.link,callback:function(e){t.$set(t.form,"link",e)},expression:"form.link"}}),t._v(" "),t.imglink?o("el-input",{model:{value:t.imglink,callback:function(e){t.imglink=e},expression:"imglink"}}):t._e()],1),t._v(" "),0==t.form.type?o("el-form-item",{attrs:{label:"上传图片生成链接"}},[o("advImgCropper",{attrs:{imageUrl:t.imageUrl},on:{uploadFileFn:t.uploadFileFn}})],1):t._e(),t._v(" "),0==t.form.type?o("el-form-item",{attrs:{label:"图片跳转的链接地址"}},[o("el-input",{model:{value:t.form.targetLink,callback:function(e){t.$set(t.form,"targetLink",e)},expression:"form.targetLink"}})],1):t._e(),t._v(" "),o("el-form-item",{attrs:{label:"广告的布局类型"}},[o("el-radio-group",{model:{value:t.form.layoutType,callback:function(e){t.$set(t.form,"layoutType",e)},expression:"form.layoutType"}},[o("el-radio",{attrs:{label:0}},[t._v("详情下部")])],1)],1)],1),t._v(" "),o("section",{staticClass:"relevanceBox"},[o("p",[t._v("关联标签")]),t._v(" "),o("el-checkbox",{attrs:{indeterminate:t.isIndeterminate},on:{change:t.handleCheckAllChange},model:{value:t.checkAll,callback:function(e){t.checkAll=e},expression:"checkAll"}},[t._v("全选")]),t._v(" "),o("div",{staticStyle:{margin:"15px 0"}}),t._v(" "),o("el-checkbox-group",{model:{value:t.tagIds,callback:function(e){t.tagIds=e},expression:"tagIds"}},t._l(t.tagList,function(e,i){return o("el-checkbox",{key:i,attrs:{label:e.id}},[t._v(t._s(e.cname)+"\n       ")])})),t._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v(" "+t._s(t.tag)+t._s(t.tagIds))])],1),t._v(" "),o("el-row",{staticClass:"btnBox"},[o("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确定")]),t._v(" "),o("el-button",{attrs:{type:"info"},on:{click:t.backFn}},[t._v("返回")])],1),t._v(" "),o("PreviewImgDialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:function(e){t.visible=!1}}},[o("img",{attrs:{src:t.imglink,alt:""}})])],1)},[],!1,null,null,null);l.options.__file="index.vue";e.a=l.exports},cqg4:function(t,e,o){"use strict";var i=o("yuOZ");o.n(i).a},dix8:function(t,e,o){"use strict";var i=o("7OSw");o.n(i).a},kfou:function(t,e,o){"use strict";var i=o("EJiy"),n=o.n(i),a=o("3sdr"),r=o("DSeF"),l={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!1,canMoveBox:!0,autoCrop:!0,autoCropWidth:670,autoCropHeight:376,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(t){t=t||1,this.$refs.cropper.changeScale(t)},finish:function(t){var e=this,o=new FormData;this.$refs.cropper.getCropBlob(function(t){var i=window.URL.createObjectURL(t);e.model=!0,e.modelSrc=i,o.append("multipartFile",t),e.$axios.post(e.uploadImgUrl,o,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){e.$success("上传成功"),e.visible=!1,e.option.img="",e.isShowImg=!1,e.imgUrl=t.data.data,e.$emit("uploadFileFn",t.data.data)}).catch(function(t){console.log(t),e.$wran("上传失败"),e.visible=!1})})},down:function(t){var e=this,o=document.createElement("a");o.download="author-img","blob"===t?this.$refs.cropper.getCropBlob(function(t){e.downImg=window.URL.createObjectURL(t),o.href=window.URL.createObjectURL(t),o.click()}):this.$refs.cropper.getCropData(function(t){e.downImg=t,o.href=t,o.click()})},confirmFn:function(){this.finish()},uploadImg1:function(t,e){var o=this,i=t.target.files[0];if(console.log("one",i.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(t.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var a=new FileReader;a.onload=function(t){var i=void 0;i="object"===n()(t.target.result)?window.URL.createObjectURL(new Blob([t.target.result])):t.target.result,1===e?(o.option.img=i,console.log(o.option.img)):2===e&&(o.example2.img=i)},a.readAsArrayBuffer(i)},realTime:function(t){this.previews=t},imgLoad:function(t){},cropMoving:function(t){this.option.cropData=t}},components:{VueCropper:a.a,Dialog:r.a},created:function(){}},s=(o("cqg4"),o("KHd+")),c=Object(s.a)(l,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("div",{staticClass:"coverImgBox"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.showFn}},[t._v("点击上传")]),t._v(" "),t.imgUrl?o("img",{staticClass:"imgCover",attrs:{src:t.imgUrl,alt:""}}):t._e(),t._v(" "),t.imageUrl&&t.isShowImg?o("img",{attrs:{src:t.imageUrl,alt:""}}):t._e()],1),t._v(" "),o("Dialog",{attrs:{width:"80%",isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[o("label",{staticClass:"btn",attrs:{for:"uploads1"}},[t._v("选择图片")]),t._v(" "),o("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads1",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(e){t.uploadImg1(e,1)}}}),t._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.changeScale(1)}}},[t._v("+")]),t._v(" "),o("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.changeScale(-1)}}},[t._v("-")]),t._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(e){t.down("blob")}}},[t._v("下载")]),t._v(" "),o("div",{staticClass:"dialogCover"},[o("vueCropper",{ref:"cropper",attrs:{img:t.option.img,outputSize:t.option.size,outputType:t.option.outputType,info:!0,full:t.option.full,canMove:t.option.canMove,canMoveBox:t.option.canMoveBox,fixedBox:t.option.fixedBox,original:t.option.original,autoCrop:t.option.autoCrop,autoCropWidth:t.option.autoCropWidth,autoCropHeight:t.option.autoCropHeight,centerBox:t.option.centerBox,high:t.option.high,infoTrue:t.option.infoTrue,enlarge:t.option.enlarge,mode:t.option.mode},on:{realTime:t.realTime,imgLoad:t.imgLoad,cropMoving:t.cropMoving}}),t._v(" "),o("div",{staticClass:"right"},[o("div",{staticClass:"show-preview",style:{width:t.previews.w+"px",height:t.previews.h+"px",overflow:"hidden",margin:"5px"}},[o("div",{style:t.previews.div},[o("img",{style:t.previews.img,attrs:{src:t.previews.url}})])])])],1)],1)],1)},[],!1,null,null,null);c.options.__file="advImgCropper.vue";e.a=c.exports},yuOZ:function(t,e,o){}}]);