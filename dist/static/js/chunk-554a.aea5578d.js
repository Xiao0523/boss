(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-554a"],{AX5i:function(t,s,i){"use strict";i.r(s);var a=i("c/X4"),n={name:"ClassDetail",filters:{ageIntervalStr:function(t){var s=Number(t);return 0===s?"0-3":1===s?"4-6":2===s?"7-9":3===s?"10-12":4===s?"13-15":"16-18"}},data:function(){return{list:{},tagList:[]}},mounted:function(){var t=this.$route.query.id,s=this.$route.query.storeId;t&&this.getDetail(s,t)},methods:{getDetail:function(t,s){var i=this,n={storeId:t,id:s};Object(a.c)(n).then(function(t){if(t.data.code)return t.data.message&&i.$warn(t.data.message);t.data.data&&(i.list=t.data.data,i.tagList=t.data.tags&&t.data.tags.split(","))})},goBack:function(){this.$router.go(-1)}}},e=(i("YxQI"),i("KHd+")),r=Object(e.a)(n,function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"wraper panel"},[i("div",{staticClass:"panel__bd"},[i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程封面")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("img",{staticClass:"avatar",attrs:{src:t.list.cover}})])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程名称")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.name))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程价格")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.price))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("开课时间")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.beginDate))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("班型")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.enrolment))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程类目")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.categoryName))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("适合年龄段")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t._f("ageIntervalStr")(t.list.ageInterval)))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课时")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("strong",[t._v(t._s(t.list.hours))])])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程标签")]),t._v(" "),i("div",{staticClass:"flex__bd"},[t._v("\n        "+t._s(t.list.tags)+"\n      ")])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("推荐讲师")]),t._v(" "),i("div",{staticClass:"flex__bd"},t._l(t.list.teachers,function(s){return i("div",{key:s.name,staticClass:"teacher"},[i("img",{staticClass:"teacher-avatar",attrs:{src:s.photo,alt:"头像"}}),t._v(" "),i("div",{staticClass:"teacher-info"},[i("h6",{staticClass:"teacher-name"},[t._v(t._s(s.realName))]),t._v(" "),i("div",{staticClass:"teacher-slogan"},[t._v(t._s(s.briefIntroduction))])])])}))]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程介绍")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("p",{staticClass:"course-intro",domProps:{innerHTML:t._s(t.list.detailWords)}})])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("课程大纲")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("a",{attrs:{href:t.list.outline,target:"_blank"}},[i("el-button",{attrs:{type:"primary"}},[t._v("打开大纲")])],1)])]),t._v(" "),i("div",{staticClass:"flex"},[i("div",{staticClass:"flex__hd"},[t._v("学员风采")]),t._v(" "),i("div",{staticClass:"flex__bd"},[i("ul",{staticClass:"list"},t._l(t.list.studentStyle,function(t){return i("li",{key:t},[i("img",{staticClass:"list-img",attrs:{src:t,alt:""}})])}))])])]),t._v(" "),i("div",{staticClass:"backBtn"},[i("el-button",{on:{click:t.goBack}},[t._v("返回")])],1)])},[],!1,null,"26c8c0d0",null);r.options.__file="classDetail.vue";s.default=r.exports},YxQI:function(t,s,i){"use strict";var a=i("m7mC");i.n(a).a},"c/X4":function(t,s,i){"use strict";i.d(s,"m",function(){return n}),i.d(s,"j",function(){return e}),i.d(s,"l",function(){return r}),i.d(s,"k",function(){return l}),i.d(s,"d",function(){return d}),i.d(s,"c",function(){return _}),i.d(s,"p",function(){return o}),i.d(s,"o",function(){return v}),i.d(s,"b",function(){return c}),i.d(s,"n",function(){return u}),i.d(s,"i",function(){return f}),i.d(s,"g",function(){return g}),i.d(s,"h",function(){return C}),i.d(s,"e",function(){return x}),i.d(s,"f",function(){return h}),i.d(s,"a",function(){return m});var a=i("+WsE");function n(t){return a.a.post("training/store",t)}function e(t){return a.a.post("training/store/examine",t)}function r(){return a.a.get("training/store/main")}function l(t){var s=t.id;return a.a.get("training/store/"+s)}function c(t){var s=t.storeId;return a.a.get("training/store/category/"+s)}function d(t){return a.a.post("training/store/curriculum",t)}function _(t){var s=t.storeId,i=t.id;return a.a.get("training/store/curriculum/"+s+"/"+i)}function o(t){return a.a.post("training/store/teacher",t)}function v(t){var s=t.storeId,i=t.id;return a.a.get("training/store/teacher/"+s+"/"+i)}function u(t){return a.a.post("training/store/student",t)}function f(t){return a.a.post("training/store/order",t)}function g(t){return a.a.post("training/store/comment",t)}function C(t){var s=t.id;return a.a.post("training/store/comment/"+s)}function x(t){var s=t.id;return a.a.del("training/store/comment/"+s)}function h(t){var s=t.id,i=t.storeId;return a.a.get("training/store/comment/"+s+"/"+i)}function m(t){return a.a.post("training/weight",t)}},m7mC:function(t,s,i){}}]);