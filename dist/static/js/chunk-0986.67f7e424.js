(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0986"],{DmZD:function(t,e,n){},FyfS:function(t,e,n){t.exports={default:n("Rp86"),__esModule:!0}},JHrQ:function(t,e,n){"use strict";var a=n("DmZD");n.n(a).a},Paff:function(t,e,n){"use strict";n.d(e,"b",function(){return i}),n.d(e,"c",function(){return s}),n.d(e,"a",function(){return o});var a=n("+WsE");function i(t){var e=t.talentShowId,n=t.status,i=void 0===n?0:n,s=t.pageNum,o=void 0===s?1:s,r=t.pageSize,l=void 0===r?10:r;return a.a.get("training/trainingTalentShow/composition/"+e+"/"+i+"/"+o+"/"+l)}function s(t){return a.a.post("training/trainingTalentShow/examine",t)}function o(t){var e=t.id;return a.a.get("training/trainingTalentShow/composition/detail/"+e)}},Rp86:function(t,e,n){n("bBy9"),n("FlQf"),t.exports=n("fXsU")},SMMm:function(t,e,n){"use strict";var a=n("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(a.c)("currentSize",t);var e=Object(a.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(a.c)("currentPage",t);var e=Object(a.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},s=(n("JHrQ"),n("KHd+")),o=Object(s.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);o.options.__file="index.vue";e.a=o.exports},b6tR:function(t,e,n){},eINC:function(t,e,n){"use strict";var a=n("b6tR");n.n(a).a},fXsU:function(t,e,n){var a=n("5K7Z"),i=n("fNZA");t.exports=n("WEpk").getIterator=function(t){var e=i(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}},fmj3:function(t,e,n){"use strict";n.r(e);var a=n("FyfS"),i=n.n(a),s=n("Paff"),o={name:"Tuition",components:{pageNum:n("SMMm").a},filters:{typeStr:function(t){return 0==t?"图片":"视频"},statusStr:function(t){return 0==t?"待审核":1==t?"审核通过":2==t?"审核未通过":"违规"}},data:function(){return{dynamic:0,list:[],options:[{value:"0",label:"待审核"},{value:"1",label:"审核通过"},{value:"2",label:"审核未通过"}],keyWord:{type:"",timeRange:""},selectVal:"待处理",status:0,totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"},diglogFlag:!1,talentId:"",typeVideo:null}},watch:{dynamic:function(){1===Number(this.typeVideo)&&1===Number(this.typeVideo)||(this.$wran("只允许视频设置动态封面！！！"),this.dynamic=0)}},mounted:function(){var t=this.$route.query.id;t||this.$router.push({name:"Show"}),this.talentId=t,this.fetchList()},methods:{selectChange:function(){var t=!0,e=!1,n=void 0;try{for(var a,s=i()(this.options);!(t=(a=s.next()).done);t=!0){var o=a.value;if(o.label===this.selectVal)return this.status=o.value,void this.fetchList()}}catch(t){e=!0,n=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw n}}},audit:function(t){this.activeAudit=t,0==t.status?(this.typeVideo=t.type,this.dynamic=0,this.diglogFlag=!0):this.$message({message:"请选择待审核的数据",type:"warning"})},handelDiglogClick:function(t){if(this.activeAudit.id){var e={ids:[this.activeAudit.id],status:this.activeAudit.status,dynamic:this.dynamic};e.status="success"===t?1:2,this.auditFn(e),this.diglogFlag=!1}},auditFn:function(t){var e=this;Object(s.c)(t).then(function(t){e.$message({message:"操作成功",type:"success"}),e.fetchList()})},sizeChangeFn:function(t){this.pageSize=t,this.fetchList()},currentPageChange:function(t){this.pageNo=t,this.fetchList()},fetchList:function(){var t=this,e={talentShowId:this.talentId,status:this.status,pageNum:this.pageNo,pageSize:this.pageSize||10};Object(s.b)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){var n=e.data.data;t.totalNum=n.total;var a=n.records;t.list=a&&a.length?a:[]}})},search:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.pageNo=1,e.fetchList())})}}},r=(n("eINC"),n("KHd+")),l=Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",[n("el-select",{on:{change:t.selectChange},model:{value:t.selectVal,callback:function(e){t.selectVal=e},expression:"selectVal"}},t._l(t.options,function(t){return n("el-option",{key:t.label,attrs:{value:t.label}})}))],1),t._v(" "),n("el-table",{staticClass:"table-box",attrs:{data:t.list,"header-cell-style":t.tabHeader,border:""}},[n("el-table-column",{attrs:{align:"center",prop:"id",label:"作品编号"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",prop:"talentShowId",label:"才艺秀编号"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"作品类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("typeStr")(e.row.type))+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("statusStr")(e.row.status))+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{name:"CompositionDetail",query:{id:e.row.id}}}},[n("el-button",{attrs:{size:"mini"}},[t._v("查看")])],1),t._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){t.audit(e.row)}}},[t._v("审核")])]}}])})],1),t._v(" "),n("div",{staticClass:"pageNumBox"},[n("pageNum",{attrs:{"current-page":t.pageNo,"page-size":t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentPageChange}})],1),t._v(" "),n("el-dialog",{staticClass:"diglog",attrs:{visible:t.diglogFlag,title:"审核",width:"30%",center:""},on:{"update:visible":function(e){t.diglogFlag=e}}},[n("div",{staticClass:"model-box"},[n("div",{staticClass:"radio-box"},[n("span",[t._v("是否需要动态封面：")]),t._v(" "),n("el-radio-group",{model:{value:t.dynamic,callback:function(e){t.dynamic=e},expression:"dynamic"}},[n("el-radio",{attrs:{label:1}},[t._v("是")]),t._v(" "),n("el-radio",{attrs:{label:0}},[t._v("否")])],1)],1),t._v(" "),n("div",{staticClass:"button-box",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.handelDiglogClick("success")}}},[t._v("审核通过")]),t._v(" "),n("el-button",{on:{click:function(e){t.handelDiglogClick("unSuccess")}}},[t._v("驳回")])],1)])])],1)},[],!1,null,"7efe2cc4",null);l.options.__file="index.vue";e.default=l.exports}}]);