(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-863f"],{Zueu:function(t,e,n){"use strict";var o=n("pqc4");n.n(o).a},eBTX:function(t,e,n){"use strict";n.r(e);var o=n("+WsE");var a=n("u8Kd"),i={name:"configurationList",data:function(){return{content:{lotteryCron:"",lotteryTime:"",maxReadVideo:"",maxCommentVideo:"",maxShareVideo:"",maxReadArticle:"",maxCommentArticle:"",maxShareArticle:"",rewardCode:"",rewardStatus:"",lottery:"",no1:"",no2:"",no3:"",rewardPic:""},uploadUrl:a.a}},methods:{uploadSuccess:function(t,e){this.content.rewardPic=t.data},fileChange:function(t){var e=t.size/1024>300;return e&&(this.$wran("文件大于 300kb"),this.$refs.uploader.clearFiles()),e},onSubmit:function(){var t=this;(function(t){return o.a.put("configInfo",t)})(this.content).then(function(e){t.$success("操所成功！"),t.init()})},init:function(){var t=this;o.a.get("configInfo").then(function(e){e.data.code||e.data.data&&(t.content=e.data.data)})}},created:function(){this.init()}},r=(n("Zueu"),n("ZrdR")),l=Object(r.a)(i,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-form",{staticClass:"config",attrs:{"label-position":"left",model:t.content,"label-width":"260px"}},[n("el-form-item",{attrs:{label:"开奖配置 lotteryCron"}},[n("el-input",{model:{value:t.content.lotteryCron,callback:function(e){t.$set(t.content,"lotteryCron","string"==typeof e?e.trim():e)},expression:"content.lotteryCron"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"开奖时间 lotteryTime"}},[n("el-input",{model:{value:t.content.lotteryTime,callback:function(e){t.$set(t.content,"lotteryTime","string"==typeof e?e.trim():e)},expression:"content.lotteryTime"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最多观看视频数 maxReadVideo"}},[n("el-input",{model:{value:t.content.maxReadVideo,callback:function(e){t.$set(t.content,"maxReadVideo","string"==typeof e?e.trim():e)},expression:"content.maxReadVideo"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最多评论视频数 maxCommentVideo"}},[n("el-input",{model:{value:t.content.maxCommentVideo,callback:function(e){t.$set(t.content,"maxCommentVideo","string"==typeof e?e.trim():e)},expression:"content.maxCommentVideo"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最多分享视频数 maxShareVideo"}},[n("el-input",{model:{value:t.content.maxShareVideo,callback:function(e){t.$set(t.content,"maxShareVideo","string"==typeof e?e.trim():e)},expression:"content.maxShareVideo"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最大阅读文章 maxReadArticle"}},[n("el-input",{model:{value:t.content.maxReadArticle,callback:function(e){t.$set(t.content,"maxReadArticle","string"==typeof e?e.trim():e)},expression:"content.maxReadArticle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最多评论文章数 maxCommentArticle"}},[n("el-input",{model:{value:t.content.maxCommentArticle,callback:function(e){t.$set(t.content,"maxCommentArticle","string"==typeof e?e.trim():e)},expression:"content.maxCommentArticle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最多分享文章数 maxShareArticle"}},[n("el-input",{model:{value:t.content.maxShareArticle,callback:function(e){t.$set(t.content,"maxShareArticle","string"==typeof e?e.trim():e)},expression:"content.maxShareArticle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"下期中奖号码 rewardCode"}},[n("el-input",{model:{value:t.content.rewardCode,callback:function(e){t.$set(t.content,"rewardCode","string"==typeof e?e.trim():e)},expression:"content.rewardCode"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"是否公开 rewardStatus"}},[n("el-input",{model:{value:t.content.rewardStatus,callback:function(e){t.$set(t.content,"rewardStatus","string"==typeof e?e.trim():e)},expression:"content.rewardStatus"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"奖池累计 lottery"}},[n("el-input",{model:{value:t.content.lottery,callback:function(e){t.$set(t.content,"lottery","string"==typeof e?e.trim():e)},expression:"content.lottery"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"排行榜第一名卡片数 no1"}},[n("el-input",{model:{value:t.content.no1,callback:function(e){t.$set(t.content,"no1","string"==typeof e?e.trim():e)},expression:"content.no1"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"排行榜第二名卡片数 no2"}},[n("el-input",{model:{value:t.content.no2,callback:function(e){t.$set(t.content,"no2","string"==typeof e?e.trim():e)},expression:"content.no2"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"排行榜第三名卡片数 no3"}},[n("el-input",{model:{value:t.content.no3,callback:function(e){t.$set(t.content,"no3","string"==typeof e?e.trim():e)},expression:"content.no3"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"活动首页奖励图片 rewardPic"}},[n("el-upload",{ref:"uploader",staticClass:"img-uploader",attrs:{action:t.uploadUrl,"show-file-list":!1,name:"multipartFile","on-success":t.uploadSuccess,"on-change":t.fileChange}},[t.content.rewardPic?n("img",{staticClass:"reward_img",attrs:{src:t.content.rewardPic}}):n("i",{staticClass:"el-icon-plus img-uploader-icon"})])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("保存配置")])],1)],1)],1)},[],!1,null,"ab52aba2",null);l.options.__file="index.vue";e.default=l.exports},pqc4:function(t,e,n){},u8Kd:function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a});var o="https://upload.my51share.com/pic",a="https://upload.my51share.com/file"}}]);