(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d084"],{"8wxe":function(t,i,s){},DSeF:function(t,i,s){"use strict";var a={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},o=(s("E9Le"),s("KHd+")),n=Object(o.a)(a,function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(i){t.isShow=i}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);n.options.__file="index.vue";i.a=n.exports},E9Le:function(t,i,s){"use strict";var a=s("8wxe");s.n(a).a},Sqoj:function(t,i,s){},"i/6n":function(t,i,s){"use strict";var a=s("Sqoj");s.n(a).a},n3ud:function(t,i,s){"use strict";s.r(i);var a=s("P2sY"),o=s.n(a),n={name:"slideshowList",components:{Dialog:s("DSeF").a},computed:{},data:function(){return{uploadPic:"https://www.my51share.com/boss/upload",form:{},listData:[],ids:[],type:"",addPicUrl:"",oldPicUrl:"",checked:!1,visible:!1,options:[{value:"顶部",label:"顶部"},{value:"底部",label:"底部"}],value:"",restaurants:[],state4:"",timeout:null}},methods:{openDialog:function(t){this.visible=!0,this.type="edit";var i=o()({},t);this.form=i,this.addPicUrl=i.picurl},addPicFn:function(){this.visible=!0,this.type="add",this.form={},this.addPicUrl=""},confirmFn:function(){var t=this,i={picurl:this.form.picurl,rank:this.form.rank,miaoshu:this.form.miaoshu,title:this.form.title},s=void 0;this.form.id?(s="updateSowing",i.id=this.form.id):s="addSowing",console.log(s),this.$req.post(s,i).then(function(i){console.log(i),0==i.data.code?t.$success(i.data.message):t.$wran(i.data.message),t.visible=!1,t.initData()}).catch(function(t){console.log(t)})},handleSuccess:function(t,i){this.form.picurl=t.data,this.addPicUrl=t.data,console.log(this.form.picurl)},handError:function(){},delPic:function(t){this.ids.push(t);var i=this.ids;this.$store.dispatch("delFn",{url:"delSowing",idArr:i})},initData:function(){var t=this;this.$req.get("selectSowing").then(function(i){t.listData=i.data.data,console.log(t.listData)}).catch(function(t){console.log(t)})}},created:function(){this.initData()},mounted:function(){}},e=(s("i/6n"),s("KHd+")),l=Object(e.a)(n,function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("el-row",{staticClass:"btnBox"},[s("el-button",{attrs:{type:"primary"},on:{click:t.addPicFn}},[t._v("添加轮播图")])],1),t._v(" "),s("div",{staticClass:"picsBox"},[s("ul",{staticClass:"listPic"},t._l(t.listData,function(i){return s("li",{staticClass:"itemPic"},[s("img",{attrs:{src:i.picurl,alt:""},on:{click:function(s){t.openDialog(i)}}}),t._v(" "),s("p",{staticClass:"textBox"},[t._v("\n          排序:\n          "),s("span",[t._v(t._s(i.rank))])]),t._v(" "),s("p",[t._v("图片描述:\n          "),s("span",[t._v(t._s(i.miaoshu))])]),t._v(" "),s("p",[t._v("\n          关联文章:"),s("span",[t._v(t._s(i.title))])]),t._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){t.delPic(i.id)}}},[t._v("删除")])],1)}))]),t._v(" "),s("Dialog",{attrs:{isShow:t.visible},on:{cancelFn:function(i){t.visible=!1},confirmFn:t.confirmFn}},[s("div",{attrs:{slot:"upload"},slot:"upload"},[s("span",[t._v("图片生成链接："+t._s(t.form.picurl))]),t._v(" "),s("div",{staticClass:"picBox"},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadPic,name:"multipartFile","show-file-list":!1,"on-success":t.handleSuccess}},[t.addPicUrl?s("img",{staticClass:"avatar",attrs:{src:t.addPicUrl}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),s("el-row",{staticClass:"row"},[s("el-col",{attrs:{span:3}},[t._v("关联文章标题:")]),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-input",{attrs:{placeholder:"请输入图片描述"},model:{value:t.form.title,callback:function(i){t.$set(t.form,"title",i)},expression:"form.title"}})],1)],1),t._v(" "),s("el-row",{staticClass:"row"},[s("el-col",{attrs:{span:3}},[t._v("图片描述:")]),t._v(" "),s("el-col",{attrs:{span:18}},[s("el-input",{attrs:{placeholder:"请输入图片描述"},model:{value:t.form.miaoshu,callback:function(i){t.$set(t.form,"miaoshu",i)},expression:"form.miaoshu"}})],1)],1),t._v(" "),s("el-row",{staticClass:"row"},[s("el-col",{attrs:{span:3}},[t._v("排序")]),t._v(" "),s("el-col",{attrs:{span:7}},[s("el-input",{model:{value:t.form.rank,callback:function(i){t.$set(t.form,"rank",i)},expression:"form.rank"}})],1)],1)],1)])],1)},[],!1,null,"7bcfebe5",null);l.options.__file="index.vue";i.default=l.exports}}]);