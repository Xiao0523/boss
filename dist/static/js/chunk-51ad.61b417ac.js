(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-51ad"],{AX5i:function(t,s,a){"use strict";a.r(s);var i=a("c/X4"),n={name:"ClassDetail",filters:{ageIntervalStr:function(t){var s=Number(t);return 0===s?"0-3":1===s?"4-6":2===s?"7-9":3===s?"10-12":4===s?"13-15":"16-18"}},data:function(){return{list:{},tagList:[]}},mounted:function(){var t=this.$route.query.id,s=this.$route.query.storeId;t&&this.getDetail(s,t)},methods:{getDetail:function(t,s){var a=this,n={storeId:t,id:s};Object(i.b)(n).then(function(t){if(t.data.code)return t.data.message&&a.$warn(t.data.message);t.data.data&&(a.list=t.data.data,a.tagList=t.data.tags&&t.data.tags.split(","))})},goBack:function(){this.$router.go(-1)}}},e=(a("YxQI"),a("KHd+")),r=Object(e.a)(n,function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"wraper panel"},[a("div",{staticClass:"panel__bd"},[a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程封面")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("img",{staticClass:"avatar",attrs:{src:t.list.cover}})])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程名称")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.name))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程价格")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.price))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("开课时间")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.beginDate))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("班型")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.enrolment))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程类目")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.categoryName))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("适合年龄段")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t._f("ageIntervalStr")(t.list.ageInterval)))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课时")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("strong",[t._v(t._s(t.list.hours))])])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程标签")]),t._v(" "),a("div",{staticClass:"flex__bd"},[t._v("\n        "+t._s(t.list.tags)+"\n      ")])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("推荐讲师")]),t._v(" "),a("div",{staticClass:"flex__bd"},t._l(t.list.teachers,function(s){return a("div",{key:s.name,staticClass:"teacher"},[a("img",{staticClass:"teacher-avatar",attrs:{src:s.photo,alt:"头像"}}),t._v(" "),a("div",{staticClass:"teacher-info"},[a("h6",{staticClass:"teacher-name"},[t._v(t._s(s.realName))]),t._v(" "),a("div",{staticClass:"teacher-slogan"},[t._v(t._s(s.briefIntroduction))])])])}))]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程介绍")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("p",{staticClass:"course-intro",domProps:{innerHTML:t._s(t.list.detailWords)}})])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("课程大纲")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("a",{attrs:{href:t.list.outline,target:"_blank"}},[a("el-button",{attrs:{type:"primary"}},[t._v("打开大纲")])],1)])]),t._v(" "),a("div",{staticClass:"flex"},[a("div",{staticClass:"flex__hd"},[t._v("学员风采")]),t._v(" "),a("div",{staticClass:"flex__bd"},[a("ul",{staticClass:"list"},t._l(t.list.studentStyle,function(t){return a("li",{key:t},[a("img",{staticClass:"list-img",attrs:{src:t,alt:""}})])}))])])]),t._v(" "),a("div",{staticClass:"backBtn"},[a("el-button",{on:{click:t.goBack}},[t._v("返回")])],1)])},[],!1,null,"26c8c0d0",null);r.options.__file="classDetail.vue";s.default=r.exports},YxQI:function(t,s,a){"use strict";var i=a("m7mC");a.n(i).a},"c/X4":function(t,s,a){"use strict";a.d(s,"l",function(){return n}),a.d(s,"i",function(){return e}),a.d(s,"k",function(){return r}),a.d(s,"j",function(){return l}),a.d(s,"c",function(){return d}),a.d(s,"b",function(){return _}),a.d(s,"o",function(){return o}),a.d(s,"n",function(){return v}),a.d(s,"a",function(){return c}),a.d(s,"m",function(){return u}),a.d(s,"h",function(){return f}),a.d(s,"f",function(){return C}),a.d(s,"g",function(){return g}),a.d(s,"d",function(){return x}),a.d(s,"e",function(){return h});var i=a("+WsE");function n(t){return i.a.post("training/store",t)}function e(t){return i.a.post("training/store/examine",t)}function r(){return i.a.get("training/store/main")}function l(t){var s=t.id;return i.a.get("training/store/"+s)}function c(t){var s=t.storeId;return i.a.get("training/store/category/"+s)}function d(t){return i.a.post("training/store/curriculum",t)}function _(t){var s=t.storeId,a=t.id;return i.a.get("training/store/curriculum/"+s+"/"+a)}function o(t){return i.a.post("training/store/teacher",t)}function v(t){var s=t.storeId,a=t.id;return i.a.get("training/store/teacher/"+s+"/"+a)}function u(t){return i.a.post("training/store/student",t)}function f(t){return i.a.post("training/store/order",t)}function C(t){return i.a.post("training/store/comment",t)}function g(t){var s=t.id;return i.a.post("training/store/comment/"+s)}function x(t){var s=t.id;return i.a.del("training/store/comment/"+s)}function h(t){var s=t.id,a=t.storeId;return i.a.get("training/store/comment/"+s+"/"+a)}},m7mC:function(t,s,a){}}]);