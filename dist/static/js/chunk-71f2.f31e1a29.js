(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-71f2"],{"+aiF":function(t,e,r){"use strict";r.r(e);var n=r("Asgo"),a=r.n(n),i=r("omC7"),o=r.n(i),l=r("DSeF"),u=r("+WsE");var s=r("snk3"),d={name:"turnTableList",components:{Dialog:l.a},data:function(){return{turnTableArr:[0,1,2,3,4,5,6,7].map(function(t,e){return{index:e,id:"",img:"",turntableRewardId:"",remark:"",probability:""}}),rewardArr:[],turnTableEditForm:[],rules:{turntableRewardId:[{required:!0,message:"请选择奖励！",trigger:"blur"}],probability:[{required:!0,type:"number",message:"卡片概率为0~1之间！",trigger:"blur"},{pattern:/^(1|0)$|(0\.\d+)$/,message:"卡片概率为0~1之间！",trigger:"blur"}],remark:[{required:!0,type:"string",message:"请填写卡片备注！",trigger:"blur"}]},isShow:!1,tabHeader:{"background-color":"#F4F4F4",color:"#666666","border-top":"1px solid #BBBBBB","border-bottom":"1px solid #BBBBBB","font-size":"16px","text-align":"center"}}},filters:{formatType:function(t){var e={0:"红包",1:"随机红包",2:"卡片",3:"谢谢参与"};return e[t]?e[t]:"未知"},getRewardLabel:function(t){if(t){var e={0:"红包",1:"随机红包",2:"卡片",3:"谢谢参与"},r={0:"元",1:"元",2:"张",3:"谢谢参与"},n=e[t.type]?e[t.type]:"未知",a=r[t.type]?r[t.type]:"";return n+=(t.unit?t.unit:0)+a,3==t.type&&(n="谢谢参与"),n}}},methods:{getRewardNameById:function(t){if(this.rewardArr&&this.rewardArr.length)return this.rewardArr.find(function(e){return e.id==t})},edit:function(t,e){this.turnTableEditForm=JSON.parse(o()(this.turnTableArr)),this.isShow=!0},onSubmit:function(t){for(var e=this,r=this.$refs[t],n=this.$refs[t].length,i=[],o=function(t){var e=new a.a(function(e,n){r[t].validate(function(t){if(!t)return n(t);e(t)})});i.push(e)},l=0;l<n;l++)o(l);a.a.all(i).then(function(r){(function(t){return u.a.patch("turnTable",{activityTurntableUpdateViewList:t})})(e.turnTableEditForm).then(function(r){if(r.data.code)return r.data.message&&e.$wran(r.data.message);e.close(t),e.$success("操所成功！"),e.init()}).catch(function(t){})}).catch(function(t){console.error(t)})},close:function(t){this.isShow=!1,this.$refs[t].forEach(function(t){return t.resetFields()})},toggle:function(t,e){if(console.log(t),e){var r=[];if(this.turnTableEditForm.forEach(function(e){e.id!==t.id&&r.push(e.turntableRewardId)}),r&&r.length){var n=JSON.parse(o()(this.rewardArr)).map(function(t){return r.indexOf(t.id)>-1?t.disabled=!0:t.disabled=!1,t});this.rewardArr=n}}},init:function(){var t=this;u.a.get("turnTable").then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);e.data.data&&e.data.data.length&&(t.turnTableArr=e.data.data)}).catch(function(t){})}},created:function(){var t=this;this.init(),Object(s.b)().then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);e.data.data&&e.data.data.length&&(t.rewardArr=e.data.data)})}},c=(r("W4aL"),r("ZrdR")),f=Object(c.a)(d,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-button",{attrs:{type:"primary"},on:{click:t.edit}},[t._v("编辑")])],1),t._v(" "),r("el-table",{staticClass:"table-box",attrs:{border:"",data:t.turnTableArr,"header-cell-style":t.tabHeader}},[r("el-table-column",{attrs:{align:"center",label:"索引",prop:"index"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"中奖概率",prop:"probability"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"奖品",prop:"turntableRewardId"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t._f("getRewardLabel")(t.getRewardNameById(e.row.turntableRewardId)))+"\n      ")]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"备注",prop:"remark"}})],1),t._v(" "),r("Dialog",{attrs:{title:"大转盘编辑",width:"50%","is-show":t.isShow},on:{cancelFn:function(e){t.close("turnTableForm")},confirmFn:function(e){t.onSubmit("turnTableForm")}}},t._l(t.turnTableEditForm,function(e,n){return r("el-form",{key:n,ref:"turnTableForm",refInFor:!0,attrs:{"label-width":"100px",inline:!0,model:e,rules:t.rules}},[r("el-form-item",{attrs:{label:"索引"}},[t._v(t._s(e.index)+" ")]),t._v(" "),r("el-form-item",{attrs:{label:"中奖概率",prop:"probability"}},[r("el-input",{model:{value:e.probability,callback:function(r){t.$set(e,"probability",t._n("string"==typeof r?r.trim():r))},expression:"item.probability"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"奖品",prop:"turntableRewardId"}},[r("el-select",{attrs:{clearable:""},on:{"visible-change":function(r){t.toggle(e,r)}},model:{value:e.turntableRewardId,callback:function(r){t.$set(e,"turntableRewardId",r)},expression:"item.turntableRewardId"}},t._l(t.rewardArr,function(e){return r("el-option",{key:e.id,attrs:{value:e.id,disabled:e.disabled,label:t._f("getRewardLabel")(e)}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{model:{value:e.remark,callback:function(r){t.$set(e,"remark","string"==typeof r?r.trim():r)},expression:"item.remark"}})],1)],1)}))],1)},[],!1,null,"54b8bd08",null);f.options.__file="index.vue";e.default=f.exports},DSeF:function(t,e,r){"use strict";var n={name:"Dialog_BOX",components:{},props:{isShow:{type:Boolean,default:!1},title:{type:String,default:"提示"},width:{type:String,default:"50%"}},computed:{},data:function(){return{}},methods:{cancelFn:function(){this.$emit("cancelFn")},confirmFn:function(){this.$emit("confirmFn")}},created:function(){}},a=(r("E9Le"),r("ZrdR")),i=Object(a.a)(n,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{title:t.title,visible:t.isShow,"close-on-click-modal":!1,"show-close":!1,width:t.width},on:{"update:visible":function(e){t.isShow=e}}},[t._t("del"),t._v(" "),t._t("sort"),t._v(" "),t._t("upload"),t._v(" "),t._t("transfer"),t._v(" "),t._t("default"),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.cancelFn}},[t._v("取消")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:t.confirmFn}},[t._v("确 定")])],1)],2)},[],!1,null,"7a6bf8ca",null);i.options.__file="index.vue";e.a=i.exports},E9Le:function(t,e,r){"use strict";var n=r("W9qD");r.n(n).a},KBV7:function(t,e,r){},W4aL:function(t,e,r){"use strict";var n=r("KBV7");r.n(n).a},W9qD:function(t,e,r){},snk3:function(t,e,r){"use strict";r.d(e,"b",function(){return a}),r.d(e,"d",function(){return i}),r.d(e,"a",function(){return o}),r.d(e,"c",function(){return l});var n=r("+WsE");function a(){return n.a.get("turnTableReward")}function i(t){return n.a.post("turnTableReward",t)}function o(t){return n.a.del2("turnTableReward",{id:t})}function l(t){return n.a.patch("turnTableReward",t)}}}]);