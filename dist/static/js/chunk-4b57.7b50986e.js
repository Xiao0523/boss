(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4b57"],{"/PgR":function(t,n,e){},"6/xk":function(t,n,e){"use strict";e.r(n);var o={name:"flotAdvAdd",components:{flotAdvTemplet:e("LxOM").a},computed:{userInfo:function(){return this.$store.getters.userInfo}},data:function(){return{}},methods:{addFn:function(t){var n=this;this.$req.post("v2.1/insertMarketing",t).then(function(t){console.log(t),n.$success("添加成功"),n.$router.back()}).catch(function(t){console.log(t)})}},created:function(){}},c=(e("b5X3"),e("KHd+")),s=Object(c.a)(o,function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("flotAdvTemplet",{on:{confirmFn:this.addFn}})],1)},[],!1,null,"9201b076",null);s.options.__file="flotAdvAdd.vue";n.default=s.exports},b5X3:function(t,n,e){"use strict";var o=e("/PgR");e.n(o).a}}]);