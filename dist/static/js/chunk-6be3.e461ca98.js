(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6be3"],{"0+8W":function(t,e,n){"use strict";var a=n("mvzZ");n.n(a).a},"A3i+":function(t,e,n){"use strict";n.r(e);var a=n("J03f"),i=n("DSeF"),o={name:"tagList",components:{pageNum:n("SMMm").a,Dialog:i.a},data:function(){return{tagArr:[],keyWord:"",totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},choosenTag:[],currentTag:{describe:""},isShow:!1}},methods:{sizeChangeFn:function(t){this.pageSize=t,this.initTags()},currentPageChange:function(t){this.pageNo=t,this.initTags()},close:function(t){this.isShow=!1,this.$refs[t].resetFields()},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){t&&Object(a.c)({describe:e.currentTag.describe}).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.$success("操作成功"),e.initTags(),e.close("tagForm")})})},addTag:function(){this.isShow=!0,this.currentTag.describe=""},selectHandle:function(t,e){this.choosenTag=t.map(function(t){return t.id})},selectAll:function(t){this.choosenTag=t.map(function(t){return t.id})},batchDel:function(){var t=this;if(!this.choosenTag.length)return this.$wran("请勾选要删除的标签");this.$confirm("确定要批量删除标签吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)(t.choosenTag).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);t.$success("操作成功"),t.initTags()})}).catch(function(t){})},del:function(t,e){var n=this;this.$confirm("确定要删除该标签吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)([e.id]).then(function(t){if(t.data.code)return t.data.message&&n.$wran(t.data.message);n.$success("操作成功"),n.initTags()})}).catch(function(t){})},navToImg:function(t,e){this.$router.push({name:"gallery",query:{tagId:e.id}})},search:function(){this.pageNo=1,this.initTags()},initTags:function(){var t=this,e={pageNum:this.pageNo,pageSize:this.pageSize,keyWord:this.keyWord};this.choosenTag=[],Object(a.b)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){t.totalNum=e.data.data.total;var n=e.data.data.records;t.tagArr=n&&n.length?n:[]}})}},created:function(){this.initTags()}},r=(n("0+8W"),n("ZrdR")),s=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-button",{attrs:{type:"primary"},on:{click:t.addTag}},[t._v("新增标签")]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:t.batchDel}},[t._v("批量删除")]),t._v(" "),n("el-form",{staticStyle:{"margin-top":"20px"},attrs:{inline:!0}},[n("el-form-item",[n("el-input",{attrs:{placeholder:"输入搜索关键字",clearable:""},model:{value:t.keyWord,callback:function(e){t.keyWord="string"==typeof e?e.trim():e},expression:"keyWord"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"default"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),n("el-table",{staticClass:"table-box",attrs:{border:"",data:t.tagArr,"header-cell-style":t.tabHeader},on:{select:t.selectHandle,"select-all":t.selectAll}},[n("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"describe",label:"标签名称"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){t.del(e.$index,e.row)}}},[t._v("删除")]),t._v(" "),n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){t.navToImg(e.$index,e.row)}}},[t._v("图片列表")])]}}])})],1),t._v(" "),n("div",{staticClass:"pageNumBox"},[n("pageNum",{attrs:{currentPage:t.pageNo,pageSize:t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentPageChange}})],1),t._v(" "),n("el-dialog",{attrs:{title:"新增标签",visible:t.isShow,width:"30%"},on:{"update:visible":function(e){t.isShow=e}}},[n("el-form",{ref:"tagForm",attrs:{"label-width":"80px",model:t.currentTag}},[n("el-form-item",{attrs:{label:"标签名称",prop:"describe",rules:[{required:!0,message:"请标签名称！",trigger:"blur"}]}},[n("el-input",{model:{value:t.currentTag.describe,callback:function(e){t.$set(t.currentTag,"describe","string"==typeof e?e.trim():e)},expression:"currentTag.describe"}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.close("tagForm")}}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.onSubmit("tagForm")}}},[t._v("确定")])],1)],1)],1)},[],!1,null,"d397a3d0",null);s.options.__file="index.vue";e.default=s.exports},DSeF:function(t,e,n){"use strict";var a={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(n("E9Le"),n("ZrdR")),o=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);o.options.__file="index.vue";e.a=o.exports},E9Le:function(t,e,n){"use strict";var a=n("W9qD");n.n(a).a},J03f:function(t,e,n){"use strict";n.d(e,"b",function(){return i}),n.d(e,"a",function(){return o}),n.d(e,"c",function(){return r});var a=n("+WsE");function i(t){return t.pageSize=t.pageSize||10,a.a.post("image/tags",t)}function o(t){return a.a.del2("image/tags",{id:t})}function r(t){return a.a.post("image/tag",t)}},JHrQ:function(t,e,n){"use strict";var a=n("Q61b");n.n(a).a},Q61b:function(t,e,n){},SMMm:function(t,e,n){"use strict";var a=n("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(a.c)("currentSize",t);var e=Object(a.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(a.c)("currentPage",t);var e=Object(a.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},o=(n("JHrQ"),n("ZrdR")),r=Object(o.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);r.options.__file="index.vue";e.a=r.exports},W9qD:function(t,e,n){},mvzZ:function(t,e,n){}}]);