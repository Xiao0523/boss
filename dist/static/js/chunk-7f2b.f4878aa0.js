(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7f2b"],{"2jc1":function(t,e,n){"use strict";n.r(e);var a=n("QbLZ"),i=n.n(a),s=n("L2JU"),o=n("ZOHz"),r=n("DSeF"),l=n("SMMm"),c={name:"addRole",components:{},props:{source:{type:String},form:{type:Object,default:function(){return{opName:"",opValue:""}}},dialogFormVisible:{type:Boolean,default:!1},type:{type:String,default:""}},computed:{title:function(){return"add"==this.type?"添加操作":"更新操作"}},data:function(){return{formLabelWidth:"120px"}},methods:{confirmFn:function(){this.$emit("addOperationFn",this.form)},cancelFn:function(){this.$emit("cancelFn")}},watch:{form:{handler:function(t,e){console.log(t)},deep:!0}},created:function(){}},d=(n("HXCh"),n("KHd+")),u=Object(d.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{title:t.title,visible:t.dialogFormVisible,"show-close":!1,modal:!1},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("el-form",{attrs:{model:t.form}},[n("el-form-item",{attrs:{label:"操作属性","label-width":t.formLabelWidth}},[n("el-input",{attrs:{"auto-complete":"off",required:"required"},model:{value:t.form.opValue,callback:function(e){t.$set(t.form,"opValue",e)},expression:"form.opValue"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"操作名称","label-width":t.formLabelWidth}},[n("el-input",{attrs:{"auto-complete":"off",required:"required"},model:{value:t.form.opName,callback:function(e){t.$set(t.form,"opName",e)},expression:"form.opName"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancelFn}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],1)],1)},[],!1,null,"4fbacbbd",null);u.options.__file="index.vue";var h=u.exports,f={name:"permissionsList",components:{searchNav:o.a,Dialog:r.a,pageNum:l.a,addOperation:h},computed:i()({userInfo:function(){return this.$store.getters.userInfo}},Object(s.b)(["roleIds","operaIds"])),data:function(){return{isShowRevOperaBtn:!1,addRoleDialogVisible:!1,form:{},type:"",listData:[],tableIdArr:[],OperationIdsByRolo:[],ids:[],getRowKeys:function(t){return t.id},delId:Number,totalNum:null,pageNo:1,pageSize:10,visible:!1,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},filters:{},methods:i()({},Object(s.c)(["set_operaIds"]),{setSelectRow:function(){if(null!==this.tableIdArr)for(var t=0;t<this.tableIdArr.length;t++)for(var e=0;e<this.OperationIdsByRolo.length;e++)this.tableIdArr[t]==this.OperationIdsByRolo[e]&&void 0!=this.$refs.multipleTable&&this.$refs.multipleTable.toggleRowSelection(this.listData[t],!0)},revOperaFn:function(){var t=this;this.roleIds.length&&this.ids.length&&this.$req.post("v2.1/auth/role4Operation",{roleIds:this.roleIds,operationIds:this.ids}).then(function(e){t.$success(e.data.message)}).catch(function(t){console.log(t)})},backFn:function(){this.$router.go(-1)},reSetFn:function(){this.$refs.multipleTable.clearSelection()},addFn:function(){this.type="add",this.addRoleDialogVisible=!0},addOperationFn:function(t){var e=this,n="",a={opName:t.opName,opValue:t.opValue};"add"==this.type?(n="v2.1/auth/operation",this.$req.post(n,a).then(function(t){e.$success(t.data.message),e.addRoleDialogVisible=!1,e.form={},e.initData()}).catch(function(t){console.log(t)})):(n="v2.1/auth/operation",a.id=t.id,this.$req.patch(n,a).then(function(t){e.$success(t.data.message),e.addRoleDialogVisible=!1,e.initData()}).catch(function(t){console.log(t)}))},sizeChangeFn:function(t){this.pageSize=t,this.initData()},currentChangeFn:function(t){this.pageNo=t,this.initData()},confirmFn:function(){var t=this;this.visible=!1,this.$req.del("v2.1/auth/operation/"+this.delId).then(function(e){t.$success(e.data.message),t.initData()}).catch(function(t){console.log(t)})},SelectionChange:function(t){this.ids=t.map(function(t){return t.id}),this.set_operaIds(this.ids)},handleEdit:function(t,e){console.log(t,e),this.addRoleDialogVisible=!0,this.type="edit",this.form=e},handleDelete:function(t,e){this.visible=!0;var n=[];n.push(e.id),this.ids=n,this.delId=e.id},initData:function(){var t=this;this.$req.get("v2.1/auth/operation").then(function(e){t.listData=e.data.data,t.tableIdArr=t.listData.map(function(t){return t.id}),setTimeout(function(){t.setSelectRow()},500)}).catch(function(t){console.log(t)})},getOperationIdsByRoleIdFn:function(){var t=this;this.$req.get("v2.1/auth/getOperationIdsByRoleId/"+this.query.roleId).then(function(e){t.OperationIdsByRolo=e.data.data,console.log("操作",e.data.data)}).catch(function(t){console.log(t)})}}),created:function(){},mounted:function(){this.initData(),this.query=this.$route.query,this.query.roleId&&this.getOperationIdsByRoleIdFn()},beforeRouteEnter:function(t,e,n){n(function(t){"/permissionsManager/permissionsList"==e.path&&(t.isShowRevOperaBtn=!0)})}},p=(n("ezu6"),Object(d.a)(f,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:6}},[n("el-button",{attrs:{type:"warning"},on:{click:t.reSetFn}},[t._v("重置")])],1)],1),t._v(" "),t.isShowRevOperaBtn?n("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"end"}},[n("el-button",{attrs:{type:"warning"},on:{click:t.revOperaFn}},[t._v("关联操作")]),t._v(" "),n("el-button",{attrs:{type:"info"},on:{click:t.backFn}},[t._v("返回")])],1):t._e(),t._v(" "),n("el-table",{ref:"multipleTable",staticClass:"table-box",staticStyle:{width:"100%"},attrs:{data:t.listData,"empty-text":"暂无数据","max-height":"700","row-key":t.getRowKeys,border:"","header-cell-style":t.tabHeader},on:{"selection-change":t.SelectionChange}},[n("el-table-column",{attrs:{type:"selection","reserve-selection":!0,width:"55"}}),t._v(" "),n("el-table-column",{attrs:{prop:"opName",label:"操作名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"opValue",label:"操作属性"}}),t._v(" "),n("el-table-column",{attrs:{label:"创建时间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("p",[t._v(t._s(t._f("formatDate")(e.row.createTime)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",fixed:"right",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("div",{staticClass:"operation-box"},[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){t.handleDelete(e.$index,e.row)}}},[t._v("删除")])],1)]}}])})],1),t._v(" "),n("div",{staticClass:"pageNumBox"},[n("pageNum",{attrs:{currentPage:t.pageNo,pageSize:t.pageSize,total:t.totalNum},on:{sizeChange:t.sizeChangeFn,currentChange:t.currentChangeFn}})],1),t._v(" "),n("addOperation",{attrs:{dialogFormVisible:t.addRoleDialogVisible,form:t.form,type:t.type},on:{addOperationFn:t.addOperationFn,cancelFn:function(e){t.addRoleDialogVisible=!1}}}),t._v(" "),n("Dialog",{attrs:{isShow:t.visible},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[n("span",{attrs:{slot:"del"},slot:"del"},[t._v("删除操作不可恢复，确认删除？")])])],1)},[],!1,null,"99f4a756",null));p.options.__file="index.vue";e.default=p.exports},"8wxe":function(t,e,n){},DSeF:function(t,e,n){"use strict";var a={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},i=(n("E9Le"),n("KHd+")),s=Object(i.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);s.options.__file="index.vue";e.a=s.exports},DmZD:function(t,e,n){},E9Le:function(t,e,n){"use strict";var a=n("8wxe");n.n(a).a},HXCh:function(t,e,n){"use strict";var a=n("QW0G");n.n(a).a},JHrQ:function(t,e,n){"use strict";var a=n("DmZD");n.n(a).a},LTYj:function(t,e,n){},QW0G:function(t,e,n){},SMMm:function(t,e,n){"use strict";var a=n("Uwh3"),i={props:{currentPage:{type:Number},pageSizes:{type:Array,default:function(){return[]}},pageSize:{type:Number},total:{type:Number}},components:{},data:function(){return{isShow:!1}},watch:{total:function(t){console.log("total",t),0!=t&&(this.isShow=!0)}},methods:{handleSizeChange:function(t){Object(a.c)("currentSize",t);var e=Object(a.b)("currentSize");this.$emit("sizeChange",e)},handleCurrentChange:function(t){Object(a.c)("currentPage",t);var e=Object(a.b)("currentPage");this.$emit("currentChange",e)}},mounted:function(){},updated:function(){console.log("分页组件",this.currentPage),console.log("分页组件",this.pageSize)},created:function(){}},s=(n("JHrQ"),n("KHd+")),o=Object(s.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pageBox"},[this.isShow?e("el-pagination",{attrs:{"current-page":this.currentPage,pageSizes:[10,50,100,200,300,400,500],"page-size":this.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:this.total},on:{"size-change":this.handleSizeChange,"current-change":this.handleCurrentChange}}):this._e()],1)},[],!1,null,"0db06f42",null);o.options.__file="index.vue";e.a=o.exports},ZOHz:function(t,e,n){"use strict";var a=n("DSeF"),i={name:"searchNav",props:{from:{type:String},ids:{type:Array}},components:{menusDialog:a.a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{inputText:"",tagId:"",startDate:"",endDate:"",visible:!1,moreBtnText:"",generateAdvflag:!1,generateTagflag:!1,dialogTitle:"",advList:[],tagList:[],titles:[],transferData:[],selectTransfer:[],dropdown:[{id:0,text:"批量关联广告"},{id:1,text:"批量关联标签"}]}},watch:{},methods:{selectedtTagFn:function(t){this.tagId=t},generateData:function(){if("批量关联广告"==this.moreBtnText)for(var t=this.advList.length,e=0;e<t;e++){var n=this.advList[e];console.log(n.id),this.transferData.push({key:n.id,label:n.title})}else if("批量关联标签"==this.moreBtnText)for(var a=this.tagList.length,i=0;i<a;i++){var s=this.tagList[i];this.transferData.push({key:s.id,label:s.cName})}},transferChange:function(t,e,n){console.log(t,e,n),"right"==e&&(this.selectTransfer=n)},moreFn:function(t){console.log("文章ids",this.ids),this.moreBtnText=t,this.visible=!0,this.selectTransfer=[],"批量关联广告"!=t&&this.generateAdvflag?"批量关联标签"!=t&&this.generateTagflag||(this.dialogTitle="请选择要关联的标签",this.titles=["所有标签列表","关联标签列表"],this.transferData=[],this.generateData(),this.generateTagflag=!0):(this.dialogTitle="请选择要关联的广告",this.titles=["所有广告列表","关联广告列表"],this.transferData=[],this.generateData(),this.generateAdvflag=!0)},confirmFn:function(){"批量关联广告"==this.moreBtnText?this.relevanceAdvs():"批量关联标签"==this.moreBtnText&&this.relevanceTags()},addFn:function(){switch(this.from){case"ArticleList":this.$router.push("/ArticleManager/ArticleAdd");break;case"AppList":this.$router.push("/AppManager/AppAdd");break;case"reportList":this.$router.push("/reportsManager/reportsAdd")}},delsFn:function(){this.$emit("delsFn")},searchFn:function(){var t=this,e={},n="";switch(this.from){case"ArticleList":n="fuzzySearchHuoDong";break;case"AppList":n="selectAppByTitle";break;case"reportList":n="selectbaodaobytitle"}this.inputText&&(e.key=this.inputText),this.tagId&&(e.tagId=this.tagId),this.startDate&&(e.startDay=this.startDate),this.endDate&&(e.endDay=this.endDate),e.pageNum=1,e.pageSize=10,this.$req.post(n,e).then(function(n){t.$emit("searchFn",n,e)}).catch(function(t){console.log(t)})},relevanceAdvs:function(){var t=this;0!=this.ids.length&&0!=this.selectTransfer.length&&this.$req.post("ContactArticleAndAdvertisement",{advertisementIds:this.selectTransfer,articleIds:this.ids}).then(function(e){t.$success("关联广告成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})},relevanceTags:function(){var t=this;if(0!=this.ids.length&&0!=this.selectTransfer.length){var e=JSON.parse(this.userInfo).realname;this.$req.post("ContactArticleAndTag",{tagIds:this.selectTransfer,articleIds:this.ids,creator:e}).then(function(e){t.$success("关联标签成功"),t.$emit("relevanceFn"),t.visible=!1}).catch(function(t){console.log(t)})}},getAdvFn:function(){var t=this;this.$req.get("v2/shareAdv/1/999").then(function(e){t.advList=e.data.data.records}).catch(function(t){console.log(t)})},getTagFn:function(){var t=this;this.$req.get("v2/shareCategory/1/999").then(function(e){t.tagList=e.data.data.records}).catch(function(t){console.log(t)})}},created:function(){switch(this.from){case"ArticleList":this.text="文章标题",this.placeholder="请输入文章标题",this.btnText="添加文章";break;case"AppList":this.text="应用名",this.placeholder="请输入应用名",this.btnText="添加应用";break;case"reportList":this.text="报道标题",this.placeholder="请输入报道标题",this.btnText="添加报道"}this.getAdvFn(),this.getTagFn()}},s=(n("aCdZ"),n("KHd+")),o=Object(s.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:5}},[n("div",{staticClass:"input-box"},[n("span",[t._v(t._s(t.text))]),t._v(" "),n("el-input",{staticClass:"input",attrs:{placeholder:t.placeholder,clearable:""},model:{value:t.inputText,callback:function(e){t.inputText=e},expression:"inputText"}})],1)]),t._v(" "),"ArticleList"==t.from?n("el-col",{attrs:{span:5}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择标签"},model:{value:t.tagId,callback:function(e){t.tagId=e},expression:"tagId"}},t._l(t.tagList,function(t){return n("el-option",{key:t.id,attrs:{label:t.cName,value:t.id}})}))],1):t._e(),t._v(" "),"ArticleList"!==t.from?n("el-col",{attrs:{span:9}},[n("div",{staticClass:"date-box"},[n("span",[t._v("日期")]),t._v(" "),n("el-date-picker",{attrs:{type:"datetime",placeholder:"开始日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),n("el-date-picker",{attrs:{type:"datetime",placeholder:"结束日期","value-format":"yyyy-MM-dd HH:mm:ss"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)]):t._e(),t._v(" "),n("el-col",{attrs:{span:6}},[n("div",[n("el-button",{attrs:{type:"success"},on:{click:t.searchFn}},[t._v("搜索")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.addFn}},[t._v(t._s(t.btnText))]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:t.delsFn}},[t._v("批量删除")])],1)])],1),t._v(" "),n("el-dropdown",[n("el-button",{attrs:{type:"primary"}},[t._v("\r\n      更多"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.dropdown,function(e){return n("el-dropdown-item",{key:e.id,nativeOn:{click:function(n){t.moreFn(e.text)}}},[t._v(t._s(e.text))])}))],1),t._v(" "),n("menusDialog",{attrs:{isShow:t.visible,title:t.dialogTitle},on:{cancelFn:function(e){t.visible=!1},confirmFn:t.confirmFn}},[n("el-transfer",{attrs:{data:t.transferData,titles:t.titles,"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"}},on:{change:t.transferChange},model:{value:t.selectTransfer,callback:function(e){t.selectTransfer=e},expression:"selectTransfer"}})],1)],1)},[],!1,null,"1db06799",null);o.options.__file="index.vue";e.a=o.exports},aCdZ:function(t,e,n){"use strict";var a=n("LTYj");n.n(a).a},ezu6:function(t,e,n){"use strict";var a=n("xVwo");n.n(a).a},xVwo:function(t,e,n){}}]);