(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-63f9"],{"+VFq":function(t,e,a){"use strict";var n=a("Sp8O");a.n(n).a},"8wxe":function(t,e,a){},DSeF:function(t,e,a){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(a("E9Le"),a("KHd+")),r=Object(i.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);r.options.__file="index.vue";e.a=r.exports},DmZD:function(t,e,a){},E9Le:function(t,e,a){"use strict";var n=a("8wxe");a.n(n).a},IoXO:function(t,e,a){"use strict";a.r(e);var n=a("gDS+"),i=a.n(n),r=a("J03f"),s=a("+WsE");function o(t){return t.pageSize=t.pageSize||10,t.tagId?function(t){return s.a.post("image/imagesByTagId",t)}(t):s.a.post("image/images",t)}var c=a("u8Kd"),u=a("DSeF"),g={name:"Gallery",components:{pageNum:a("SMMm").a,Dialog:u.a},filters:{formatTag:function(t){if(t)return t.map(function(t){return t.describe}).join("/")}},data:function(){return{tagId:"",imgArr:[],totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},choosenImg:[],uploadPic:c.a,isImgShow:!1,currentImg:{imageUrl:"",tags:[],shareImageTags:[]},tagArr:[],pageTagNum:1,pageTagSize:10,pageTagTotal:null,islastPageTag:!1}},created:function(){var t=this.$route.query;this.tagId=t.tagId?t.tagId:"",this.initTags(),this.initImgs()},methods:{sizeChangeFn:function(t){this.pageSize=t,this.initImgs()},currentPageChange:function(t){this.pageNo=t,this.initImgs()},close:function(t){this.isImgShow=!1,this.$refs[t].resetFields()},selectHandle:function(t,e){this.choosenImg=t.map(function(t){return t.id})},selectAll:function(t){this.choosenImg=t.map(function(t){return t.id})},batchDel:function(){var t=this;if(!this.choosenImg.length)return this.$wran("请勾选要删除的图片");this.$confirm("确定要批量删除图片吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t._delImgs(t.choosenImg)}).catch(function(t){})},del:function(t,e){var a=this;this.$confirm("确定要删除该图片吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a._delImgs([e.id])}).catch(function(t){})},_delImgs:function(t){var e=this;(function(t){return s.a.del2("image/images",{id:t})})(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$success("操作成功"),e.initImgs()})},addImg:function(){this.isImgShow=!0,this.currentImg={imageUrl:"",tags:[],shareImageTags:[]}},edit:function(t,e){this.isImgShow=!0;var a=JSON.parse(i()(e));a.tags=a.shareImageTags.map(function(t){return t.id}),this.currentImg=a},uploadSuccess:function(t,e,a){this.currentImg.imageUrl=t.data},onFileChange:function(t,e){var a=t.size/1024>300;return a&&(this.$wran("文件大于 300kb"),this.$refs.uploader.clearFiles()),a},onImgSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&function(t){return s.a.post("image/image",t)}(e.currentImg).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$success("操作成功"),e.initImgs(),e.close("imgForm")})})},prev:function(){this.pageTagNum<=1||(this.pageTagNum--,this.initTags())},next:function(){this.pageTagNum>=Math.ceil(this.pageTagTotal/this.pageTagSize)||(this.pageTagNum++,this.initTags())},closeTag:function(t){this.currentImg.shareImageTags=this.currentImg.shareImageTags.filter(function(e){return e.id!==t.id}),this.currentImg.tags=this.currentImg.tags.filter(function(e){return e!==t.id})},changeCheck:function(t,e){if(e)return this.currentImg.shareImageTags.push(t);this.currentImg.shareImageTags=this.currentImg.shareImageTags.filter(function(e){return e.id!==t.id})},initTags:function(){var t=this,e=this.initTags;if(e[this.pageTagNum])this.tagArr=e[this.pageTagNum];else{var a={pageNum:this.pageTagNum,pageSize:this.pageTagSize,keyWord:""};Object(r.b)(a).then(function(a){if(a.data.code)return a.data.message&&t.$wran(a.data.message);if(a.data.data){var n=a.data.data;t.islastPageTag=n.isLast,t.pageTagTotal=n.total;var i=n.records;t.tagArr=i&&i.length?i:[],e[t.pageTagNum]=t.tagArr}})}},initImgs:function(){var t=this;this.choosenImg=[];var e={pageNum:this.pageNo,pageSize:this.pageSize};this.tagId&&(e.tagId=this.tagId),o(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){t.totalNum=e.data.data.total;var a=e.data.data.records;t.imgArr=a&&a.length?a:[]}})}},beforeRouteUpdate:function(t,e,a){var n=this;this.$nextTick(function(){var t=n.$route.query;n.tagId=t.tagId?t.tagId:"",n.initTags(),n.initImgs()}),a()}},l=(a("+VFq"),a("KHd+")),m=Object(l.a)(g,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[t.tagId?t._e():a("el-button",{attrs:{type:"primary"},on:{click:t.addImg}},[t._v("新增图片")]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.batchDel}},[t._v("批量删除")])],1),t._v(" "),a("el-table",{staticClass:"table-box",attrs:{data:t.imgArr,"header-cell-style":t.tabHeader,border:""},on:{select:t.selectHandle,"select-all":t.selectAll}},[a("el-table-column",{attrs:{align:"center",type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"describe",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"gallery-img",attrs:{src:t.row.imageUrl,alt:""}})]}}])}),t._v(" "),t.tagId?t._e():a("el-table-column",{attrs:{align:"center",label:"图片标签"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatTag")(e.row.shareImageTags)))]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.tagId?t._e():a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.edit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.del(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{"current-page":t.pageNo,"page-size":t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentPageChange}})],1),t._v(" "),a("Dialog",{attrs:{title:"编辑图片",width:"40%","is-show":t.isImgShow},on:{cancelFn:function(e){t.close("imgForm")},confirmFn:function(e){t.onImgSubmit("imgForm")}}},[a("div",{attrs:{slot:"upload"},slot:"upload"},[a("div",{staticClass:"picBox"},[a("el-upload",{ref:"uploader",staticClass:"avatar-uploader",attrs:{action:t.uploadPic,"show-file-list":!1,"on-change":t.onFileChange,name:"multipartFile","on-success":t.uploadSuccess}},[t.currentImg.imageUrl?a("img",{staticClass:"avatar",attrs:{src:t.currentImg.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form",{ref:"imgForm",attrs:{"label-position":"left",model:t.currentImg,"label-width":"120px"}},[a("el-form-item",{attrs:{rules:[{required:!0,message:"请上传图片！",trigger:"blur"}],label:"图片地址",prop:"imageUrl"}},[a("el-input",{attrs:{disabled:!0},model:{value:t.currentImg.imageUrl,callback:function(e){t.$set(t.currentImg,"imageUrl",e)},expression:"currentImg.imageUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{rules:[{required:!0,message:"请选择标签！",trigger:"blur"}],label:"已选标签",prop:"tags"}},t._l(t.currentImg.shareImageTags,function(e){return a("el-tag",{key:e.id,staticStyle:{"margin-left":"20px"},attrs:{closable:""},on:{close:function(a){t.closeTag(e)}}},[t._v(t._s(e.describe))])})),t._v(" "),a("div",{staticClass:"tag_checkbox_wraper"},[a("a",{staticClass:"el-icon-arrow-left btn_arrow",attrs:{href:"javascript:;"},on:{click:t.prev}}),t._v(" "),a("div",{staticClass:"tag_checkbox"},[a("el-checkbox-group",{staticClass:"checkbox-group tag_checkbox_group",model:{value:t.currentImg.tags,callback:function(e){t.$set(t.currentImg,"tags",e)},expression:"currentImg.tags"}},t._l(t.tagArr,function(e){return a("el-checkbox",{key:e.id,staticClass:"tag_checkbox_item",attrs:{label:e.id},on:{change:function(a){t.changeCheck(e,a)}}},[t._v(t._s(e.describe))])}))],1),t._v(" "),t.islastPageTag?t._e():a("a",{staticClass:"el-icon-arrow-right btn_arrow",attrs:{href:"javascript:;"},on:{click:t.next}})])],1)],1)])],1)},[],!1,null,"cc74cece",null);m.options.__file="index.vue";e.default=m.exports},J03f:function(t,e,a){"use strict";a.d(e,"b",function(){return i}),a.d(e,"a",function(){return r}),a.d(e,"c",function(){return s});var n=a("+WsE");function i(t){return t.pageSize=t.pageSize||10,n.a.post("image/tags",t)}function r(t){return n.a.del2("image/tags",{id:t})}function s(t){return n.a.post("image/tag",t)}},JHrQ:function(t,e,a){"use strict";var n=a("DmZD");a.n(n).a},SMMm:function(t,e,a){"use strict";var n=a("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(n.c)("currentSize",t);var e=Object(n.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(n.c)("currentPage",t);var e=Object(n.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},r=(a("JHrQ"),a("KHd+")),s=Object(r.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);s.options.__file="index.vue";e.a=s.exports},Sp8O:function(t,e,a){},u8Kd:function(t,e,a){"use strict";a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i});var n="https://upload.my51share.com/pic",i="https://upload.my51share.com/file"}}]);