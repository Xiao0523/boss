(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0934"],{Dx6U:function(t,e,o){"use strict";var a=o("OpwL");o.n(a).a},OpwL:function(t,e,o){},Paff:function(t,e,o){"use strict";o.d(e,"b",function(){return r}),o.d(e,"c",function(){return n}),o.d(e,"a",function(){return i});var a=o("+WsE");function r(t){var e=t.talentShowId,o=t.status,r=void 0===o?0:o,n=t.pageNum,i=void 0===n?1:n,l=t.pageSize,s=void 0===l?10:l;return a.a.get("training/trainingTalentShow/composition/"+e+"/"+r+"/"+i+"/"+s)}function n(t){return a.a.post("training/trainingTalentShow/examine",t)}function i(t){var e=t.id;return a.a.get("training/trainingTalentShow/composition/detail/"+e)}},XnsE:function(t,e,o){"use strict";o.r(e);var a=o("Paff"),r={name:"compositionDetail",data:function(){return{form:{id:"",talentShowId:"",type:"",videoUrl:"",videoCover:"",status:"",pics:""}}},watch:{},created:function(){var t=this,e=this.$route.query.id;e||this.$router.back(-1);var o={id:e};Object(a.a)(o).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){var o=e.data.data;t.form=o}})},filters:{typeStr:function(t){return 0==t?"图片":"视频"}},methods:{onSubmit:function(){this.$router.back(-1)}}},n=(o("Dx6U"),o("KHd+")),i=Object(n.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("el-form",{ref:"noveForm",staticClass:"novel",attrs:{model:t.form,"label-position":"left","label-width":"100px"}},[o("el-form-item",{attrs:{label:"作品ID",prop:"id"}},[o("el-input",{attrs:{disabled:""},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"才艺秀编号",prop:"talentShowId"}},[o("el-input",{attrs:{disabled:""},model:{value:t.form.talentShowId,callback:function(e){t.$set(t.form,"talentShowId",e)},expression:"form.talentShowId"}})],1),t._v(" "),o("el-form-item",{attrs:{label:"作品类型",prop:"type"}},[t._v("\n      "+t._s(t._f("typeStr")(t.form.type))+"\n    ")]),t._v(" "),0==t.form.type?o("el-form-item",{attrs:{label:"作品图片",prop:"talentShowId"}},[o("div",{staticClass:"img-box"},[o("img",{attrs:{src:t.form.pics}})])]):t._e(),t._v(" "),1==t.form.type?o("el-form-item",{attrs:{label:"视频封面",prop:"talentShowId"}},[o("div",{staticClass:"img-box"},[o("img",{attrs:{src:t.form.videoCover}})])]):t._e(),t._v(" "),1==t.form.type?o("el-form-item",{attrs:{label:"视频链接",prop:"talentShowId"}},[t._v("\n      "+t._s(t.form.videoUrl)+"\n    ")]):t._e(),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("返回")])],1)],1)],1)},[],!1,null,"4684c302",null);i.options.__file="index.vue";e.default=i.exports}}]);