(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-2ff0"],{"8I90":function(t,e,n){"use strict";n.r(e);var a=n("+WsE");var o={name:"Setting",filters:{statusStr:function(t){return 0===Number(t)?"开启":"关闭"},btnStr:function(t){return 0===Number(t)?"关闭":"开启"}},data:function(){return{customColors:[{color:"#f56c6c",percentage:20},{color:"#e6a23c",percentage:40},{color:"#5cb87a",percentage:60},{color:"#1989fa",percentage:80},{color:"#409eff",percentage:100}],form:{addWxStatus:"",addWxTicket:0,appLanqingVideoIntroduceId:"",h5ShareTalentShowStatus:"",h5ShareTalentShowTicket:null,h5ShareTalentShowTimes:null,invitationStatus:"",invitationTicket:null,invitationTimes:null,signIn1:null,signIn2:null,signIn3:null,signIn4:null,signIn5:null,signIn6:null,signIn7:null,signStatus:"",trainingTalentShowOverStatus:"",trainingTalentShowOverTicket:null,uploadTalentShowStatus:"",uploadTalentShowTicket:null,uploadTalentShowTimes:null},fileList:[],upload:!1,securityToken:"",accessKeyId:"",accessKeySecret:"",disableUpload:!1,disableSubmit:!0,uploadFile:null,uploader:null,callback:null,videoId:"",percentage:0}},mounted:function(){this.getSettingDetail()},methods:{getSettingDetail:function(){var t=this;(function(t){return a.a.get("training/config",t)})().then(function(e){e.data.code&&e.data.message&&t.$warn(e.data.message),t.form=e.data.data})},save:function(t){var e=this,n=this.form;t&&(n[t]=1===Number(this.form[t])?0:1),function(t){return a.a.post("training/config/",t)}(n).then(function(t){t.data.code&&t.data.message&&e.$warn(t.data.message),e.getSettingDetail()})},handleRemove:function(t,e){this.fileList=[],this.form.appLanqingVideoIntroduceId=""},uploadOk:function(t){this.form.appLanqingVideoIntroduceId=t.data},uploading:function(t){this.upload=!0},beforeRemove:function(t,e){return this.$confirm("确定移除 "+t.name+"？")},fileChange:function(){var t=this;return!!event.target.files[0]&&(event.target.files[0].type.match("video.*")?(this.uploadFile=event.target.files[0],this.percentage=0,void(this.uploadFile.size<=10485760?this.getAuth(function(){t.getUploder();var e='{"Vod":{"StorageLocation":"","Title":"'+t.uploadFile.name+'","Description":"默认描述信息暂无","CateId":"19","Tags":"测试视频"}}';t.uploader.addFile(t.uploadFile,"","","",e),t.uploader.startUpload(),t.disableSubmit=!1}):(this.disableSubmit=!0,this.$message.error("上传的文件大小超过10M，请重新上传")))):(this.$message.error("请选择视频文件"),!1))},getAuth:function(t){var e=this;(function(t){var e=t.uuid;return a.a.get("/VodStsForApp/"+e)})({uuid:JSON.parse(JSON.parse(localStorage.getItem("userInfo"))).phone}).then(function(n){200===n.status?(e.securityToken=n.data.credentials.securityToken,e.accessKeyId=n.data.credentials.accessKeyId,e.accessKeySecret=n.data.credentials.accessKeySecret,t()):e.$message.error(n.message)}).catch(function(t){e.$message.error(t)})},getUploder:function(){var t=this;t.uploader=new AliyunUpload.Vod({userId:"1402947514567452",partSize:1048576,parallel:5,retryCount:3,retryDuration:2,enableUploadProgress:!0,onUploadFailed:function(e,n,a){t.$message.error("文件上传失败："+a),t.disableSubmit=!0,t.disableUpload=!1},onUploadSucceed:function(e){t.form.appLanqingVideoIntroduceId=e.videoId,t.$message.success("文件上传成功"),t.disableSubmit=!0,t.disableUpload=!1},onUploadProgress:function(e,n,a){t.percentage=+(100*a).toFixed(0)},onUploadTokenExpired:function(t){console.log("onUploadTokenExpired STS临时账号过期了")},onUploadCanceled:function(t){console.log("onUploadCanceled:file:"+t.file.name)},onUploadstarted:function(e){var n=t.accessKeyId,a=t.accessKeySecret,o=t.securityToken;t.uploader.setSTSToken(e,n,a,o)},onUploadEnd:function(t){console.log("onUploadEnd: uploaded all the files")}})}}},s=(n("JWf6"),n("ZrdR")),i=Object(s.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("table",{attrs:{width:"100%"}},[t._m(0),t._v(" "),n("tr",[n("td",[t._v("邀请好友")]),t._v(" "),n("td",[n("el-input",{attrs:{placeholder:"请输入单次票数"},model:{value:t.form.invitationTicket,callback:function(e){t.$set(t.form,"invitationTicket",e)},expression:"form.invitationTicket"}})],1),t._v(" "),n("td",{staticClass:"times"},[n("el-input",{attrs:{placeholder:"0"},model:{value:t.form.invitationTimes,callback:function(e){t.$set(t.form,"invitationTimes",e)},expression:"form.invitationTimes"}}),t._v("次\n      ")],1),t._v(" "),n("td",[t._v(t._s(t._f("statusStr")(t.form.invitationStatus)))]),t._v(" "),n("td",{staticClass:"btn"},[n("el-button",{on:{click:function(e){t.save("invitationStatus")}}},[t._v(t._s(t._f("btnStr")(t.form.invitationStatus)))]),t._v(" "),n("el-button",{on:{click:t.save}},[t._v("确定")])],1)]),t._v(" "),n("tr",[n("td",[t._v("签到")]),t._v(" "),n("td",{staticClass:"week"},[n("el-input",{attrs:{placeholder:"第一天"},model:{value:t.form.signIn1,callback:function(e){t.$set(t.form,"signIn1",e)},expression:"form.signIn1"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第二天"},model:{value:t.form.signIn2,callback:function(e){t.$set(t.form,"signIn2",e)},expression:"form.signIn2"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第三天"},model:{value:t.form.signIn3,callback:function(e){t.$set(t.form,"signIn3",e)},expression:"form.signIn3"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第四天"},model:{value:t.form.signIn4,callback:function(e){t.$set(t.form,"signIn4",e)},expression:"form.signIn4"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第五天"},model:{value:t.form.signIn5,callback:function(e){t.$set(t.form,"signIn5",e)},expression:"form.signIn5"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第六天"},model:{value:t.form.signIn6,callback:function(e){t.$set(t.form,"signIn6",e)},expression:"form.signIn6"}}),t._v(" "),n("el-input",{attrs:{placeholder:"第七天"},model:{value:t.form.signIn7,callback:function(e){t.$set(t.form,"signIn7",e)},expression:"form.signIn7"}})],1),t._v(" "),n("td"),t._v(" "),n("td",[t._v(t._s(t._f("statusStr")(t.form.signStatus)))]),t._v(" "),n("td",{staticClass:"btn"},[n("el-button",{on:{click:function(e){t.save("signStatus")}}},[t._v(t._s(t._f("btnStr")(t.form.signStatus)))]),t._v(" "),n("el-button",{on:{click:t.save}},[t._v("确定")])],1)]),t._v(" "),n("tr",[n("td",[t._v("加客服微信")]),t._v(" "),n("td",[n("el-input",{attrs:{placeholder:"请输入单次票数"},model:{value:t.form.addWxTicket,callback:function(e){t.$set(t.form,"addWxTicket",e)},expression:"form.addWxTicket"}})],1),t._v(" "),n("td"),t._v(" "),n("td",[t._v(t._s(t._f("statusStr")(t.form.addWxStatus)))]),t._v(" "),n("td",{staticClass:"btn"},[n("el-button",{on:{click:function(e){t.save("addWxStatus")}}},[t._v(t._s(t._f("btnStr")(t.form.addWxStatus)))]),t._v(" "),n("el-button",{on:{click:t.save}},[t._v("确定")])],1)]),t._v(" "),n("tr",[n("td",[t._v("上传才艺秀作品")]),t._v(" "),n("td",[n("el-input",{attrs:{placeholder:"请输入单次票数"},model:{value:t.form.uploadTalentShowTicket,callback:function(e){t.$set(t.form,"uploadTalentShowTicket",e)},expression:"form.uploadTalentShowTicket"}})],1),t._v(" "),n("td",{staticClass:"times"},[n("el-input",{attrs:{placeholder:"0"},model:{value:t.form.uploadTalentShowTimes,callback:function(e){t.$set(t.form,"uploadTalentShowTimes",e)},expression:"form.uploadTalentShowTimes"}}),t._v("次\n      ")],1),t._v(" "),n("td",[t._v(t._s(t._f("statusStr")(t.form.uploadTalentShowStatus)))]),t._v(" "),n("td",{staticClass:"btn"},[n("el-button",{on:{click:function(e){t.save("uploadTalentShowStatus")}}},[t._v(t._s(t._f("btnStr")(t.form.uploadTalentShowStatus)))]),t._v(" "),n("el-button",{on:{click:t.save}},[t._v("确定")])],1)]),t._v(" "),n("tr",[n("td",[t._v("分享才艺秀活动")]),t._v(" "),n("td",[n("el-input",{attrs:{placeholder:"请输入单次票数"},model:{value:t.form.h5ShareTalentShowTicket,callback:function(e){t.$set(t.form,"h5ShareTalentShowTicket",e)},expression:"form.h5ShareTalentShowTicket"}})],1),t._v(" "),n("td",{staticClass:"times"},[n("el-input",{attrs:{placeholder:"0"},model:{value:t.form.h5ShareTalentShowTimes,callback:function(e){t.$set(t.form,"h5ShareTalentShowTimes",e)},expression:"form.h5ShareTalentShowTimes"}}),t._v("次\n      ")],1),t._v(" "),n("td",[t._v(t._s(t._f("statusStr")(t.form.h5ShareTalentShowStatus)))]),t._v(" "),n("td",{staticClass:"btn"},[n("el-button",{on:{click:function(e){t.save("h5ShareTalentShowStatus")}}},[t._v(t._s(t._f("btnStr")(t.form.h5ShareTalentShowStatus)))]),t._v(" "),n("el-button",{on:{click:t.save}},[t._v("确定")])],1)])]),t._v(" "),n("div",{staticClass:"uploads"},[n("span",[t._v("视频上传")]),t._v(" "),n("div",{staticClass:"upload-box"},[n("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"input",attrs:{type:"file",accept:"video/*"},on:{change:t.fileChange}}),t._v(" "),n("el-button",{attrs:{disabled:t.disableUpload,size:"small",type:"primary"},on:{click:function(e){t.$refs.input.click()}}},[t._v("\n        上传视频\n      ")]),t._v(" "),n("el-progress",{directives:[{name:"show",rawName:"v-show",value:t.percentage,expression:"percentage"}],staticClass:"progress",attrs:{percentage:t.percentage,"stroke-width":26,"text-inside":!0,color:t.customColors}})],1),t._v(" "),n("el-button",{staticClass:"save-button",attrs:{loading:t.upload},on:{click:t.save}},[t._v("保存")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.upload,expression:"upload"}],staticClass:"save-tip"},[t._v("请等待视频上传！")])],1)])},[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",{staticClass:"title"},[n("td",{attrs:{width:"12%"}},[t._v("任务名称")]),t._v(" "),n("td",{attrs:{width:"50%"}},[t._v("票数")]),t._v(" "),n("td",{attrs:{width:"10%"}},[t._v("每日限制")]),t._v(" "),n("td",{attrs:{width:"8%"}},[t._v("状态")]),t._v(" "),n("td",{attrs:{width:"10%"}},[t._v("操作")])])}],!1,null,"fc8b2f0e",null);i.options.__file="index.vue";e.default=i.exports},DDAj:function(t,e,n){},JWf6:function(t,e,n){"use strict";var a=n("DDAj");n.n(a).a}}]);