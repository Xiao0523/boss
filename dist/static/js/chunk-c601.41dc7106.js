(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c601"],{"8wxe":function(t,e,a){},"9pNs":function(t,e,a){"use strict";var n={name:"goTop",data:function(){return{scrollTop:"",goTopShow:!1}},methods:{handleScroll:function(){this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,this.scrollTop>500&&(this.goTopShow=!0)},goTop:function(){var t=null,e=this;cancelAnimationFrame(t),t=requestAnimationFrame(function a(){e.scrollTop>0?(e.scrollTop-=500,document.body.scrollTop=document.documentElement.scrollTop=e.scrollTop,t=requestAnimationFrame(a)):(cancelAnimationFrame(t),e.goTopShow=!1)})}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},i=(a("D/QT"),a("KHd+")),s=Object(i.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"goTop"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.goTopShow,expression:"goTopShow"}],staticClass:"goTop",on:{click:this.goTop}},[e("i",{staticClass:"goTopIcon"})])])},[],!1,null,"56abcee9",null);s.options.__file="index.vue";e.a=s.exports},CSRi:function(t,e,a){"use strict";var n=a("hGr8");a.n(n).a},CUdZ:function(t,e,a){},"D/QT":function(t,e,a){"use strict";var n=a("VgDW");a.n(n).a},DSeF:function(t,e,a){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(a("E9Le"),a("KHd+")),s=Object(i.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);s.options.__file="index.vue";e.a=s.exports},DmZD:function(t,e,a){},E9Le:function(t,e,a){"use strict";var n=a("8wxe");a.n(n).a},JHrQ:function(t,e,a){"use strict";var n=a("DmZD");a.n(n).a},SClN:function(t,e,a){"use strict";var n=a("CUdZ");a.n(n).a},SMMm:function(t,e,a){"use strict";var n=a("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(n.c)("currentSize",t);var e=Object(n.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(n.c)("currentPage",t);var e=Object(n.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},s=(a("JHrQ"),a("KHd+")),r=Object(s.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);r.options.__file="index.vue";e.a=r.exports},VgDW:function(t,e,a){},ay9y:function(t,e,a){"use strict";a.r(e);var n=a("DSeF"),i=a("Uwh3"),s={name:"searchNav",props:{from:{type:String},ids:{type:Array},param:{type:Object,default:function(){return{title:"",layoutType:"",startDay:"",endDay:"",isShow:"",pageNum:1,pageSize:10}}}},components:{menusDialog:n.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{transferData:[],selectTransfer:[],displayStatus:[{isShow:1,text:"已上架"},{isShow:0,text:"未上架"}],layoutWay:[{layoutType:0,text:"详情下部"},{layoutType:2,text:"浮于详情上部"}],sortStatus:[{sort:1,text:"更新时间"},{sort:2,text:"创建时间"}],DisplayBtnText:"",isShowDisplayBtn:"",visible:!1,tagList:[]}},watch:{},methods:{goTagPageFn:function(){if(!this.ids.length)return this.$wran("请先选择广告");this.$router.push("/categoryManager/categoryList")},resettingFn:function(){Object(i.a)("param"),Object(i.a)("currentPage"),this.$emit("updateListFn")},displayChangeFn:function(){""!==this.param.isShow&&(-2!=this.param.isShow&&(this.isShowDisplayBtn=!0,this.param.isShow=this.param.isShow,1==this.param.isShow?this.DisplayBtnText="下架":this.DisplayBtnText="上架"),this.searchFn())},sortChangeFn:function(){""!==this.param.sort&&this.searchFn()},putawayFn:function(){var t=this,e=null;return this.ids.length?""===this.param.isShow?this.$wran("请先选择上架状态"):(1==this.param.isShow?e=0:0==this.param.isShow&&(e=1),void this.$req.post("v2/shareAdv/PutAwayAdv",{ids:this.ids,state:e}).then(function(e){t.$success(e.data.message),t.$emit("updateListFn")}).catch(function(t){console.log(t)})):this.$wran("请先勾选文章")},RelationTagFn:function(){if(!this.ids.length)return this.$wran("请先选择广告");this.visible=!0,this.transferData=[],this.generateData()},confirmFn:function(){this.relevanceTags()},generateData:function(){for(var t=this.tagList.length,e=0;e<t;e++){var a=this.tagList[e];this.transferData.push({key:a.id,label:a.cname})}},transferChange:function(t,e,a){console.log(t,e,a),"right"==e&&(this.selectTransfer=a)},getTagFn:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records}).catch(function(t){console.log(t)})},relevanceTags:function(){var t=this;if(0==this.selectTransfer.length)return this.$wran("关联标签不能为空");var e=JSON.parse(this.userInfo).realname;this.$req.post("v2/shareAdv/ContactAdvTag",{tagIds:this.selectTransfer,advIds:this.ids,creator:e}).then(function(e){t.$success(e.data.message),t.visible=!1,t.$emit("updateListFn")}).catch(function(e){console.log(e),t.visible=!1})},inputFn:function(){"13"==event.keyCode&&this.param.title&&this.searchFn()},layoutTypeChangeFn:function(){""!==this.param.layoutType&&(-2!=this.param.layoutType&&(this.param.layoutType=this.param.layoutType,console.log(this.param.layoutType)),this.searchFn())},dateChangeBeginTime:function(t){t&&(this.param.startDay=t)},dateChangeEndTime:function(t){t&&(this.param.endDay=t,this.searchFn())},selectedtTagFn:function(t){this.tagId=t},addFn:function(){switch(this.from){case"advList":this.$router.push("/advManager/advAdd")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(t){switch(this.from){case"advList":"v2/shareAdv/fuzzySearchAdvertise"}for(var e in this.param)""!==this.param[e]&&null!==this.param[e]||delete this.param[e];this.param.pageNum=1,Object(i.c)("param",this.param),this.$emit("searchFn",Object(i.b)("param"))}},created:function(){this.getTagFn()}},r=(a("SClN"),a("KHd+")),o=Object(r.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-input",{staticClass:"input",attrs:{placeholder:"请输入标题",clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.inputFn(e):null}},model:{value:t.param.title,callback:function(e){t.$set(t.param,"title",e)},expression:"param.title"}}),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择排序方式"},on:{change:t.sortChangeFn},model:{value:t.param.sort,callback:function(e){t.$set(t.param,"sort",e)},expression:"param.sort"}},t._l(t.sortStatus,function(t){return a("el-option",{key:t.sort,attrs:{label:t.text,value:t.sort}})})),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择显示状态"},on:{change:t.displayChangeFn},model:{value:t.param.isShow,callback:function(e){t.$set(t.param,"isShow",e)},expression:"param.isShow"}},t._l(t.displayStatus,function(t){return a("el-option",{key:t.isShow,attrs:{label:t.text,value:t.isShow}})})),t._v(" "),t.DisplayBtnText?a("el-button",{on:{click:t.putawayFn}},[t._v(t._s(t.DisplayBtnText))]):t._e(),t._v(" "),a("el-button",{attrs:{type:"warning"},on:{click:t.resettingFn}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v("添加广告")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.RelationTagFn}},[t._v("批量关联标签")])],1),t._v(" "),a("menusDialog",{attrs:{isShow:t.visible,title:"关联标签"},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("el-transfer",{attrs:{data:t.transferData,titles:["所有标签列表","关联标签列表"],"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"}},on:{change:t.transferChange},model:{value:t.selectTransfer,callback:function(e){t.selectTransfer=e},expression:"selectTransfer"}})],1)],1)},[],!1,null,"4b7d80fe",null);o.options.__file="index.vue";var l=o.exports,c=a("SMMm"),u=a("9pNs"),h={name:"AppList",components:{advNav:l,Dialog:n.a,pageNum:c.a,goTop:u.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{searchParame:{},listData:[],tableIdArr:[],getRowKeys:function(t){return t.id},ids:[],startDate:"",endDate:"",totalNum:null,pageNo:1,pageSize:10,visible:!1,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},filters:{typeStatus:function(t){return 0==t?"图片":1==t?"视频":"未知"},layoutTypeStatus:function(t){switch(t){case 0:return"位于详情下部";case 1:return"位于详情上部";case 2:return"浮于详情上部"}}},methods:{backAddArtFn:function(){this.$router.back()},updateListFn:function(){this.ids=[],this.$refs.multipleTable.clearSelection(),this.initData()},searchFn:function(t){this.searchParame=t,console.log("父组件接受的参数",this.searchParame),this.initData()},sizeChangeFn:function(t){this.searchParame.pageSize=t;var e=Object(i.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(i.c)("param",e),console.log("每页条数改变时触发："+this.searchParame.pageSize),this.initData()},currentChangeFn:function(t){console.log(this.searchParame),this.searchParame.pageNum=t;var e=Object(i.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(i.c)("param",e),console.log("页码改变触发"+this.searchParame.pageNo),this.initData()},confirmFn:function(){this.visible=!1;var t=this.ids;this.$store.dispatch("v2DelFn",{url:"v2/shareAdv/del",idArr:t})},SelectionChange:function(t){this.ids=t.map(function(t){return t.id}),console.log("选中的id",this.ids)},changeFn:function(t,e,a){var n=this,i=(JSON.parse(this.userInfo).realname,[]);i.push(a.id);var s={ids:i,state:t};this.$req.post("v2/shareAdv/PutAwayAdv",s).then(function(t){n.$success(t.data.message)}).catch(function(t){return console.log(t)})},handleEdit:function(t,e){this.$router.push({path:"/advManager/advDetails",query:{id:e.id}})},handleDelete:function(t,e){this.visible=!0;var a=[];a.push(e.id),this.ids=a},initData:function(){var t=this;this.searchParame=Object(i.b)("param"),"undefined"!==this.searchParame&&void 0!==this.searchParame||(this.searchParame={pageNum:1,pageSize:10}),this.$req.post("v2/shareAdv/fuzzySearchAdvertise",this.searchParame).then(function(e){t.totalNum=e.data.data.total,t.listData=e.data.data.records,t.tableIdArr=t.listData.map(function(t){return t.id})}).catch(function(t){console.log(t)})}},created:function(){this.initData()},beforeRouteLeave:function(t,e,a){"advDetails"!=t.name&&(Object(i.a)("param"),Object(i.a)("currentPage")),a()}},p=(a("CSRi"),Object(r.a)(h,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("advNav",{attrs:{from:"advList",param:t.searchParame,ids:t.ids},on:{searchFn:t.searchFn,updateListFn:t.updateListFn}}),t._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:t.listData,"empty-text":"暂无数据","max-height":"700","row-key":t.getRowKeys,border:"","header-cell-style":t.tabHeader},on:{"selection-change":t.SelectionChange}},[a("el-table-column",{attrs:{type:"selection","reserve-selection":!0,width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"coin",label:"分享币"}}),t._v(" "),a("el-table-column",{attrs:{label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("typeStatus")(e.row.type)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"creator",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间","min-width":"120",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("formatDate")(e.row.createTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tags",label:"关联标签","min-width":"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"link",label:"图片/视频链接地址","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"targetLink",label:"图片跳转链接地址","min-width":"160"}}),t._v(" "),a("el-table-column",{attrs:{label:"广告布局方式","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("layoutTypeStatus")(e.row.layoutType)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"更新时间","min-width":"120",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("formatDate")(e.row.updateTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"列表显示",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"显示","inactive-text":"禁止"},on:{change:function(a){t.changeFn(a,e.$index,e.row)}},model:{value:e.row.isShow,callback:function(a){t.$set(e.row,"isShow",a)},expression:"scope.row.isShow"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operation-box"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("查看/编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{currentPage:t.searchParame.pageNum,pageSize:t.searchParame.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentChangeFn}})],1),t._v(" "),a("goTop"),t._v(" "),a("Dialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("span",{attrs:{slot:"del"},slot:"del"},[t._v("删除操作不可恢复，确认删除？")])])],1)},[],!1,null,"13846801",null));p.options.__file="index.vue";e.default=p.exports},hGr8:function(t,e,a){}}]);