(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5e94"],{15:function(e,t){},16:function(e,t){},17:function(e,t){},"1mMU":function(e,t,a){},"8wxe":function(e,t,a){},DSeF:function(e,t,a){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(a("E9Le"),a("KHd+")),s=Object(i.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.title,visible:e.isShow,"close-on-click-modal":!1,"show-close":!1,width:e.width},on:{"update:visible":function(t){e.isShow=t}}},[e._t("del"),e._v(" "),e._t("sort"),e._v(" "),e._t("upload"),e._v(" "),e._t("transfer"),e._v(" "),e._t("default"),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancelFn}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmFn}},[e._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);s.options.__file="index.vue";t.a=s.exports},DmZD:function(e,t,a){},E9Le:function(e,t,a){"use strict";var n=a("8wxe");a.n(n).a},JHrQ:function(e,t,a){"use strict";var n=a("DmZD");a.n(n).a},L6nz:function(e,t,a){},NGg8:function(e,t,a){},ReEV:function(e,t,a){"use strict";var n=a("XO6m");a.n(n).a},SMMm:function(e,t,a){"use strict";var n=a("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(e){console.log("total",e),0!=e&&(this.isShow=!0)}},methods:{handleSizeChange:function(e){Object(n.c)("currentSize",e);var t=Object(n.b)("currentSize");this.$emit("sizeChange",t)},handleCurrentChange:function(e){Object(n.c)("currentPage",e);var t=Object(n.b)("currentPage");this.$emit("currentChange",t)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},s=(a("JHrQ"),a("KHd+")),o=Object(s.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"pageBox"},[this.isShow?t("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);o.options.__file="index.vue";t.a=o.exports},WwKW:function(e,t,a){"use strict";var n=a("1mMU");a.n(n).a},XO6m:function(e,t,a){},Yfch:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a("XJYT");a("Iab2"),a("EUZL");function i(e){if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(e))return console.log(e),Object(n.Message)({message:"手机号格式错误",type:"error"})}},iaEg:function(e,t,a){"use strict";a.r(t);var n=a("QbLZ"),i=a.n(n),s=a("L2JU"),o=a("vKTW"),r=a("DSeF"),l=a("SMMm"),c=a("Yfch"),d={name:"addAdmin",components:{},props:{source:{type:String},dialogFormVisible:{type:Boolean,default:!1}},computed:{},data:function(){return{form:{},formLabelWidth:"120px",title:""}},methods:{confirmFn:function(){this.$emit("addAdminFn",this.form)},checkMobileFn:function(){Object(c.a)(this.form.phone)},cancelFn:function(){this.$emit("cancelFn")}},watch:{},created:function(){}},u=(a("ReEV"),a("KHd+")),m=Object(u.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"添加管理员",visible:e.dialogFormVisible,"show-close":!1,modal:!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"真实姓名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",required:"required"},model:{value:e.form.realname,callback:function(t){e.$set(e.form,"realname",t)},expression:"form.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",required:"required"},on:{blur:function(t){return t.preventDefault(),e.checkMobileFn(t)}},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",type:"password",required:"required"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancelFn}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmFn}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"107bb8ea",null);m.options.__file="index.vue";var p=m.exports,h={name:"editAdmin",components:{},props:{source:{type:String},adminDetails:{type:Object},dialogFormVisible:{type:Boolean,default:!1}},computed:{},data:function(){return{form:{},formLabelWidth:"120px",title:""}},methods:{confirmFn:function(){var e=this,t={};t.id=this.adminDetails.id,t.phone=this.adminDetails.phone,t.password=this.adminDetails.password,t.realname=this.adminDetails.realname,this.$req.post("updateBackUser",t).then(function(t){e.$success(t.data.message),e.$emit("editSuccessFn")}).catch(function(t){e.$emit("editSuccessFn"),console.log(t)})},checkMobileFn:function(){Object(c.a)(this.adminDetails.phone)},cancelFn:function(){this.$emit("cancelFn")}},watch:{adminDetails:function(e){console.log("v",e)}},created:function(){}},f=(a("pD2J"),Object(u.a)(h,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:"编辑管理员",visible:e.dialogFormVisible,"show-close":!1,modal:!1},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.adminDetails}},[a("el-form-item",{attrs:{label:"真实姓名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",required:"required"},model:{value:e.adminDetails.realname,callback:function(t){e.$set(e.adminDetails,"realname",t)},expression:"adminDetails.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",required:"required"},on:{blur:function(t){return t.preventDefault(),e.checkMobileFn(t)}},model:{value:e.adminDetails.phone,callback:function(t){e.$set(e.adminDetails,"phone",t)},expression:"adminDetails.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",type:"password",required:"required"},model:{value:e.adminDetails.password,callback:function(t){e.$set(e.adminDetails,"password",t)},expression:"adminDetails.password"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancelFn}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmFn}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"63af781a",null));f.options.__file="index.vue";var b=f.exports,v=a("Uwh3"),g={name:"adminList",components:{searchBar:o.a,Dialog:r.a,pageNum:l.a,addAdminDialog:p,editAdminDialog:b},computed:i()({},Object(s.b)(["roleIds","adminIds"])),data:function(){return{searchParame:{},pageNo:1,pageSize:10,listData:[],totalNum:0,visible:!1,isAddAdmin:!1,isEditAdmin:!1,adminDetails:{},ids:[],tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},methods:i()({},Object(s.c)(["set_adminIds"]),{setRolesFn:function(){if(!this.ids.length)return this.$wran("请先勾选管理员");this.$router.push("/permissionsManager/permissionsList")},updateListFn:function(){this.ids=[],this.initData()},addAdminFn:function(e){var t=this;this.$req.post("addBackUser",e).then(function(e){console.log(e.data.code),console.log(e.data.message),t.$success(e.data.message),t.isAddAdmin=!1,t.initData()}).catch(function(e){console.log(e)})},editSuccessFn:function(){this.isEditAdmin=!1,this.initData()},changeFn:function(e,t,a){var n=this,i=JSON.parse(this.userInfo).realname,s={id:a.id,isShow:e,updateBy:i};this.$req.post("updateAppRemind",s).then(function(e){n.$success("修改成功")}).catch(function(e){return console.log(e)})},confirmFn:function(){this.visible=!1;var e=this.ids;this.$store.dispatch("delFn",{url:"deleteBackUser",idArr:e})},delsFn:function(){this.ids.length&&(this.visible=!0)},searchFn:function(e){this.searchParame=e,console.log("父组件接受的参数",this.searchParame),this.initData()},SelectionChange:function(e){this.ids=e.map(function(e){return e.bossUserId}),this.set_adminIds(this.ids),console.log(this.ids)},handleEdit:function(e,t){this.isEditAdmin=!0,this.getAdminDetails(t.id)},getAdminDetails:function(e){var t=this;this.$req.get("backUserDetail",{id:e}).then(function(e){console.log(e.data.data[0]),t.adminDetails=e.data.data[0]}).catch(function(e){console.log(e)})},handleDelete:function(e,t){this.visible=!0;var a=[];a.push(t.id),this.ids=a},handleRelevance:function(e,t){var a=[];a.push(t.bossUserId),this.ids=a,this.set_adminIds(this.ids),this.$router.push({path:"/permissionsManager/permissionsList",query:{userId:t.bossUserId}})},initData:function(){var e=this;this.searchParame=Object(v.b)("param")||{},this.searchParame.pageNum=Object(v.b)("currentPage")||1,this.searchParame.pageSize=Object(v.b)("currentSize")||10,this.$req.get("fuzzySearchBackUser",this.searchParame).then(function(t){console.log(t.data),e.listData=t.data.data.backUsers,e.totalNum=t.data.data.totalNum}).catch(function(e){console.log(e)})},sizeChangeFn:function(e){this.pageSize=e,this.initData()},currentChangeFn:function(e){this.pageNo=e,this.initData()}}),created:function(){this.initData()},beforeRouteLeave:function(e,t,a){Object(v.a)("param"),Object(v.a)("currentPage"),a()}},_=(a("uUW0"),Object(u.a)(g,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("searchBar",{attrs:{from:"adminList",param:e.searchParame},on:{searchFn:e.searchFn,updateListFn:e.updateListFn,delsFn:e.delsFn,addAdmin:function(t){e.isAddAdmin=!0}}}),e._v(" "),a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"end"}},[a("el-button",{attrs:{type:"warning"},on:{click:e.setRolesFn}},[e._v("批量设置角色")])],1),e._v(" "),a("el-table",{staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:e.listData,"empty-text":"暂无数据",border:"","header-cell-style":e.tabHeader},on:{"selection-change":e.SelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"realname",label:"真实姓名","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createtime",label:"创建时间","min-width":"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updatetime",label:"最后更新时间","min-width":"120",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"operation-box"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("查看/编辑")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(a){e.handleRelevance(t.$index,t.row)}}},[e._v("设置角色")])],1)]}}])})],1),e._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{currentPage:e.pageNo,pageSize:e.pageSize,total:e.totalNum},on:{sizeChange:e.sizeChangeFn,currentChange:e.currentChangeFn}})],1),e._v(" "),a("Dialog",{attrs:{isShow:e.visible},on:{cancelFn:function(t){e.visible=!1},confirmFn:e.confirmFn}},[a("span",{attrs:{slot:"del"},slot:"del"},[e._v("删除操作不可恢复，确认删除？")])]),e._v(" "),a("addAdminDialog",{attrs:{dialogFormVisible:e.isAddAdmin},on:{cancelFn:function(t){e.isAddAdmin=!1},addAdminFn:e.addAdminFn}}),e._v(" "),a("editAdminDialog",{attrs:{dialogFormVisible:e.isEditAdmin,adminDetails:e.adminDetails},on:{cancelFn:function(t){e.isEditAdmin=!1},editSuccessFn:e.editSuccessFn}})],1)},[],!1,null,"142b629e",null));_.options.__file="index.vue";t.default=_.exports},pD2J:function(e,t,a){"use strict";var n=a("L6nz");a.n(n).a},uUW0:function(e,t,a){"use strict";var n=a("NGg8");a.n(n).a},vKTW:function(e,t,a){"use strict";var n=a("Uwh3"),i={name:"searchBar",props:{from:{type:String},param:{type:Object,default:function(){return{}}}},components:{},computed:{delText:function(){return"memberList"==this.from?"批量禁用":"批量删除"}},data:function(){return{memberIsActive:[{value:1,label:"活跃用户"},{value:2,label:"非活跃/刷单"}],memberSort:[{value:1,label:"总分享数"},{value:2,label:"分享币"},{value:3,label:"一级邀请好友数量"}]}},watch:{},methods:{resettingFn:function(){Object(n.a)("param"),Object(n.a)("currentPage"),this.$emit("updateListFn")},isActiveFn:function(){""!=this.param.isActive&&this.searchFn()},sortByFn:function(){""!=this.param.sort&&this.searchFn()},nicknameFn:function(){"13"==event.keyCode&&this.param.nickname&&(this.param.nickname=this.param.nickname,this.searchFn())},phoneFn:function(){"13"==event.keyCode&&this.param.phone&&(this.param.phone=this.param.phone,this.searchFn())},keyFn:function(){"13"==event.keyCode&&this.param.key&&(this.param.key=this.param.key,this.searchFn())},addFn:function(){switch(this.from){case"businessList":this.$router.push("/ArticleManager/ArticleAdd");break;case"adminList":this.$emit("addAdmin")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(){for(var e in this.param)""!==this.param[e]&&null!==this.param[e]||delete this.param[e];this.param.pageNum=1,Object(n.c)("param",this.param),this.$emit("searchFn",Object(n.b)("param"))}},created:function(){switch(console.log(this.param.isActive),this.from){case"businessList":this.text="商家昵称",this.placeholder="请输入商家昵称",this.btnText="添加商家";break;case"memberList":this.text="会员昵称",this.placeholder="请输入会员昵称",this.btnText="添加会员";break;case"adminList":this.text="报道标题",this.btnText="添加管理员"}}},s=(a("WwKW"),a("KHd+")),o=Object(s.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",{attrs:{gutter:20}},["memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},on:{change:e.isActiveFn},model:{value:e.param.isActive,callback:function(t){e.$set(e.param,"isActive",t)},expression:"param.isActive"}},e._l(e.memberIsActive,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:e.placeholder,clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.nicknameFn(t):null}},model:{value:e.param.nickname,callback:function(t){e.$set(e.param,"nickname",t)},expression:"param.nickname"}})],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:"请输入手机号",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.phoneFn(t):null}},model:{value:e.param.phone,callback:function(t){e.$set(e.param,"phone",t)},expression:"param.phone"}})],1):e._e(),e._v(" "),"memberList"==e.from?a("el-col",{attrs:{span:4}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择排序方式"},on:{change:e.sortByFn},model:{value:e.param.sort,callback:function(t){e.$set(e.param,"sort",t)},expression:"param.sort"}},e._l(e.memberSort,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1):e._e(),e._v(" "),"adminList"==e.from?a("el-col",{attrs:{span:4}},[a("el-input",{staticClass:"input",attrs:{placeholder:"请输入姓名或手机号",clearable:""},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.keyFn(t):null}},model:{value:e.param.key,callback:function(t){e.$set(e.param,"key",t)},expression:"param.key"}})],1):e._e(),e._v(" "),"businessList"==e.from?a("el-col",{attrs:{span:9}},[a("div",{staticClass:"date-box"},[a("span",[e._v("日期")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.param.startDate,callback:function(t){e.$set(e.param,"startDate",t)},expression:"param.startDate"}}),e._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd hh:mm:ss"},model:{value:e.param.endDate,callback:function(t){e.$set(e.param,"endDate",t)},expression:"param.endDate"}})],1)]):e._e(),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-button",{attrs:{type:"warning"},on:{click:e.resettingFn}},[e._v("重置")]),e._v(" "),"memberList"!==e.from?a("el-button",{attrs:{type:"primary"},on:{click:e.addFn}},[e._v(e._s(e.btnText))]):e._e(),e._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:e.delsFn}},[e._v(e._s(e.delText))])],1)],1)],1)},[],!1,null,"0c589a8e",null);o.options.__file="index.vue";t.a=o.exports}}]);