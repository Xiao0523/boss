(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d2b2"],{"7UbB":function(t,e,a){"use strict";a.r(e);var n=a("evNE"),s={components:{pageNum:a("SMMm").a},data:function(){return{wait:0,success:0,count:0,listData:[],pageNo:1,pageSize:5,totalNum:null,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},status:"-1",keyword:""}},created:function(){this.getConsultingList()},methods:{getConsultingList:function(){var t=this,e="-1"===this.status?"":this.status,a={keyword:this.keyword,pageNum:this.pageNo,pageSize:this.pageSize,status:e};Object(n.i)(a).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);t.wait=e.data.data.wait,t.success=e.data.data.success,t.count=e.data.data.count,t.totalNum=e.data.data.pageView.total,t.listData=e.data.data.pageView.records})},sizeChangeFn:function(t){this.pageSize=t,this.getConsultingList()},currentPageChange:function(t){this.pageNo=t,this.getConsultingList()},changeTheme:function(t){console.log(t),console.log(this.status),this.getConsultingList()},editState:function(t,e){var a=this;Object(n.e)(t,e).then(function(t){if(t.data.code)return t.data.message&&a.$wran(t.data.message);a.getConsultingList()})}}},i=(a("OoxP"),a("KHd+")),o=Object(i.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"character"},[t._v("代办咨询")]),t._v(" "),a("p",{staticClass:"digital"},[t._v(t._s(t.wait))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("p",{staticClass:"character"},[t._v("回访成功")]),t._v(" "),a("p",{staticClass:"digital"},[t._v(t._s(t.success))])])]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple"},[a("p",{staticClass:"character"},[t._v("总咨询量")]),t._v(" "),a("p",{staticClass:"digital"},[t._v(t._s(t.count))])])])],1),t._v(" "),a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"container"},[a("span",[t._v("咨询列表")])])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticStyle:{"margin-top":"20px",float:"right"}},[a("el-radio-group",{on:{change:t.changeTheme},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},[a("el-radio-button",{attrs:{label:"-1"}},[t._v("全部")]),t._v(" "),a("el-radio-button",{attrs:{label:"0"}},[t._v("待办")]),t._v(" "),a("el-radio-button",{attrs:{label:"1"}},[t._v("进行中")]),t._v(" "),a("el-radio-button",{attrs:{label:"2"}},[t._v("成功")]),t._v(" "),a("el-radio-button",{attrs:{label:"3"}},[t._v("终止")])],1)],1)]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticStyle:{"margin-top":"20px"}},[a("el-input",{attrs:{placeholder:"姓名/联系方式"},on:{change:t.changeTheme},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1)])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.listData,"header-cell-style":t.tabHeader,border:""}},[a("el-table-column",{attrs:{fixed:"",prop:"no",align:"center",label:"序号",tyle:"width: 5%"}}),t._v(" "),a("el-table-column",{attrs:{label:"咨询时间",tyle:"width: 15%",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatDate")(e.row.createTime)))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"姓名",tyle:"width: 10%",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"way",label:"联系方式",tyle:"width: 10%",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"detail",label:"内容描述",tyle:"width: 30%"}}),t._v(" "),a("el-table-column",{attrs:{prop:"statusDescription",label:"咨询状态",tyle:"width: 10%",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?a("i",{staticClass:"el-icon-chat-dot-round"}):t._e(),t._v(" "),1===e.row.status?a("i",{staticClass:"el-icon-loading"}):t._e(),t._v(" "),2===e.row.status?a("i",{staticClass:"el-icon-success"}):t._e(),t._v(" "),3===e.row.status?a("i",{staticClass:"el-icon-warning"}):t._e(),t._v(" "),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.statusDescription))])]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",tyle:"width: 20%",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.editState(e.row.uuid,1)}}},[t._v("进行中")]):t._e(),t._v(" "),0===e.row.status||1===e.row.status?a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){t.editState(e.row.uuid,2)}}},[t._v("成功")]):t._e(),t._v(" "),0===e.row.status||1===e.row.status?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.editState(e.row.uuid,3)}}},[t._v("终止")]):t._e()]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{"current-page":t.pageNo,"page-size":t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentPageChange}})],1)],1)},[],!1,null,"474dbd35",null);o.options.__file="index.vue";e.default=o.exports},"7jfb":function(t,e,a){},OoxP:function(t,e,a){"use strict";var n=a("p+ZL");a.n(n).a},SMMm:function(t,e,a){"use strict";var n=a("Uwh3"),s={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(n.c)("currentSize",t);var e=Object(n.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(n.c)("currentPage",t);var e=Object(n.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},i=(a("jTOu"),a("KHd+")),o=Object(i.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[5,10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"63f271cb",null);o.options.__file="index.vue";e.a=o.exports},evNE:function(t,e,a){"use strict";a.d(e,"i",function(){return s}),a.d(e,"e",function(){return i}),a.d(e,"h",function(){return o}),a.d(e,"d",function(){return r}),a.d(e,"b",function(){return u}),a.d(e,"f",function(){return c}),a.d(e,"g",function(){return l}),a.d(e,"a",function(){return d}),a.d(e,"c",function(){return p});var n=a("+WsE");function s(t){return n.a.post("waimaoshuishou/consultation",t)}function i(t,e){return n.a.patch("waimaoshuishou/consultation/"+t+"/"+e)}function o(t){return n.a.post("waimaoshuishou/category_list",t)}function r(t){return n.a.post("waimaoshuishou/category",t)}function u(t,e){return n.a.patch("waimaoshuishou/category/"+t+"/"+e)}function c(t){return n.a.post("waimaoshuishou/article_list",t)}function l(){return n.a.get("waimaoshuishou/category")}function d(t){return n.a.post("waimaoshuishou/article",t)}function p(t){var e=t.uuid;return n.a.del("waimaoshuishou/article/"+e)}},jTOu:function(t,e,a){"use strict";var n=a("7jfb");a.n(n).a},"p+ZL":function(t,e,a){}}]);