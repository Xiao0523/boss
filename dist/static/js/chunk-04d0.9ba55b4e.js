(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-04d0"],{"8wxe":function(t,e,r){},"9N3k":function(t,e,r){"use strict";r.r(e);var a=r("P2sY"),n=r.n(a),i=r("DSeF"),o=r("Zw5r"),s={name:"card",components:{Dialog:i.a},data:function(){return{uploadPic:"https://www.my51share.com/boss/upload",isShow:!1,cardGroupId:null,status:null,num:null,cards:[],card:{cardGroupId:null,img:"",index:null,probability:null,remark:""},rules:{img:[{required:!0,type:"string",message:"请上传卡片图片！",trigger:"blur"}],index:[{required:!0,type:"number",message:"请填写卡片索引！",trigger:"blur"}],probability:[{required:!0,type:"number",message:"请填写卡片概率，卡片概率为0~1之间！",trigger:"blur"},{pattern:/^(1|0)$|(0\.\d+)$/,message:"请填写卡片概率，卡片概率为0~1之间！",trigger:"blur"}],remark:[{required:!0,type:"string",message:"请上传卡片备注！",trigger:"blur"}]},tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},methods:{init:function(){var t=this;Object(o.c)(this.card.cardGroupId).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);e.data.data&&e.data.data.length&&(t.cards=e.data.data)}).catch(function(t){})},creatCard:function(t){var e=this;if(1==this.status)return this.$wran("该卡片组已上架, 不可新增！");Object(o.g)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.close("cardForm"),e.$success("操所成功！"),e.init()}).catch(function(t){})},editCard:function(t){var e=this;if(1==this.status)return this.$wran("该卡片组已上架，不可编辑！");Object(o.e)(t).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);e.close("cardForm"),e.$success("操所成功！"),e.init()}).catch(function(t){})},del:function(t,e){var r=this;if(1==this.status)return this.$wran("该卡片组已上架, 不可删除！");this.$confirm("确定要删除该卡片吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.a)(e.id).then(function(e){if(e.data.code)return e.data.message&&r.$wran(e.data.message);r.$success("操作成功！"),r.cards.splice(t,1)}).catch(function(t){})}).catch(function(t){})},addCard:function(){if(this.cards.length>=this.num)return this.$wran("该卡片组的卡片已达到"+this.num+"张卡片上限！");this.card={cardGroupId:this.cardGroupId,img:"",index:null,probability:null,remark:""},this.isShow=!0},onSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(t){var r=n()({},e.card);if(r.probability=+r.probability,!r.id)return e.creatCard(r);e.editCard(r)}})},close:function(t){this.isShow=!1,this.$refs[t].resetFields()},edit:function(t,e){this.card=n()({},e),this.isShow=!0},uploadSuccess:function(t,e,r){this.card.img=t.data},onFileChange:function(t,e){var r=t.size/1024>100;return r&&(this.$wran("文件大于 100kb"),this.$refs.uploader.clearFiles()),r}},created:function(){var t=this.$route.query,e=t.cardGroupId;this.status=t.status,this.num=t.num,e&&(this.cardGroupId=this.card.cardGroupId=e,this.init())}},c=(r("FQp+"),r("KHd+")),l=Object(c.a)(s,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[0==t.status?r("el-button",{attrs:{type:"primary"},on:{click:t.addCard}},[t._v("新增卡片")]):t._e()],1),t._v(" "),r("el-table",{staticClass:"table-box",attrs:{border:"",data:t.cards,"header-cell-style":t.tabHeader}},[r("el-table-column",{attrs:{align:"center",label:"索引",prop:"index"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"卡片图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[r("img",{staticClass:"card-img",attrs:{src:t.row.img,alt:""}})]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"卡片概率",prop:"probability"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"卡片备注",prop:"remark"}}),t._v(" "),0==t.status?r("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==t.status?r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(r){t.edit(e.$index,e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),0==t.status?r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(r){t.del(e.$index,e.row)}}},[t._v("删除")]):t._e()]}}])}):t._e()],1),t._v(" "),r("Dialog",{attrs:{title:"卡片编辑",width:"40%","is-show":t.isShow},on:{cancelFn:function(e){t.close("cardForm")},confirmFn:function(e){t.onSubmit("cardForm")}}},[r("div",{attrs:{slot:"upload"},slot:"upload"},[r("div",{staticClass:"picBox"},[r("el-upload",{ref:"uploader",staticClass:"avatar-uploader",attrs:{action:t.uploadPic,name:"multipartFile","show-file-list":!1,"on-change":t.onFileChange,"on-success":t.uploadSuccess}},[t.card.img?r("img",{staticClass:"avatar",attrs:{src:t.card.img}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form",{ref:"cardForm",attrs:{"label-position":"left","label-width":"120px",model:t.card,rules:t.rules}},[r("el-form-item",{attrs:{label:"卡片图片地址",prop:"img"}},[r("el-input",{attrs:{disabled:!0},model:{value:t.card.img,callback:function(e){t.$set(t.card,"img",e)},expression:"card.img"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"卡片索引",prop:"index"}},[r("el-input-number",{attrs:{"controls-position":"right",min:0},model:{value:t.card.index,callback:function(e){t.$set(t.card,"index",e)},expression:"card.index"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"卡片概率",prop:"probability"}},[r("el-input",{model:{value:t.card.probability,callback:function(e){t.$set(t.card,"probability",t._n("string"==typeof e?e.trim():e))},expression:"card.probability"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"卡片备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.card.remark,callback:function(e){t.$set(t.card,"remark","string"==typeof e?e.trim():e)},expression:"card.remark"}})],1)],1)],1)])],1)},[],!1,null,"37be3b71",null);l.options.__file="index.vue";e.default=l.exports},DSeF:function(t,e,r){"use strict";var a={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},n=(r("E9Le"),r("KHd+")),i=Object(n.a)(a,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);i.options.__file="index.vue";e.a=i.exports},E9Le:function(t,e,r){"use strict";var a=r("8wxe");r.n(a).a},"FQp+":function(t,e,r){"use strict";var a=r("P8mf");r.n(a).a},P8mf:function(t,e,r){},Zw5r:function(t,e,r){"use strict";r.d(e,"d",function(){return n}),r.d(e,"h",function(){return i}),r.d(e,"b",function(){return o}),r.d(e,"f",function(){return s}),r.d(e,"c",function(){return c}),r.d(e,"g",function(){return l}),r.d(e,"e",function(){return u}),r.d(e,"a",function(){return d});var a=r("+WsE");function n(){return a.a.get("cardGroup")}function i(t){return a.a.post("cardGroup",t)}function o(t){return a.a.del2("cardGroup",{cardGroupId:t})}function s(t){return a.a.patch("cardGroup",{cardGroupId:t})}function c(t){return a.a.get("card/"+t)}function l(t){return a.a.post("card",t)}function u(t){return a.a.patch("card",t)}function d(t){return a.a.del2("card",{cardId:t})}}}]);