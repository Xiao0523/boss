(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-08c3"],{"8wxe":function(t,e,a){},"9pNs":function(t,e,a){"use strict";var i={name:"goTop",data:function(){return{scrollTop:"",goTopShow:!1}},methods:{handleScroll:function(){this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,this.scrollTop>500&&(this.goTopShow=!0)},goTop:function(){var t=null,e=this;cancelAnimationFrame(t),t=requestAnimationFrame(function a(){e.scrollTop>0?(e.scrollTop-=500,document.body.scrollTop=document.documentElement.scrollTop=e.scrollTop,t=requestAnimationFrame(a)):(cancelAnimationFrame(t),e.goTopShow=!1)})}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},n=(a("D/QT"),a("KHd+")),s=Object(n.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"goTop"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.goTopShow,expression:"goTopShow"}],staticClass:"goTop",on:{click:this.goTop}},[e("i",{staticClass:"goTopIcon"})])])},[],!1,null,"56abcee9",null);s.options.__file="index.vue";e.a=s.exports},BTIe:function(t,e,a){},CEqo:function(t,e,a){"use strict";a.r(e);var i=a("EJiy"),n=a.n(i),s=a("ZOHz"),r=a("DSeF"),o=a("Uwh3"),l={name:"searchNav",props:{from:{type:String},ids:{type:Array},param:{type:Object,default:function(){return{key:"",startTime:"",endTime:"",startDay:"",endDay:"",tagId:"",isPutaway:"",articleSource:"",isTop:"",videoDuring:"",pageNum:1,pageSize:10}}}},components:{menusDialog:r.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{order:{putawayTime:""},displayStatus:[{isPutaway:1,text:"已上架"},{isPutaway:0,text:"未上架"}],topState:[{isTop:1,text:"置顶"},{isTop:0,text:"未置顶"}],source:[{articleSource:1,text:"后台上传"},{articleSource:2,text:"爬虫"}],sort:[{videoDuring:1,text:"文章"},{videoDuring:2,text:"视频"}],isShowDisplayBtn:!1,DisplayBtnText:"",isShowTopBtn:!1,TopBtnText:"",visible:!1,orderVisible:!1,moreBtnText:"",generateAdvflag:!1,generateTagflag:!1,dialogTitle:"",tagList:[],titles:[],transferData:[],selectTransfer:[],dropdown:[{id:1,text:"批量关联标签"}]}},watch:{},methods:{setCurrentPage1Fn:function(){var t=Object(o.b)("param");"undefined"!==t&&void 0!==t||(t={}),t.pageNum=1,Object(o.c)("param",t),console.log("cz",Object(o.b)("param"))},resettingFn:function(){Object(o.a)("param"),Object(o.a)("currentPage"),this.$emit("updateListFn")},upFn:function(){var t=this,e=null;return console.log("ids",this.ids),this.ids.length?""===this.param.isTop?this.$wran("请先选择置顶状态"):(1==this.param.isTop?e=0:0==this.param.isTop&&(e=1),void this.$req.post("articleTop",{ids:this.ids,state:e}).then(function(e){t.$success(e.data.message),t.$emit("updateListFn")}).catch(function(t){console.log(t)})):this.$wran("请先勾选文章")},putawayFn:function(){var t=this,e=null;return this.ids.length?""===this.param.isPutaway?this.$wran("请先选择上架状态"):(1==this.param.isPutaway?e=0:0==this.param.isPutaway&&(e=1),void this.$req.post("putAway",{ids:this.ids,state:e}).then(function(e){t.$success(e.data.message),t.$emit("updateListFn")}).catch(function(t){console.log(t)})):this.$wran("请先勾选文章")},orderFn:function(){if(!this.ids.length)return this.$wran("请先勾选文章");this.orderVisible=!0},orderConfirmFn:function(){var t=this,e=JSON.parse(this.userInfo).realname;this.order.articleIds=this.ids,this.order.creator=e,this.$req.post("orderPutaway",this.order).then(function(e){t.$success(e.data.message),t.$emit("updateListFn")}).catch(function(t){console.log(t)}),this.orderVisible=!1},inputFn:function(){"13"==event.keyCode&&this.param.key&&(this.param.key=this.param.key,this.searchFn())},tagChangeFn:function(){""!==this.param.tagId&&(-2!=this.param.tagId&&(this.param.tagId=this.param.tagId),this.searchFn())},displayChangeFn:function(){""!==this.param.isPutaway&&(-2!=this.param.isPutaway&&(this.isShowDisplayBtn=!0,this.param.isPutaway=this.param.isPutaway,1==this.param.isPutaway?this.DisplayBtnText="下架":this.DisplayBtnText="上架"),this.searchFn())},topChangeFn:function(){""!==this.param.isTop&&(-2!=this.param.isTop&&(this.isShowTopBtn=!0,this.param.isTop=this.param.isTop,1==this.param.isTop?this.TopBtnText="取消置顶":this.TopBtnText="置顶"),this.searchFn())},sortChangeFn:function(){""!==this.param.videoDuring&&(-2!=this.param.videoDuring&&(this.param.videoDuring=this.param.videoDuring),this.searchFn())},dateChangeBeginTime:function(t){t&&(this.param.startTime=t)},dateChangeEndTime:function(t){t&&(this.param.endTime=t,this.searchFn())},dateChangeBeginDay:function(t){t&&(this.param.startDay=t,this.searchFn())},dateChangeEndDay:function(t){t&&(this.param.endDay=t,this.searchFn())},dateChangeputawayTime:function(t){this.order.putawayTime=t},generateData:function(){if("批量关联标签"==this.moreBtnText)for(var t=this.tagList.length,e=0;e<t;e++){var a=this.tagList[e];this.transferData.push({key:a.id,label:a.cname})}},transferChange:function(t,e,a){console.log(t,e,a),"right"==e&&(this.selectTransfer=a)},moreFn:function(t){if(this.moreBtnText=t,!this.ids.length)return this.$wran("请先勾选文章");this.visible=!0,this.selectTransfer=[],"批量关联标签"!=t&&this.generateTagflag||(this.dialogTitle="请选择要关联的标签",this.titles=["所有标签列表","关联标签列表"],this.transferData=[],this.generateData(),this.generateTagflag=!0)},confirmFn:function(){"批量关联广告"==this.moreBtnText?this.relevanceAdvs():"批量关联标签"==this.moreBtnText&&this.relevanceTags()},addFn:function(){switch(this.from){case"ArticleList":this.$router.push("/ArticleManager/ArticleAdd");break;case"AppList":this.$router.push("/AppManager/AppAdd");break;case"reportList":this.$router.push("/reportsManager/reportsAdd")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(t){switch(this.from){case"ArticleList":"fuzzySearchHuoDong";break;case"AppList":"selectAppByTitle";break;case"reportList":"selectbaodaobytitle"}for(var e in this.param)""!==this.param[e]&&null!==this.param[e]||delete this.param[e];this.param.pageNum=1,Object(o.c)("param",this.param),this.$emit("searchFn",Object(o.b)("param"))},relevanceAdvs:function(){var t=this;0!=this.ids.length&&0!=this.selectTransfer.length&&this.$req.post("ContactArticleAndAdvertisement",{advertisementIds:this.selectTransfer,articleIds:this.ids}).then(function(e){t.$success(e.data.message),t.$emit("updateListFn"),t.visible=!1}).catch(function(t){console.log(t)})},relevanceTags:function(){var t=this;if(!this.selectTransfer.length)return this.$wran("必选添加所关联的标签/广告");var e=JSON.parse(this.userInfo).realname;this.$req.post("ContactArticleAndTag",{tagIds:this.selectTransfer,articleIds:this.ids,creator:e}).then(function(e){t.$success("关联标签成功"),t.$emit("updateListFn"),t.visible=!1}).catch(function(t){console.log(t)})},getTagFn:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records,t.tagList.unshift({id:-1,cname:"无标签"})}).catch(function(t){console.log(t)})}},created:function(){switch(this.from){case"ArticleList":this.text="文章标题",this.placeholder="请输入文章标题",this.btnText="添加文章";break;case"AppList":this.text="应用名",this.placeholder="请输入应用名",this.btnText="添加应用";break;case"reportList":this.text="报道标题",this.placeholder="请输入报道标题",this.btnText="添加报道"}this.getTagFn()}},c=(a("rVF0"),a("KHd+")),u=Object(c.a)(l,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-input",{staticClass:"input",attrs:{placeholder:t.placeholder,clearable:""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.inputFn(e):null}},model:{value:t.param.key,callback:function(e){t.$set(t.param,"key",e)},expression:"param.key"}}),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择标签"},on:{change:t.tagChangeFn},model:{value:t.param.tagId,callback:function(e){t.$set(t.param,"tagId",e)},expression:"param.tagId"}},t._l(t.tagList,function(t){return a("el-option",{key:t.id,attrs:{label:t.cname,value:t.id}})})),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择显示状态"},on:{change:t.displayChangeFn},model:{value:t.param.isPutaway,callback:function(e){t.$set(t.param,"isPutaway",e)},expression:"param.isPutaway"}},t._l(t.displayStatus,function(t){return a("el-option",{key:t.isPutaway,attrs:{label:t.text,value:t.isPutaway}})})),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择置顶状态"},on:{change:t.topChangeFn},model:{value:t.param.isTop,callback:function(e){t.$set(t.param,"isTop",e)},expression:"param.isTop"}},t._l(t.topState,function(t){return a("el-option",{key:t.isTop,attrs:{label:t.text,value:t.isTop}})})),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.dateChangeBeginTime},model:{value:t.param.startTime,callback:function(e){t.$set(t.param,"startTime",e)},expression:"param.startTime"}}),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.dateChangeEndTime},model:{value:t.param.endTime,callback:function(e){t.$set(t.param,"endTime",e)},expression:"param.endTime"}}),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"分类"},on:{change:t.sortChangeFn},model:{value:t.param.videoDuring,callback:function(e){t.$set(t.param,"videoDuring",e)},expression:"param.videoDuring"}},t._l(t.sort,function(t){return a("el-option",{key:t.videoDuring,attrs:{label:t.text,value:t.videoDuring}})}))],1),t._v(" "),a("el-row",{staticStyle:{"margin-top":"30px"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"更新开始日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.dateChangeBeginDay},model:{value:t.param.startDay,callback:function(e){t.$set(t.param,"startDay",e)},expression:"param.startDay"}}),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"更新结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.dateChangeEndDay},model:{value:t.param.endDay,callback:function(e){t.$set(t.param,"endDay",e)},expression:"param.endDay"}}),t._v(" "),a("el-button",{attrs:{type:"warning"},on:{click:t.resettingFn}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v(t._s(t.btnText))]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.delsFn}},[t._v("批量删除")]),t._v(" "),t.isShowTopBtn?a("el-button",{on:{click:t.upFn}},[t._v(t._s(t.TopBtnText))]):t._e(),t._v(" "),t.isShowDisplayBtn?a("el-button",{on:{click:t.putawayFn}},[t._v(t._s(t.DisplayBtnText))]):t._e(),t._v(" "),a("el-button",{on:{click:t.orderFn}},[t._v("预约")]),t._v(" "),a("el-dropdown",[a("el-button",{attrs:{type:"primary"}},[t._v("\n        更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dropdown,function(e){return a("el-dropdown-item",{key:e.id,nativeOn:{click:function(a){t.moreFn(e.text)}}},[t._v(t._s(e.text))])}))],1)],1),t._v(" "),a("menusDialog",{attrs:{isShow:t.visible,title:t.dialogTitle},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("el-transfer",{attrs:{data:t.transferData,titles:t.titles,"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"}},on:{change:t.transferChange},model:{value:t.selectTransfer,callback:function(e){t.selectTransfer=e},expression:"selectTransfer"}})],1),t._v(" "),a("menusDialog",{attrs:{isShow:t.orderVisible,title:"预约"},on:{cancelFn:function(e){t.orderVisible=!1},confirmFn:t.orderConfirmFn}},[a("section",[t._v("\n  日期：   "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"请选择预约日期时间","value-format":"yyyy-MM-dd HH:mm:ss"},on:{change:t.dateChangeputawayTime},model:{value:t.order.putawayTime,callback:function(e){t.$set(t.order,"putawayTime",e)},expression:"order.putawayTime"}}),t._v(" "),a("div",{staticStyle:{"margin-top":"20px"}},[a("el-radio-group",{model:{value:t.order.isPutaway,callback:function(e){t.$set(t.order,"isPutaway",e)},expression:"order.isPutaway"}},[a("el-radio",{attrs:{label:1}},[t._v("上架")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("下架")])],1)],1)],1)])],1)},[],!1,null,"0897e2c6",null);u.options.__file="index.vue";var h=u.exports,d=a("9pNs"),p=a("SMMm"),m=(a("L2JU"),{name:"ArticleList",components:{searchNav:s.a,ArticleNav:h,Dialog:r.a,pageNum:p.a,goTop:d.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},filters:{layoutStatus:function(t){return 0==t?"上下图文":1==t?"左右图文":2==t?"无图":3==t?"3图":void 0}},data:function(){return{visible:!1,ids:[],getRowKeys:function(t){return t.id},tableList:[],tableIdArr:[],searchParame:{},totalNum:null,pageNo:1,pageSize:10,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},methods:{reSetFn:function(){console.log("重置事件"),this.$refs.multipleTable.clearSelection()},updateListFn:function(){this.$refs.multipleTable.clearSelection(),this.initData()},sizeChangeFn:function(t){this.searchParame.pageSize=t;var e=Object(o.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(o.c)("param",e),console.log("每页条数改变时触发："+this.searchParame.pageSize),this.initData()},currentChangeFn:function(t){console.log(this.searchParame),this.searchParame.pageNum=t;var e=Object(o.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(o.c)("param",e),console.log("页码改变触发"+this.searchParame.pageNo),this.initData()},changeFn:function(t,e,a){var i=this,n=JSON.parse(this.userInfo).realname;this.$req.post("updateremind",{id:a.id,shifoutixing:t,updateBy:n}).then(function(t){i.$success(t.data.message),i.initData()}).catch(function(t){console.log(t)})},SelectionChange:function(t){console.log(t),this.ids=t.map(function(t){return t.hdId}),console.log(this.ids)},handleEdit:function(t,e){this.$router.push({path:"/ArticleManager/ArticleDetails",query:{id:e.hdId,fenlei:e.fenlei}})},handleDelete:function(t,e){this.visible=!0;var a=[];a.push(e.hdId),this.ids=a},confirmFn:function(){this.visible=!1;var t=this.ids;console.log(void 0===t?"undefined":n()(t)),this.$store.dispatch("delFn",{url:"deleteHuoDong",idArr:t}),this.initData()},searchFn:function(t){this.searchParame=t,console.log("nav派发父组件接受的参数",this.searchParame),this.initData()},delsFn:function(){this.ids.length&&(console.log(this.ids),this.visible=!0)},showDialogFn:function(t,e,a){this.ids=e.id,"del"==a&&(this.visible=!0)},initData:function(){var t=this;this.searchParame=Object(o.b)("param"),console.log("列表页搜索参数",this.searchParame),"undefined"!==this.searchParame&&void 0!==this.searchParame||(this.searchParame={pageNum:1,pageSize:10}),this.$req.post("fuzzySearchHuoDong",this.searchParame).then(function(e){t.totalNum=e.data.data.totalNum,t.tableList=e.data.data.tbHuodongs,t.tableIdArr=t.tableList.map(function(t){return t.hdId})}).catch(function(t){})}},created:function(){this.initData()},beforeRouteLeave:function(t,e,a){"ArticleDetails"!=t.name&&(Object(o.a)("param"),Object(o.a)("currentPage")),a()}}),f=(a("rpT+"),Object(c.a)(m,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ArticleNav",{attrs:{from:"ArticleList",param:t.searchParame,ids:t.ids},on:{searchFn:t.searchFn,delsFn:t.delsFn,updateListFn:t.updateListFn}}),t._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:t.tableList,"empty-text":"暂无数据","row-key":t.getRowKeys,border:"","header-cell-style":t.tabHeader},on:{"selection-change":t.SelectionChange}},[a("el-table-column",{attrs:{type:"selection","reserve-selection":!0,fixed:""}}),t._v(" "),a("el-table-column",{attrs:{label:"标签"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.tag))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"广告"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.advTitles))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"文章标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"文章id"}}),t._v(" "),a("el-table-column",{attrs:{prop:"articleUrl",label:"文章链接"}}),t._v(" "),a("el-table-column",{attrs:{prop:"layout",label:"布局方式"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("layoutStatus")(e.row.layout)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"topTime",label:"置顶时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"state",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createtime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updatetime",label:"更新时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"money",label:"提成金额"}}),t._v(" "),a("el-table-column",{attrs:{label:"列表显示",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-switch",{attrs:{"active-value":"1","inactive-value":"0","active-text":"显示","inactive-text":"禁止"},on:{change:function(a){t.changeFn(a,e.$index,e.row)}},model:{value:e.row.shifoutixing,callback:function(a){t.$set(e.row,"shifoutixing",a)},expression:"scope.row.shifoutixing"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operation-box"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("查看/编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{currentPage:t.searchParame.pageNum,pageSize:t.searchParame.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentChangeFn}})],1),t._v(" "),a("goTop"),t._v(" "),a("Dialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("span",{attrs:{slot:"del"},slot:"del"},[t._v("删除操作不可恢复，确认删除？")])])],1)},[],!1,null,"45b5caeb",null));f.options.__file="index.vue";e.default=f.exports},"D/QT":function(t,e,a){"use strict";var i=a("VgDW");a.n(i).a},DSeF:function(t,e,a){"use strict";var i={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},n=(a("E9Le"),a("KHd+")),s=Object(n.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);s.options.__file="index.vue";e.a=s.exports},DmZD:function(t,e,a){},E9Le:function(t,e,a){"use strict";var i=a("8wxe");a.n(i).a},JHrQ:function(t,e,a){"use strict";var i=a("DmZD");a.n(i).a},LTYj:function(t,e,a){},SMMm:function(t,e,a){"use strict";var i=a("Uwh3"),n={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(i.c)("currentSize",t);var e=Object(i.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(i.c)("currentPage",t);var e=Object(i.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},s=(a("JHrQ"),a("KHd+")),r=Object(s.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);r.options.__file="index.vue";e.a=r.exports},Slgs:function(t,e,a){},VgDW:function(t,e,a){},ZOHz:function(t,e,a){"use strict";var i=a("DSeF"),n={name:"searchNav",props:{from:{type:String},ids:{type:Array}},components:{menusDialog:i.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{inputText:"",tagId:"",startDate:"",endDate:"",visible:!1,moreBtnText:"",generateAdvflag:!1,generateTagflag:!1,dialogTitle:"",advList:[],tagList:[],titles:[],transferData:[],selectTransfer:[],dropdown:[{id:0,text:"批量关联广告"},{id:1,text:"批量关联标签"}]}},watch:{},methods:{selectedtTagFn:function(t){this.tagId=t},generateData:function(){if("批量关联广告"==this.moreBtnText)for(var t=this.advList.length,e=0;e<t;e++){var a=this.advList[e];console.log(a.id),this.transferData.push({key:a.id,label:a.title})}else if("批量关联标签"==this.moreBtnText)for(var i=this.tagList.length,n=0;n<i;n++){var s=this.tagList[n];this.transferData.push({key:s.id,label:s.cName})}},transferChange:function(t,e,a){console.log(t,e,a),"right"==e&&(this.selectTransfer=a)},moreFn:function(t){console.log("文章ids",this.ids),this.moreBtnText=t,this.visible=!0,this.selectTransfer=[],"批量关联广告"!=t&&this.generateAdvflag?"批量关联标签"!=t&&this.generateTagflag||(this.dialogTitle="请选择要关联的标签",this.titles=["所有标签列表","关联标签列表"],this.transferData=[],this.generateData(),this.generateTagflag=!0):(this.dialogTitle="请选择要关联的广告",this.titles=["所有广告列表","关联广告列表"],this.transferData=[],this.generateData(),this.generateAdvflag=!0)},confirmFn:function(){"批量关联广告"==this.moreBtnText?this.relevanceAdvs():"批量关联标签"==this.moreBtnText&&this.relevanceTags()},addFn:function(){switch(this.from){case"ArticleList":this.$router.push("/ArticleManager/ArticleAdd");break;case"AppList":this.$router.push("/AppManager/AppAdd");break;case"reportList":this.$router.push("/reportsManager/reportsAdd")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(){var t=this,e={},a="";switch(this.from){case"ArticleList":a="fuzzySearchHuoDong";break;case"AppList":a="selectAppByTitle";break;case"reportList":a="selectbaodaobytitle"}this.inputText&&(e.key=this.inputText),this.tagId&&(e.tagId=this.tagId),this.startDate&&(e.startDay=this.startDate),this.endDate&&(e.endDay=this.endDate),e.pageNum=1,e.pageSize=10,this.$req.post(a,e).then(function(a){t.$emit("searchFn",a,e)}).catch(function(t){console.log(t)})},relevanceAdvs:function(){var t=this;0!=this.ids.length&&0!=this.selectTransfer.length&&this.$req.post("ContactArticleAndAdvertisement",{advertisementIds:this.selectTransfer,articleIds:this.ids}).then(function(e){t.$success("关联广告成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})},relevanceTags:function(){var t=this;if(0!=this.ids.length&&0!=this.selectTransfer.length){var e=JSON.parse(this.userInfo).realname;this.$req.post("ContactArticleAndTag",{tagIds:this.selectTransfer,articleIds:this.ids,creator:e}).then(function(e){t.$success("关联标签成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})}},getAdvFn:function(){var t=this;this.$req.get("v2/shareAdv/1/999").then(function(e){t.advList=e.data.data.records}).catch(function(t){console.log(t)})},getTagFn:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records}).catch(function(t){console.log(t)})}},created:function(){switch(this.from){case"ArticleList":this.text="文章标题",this.placeholder="请输入文章标题",this.btnText="添加文章";break;case"AppList":this.text="应用名",this.placeholder="请输入应用名",this.btnText="添加应用";break;case"reportList":this.text="报道标题",this.placeholder="请输入报道标题",this.btnText="添加报道"}this.getAdvFn(),this.getTagFn()}},s=(a("aCdZ"),a("KHd+")),r=Object(s.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("div",{staticClass:"input-box"},[a("span",[t._v(t._s(t.text))]),t._v(" "),a("el-input",{staticClass:"input",attrs:{placeholder:t.placeholder,clearable:""},model:{value:t.inputText,callback:function(e){t.inputText=e},expression:"inputText"}})],1)]),t._v(" "),"ArticleList"==t.from?a("el-col",{attrs:{span:5}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择标签"},model:{value:t.tagId,callback:function(e){t.tagId=e},expression:"tagId"}},t._l(t.tagList,function(t){return a("el-option",{key:t.id,attrs:{label:t.cName,value:t.id}})}))],1):t._e(),t._v(" "),"ArticleList"!==t.from?a("el-col",{attrs:{span:9}},[a("div",{staticClass:"date-box"},[a("span",[t._v("日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)]):t._e(),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",[a("el-button",{attrs:{type:"success"},on:{click:t.searchFn}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v(t._s(t.btnText))]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.delsFn}},[t._v("批量删除")])],1)])],1),t._v(" "),a("el-dropdown",[a("el-button",{attrs:{type:"primary"}},[t._v("\r\n      更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dropdown,function(e){return a("el-dropdown-item",{key:e.id,nativeOn:{click:function(a){t.moreFn(e.text)}}},[t._v(t._s(e.text))])}))],1),t._v(" "),a("menusDialog",{attrs:{isShow:t.visible,title:t.dialogTitle},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("el-transfer",{attrs:{data:t.transferData,titles:t.titles,"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"}},on:{change:t.transferChange},model:{value:t.selectTransfer,callback:function(e){t.selectTransfer=e},expression:"selectTransfer"}})],1)],1)},[],!1,null,"1db06799",null);r.options.__file="index.vue";e.a=r.exports},aCdZ:function(t,e,a){"use strict";var i=a("LTYj");a.n(i).a},rVF0:function(t,e,a){"use strict";var i=a("Slgs");a.n(i).a},"rpT+":function(t,e,a){"use strict";var i=a("BTIe");a.n(i).a}}]);