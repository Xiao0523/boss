(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5958"],{"7jfb":function(e,t,a){},GFQs:function(e,t,a){},Rrrj:function(e,t,a){"use strict";var n=a("GFQs");a.n(n).a},SMMm:function(e,t,a){"use strict";var n=a("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(e){console.log("total",e),0!=e&&(this.isShow=!0)}},methods:{handleSizeChange:function(e){Object(n.c)("currentSize",e);var t=Object(n.b)("currentSize");this.$emit("sizeChange",t)},handleCurrentChange:function(e){Object(n.c)("currentPage",e);var t=Object(n.b)("currentPage");this.$emit("currentChange",t)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},r=(a("jTOu"),a("KHd+")),s=Object(r.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"pageBox"},[this.isShow?t("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[5,10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"63f271cb",null);s.options.__file="index.vue";t.a=s.exports},eHsN:function(e,t,a){"use strict";a.r(t);var n=a("gDS+"),i=a.n(n),r=a("+WsE");var s={name:"WeMediaList",components:{pageNum:a("SMMm").a},data:function(){return{articles:[],keyWord:"",currentArticle:{},totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},isShow:!1,isInderminate:!0,checkAll:!1,tags:[],choosenTags:[]}},created:function(){this.getTags()},methods:{formatTag:function(e){if(this.tags.length&&e&&e.length){var t=[];return this.tags.forEach(function(a){e.indexOf(a.id)>-1&&t.push(a.cname)}),t.join(",")}},sizeChangeFn:function(e){this.pageSize=e,this.fetchArticles()},currentPageChange:function(e){this.pageNo=e,this.fetchArticles()},close:function(){this.isShow=!1},del:function(e,t){var a=this;(function(e){return r.a.del("media/articles/"+e)})(t.hdId).then(function(e){if(e.data.code)return e.data.message&&a.$wran(e.data.message);a.$success("操作成功"),a.fetchArticles()})},edit:function(e,t){this.currentArticle=JSON.parse(i()(t)),this.choosenTags=this.currentArticle.tags,this.isShow=!0},onSubmit:function(){var e=this;if(!this.choosenTags||!this.choosenTags.length)return this.$wran("请选中类目");var t=this.articles.findIndex(function(t){return t.hdId==e.currentArticle.hdId});(function(e){return r.a.patch("media/changeCategory",e)})({hdId:this.currentArticle.hdId,tagIds:this.choosenTags}).then(function(a){if(a.data.code)return a.data.message&&e.$wran(a.data.message);e.$success("操作成功"),e.close(),e.currentArticle.tags=e.choosenTags,e.$set(e.articles,t,e.currentArticle)})},checkAllChange:function(e){this.isInderminate=!1,this.choosenTags=e?this.tags.map(function(e){return e.id}):[]},getTags:function(){var e=this;this.$req.get("v2/shareCategory/1/999").then(function(t){e.tags=t.data.data.records})},fetchArticles:function(){var e=this;(function(e){return r.a.post("media/articles",e)})({keyWord:this.keyWord,pageNum:this.pageNo,pageSize:this.pageSize||10}).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);if(t.data.data){e.totalNum=t.data.data.total;var a=t.data.data.records;e.articles=a&&a.length?a:[]}})},search:function(){if(!this.keyWord)return this.$wran("请输入搜索关键字");this.pageNo=1,this.fetchArticles()}}},o=(a("Rrrj"),a("KHd+")),c=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",[a("el-form",{attrs:{inline:!0}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"输入搜索关键字",clearable:""},model:{value:e.keyWord,callback:function(t){e.keyWord="string"==typeof t?t.trim():t},expression:"keyWord"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{staticClass:"table-box",attrs:{data:e.articles,"header-cell-style":e.tabHeader,border:""}},[a("el-table-column",{attrs:{align:"center",prop:"title",label:"文章标题"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"href",label:"文章链接"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"tags",label:"文章类目"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.formatTag(t.row.tags)))]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"creator",label:"文章作者"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.del(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.edit(t.$index,t.row)}}},[e._v("修改类目")])]}}])})],1),e._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{"current-page":e.pageNo,"page-size":e.pageSize,total:e.totalNum},on:{sizeChange:e.sizeChangeFn,currentChange:e.currentPageChange}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.isShow,title:"文章类目选择",width:"30%"},on:{"update:visible":function(t){e.isShow=t}}},[a("el-checkbox",{attrs:{indeterminate:e.isInderminate},on:{change:e.checkAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),a("el-checkbox-group",{staticClass:"checkbox-group",model:{value:e.choosenTags,callback:function(t){e.choosenTags=t},expression:"choosenTags"}},e._l(e.tags,function(t){return a("el-checkbox",{key:t.id,staticStyle:{width:"19.5%"},attrs:{label:t.id}},[e._v(e._s(t.cname))])})),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.close}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确定")])],1)],1)],1)},[],!1,null,"6faff01c",null);c.options.__file="index.vue";t.default=c.exports},jTOu:function(e,t,a){"use strict";var n=a("7jfb");a.n(n).a}}]);