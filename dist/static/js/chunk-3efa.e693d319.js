(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3efa"],{"+e6I":function(e,t,o){"use strict";var i=o("K88j");o.n(i).a},"1vD4":function(e,t,o){"use strict";var i=o("wJ8V");o.n(i).a},K88j:function(e,t,o){},LxOM:function(e,t,o){"use strict";o("vDqi"),o("L2JU");var i=o("EJiy"),n=o.n(i),r=o("3sdr"),a=o("DSeF"),l={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!0,canMoveBox:!0,autoCrop:!0,autoCropWidth:560,autoCropHeight:744,fixedNumber:[560,744],fixed:!0,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},finish:function(e){var t=this,o=new FormData;this.$refs.cropper.getCropBlob(function(e){var i=window.URL.createObjectURL(e);t.model=!0,t.modelSrc=i,o.append("multipartFile",e),t.$axios.post(t.uploadImgUrl,o,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.$success("上传成功"),t.visible=!1,t.option.img="",t.isShowImg=!1,t.imgUrl=e.data.data,t.$emit("uploadFileFn",e.data.data)}).catch(function(e){console.log(e),t.$wran("上传失败"),t.visible=!1})})},down:function(e){var t=this,o=document.createElement("a");o.download="author-img","blob"===e?this.$refs.cropper.getCropBlob(function(e){t.downImg=window.URL.createObjectURL(e),o.href=window.URL.createObjectURL(e),o.click()}):this.$refs.cropper.getCropData(function(e){t.downImg=e,o.href=e,o.click()})},confirmFn:function(){this.finish()},uploadImg1:function(e,t){var o=this,i=e.target.files[0];if(console.log("one",i.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var r=new FileReader;r.onload=function(e){var i=void 0;i="object"===n()(e.target.result)?window.URL.createObjectURL(new Blob([e.target.result])):e.target.result,1===t?(o.option.img=i,console.log(o.option.img)):2===t&&(o.example2.img=i)},r.readAsArrayBuffer(i)},realTime:function(e){this.previews=e},imgLoad:function(e){},cropMoving:function(e){this.option.cropData=e}},components:{VueCropper:r.a,Dialog:a.a},created:function(){}},s=(o("1vD4"),o("KHd+")),c=Object(s.a)(l,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("div",{staticClass:"coverImgBox"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.showFn}},[e._v("点击上传")]),e._v(" "),e.imgUrl?o("img",{staticClass:"imgCover",attrs:{src:e.imgUrl,alt:""}}):e._e(),e._v(" "),e.imageUrl&&e.isShowImg?o("img",{attrs:{src:e.imageUrl,alt:""}}):e._e()],1),e._v(" "),o("Dialog",{attrs:{width:"80%",isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:e.confirmFn}},[o("label",{staticClass:"btn",attrs:{for:"uploads1"}},[e._v("选择图片")]),e._v(" "),o("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads1",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(t){e.uploadImg1(t,1)}}}),e._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.changeScale(1)}}},[e._v("+")]),e._v(" "),o("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.changeScale(-1)}}},[e._v("-")]),e._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(t){e.down("blob")}}},[e._v("下载")]),e._v(" "),o("div",{staticClass:"dialogCover"},[o("vueCropper",{ref:"cropper",attrs:{img:e.option.img,outputSize:e.option.size,outputType:e.option.outputType,info:!0,full:e.option.full,canMove:e.option.canMove,canMoveBox:e.option.canMoveBox,fixedBox:e.option.fixedBox,original:e.option.original,autoCrop:e.option.autoCrop,autoCropWidth:e.option.autoCropWidth,autoCropHeight:e.option.autoCropHeight,centerBox:e.option.centerBox,high:e.option.high,infoTrue:e.option.infoTrue,fixedNumber:e.option.fixedNumber,fixed:e.option.fixed,enlarge:e.option.enlarge,mode:e.option.mode},on:{realTime:e.realTime,imgLoad:e.imgLoad,cropMoving:e.cropMoving}}),e._v(" "),o("div",{staticClass:"right"},[o("div",{staticClass:"show-preview",style:{width:e.previews.w+"px",height:e.previews.h+"px",overflow:"hidden",margin:"5px"}},[o("div",{style:e.previews.div},[o("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])])],1)],1)],1)},[],!1,null,"839c6ec4",null);c.options.__file="flotImgCropper1.vue";var p=c.exports,u={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!0,canMoveBox:!0,autoCrop:!0,autoCropWidth:560,autoCropHeight:744,fixedNumber:[560,744],fixed:!0,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},finish:function(e){var t=this,o=new FormData;this.$refs.cropper.getCropBlob(function(e){var i=window.URL.createObjectURL(e);t.model=!0,t.modelSrc=i,o.append("multipartFile",e),t.$axios.post(t.uploadImgUrl,o,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.$success("上传成功"),t.visible=!1,t.option.img="",t.imgUrl=e.data.data,t.isShowImg=!1,t.$emit("uploadFileFn",e.data.data)}).catch(function(e){console.log(e),t.$wran("上传失败"),t.visible=!1})})},down:function(e){var t=this,o=document.createElement("a");o.download="author-img","blob"===e?this.$refs.cropper.getCropBlob(function(e){t.downImg=window.URL.createObjectURL(e),o.href=window.URL.createObjectURL(e),o.click()}):this.$refs.cropper.getCropData(function(e){t.downImg=e,o.href=e,o.click()})},confirmFn:function(){this.finish()},uploadImg2:function(e,t){var o=this,i=e.target.files[0];if(console.log("two",i.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var r=new FileReader;r.onload=function(e){var i=void 0;i="object"===n()(e.target.result)?window.URL.createObjectURL(new Blob([e.target.result])):e.target.result,1===t?(o.option.img=i,console.log(o.option.img)):2===t&&(o.example2.img=i)},r.readAsArrayBuffer(i)},realTime:function(e){this.previews=e},imgLoad:function(e){},cropMoving:function(e){this.option.cropData=e}},components:{VueCropper:r.a,Dialog:a.a},created:function(){}},g=(o("+e6I"),Object(s.a)(u,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("div",{staticClass:"coverImgBox"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.showFn}},[e._v("点击上传")]),e._v(" "),e.imgUrl?o("img",{staticClass:"imgCover",attrs:{src:e.imgUrl,alt:""}}):e._e(),e._v(" "),e.imageUrl&&e.isShowImg?o("img",{attrs:{src:e.imageUrl,alt:""}}):e._e()],1),e._v(" "),o("Dialog",{attrs:{width:"80%",isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:e.confirmFn}},[o("label",{staticClass:"btn",attrs:{for:"uploads2"}},[e._v("选择图片")]),e._v(" "),o("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads2",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(t){e.uploadImg2(t,1)}}}),e._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.changeScale(1)}}},[e._v("+")]),e._v(" "),o("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.changeScale(-1)}}},[e._v("-")]),e._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(t){e.down("blob")}}},[e._v("下载")]),e._v(" "),o("div",{staticClass:"dialogCover"},[o("vueCropper",{ref:"cropper",attrs:{img:e.option.img,outputSize:e.option.size,outputType:e.option.outputType,info:!0,full:e.option.full,canMove:e.option.canMove,canMoveBox:e.option.canMoveBox,fixedBox:e.option.fixedBox,original:e.option.original,autoCrop:e.option.autoCrop,autoCropWidth:e.option.autoCropWidth,autoCropHeight:e.option.autoCropHeight,centerBox:e.option.centerBox,high:e.option.high,infoTrue:e.option.infoTrue,fixedNumber:e.option.fixedNumber,fixed:e.option.fixed,enlarge:e.option.enlarge,mode:e.option.mode},on:{realTime:e.realTime,imgLoad:e.imgLoad,cropMoving:e.cropMoving}}),e._v(" "),o("div",{staticClass:"right"},[o("div",{staticClass:"show-preview",style:{width:e.previews.w+"px",height:e.previews.h+"px",overflow:"hidden",margin:"5px"}},[o("div",{style:e.previews.div},[o("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])])],1)],1)],1)},[],!1,null,null,null));g.options.__file="flotImgCropper2.vue";var m=g.exports,f={props:{imageUrl:{type:String,default:""}},data:function(){return{visible:!1,previews:{},fileinfo:{},uploadImgUrl:"https://www.my51share.com/boss/upload",imgUrl:"",isShowImg:!0,option:{img:"",size:1,full:!1,outputType:"png",canMove:!0,fixedBox:!1,original:!0,canMoveBox:!0,autoCrop:!0,autoCropWidth:560,autoCropHeight:744,fixedNumber:[560,744],fixed:!0,centerBox:!0,high:!0,cropData:{},enlarge:1,mode:"contain"}}},methods:{showFn:function(){this.visible=!0},changeScale:function(e){e=e||1,this.$refs.cropper.changeScale(e)},finish:function(e){var t=this,o=new FormData;this.$refs.cropper.getCropBlob(function(e){var i=window.URL.createObjectURL(e);t.model=!0,t.modelSrc=i,o.append("multipartFile",e),t.$axios.post(t.uploadImgUrl,o,{contentType:!1,processData:!1,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){t.$success("上传成功"),t.visible=!1,t.option.img="",t.imgUrl=e.data.data,t.isShowImg=!1,t.$emit("uploadFileFn",e.data.data)}).catch(function(e){console.log(e),t.$wran("上传失败"),t.visible=!1})})},down:function(e){var t=this,o=document.createElement("a");o.download="author-img","blob"===e?this.$refs.cropper.getCropBlob(function(e){t.downImg=window.URL.createObjectURL(e),o.href=window.URL.createObjectURL(e),o.click()}):this.$refs.cropper.getCropData(function(e){t.downImg=e,o.href=e,o.click()})},confirmFn:function(){this.finish()},uploadImg3:function(e,t){var o=this,i=e.target.files[0];if(console.log("three",i.name),!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))return this.$wran("图片类型必须是.gif,jpeg,jpg,png中的一种"),!1;var r=new FileReader;r.onload=function(e){var i=void 0;i="object"===n()(e.target.result)?window.URL.createObjectURL(new Blob([e.target.result])):e.target.result,1===t?(o.option.img=i,console.log(o.option.img)):2===t&&(o.example2.img=i)},r.readAsArrayBuffer(i)},realTime:function(e){this.previews=e},imgLoad:function(e){},cropMoving:function(e){this.option.cropData=e}},components:{VueCropper:r.a,Dialog:a.a},created:function(){}},d=(o("VI9j"),Object(s.a)(f,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("div",{staticClass:"coverImgBox"},[o("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.showFn}},[e._v("点击上传")]),e._v(" "),e.imgUrl?o("img",{staticClass:"imgCover",attrs:{src:e.imgUrl,alt:""}}):e._e(),e._v(" "),e.imageUrl&&e.isShowImg?o("img",{attrs:{src:e.imageUrl,alt:""}}):e._e()],1),e._v(" "),o("Dialog",{attrs:{width:"80%",isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:e.confirmFn}},[o("label",{staticClass:"btn",attrs:{for:"uploads3"}},[e._v("选择图片")]),e._v(" "),o("input",{ref:"file",staticStyle:{position:"absolute",clip:"rect(0 0 0 0)"},attrs:{type:"file",id:"uploads3",accept:"image/png, image/jpeg, image/gif, image/jpg"},on:{change:function(t){e.uploadImg3(t,1)}}}),e._v(" "),o("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.changeScale(1)}}},[e._v("+")]),e._v(" "),o("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.changeScale(-1)}}},[e._v("-")]),e._v(" "),o("el-button",{attrs:{plain:""},on:{click:function(t){e.down("blob")}}},[e._v("下载")]),e._v(" "),o("div",{staticClass:"dialogCover"},[o("vueCropper",{ref:"cropper",attrs:{img:e.option.img,outputSize:e.option.size,outputType:e.option.outputType,info:!0,full:e.option.full,canMove:e.option.canMove,canMoveBox:e.option.canMoveBox,fixedBox:e.option.fixedBox,original:e.option.original,autoCrop:e.option.autoCrop,autoCropWidth:e.option.autoCropWidth,autoCropHeight:e.option.autoCropHeight,centerBox:e.option.centerBox,high:e.option.high,infoTrue:e.option.infoTrue,fixedNumber:e.option.fixedNumber,fixed:e.option.fixed,enlarge:e.option.enlarge,mode:e.option.mode},on:{realTime:e.realTime,imgLoad:e.imgLoad,cropMoving:e.cropMoving}}),e._v(" "),o("div",{staticClass:"right"},[o("div",{staticClass:"show-preview",style:{width:e.previews.w+"px",height:e.previews.h+"px",overflow:"hidden",margin:"5px"}},[o("div",{style:e.previews.div},[o("img",{style:e.previews.img,attrs:{src:e.previews.url}})])])])],1)],1)],1)},[],!1,null,null,null));d.options.__file="flotImgCropper3.vue";var h={name:"categoryAdd",components:{coverCrop:p,twoCover:m,threeCover:d.exports,PreviewImgDialog:a.a},props:{source:{type:String},form:{type:Object,default:function(){return{isLoop:1}}}},computed:{imageUrl1:function(){if(this.form.pics){var e=this.form.pics;if(this.coverArr=e,e.length)return e[0]}},imageUrl2:function(){if(this.form.pics){var e=this.form.pics;if(this.coverArr=e,e.length>1)return e[1]}},imageUrl3:function(){if(this.form.pics){var e=this.form.pics;if(this.coverArr=e,e.length>1)return e[2]}},tag:function(){return"edit"==this.source?(this.tagIds=this.form.categories,this.form.categories):[]}},data:function(){return{checkAll:!1,isIndeterminate:!0,times:null,tagList:[],tagIds:[],CropWidth:670,CropHeight:376,uploadPic:"https://www.my51share.com/boss/upload",imglink:"",coverArr:[],visible:!1,isLoop:0,dayOptions:["星期一","星期二","星期三","星期四","星期五","星期六","星期天"],daySelectionNumber:[],dateSelectionNumber:[]}},watch:{form:{handler:function(e,t){console.log(e)},deep:!0}},methods:{handleCheckAllChange:function(e){var t=this.tagList.map(function(e){return e.id});this.tagIds=e?t:[],console.log(this.tagIds),this.isIndeterminate=!1},handleCheckedTagsChange:function(e){var t=e.length;this.checkAll=t===this.tagList.length,this.isIndeterminate=t>0&&t<this.tagList.length},backFn:function(){this.$router.back()},uploadFileFn1:function(e){this.coverArr.push(e)},uploadFileFn2:function(e){this.coverArr.push(e)},uploadFileFn3:function(e){this.coverArr.push(e)},getTagList:function(){var e=this;this.$req.get("v2/shareCategory/1/999").then(function(t){e.tagList=t.data.data.records}).catch(function(e){console.log(e)})},confirmFn:function(){this.form.categories=this.tagIds;var e=this.coverArr.splice(-3);if(this.form.pics=e,0==this.form.type){if(0==this.daySelectionNumber.length)return void this.$alert("请选择星期","提交失败",{type:"error"});this.form.selectionNumber=this.daySelectionNumber,this.$emit("confirmFn",this.form)}else if(1==this.form.type){if(0==this.dateSelectionNumber.length)return void this.$alert("请选择日期","提交失败",{type:"error"});this.form.selectionNumber=this.dateSelectionNumber,this.$emit("confirmFn",this.form)}},timeChange:function(e){e.length<2||(this.form.startTime=e[0],this.form.endTime=e[1])}},updated:function(){},created:function(){this.getTagList()}},v=(o("M+4J"),Object(s.a)(h,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-form",{ref:"form",attrs:{model:e.form,"label-position":"left","label-width":"140px"}},[o("el-form-item",{attrs:{label:"标题"}},[o("el-input",{model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"时间区间"}},[o("el-time-picker",{attrs:{"is-range":"","range-separator":"至","start-placeholder":"开始时间","end-placeholder":"结束时间",placeholder:"选择时间范围","value-format":"HH:mm:ss"},on:{change:e.timeChange},model:{value:e.times,callback:function(t){e.times=t},expression:"times"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"是否循环"}},[o("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0,"active-text":"是","inactive-text":"否"},model:{value:e.form.isLoop,callback:function(t){e.$set(e.form,"isLoop",t)},expression:"form.isLoop"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"时间模式"}},[o("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"日","inactive-text":"周"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1),e._v(" "),1==e.form.type?o("el-form-item",{attrs:{label:"日模式"}},[o("el-date-picker",{attrs:{type:"dates",placeholder:"选择一个或多个日期","value-format":"yyyy-MM-dd"},model:{value:e.dateSelectionNumber,callback:function(t){e.dateSelectionNumber=t},expression:"dateSelectionNumber"}})],1):0==e.form.type?o("el-form-item",{attrs:{label:"周模式"}},[o("el-checkbox-group",{model:{value:e.daySelectionNumber,callback:function(t){e.daySelectionNumber=t},expression:"daySelectionNumber"}},e._l(e.dayOptions,function(t){return o("el-checkbox",{key:t,attrs:{label:t}},[e._v(e._s(t))])}))],1):e._e(),e._v(" "),o("el-form-item",{attrs:{label:"上传图片"}},[o("section",{staticClass:"picsBox"},[o("coverCrop",{attrs:{imageUrl:e.imageUrl1},on:{uploadFileFn:e.uploadFileFn1}}),e._v(" "),o("twoCover",{attrs:{imageUrl:e.imageUrl2},on:{uploadFileFn:e.uploadFileFn2}}),e._v(" "),o("threeCover",{attrs:{imageUrl:e.imageUrl3},on:{uploadFileFn:e.uploadFileFn3}})],1)])],1),e._v(" "),o("section",{staticClass:"relevanceBox"},[o("p",[e._v("关联标签")]),e._v(" "),o("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),o("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),o("el-checkbox-group",{on:{change:e.handleCheckedTagsChange},model:{value:e.tagIds,callback:function(t){e.tagIds=t},expression:"tagIds"}},e._l(e.tagList,function(t,i){return o("el-checkbox",{key:i,attrs:{label:t.id}},[e._v(e._s(t.cname))])})),e._v(" "),o("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[e._v(e._s(e.tag)+e._s(e.tagIds))])],1),e._v(" "),o("el-row",{staticClass:"btnBox"},[o("el-button",{attrs:{type:"primary"},on:{click:e.confirmFn}},[e._v("确定")]),e._v(" "),o("el-button",{attrs:{type:"info"},on:{click:e.backFn}},[e._v("返回")])],1),e._v(" "),o("PreviewImgDialog",{attrs:{isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:function(t){e.visible=!1}}},[o("img",{attrs:{src:e.imglink,alt:""}})])],1)},[],!1,null,null,null));v.options.__file="flotAdvTemplet.vue";t.a=v.exports},"M+4J":function(e,t,o){"use strict";var i=o("l/oE");o.n(i).a},NK5y:function(e,t,o){},VI9j:function(e,t,o){"use strict";var i=o("NK5y");o.n(i).a},"l/oE":function(e,t,o){},wJ8V:function(e,t,o){}}]);