(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d39b"],{"6Tfi":function(t,e,a){"use strict";a.r(e);var n=a("QbLZ"),s=a.n(n),i=a("Uwh3"),r=a("L2JU"),o=a("ZOHz"),c=a("DSeF"),l=a("SMMm"),u={name:"AppList",components:{searchNav:o.a,Dialog:c.a,pageNum:l.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{listData:[],tableIdArr:[],ids:[],getRowKeys:function(t){return t.id},startDate:"",endDate:"",totalNum:null,searchParame:{},pageNo:1,pageSize:10,visible:!1,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},filters:{typeStatus:function(t){return 0==t?"文章":1==t?"APP":"未知"},statusFilter:function(t){return 0==t?"未启用":1==t?"启用":"未知"}},methods:s()({},Object(r.c)(["set_tagIds"]),{addFn:function(){this.$router.push("/categoryManager/categoryAdd")},reSetFn:function(){this.$refs.multipleTable.clearSelection()},sizeChangeFn:function(t){this.searchParame.pageSize=t;var e=Object(i.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(i.c)("param",e),console.log("每页条数改变时触发："+this.searchParame.pageSize),this.initData()},currentChangeFn:function(t){console.log(this.searchParame),this.searchParame.pageNum=t;var e=Object(i.b)("param");"undefined"!==e&&void 0!==e||(e={}),e.pageSize=this.searchParame.pageSize,e.pageNum=this.searchParame.pageNum,Object(i.c)("param",e),console.log("页码改变触发"+this.searchParame.pageNo),this.initData()},searchFn:function(t){this.appList=t.data.data},confirmFn:function(){this.visible=!1;var t=this.ids;this.$store.dispatch("v2DelFn",{url:"v2/shareCategory/del",idArr:t})},SelectionChange:function(t){this.ids=t.map(function(t){return t.id})},changeFn:function(t,e,a){var n=this,s=JSON.parse(this.userInfo).realname,i={id:a.id,isShow:t,updateBy:s};this.$req.post("updateAppRemind",i).then(function(t){n.$success("修改成功")}).catch(function(t){return console.log(t)})},handleEdit:function(t,e){this.$router.push({path:"/categoryManager/categoryDetails",query:{id:e.id}})},handleDelete:function(t,e){this.visible=!0;var a=[];a.push(e.id),this.ids=a},initData:function(){var t=this;this.searchParame=Object(i.b)("param"),console.log("列表页搜索参数",this.searchParame),"undefined"!==this.searchParame&&void 0!==this.searchParame||(this.searchParame={pageNum:1,pageSize:10}),this.$req.get("v2/shareCategory/"+this.searchParame.pageNum+"/"+this.searchParame.pageSize).then(function(e){t.totalNum=e.data.data.total,t.listData=e.data.data.records,t.tableIdArr=t.listData.map(function(t){return t.id})}).catch(function(t){console.log(t)})}}),beforeRouteLeave:function(t,e,a){"categoryEdit"!=t.name&&(Object(i.a)("param"),Object(i.a)("currentPage")),a()},created:function(){},mounted:function(){this.initData()}},h=(a("tytO"),a("KHd+")),d=Object(h.a)(u,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v("添加标签")]),t._v(" "),a("el-button",{attrs:{type:"warning"},on:{click:t.reSetFn}},[t._v("重置")])],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:t.listData,"empty-text":"暂无数据","max-height":"700","row-key":t.getRowKeys,border:"","header-cell-style":t.tabHeader},on:{"selection-change":t.SelectionChange}},[a("el-table-column",{attrs:{type:"selection","reserve-selection":!0,width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cname",label:"标签"}}),t._v(" "),a("el-table-column",{attrs:{label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("typeStatus")(e.row.ctype)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"creator",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("formatDate")(e.row.createTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"index",label:"索引"}}),t._v(" "),a("el-table-column",{attrs:{label:"更新时间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("formatDate")(e.row.updateTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",[t._v(t._s(t._f("statusFilter")(e.row.status)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"operation-box"},[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("查看/编辑")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pageNumBox"},[a("pageNum",{attrs:{currentPage:t.searchParame.pageNum,pageSize:t.searchParame.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentChangeFn}})],1),t._v(" "),a("Dialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("span",{attrs:{slot:"del"},slot:"del"},[t._v("删除操作不可恢复，确认删除？")])])],1)},[],!1,null,"f55e7a0c",null);d.options.__file="index.vue";e.default=d.exports},"7jfb":function(t,e,a){},"8wxe":function(t,e,a){},DSeF:function(t,e,a){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},s=(a("E9Le"),a("KHd+")),i=Object(s.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);i.options.__file="index.vue";e.a=i.exports},E9Le:function(t,e,a){"use strict";var n=a("8wxe");a.n(n).a},LTYj:function(t,e,a){},SMMm:function(t,e,a){"use strict";var n=a("Uwh3"),s={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(n.c)("currentSize",t);var e=Object(n.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(n.c)("currentPage",t);var e=Object(n.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},i=(a("jTOu"),a("KHd+")),r=Object(i.a)(s,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[5,10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"63f271cb",null);r.options.__file="index.vue";e.a=r.exports},WvVn:function(t,e,a){},ZOHz:function(t,e,a){"use strict";var n=a("DSeF"),s={name:"searchNav",props:{from:{type:String},ids:{type:Array}},components:{menusDialog:n.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{inputText:"",tagId:"",startDate:"",endDate:"",visible:!1,moreBtnText:"",generateAdvflag:!1,generateTagflag:!1,dialogTitle:"",advList:[],tagList:[],titles:[],transferData:[],selectTransfer:[],dropdown:[{id:0,text:"批量关联广告"},{id:1,text:"批量关联标签"}]}},watch:{},methods:{selectedtTagFn:function(t){this.tagId=t},generateData:function(){if("批量关联广告"==this.moreBtnText)for(var t=this.advList.length,e=0;e<t;e++){var a=this.advList[e];console.log(a.id),this.transferData.push({key:a.id,label:a.title})}else if("批量关联标签"==this.moreBtnText)for(var n=this.tagList.length,s=0;s<n;s++){var i=this.tagList[s];this.transferData.push({key:i.id,label:i.cName})}},transferChange:function(t,e,a){console.log(t,e,a),"right"==e&&(this.selectTransfer=a)},moreFn:function(t){console.log("文章ids",this.ids),this.moreBtnText=t,this.visible=!0,this.selectTransfer=[],"批量关联广告"!=t&&this.generateAdvflag?"批量关联标签"!=t&&this.generateTagflag||(this.dialogTitle="请选择要关联的标签",this.titles=["所有标签列表","关联标签列表"],this.transferData=[],this.generateData(),this.generateTagflag=!0):(this.dialogTitle="请选择要关联的广告",this.titles=["所有广告列表","关联广告列表"],this.transferData=[],this.generateData(),this.generateAdvflag=!0)},confirmFn:function(){"批量关联广告"==this.moreBtnText?this.relevanceAdvs():"批量关联标签"==this.moreBtnText&&this.relevanceTags()},addFn:function(){switch(this.from){case"ArticleList":this.$router.push("/ArticleManager/ArticleAdd");break;case"AppList":this.$router.push("/AppManager/AppAdd");break;case"reportList":this.$router.push("/reportsManager/reportsAdd")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(){var t=this,e={},a="";switch(this.from){case"ArticleList":a="fuzzySearchHuoDong";break;case"AppList":a="selectAppByTitle";break;case"reportList":a="selectbaodaobytitle"}this.inputText&&(e.key=this.inputText),this.tagId&&(e.tagId=this.tagId),this.startDate&&(e.startDay=this.startDate),this.endDate&&(e.endDay=this.endDate),e.pageNum=1,e.pageSize=10,this.$req.post(a,e).then(function(a){t.$emit("searchFn",a,e)}).catch(function(t){console.log(t)})},relevanceAdvs:function(){var t=this;0!=this.ids.length&&0!=this.selectTransfer.length&&this.$req.post("ContactArticleAndAdvertisement",{advertisementIds:this.selectTransfer,articleIds:this.ids}).then(function(e){t.$success("关联广告成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})},relevanceTags:function(){var t=this;if(0!=this.ids.length&&0!=this.selectTransfer.length){var e=JSON.parse(this.userInfo).realname;this.$req.post("ContactArticleAndTag",{tagIds:this.selectTransfer,articleIds:this.ids,creator:e}).then(function(e){t.$success("关联标签成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})}},getAdvFn:function(){var t=this;this.$req.get("v2/shareAdv/1/999").then(function(e){t.advList=e.data.data.records}).catch(function(t){console.log(t)})},getTagFn:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records}).catch(function(t){console.log(t)})}},created:function(){switch(this.from){case"ArticleList":this.text="文章标题",this.placeholder="请输入文章标题",this.btnText="添加文章";break;case"AppList":this.text="应用名",this.placeholder="请输入应用名",this.btnText="添加应用";break;case"reportList":this.text="报道标题",this.placeholder="请输入报道标题",this.btnText="添加报道"}this.getAdvFn(),this.getTagFn()}},i=(a("aCdZ"),a("KHd+")),r=Object(i.a)(s,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("div",{staticClass:"input-box"},[a("span",[t._v(t._s(t.text))]),t._v(" "),a("el-input",{staticClass:"input",attrs:{placeholder:t.placeholder,clearable:""},model:{value:t.inputText,callback:function(e){t.inputText=e},expression:"inputText"}})],1)]),t._v(" "),"ArticleList"==t.from?a("el-col",{attrs:{span:5}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择标签"},model:{value:t.tagId,callback:function(e){t.tagId=e},expression:"tagId"}},t._l(t.tagList,function(t){return a("el-option",{key:t.id,attrs:{label:t.cName,value:t.id}})}))],1):t._e(),t._v(" "),"ArticleList"!==t.from?a("el-col",{attrs:{span:9}},[a("div",{staticClass:"date-box"},[a("span",[t._v("日期")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)]):t._e(),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",[a("el-button",{attrs:{type:"success"},on:{click:t.searchFn}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v(t._s(t.btnText))]),t._v(" "),a("el-button",{attrs:{type:"danger"},on:{click:t.delsFn}},[t._v("批量删除")])],1)])],1),t._v(" "),a("el-dropdown",[a("el-button",{attrs:{type:"primary"}},[t._v("\r\n      更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dropdown,function(e){return a("el-dropdown-item",{key:e.id,nativeOn:{click:function(a){t.moreFn(e.text)}}},[t._v(t._s(e.text))])}))],1),t._v(" "),a("menusDialog",{attrs:{isShow:t.visible,title:t.dialogTitle},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[a("el-transfer",{attrs:{data:t.transferData,titles:t.titles,"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"}},on:{change:t.transferChange},model:{value:t.selectTransfer,callback:function(e){t.selectTransfer=e},expression:"selectTransfer"}})],1)],1)},[],!1,null,"1db06799",null);r.options.__file="index.vue";e.a=r.exports},aCdZ:function(t,e,a){"use strict";var n=a("LTYj");a.n(n).a},jTOu:function(t,e,a){"use strict";var n=a("7jfb");a.n(n).a},tytO:function(t,e,a){"use strict";var n=a("WvVn");a.n(n).a}}]);