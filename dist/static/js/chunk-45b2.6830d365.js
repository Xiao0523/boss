(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-45b2"],{"/yIQ":function(t,e,i){"use strict";var r=i("kPup");i.n(r).a},Paff:function(t,e,i){"use strict";i.d(e,"b",function(){return o}),i.d(e,"c",function(){return a}),i.d(e,"a",function(){return n});var r=i("+WsE");function o(t){var e=t.talentShowId,i=t.status,o=void 0===i?0:i,a=t.pageNum,n=void 0===a?1:a,l=t.pageSize,s=void 0===l?10:l;return r.a.get("training/trainingTalentShow/composition/"+e+"/"+o+"/"+n+"/"+s)}function a(t){return r.a.post("training/trainingTalentShow/examine",t)}function n(t){var e=t.id;return r.a.get("training/trainingTalentShow/composition/detail/"+e)}},fATO:function(t,e,i){"use strict";i.r(e);var r=i("Paff"),o={name:"CompositionDetail",filters:{typeStr:function(t){return 0===Number(t)?"图片":"视频"}},data:function(){return{form:{id:"",talentShowId:"",type:"",videoUrl:"",videoCover:"",status:"",pics:""},pics:[]}},watch:{},created:function(){var t=this,e=this.$route.query.id;e||this.$router.back(-1);var i={id:e};Object(r.a)(i).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){var i=e.data.data;t.form=i,t.pics=t.form.pics.split(",")}})},methods:{onSubmit:function(){this.$router.back(-1)}}},a=(i("/yIQ"),i("ZrdR")),n=Object(a.a)(o,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-form",{ref:"noveForm",staticClass:"novel",attrs:{model:t.form,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"作品ID",prop:"id"}},[i("el-input",{attrs:{disabled:""},model:{value:t.form.id,callback:function(e){t.$set(t.form,"id",e)},expression:"form.id"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"才艺秀编号",prop:"talentShowId"}},[i("el-input",{attrs:{disabled:""},model:{value:t.form.talentShowId,callback:function(e){t.$set(t.form,"talentShowId",e)},expression:"form.talentShowId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"作品类型",prop:"type"}},[t._v("\n      "+t._s(t._f("typeStr")(t.form.type))+"\n    ")]),t._v(" "),0==t.form.type?i("el-form-item",{attrs:{label:"作品图片",prop:"talentShowId"}},[i("div",{staticClass:"img-box"},t._l(t.pics,function(t){return i("img",{key:t,attrs:{src:t}})}))]):t._e(),t._v(" "),1==t.form.type?i("el-form-item",{attrs:{label:"视频作品",prop:"talentShowId"}},[i("video",{staticStyle:{"object-fit":"fill"},attrs:{id:"video",src:t.form.videoUrl,poster:t.form.videoCover,controls:"true",preload:"auto","webkit-playsinline":"true",playsinline:"true","x-webkit-airplay":"allow","x5-video-player-type":"h5","x5-video-player-fullscreen":"true","x5-video-orientation":"portraint"}})]):t._e(),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("返回")])],1)],1)],1)},[],!1,null,"15f9f8ea",null);n.options.__file="index.vue";e.default=n.exports},kPup:function(t,e,i){}}]);