(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-22f0"],{"7jfb":function(t,e,a){},OGR2:function(t,e,a){},SMMm:function(t,e,a){"use strict";var n=a("Uwh3"),r={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(n.c)("currentSize",t);var e=Object(n.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(n.c)("currentPage",t);var e=Object(n.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},o=(a("jTOu"),a("KHd+")),i=Object(o.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[5,10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"63f271cb",null);i.options.__file="index.vue";e.a=i.exports},VDiL:function(t,e,a){"use strict";var n=a("OGR2");a.n(n).a},evNE:function(t,e,a){"use strict";a.d(e,"i",function(){return r}),a.d(e,"e",function(){return o}),a.d(e,"h",function(){return i}),a.d(e,"d",function(){return s}),a.d(e,"b",function(){return u}),a.d(e,"f",function(){return c}),a.d(e,"g",function(){return l}),a.d(e,"a",function(){return d}),a.d(e,"c",function(){return h});var n=a("+WsE");function r(t){return n.a.post("waimaoshuishou/consultation",t)}function o(t,e){return n.a.patch("waimaoshuishou/consultation/"+t+"/"+e)}function i(t){return n.a.post("waimaoshuishou/category_list",t)}function s(t){return n.a.post("waimaoshuishou/category",t)}function u(t,e){return n.a.patch("waimaoshuishou/category/"+t+"/"+e)}function c(t){return n.a.post("waimaoshuishou/article_list",t)}function l(){return n.a.get("waimaoshuishou/category")}function d(t){return n.a.post("waimaoshuishou/article",t)}function h(t){var e=t.uuid;return n.a.del("waimaoshuishou/article/"+e)}},jTOu:function(t,e,a){"use strict";var n=a("7jfb");a.n(n).a},rrk0:function(t,e,a){"use strict";a.r(e);var n=a("evNE"),r={components:{pageNum:a("SMMm").a},data:function(){return{keyWord:"",Category:[],totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},isShow:!1,categoryName:"",orderIndex:"",operationType:"新增类目",uuid:""}},created:function(){this.fetchCategory()},methods:{search:function(){if(!this.keyWord)return this.$wran("请输入类目名称");this.pageNo=1,this.fetchCategory()},fetchCategory:function(){var t=this,e={keyword:this.keyWord,pageNum:this.pageNo,pageSize:this.pageSize};Object(n.h)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);t.Category=e.data.data.pager.records,t.totalNum=e.data.data.pager.total})},sizeChangeFn:function(t){this.pageSize=t,this.fetchCategory()},currentPageChange:function(t){this.pageNo=t,this.fetchCategory()},newCategory:function(){this.isShow=!0,this.uuid="",this.operationType="新增类目"},edit:function(t){this.isShow=!0,this.operationType="修改类目",this.categoryName=t.categoryName,this.orderIndex=t.orderIndex,this.orderIndex=t.orderIndex,this.uuid=t.uuid},del:function(t,e){var a=this;Object(n.b)(t,e).then(function(t){if(t.data.code)return t.data.message&&a.$wran(t.data.message);a.categoryName="",a.orderIndex="",a.uuid="",a.isShow=!1,a.pageNo=1,a.fetchCategory()})},onSubmit:function(){var t=this;if(!this.categoryName)return this.$wran("请输入类目名称");if(!this.orderIndex)return this.$wran("请输入排序");var e={categoryName:this.categoryName,orderIndex:this.orderIndex,uuid:this.uuid};Object(n.d)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);t.categoryName="",t.orderIndex="",t.uuid="",t.isShow=!1,t.pageNo=1,t.fetchCategory()})},close:function(){this.categoryName="",this.orderIndex="",this.uuid="",this.isShow=!1},filterTag:function(t,e){return e.tag===t}}},o=(a("VDiL"),a("KHd+")),i=Object(o.a)(r,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"请输入类目名称",clearable:""},model:{value:t.keyWord,callback:function(e){t.keyWord="string"==typeof e?e.trim():e},expression:"keyWord"}})],1),t._v(" "),a("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary"},on:{click:t.newCategory}},[t._v("新增类目")])],1)],1),t._v(" "),a("el-table",{staticClass:"table-box",attrs:{data:t.Category,"header-cell-style":t.tabHeader,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"categoryName",label:"类目名称"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"articleNum",label:"文章数"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"orderIndex",label:"排序"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:0===e.row.status?"primary":"success","disable-transitions":""}},[t._v(t._s(0===e.row.status?"关闭":"开启"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.edit(e.row)}}},[t._v("编辑")]),t._v(" "),0===e.row.status?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.del(e.row.uuid,1)}}},[t._v("开启")]):t._e(),t._v(" "),1===e.row.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.del(e.row.uuid,0)}}},[t._v("禁用")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{"current-page":t.pageNo,"page-size":t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentPageChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.operationType,visible:t.isShow,width:"30%"},on:{"update:visible":function(e){t.isShow=e}}},[a("el-form",{ref:"form",attrs:{"label-position":"left"}},[a("el-form-item",{attrs:{label:"类目名称"}},[a("el-input",{model:{value:t.categoryName,callback:function(e){t.categoryName=e},expression:"categoryName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序"}},[a("el-input",{attrs:{type:"number"},model:{value:t.orderIndex,callback:function(e){t.orderIndex=e},expression:"orderIndex"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.close}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("确定")])],1)],1)],1)},[],!1,null,"3f066fe6",null);i.options.__file="index.vue";e.default=i.exports}}]);