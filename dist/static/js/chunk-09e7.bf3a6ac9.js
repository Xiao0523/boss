(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-09e7"],{"9M5l":function(e,t,a){"use strict";a.r(t);var n=a("vKTW"),i=a("DSeF"),r=a("SMMm"),s=a("9pNs"),o=a("Uwh3"),l={name:"memberList",components:{searchBar:n.a,Dialog:i.a,pageNum:r.a,goTop:s.a},computed:{},data:function(){return{searchParame:{},isActive:1,pageSize:10,listData:[],totalNum:0,visible:!1,ids:[],tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},filters:{delFlagStatus:function(e){return 0==e?"未删除":1==e?"已删除":2==e?"已禁用":void 0},statusFlagStatus:function(e){return 1==e?"活跃":2==e?"非活跃/刷单":void 0}},methods:{updateListFn:function(){this.ids=[],this.initData()},confirmFn:function(){this.visible=!1;var e=this.ids;this.$store.dispatch("delFn",{url:"batchForbid",idArr:e})},delsFn:function(){this.ids.length&&(this.visible=!0)},searchFn:function(e){this.searchParame=e,console.log("父组件接受的参数",this.searchParame),this.initData()},SelectionChange:function(e){this.ids=e.map(function(e){return e.id}),console.log(this.ids)},handleEdit:function(e,t){this.$router.push({path:"/memberManager/memberDetais",query:{id:t.id}})},handleDelete:function(e,t){this.visible=!0;var a=[];a.push(t.id),this.ids=a},sizeChangeFn:function(e){this.searchParame.pageSize=e;var t=Object(o.b)("param");"undefined"!==t&&void 0!==t||((t={}).isActive=1),t.pageSize=this.searchParame.pageSize,t.pageNum=this.searchParame.pageNum,Object(o.c)("param",t),this.initData()},currentChangeFn:function(e){console.log(this.searchParame),this.searchParame.pageNum=e;var t=Object(o.b)("param");"undefined"!==t&&void 0!==t||((t={}).isActive=1),t.pageSize=this.searchParame.pageSize,t.pageNum=this.searchParame.pageNum,Object(o.c)("param",t),this.initData()},initData:function(){var e=this;this.searchParame=Object(o.b)("param"),"undefined"!==this.searchParame&&void 0!==this.searchParame||(this.searchParame={pageNum:1,pageSize:10,isActive:1}),this.$req.post("fuzzyBackMember",this.searchParame).then(function(t){console.log(t.data),e.listData=t.data.data.members,e.totalNum=t.data.data.totalNum}).catch(function(e){console.log(e)})}},created:function(){this.initData()},beforeRouteLeave:function(e,t,a){"memberDetais"!=e.name&&(Object(o.a)("param"),Object(o.a)("currentPage")),a()}},c=(a("SX8/"),a("ZrdR")),u=Object(c.a)(l,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("searchBar",{attrs:{from:"memberList",param:e.searchParame},on:{searchFn:e.searchFn,updateListFn:e.updateListFn,delsFn:e.delsFn}}),e._v(" "),a("el-table",{staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:e.listData,"empty-text":"暂无数据","max-height":"700",border:"","header-cell-style":e.tabHeader},on:{"selection-change":e.SelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"会员昵称","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sex",label:"性别"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"shareNum",label:"总分享数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"totalsharemoney",label:"纷享币"}}),e._v(" "),a("el-table-column",{attrs:{prop:"apprenticeNum",label:"一级邀请好友数量","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"apprenticeSecondNum",label:"二级邀请好友数量","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"memberLabel",label:"感兴趣类目","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"标签","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"注册日期","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"openid",label:"最近登录时间","min-width":"180"}}),e._v(" "),a("el-table-column",{attrs:{label:"活跃状态",prop:"status"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("statusFlagStatus")(t.row.status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"del状态",prop:"delFlag"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("delFlagStatus")(t.row.delFlag)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operation-box"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("查看/编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])],1)]}}])})],1),e._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{currentPage:e.searchParame.pageNum,pageSize:e.searchParame.pageSize,total:e.totalNum},on:{sizeChange:e.sizeChangeFn,currentChange:e.currentChangeFn}})],1),e._v(" "),a("goTop"),e._v(" "),a("Dialog",{attrs:{isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:e.confirmFn}},[a("span",{attrs:{slot:"del"},slot:"del"},[e._v("禁用操作不可恢复，确认禁用？")])])],1)},[],!1,null,"79046cf9",null);u.options.__file="index.vue";t.default=u.exports},"9pNs":function(e,t,a){"use strict";var n={name:"goTop",data:function(){return{scrollTop:"",goTopShow:!1}},methods:{handleScroll:function(){this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,this.scrollTop>500&&(this.goTopShow=!0)},goTop:function(){var e=null,t=this;cancelAnimationFrame(e),e=requestAnimationFrame(function a(){t.scrollTop>0?(t.scrollTop-=500,document.body.scrollTop=document.documentElement.scrollTop=t.scrollTop,e=requestAnimationFrame(a)):(cancelAnimationFrame(e),t.goTopShow=!1)})}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},i=(a("D/QT"),a("ZrdR")),r=Object(i.a)(n,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"goTop"}},[t("div",{directives:[{name:"show",rawName:"v-show",value:this.goTopShow,expression:"goTopShow"}],staticClass:"goTop",on:{click:this.goTop}},[t("i",{staticClass:"goTopIcon"})])])},[],!1,null,"56abcee9",null);r.options.__file="index.vue";t.a=r.exports},"D/QT":function(e,t,a){"use strict";var n=a("Se3E");a.n(n).a},DSeF:function(e,t,a){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(a("E9Le"),a("ZrdR")),r=Object(i.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,visible:e.isShow,"close-on-click-modal":!1,"show-close":!1,width:e.width},on:{"update:visible":function(t){e.isShow=t}}},[e._t("del"),e._v(" "),e._t("sort"),e._v(" "),e._t("upload"),e._v(" "),e._t("transfer"),e._v(" "),e._t("default"),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancelFn}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmFn}},[e._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);r.options.__file="index.vue";t.a=r.exports},E9Le:function(e,t,a){"use strict";var n=a("W9qD");a.n(n).a},JHrQ:function(e,t,a){"use strict";var n=a("Q61b");a.n(n).a},JY7U:function(e,t,a){},Q61b:function(e,t,a){},SMMm:function(e,t,a){"use strict";var n=a("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(e){console.log("total",e),0!=e&&(this.isShow=!0)}},methods:{handleSizeChange:function(e){Object(n.c)("currentSize",e);var t=Object(n.b)("currentSize");this.$emit("sizeChange",t)},handleCurrentChange:function(e){Object(n.c)("currentPage",e);var t=Object(n.b)("currentPage");this.$emit("currentChange",t)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},r=(a("JHrQ"),a("ZrdR")),s=Object(r.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"pageBox"},[this.isShow?t("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);s.options.__file="index.vue";t.a=s.exports},"SX8/":function(e,t,a){"use strict";var n=a("r7mG");a.n(n).a},Se3E:function(e,t,a){},W9qD:function(e,t,a){},WwKW:function(e,t,a){"use strict";var n=a("JY7U");a.n(n).a},r7mG:function(e,t,a){},vKTW:function(e,t,a){"use strict";var n=a("Uwh3"),i={name:"searchBar",props:{from:{type:String},param:{type:Object,default:function(){return{}}}},components:{},computed:{delText:function(){return"memberList"==this.from?"批量禁用":"批量删除"}},data:function(){return{memberIsActive:[{value:1,label:"活跃用户"},{value:2,label:"非活跃/刷单"}],memberSort:[{value:1,label:"总分享数"},{value:2,label:"分享币"},{value:3,label:"一级邀请好友数量"}]}},watch:{},methods:{resettingFn:function(){Object(n.a)("param"),Object(n.a)("currentPage"),this.$emit("updateListFn")},isActiveFn:function(){""!=this.param.isActive&&this.searchFn()},sortByFn:function(){""!=this.param.sort&&this.searchFn()},nicknameFn:function(){"13"==event.keyCode&&this.param.nickname&&(this.param.nickname=this.param.nickname,this.searchFn())},phoneFn:function(){"13"==event.keyCode&&this.param.phone&&(this.param.phone=this.param.phone,this.searchFn())},keyFn:function(){"13"==event.keyCode&&this.param.key&&(this.param.key=this.param.key,this.searchFn())},addFn:function(){switch(this.from){case"businessList":this.$router.push("/ArticleManager/ArticleAdd");break;case"adminList":this.$emit("addAdmin")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(){for(var e in this.param)""!==this.param[e]&&null!==this.param[e]||delete this.param[e];this.param.pageNum=1,Object(n.c)("param",this.param),this.$emit("searchFn",Object(n.b)("param"))}},created:function(){switch(console.log(this.param.isActive),this.from){case"businessList":this.text="商家昵称",this.placeholder="请输入商家昵称",this.btnText="添加商家";break;case"memberList":this.text="会员昵称",this.placeholder="请输入会员昵称",this.btnText="添加会员";break;case"adminList":this.text="报道标题",this.btnText="添加管理员"}}},r=(a("WwKW"),a("ZrdR")),s=Object(r.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",{attrs:{gutter:20}},["memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.isActiveFn},model:{value:e.param.isActive,callback:function(t){e.$set(e.param,"isActive",t)},expression:"param.isActive"}},e._l(e.memberIsActive,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:e.placeholder,clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.nicknameFn(t):null}},model:{value:e.param.nickname,callback:function(t){e.$set(e.param,"nickname",t)},expression:"param.nickname"}})],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:"请输入手机号",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.phoneFn(t):null}},model:{value:e.param.phone,callback:function(t){e.$set(e.param,"phone",t)},expression:"param.phone"}})],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择排序方式"},on:{change:e.sortByFn},model:{value:e.param.sort,callback:function(t){e.$set(e.param,"sort",t)},expression:"param.sort"}},e._l(e.memberSort,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):e._e(),e._v(" "),"adminList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:"请输入姓名或手机号",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.keyFn(t):null}},model:{value:e.param.key,callback:function(t){e.$set(e.param,"key",t)},expression:"param.key"}})],1):e._e(),e._v(" "),"businessList"==e.from?a("el-col",{attrs:{span:9}},[a("div",{staticClass:"date-box"},[a("span",[e._v("日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.param.startDate,callback:function(t){e.$set(e.param,"startDate",t)},expression:"param.startDate"}}),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.param.endDate,callback:function(t){e.$set(e.param,"endDate",t)},expression:"param.endDate"}})],1)]):e._e(),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-button",{attrs:{type:"warning"},on:{click:e.resettingFn}},[e._v("重置")]),e._v(" "),"memberList"!==e.from?a("el-button",{attrs:{type:"primary"},on:{click:e.addFn}},[e._v(e._s(e.btnText))]):e._e(),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:e.delsFn}},[e._v(e._s(e.delText))])],1)],1)],1)},[],!1,null,"0c589a8e",null);s.options.__file="index.vue";t.a=s.exports}}]);