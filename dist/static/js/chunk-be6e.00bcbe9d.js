(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-be6e"],{"9bQv":function(e,t,a){},LZT4:function(e,t,a){"use strict";a.r(t);var o={name:"shareMoneyList",components:{},computed:{},data:function(){return{form:{}}},methods:{updateFn:function(){var e=this,t={earning:this.form.earning,id:this.form.id,scale:this.form.scale,scaleSecond:this.form.scaleSecond,companyWechatcode:this.form.companyWechatcode,updator:this.form.updator};this.$req.post("updateEarning",t).then(function(t){e.$success(t.data.message)}).catch(function(e){console.log(e)})},initData:function(){var e=this;this.$req.get("earningDetail").then(function(t){e.form=t.data.data}).catch(function(e){console.log(e)})}},created:function(){this.initData()}},n=(a("Qi7K"),a("KHd+")),r=Object(n.a)(o,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"180px"}},[a("el-form-item",{attrs:{label:"创建者"}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.creator,callback:function(t){e.$set(e.form,"creator",t)},expression:"form.creator"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime"},model:{value:e.form.createTime,callback:function(t){e.$set(e.form,"createTime",t)},expression:"form.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上级比例（%）"}},[a("el-input",{model:{value:e.form.scale,callback:function(t){e.$set(e.form,"scale",t)},expression:"form.scale"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上上级比例（%）"}},[a("el-input",{model:{value:e.form.scaleSecond,callback:function(t){e.$set(e.form,"scaleSecond",t)},expression:"form.scaleSecond"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"邀请一个用户获得纷享币"}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.earning,callback:function(t){e.$set(e.form,"earning",t)},expression:"form.earning"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"更新时间"}},[a("el-date-picker",{attrs:{disabled:"",type:"datetime"},model:{value:e.form.updateTime,callback:function(t){e.$set(e.form,"updateTime",t)},expression:"form.updateTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司微信号"}},[a("el-input",{model:{value:e.form.companyWechatcode,callback:function(t){e.$set(e.form,"companyWechatcode",t)},expression:"form.companyWechatcode"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateFn}},[e._v("更新")])],1)},[],!1,null,"5cc57063",null);r.options.__file="index.vue";t.default=r.exports},Qi7K:function(e,t,a){"use strict";var o=a("9bQv");a.n(o).a}}]);