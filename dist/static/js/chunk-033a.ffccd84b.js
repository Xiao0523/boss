(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-033a","chunk-a5f7"],{"/gw5":function(t,e,i){"use strict";var a=i("WpuH");i.n(a).a},"0HWc":function(t,e,i){"use strict";var a=i("e4iO"),n=i("NfTU"),r=i("GToK"),s=i("WJ4c"),o=i("n/80"),l=i("xoMD"),c=i("W+So"),u=i("bmAa");n(n.S+n.F*!i("wfzr")(function(t){Array.from(t)}),"Array",{from:function(t){var e,i,n,d,h=r(t),f="function"==typeof this?this:Array,m=arguments.length,p=m>1?arguments[1]:void 0,v=void 0!==p,b=0,g=u(h);if(v&&(p=a(p,m>2?arguments[2]:void 0,2)),void 0==g||f==Array&&o(g))for(i=new f(e=l(h.length));e>b;b++)c(i,b,v?p(h[b],b):h[b]);else for(d=g.call(h),i=new f;!(n=d.next()).done;b++)c(i,b,v?s(d,p,[n.value,b],!0):n.value);return i.length=b,i}})},"5UkA":function(t,e,i){},Kyc1:function(t,e,i){},LGhb:function(t,e,i){t.exports={default:i("cm7O"),__esModule:!0}},"W+So":function(t,e,i){"use strict";var a=i("LYHN"),n=i("tt8C");t.exports=function(t,e,i){e in t?a.f(t,e,n(0,i)):t[e]=i}},WhvB:function(t,e,i){},WpuH:function(t,e,i){},Yded:function(t,e,i){var a=i("621g"),n=i("bmAa");t.exports=i("c01Q").getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}},ac6V:function(t,e,i){"use strict";i.d(e,"b",function(){return n}),i.d(e,"c",function(){return r}),i.d(e,"a",function(){return s});var a=i("+WsE");function n(t){return a.a.post("/training/banners",t)}function r(t){var e=t.id;return a.a.get("/training/banner/"+e)}function s(t){return a.a.post("/training/banner",t)}},bZdI:function(t,e,i){"use strict";i.d(e,"b",function(){return n}),i.d(e,"a",function(){return r});var a=i("+WsE");function n(t){return a.a.get("/training/common/getTrainingTalentShow",t)}function r(t){return a.a.patch("training/trainingTalentShow/composition/votes",t)}},"bwM+":function(t,e,i){"use strict";i.r(e);var a=i("rerW"),n=i.n(a),r=i("bS4n"),s=i.n(r),o=i("ac6V"),l=i("xGbm"),c=i("u8Kd"),u=i("i3u+"),d=i("bZdI"),h={name:"TalentSelect",props:{defaultValue:{type:String,default:function(){return""}}},data:function(){return{classList:[],talentId:""}},watch:{defaultValue:function(){this.talentId=this.defaultValue}},mounted:function(){this.talentId=this.defaultValue,this.getList()},methods:{getList:function(){var t=this;Object(d.b)().then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);if(e.data.data){var i=e.data.data;t.classList=i}})},editClass:function(){this.$emit("talentSelect",this.talentId)}}},f=(i("/gw5"),i("ZrdR")),m=Object(f.a)(h,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-select",{attrs:{placeholder:"请输入关键词"},on:{change:t.editClass},model:{value:t.talentId,callback:function(e){t.talentId=e},expression:"talentId"}},t._l(t.classList,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.id}})}))],1)},[],!1,null,"066e420e",null);m.options.__file="index.vue";var p=m.exports,v=i("glbJ"),b={name:"BannerEdit",components:{classSelect:u.a,talentShowSelect:p,Tinymce:v.default},data:function(){return{UploadUrl:c.a,time:"",visible:!1,uploadList:[{value:"首页",label:0},{value:"才艺秀",label:1}],uploadStr:"",form:{type:0,bannerPic:"",orderIndex:"",bannerDescription:"",curriculumId:"",trainingTalentShowId:"",content:""},selectStr:"",isAdd:!0,listObj:{}}},watch:{time:function(){var t=this.time;this.form.beginTime=Object(l.a)(t[0].getTime()),this.form.endTime=Object(l.a)(t[1].getTime())},form:{handler:function(){this.selectStr=0===this.form.type?"课程":1===this.form.type?"活动":"其他"},deep:!0}},created:function(){var t=this.$route.query.id;t&&(this.isAdd=!1,this.getView(t))},methods:{saveClass:function(t){this.form=s()({},this.form,t)},saveTalent:function(t){this.form.trainingTalentShowId=t},handleSuccess:function(t,e){this.form.bannerPic=t.data},beforeUpload:function(t){var e="image/jpeg"===t.type||"image/png"===t.type;return e||this.$message.error("请上传JPG/PNG格式的图片"),e},editSelect:function(t,e){this.form[e]=t},onSubmit:function(){var t=this,e=this.form;Object(o.a)(e).then(function(e){if(e.data.code)return e.data.message&&t.$wran(e.data.message);e.data.data&&(t.$success("提交成功！"),t.$router.push({name:"BannerList"}))})},getView:function(t){var e=this,i={id:t};Object(o.c)(i).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);if(t.data.data){var i=t.data.data;e.form=i;var a=!0,r=!1,s=void 0;try{for(var o,l=n()(e.uploadList);!(a=(o=l.next()).done);a=!0){var c=o.value;if(c.label===Number(e.form.position)){e.uploadStr=c.value;break}}}catch(t){r=!0,s=t}finally{try{!a&&l.return&&l.return()}finally{if(r)throw s}}e.listObj={classId:e.form.curriculumId,curriculumName:e.form.curriculumName,storeName:e.form.storeName,storeId:e.form.storeId},e.time=[new Date(i.beginTime),new Date(i.endTime)]}})}}},g=(i("jXtQ"),Object(f.a)(b,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-form",{ref:"noveForm",staticClass:"novel",attrs:{model:t.form,"label-position":"left","label-width":"100px"}},[i("el-form-item",{attrs:{label:"banner位置"}},[i("el-select",{attrs:{placeholder:"上传位置"},on:{change:function(e){t.editSelect(t.uploadStr,"position")}},model:{value:t.uploadStr,callback:function(e){t.uploadStr=e},expression:"uploadStr"}},t._l(t.uploadList,function(t){return i("el-option",{key:t.label,attrs:{label:t.value,value:t.label}})}))],1),t._v(" "),i("el-form-item",{attrs:{label:"banner描述"}},[i("el-input",{model:{value:t.form.bannerDescription,callback:function(e){t.$set(t.form,"bannerDescription",e)},expression:"form.bannerDescription"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"banner排序"}},[i("el-input",{model:{value:t.form.orderIndex,callback:function(e){t.$set(t.form,"orderIndex",e)},expression:"form.orderIndex"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"图片"}},[i("el-upload",{staticClass:"uploader",attrs:{action:t.UploadUrl,"show-file-list":!1,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,name:"multipartFile"}},[t.form.bannerPic?i("img",{staticClass:"avatar",attrs:{src:t.form.bannerPic}}):i("i",{staticClass:"el-icon-picture uploader-icon"})]),t._v(" "),i("input",{attrs:{type:"hidden"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"选择时间"}},[i("el-date-picker",{attrs:{"default-time":["12:00:00","08:00:00"],type:"datetimerange",align:"right","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"banner类型"}},[i("el-radio-group",{model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[i("el-radio",{attrs:{label:"0"}},[t._v("课程")]),t._v(" "),i("el-radio",{attrs:{label:"1"}},[t._v("活动")]),t._v(" "),i("el-radio",{attrs:{label:"2"}},[t._v("其他")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:t.selectStr}},[i("classSelect",{directives:[{name:"show",rawName:"v-show",value:0===Number(t.form.type),expression:"Number(form.type) === 0"}],attrs:{"default-obj":t.listObj,"is-add":t.isAdd},on:{classCb:t.saveClass}}),t._v(" "),i("talentShowSelect",{directives:[{name:"show",rawName:"v-show",value:1===Number(t.form.type),expression:"Number(form.type) === 1"}],attrs:{"default-value":t.form.trainingTalentShowName},on:{talentSelect:t.saveTalent}}),t._v(" "),i("Tinymce",{directives:[{name:"show",rawName:"v-show",value:2===Number(t.form.type),expression:"Number(form.type) === 2"}],staticClass:"editor-width",model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")])],1)],1)],1)},[],!1,null,"45a5ed8a",null));g.options.__file="edit.vue";e.default=g.exports},cm7O:function(t,e,i){i("Urde"),i("0HWc"),t.exports=i("c01Q").Array.from},f1yn:function(t,e,i){},glbJ:function(t,e,i){"use strict";i.r(e);var a=i("Asgo"),n=i.n(a),r=i("EPZ6"),s=i.n(r),o=i("u8Kd"),l={name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[],UploadUrl:o.a}},methods:{checkAllSuccess:function(){var t=this;return s()(this.listObj).every(function(e){return t.listObj[e].hasSuccess})},handleSubmit:function(){var t=this,e=s()(this.listObj).map(function(e){return t.listObj[e]});this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！")},handleSuccess:function(t,e){for(var i=t.data,a=e.uid,n=s()(this.listObj),r=0,o=n.length;r<o;r++)if(this.listObj[n[r]].uid===a)return this.listObj[n[r]].url=i,void(this.listObj[n[r]].hasSuccess=!0)},handleRemove:function(t){for(var e=t.uid,i=s()(this.listObj),a=0,n=i.length;a<n;a++)if(this.listObj[i[a]].uid===e)return void delete this.listObj[i[a]]},beforeUpload:function(t){var e=this,i=window.URL||window.webkitURL,a=t.uid;return this.listObj[a]={},new n.a(function(n,r){var s=new Image;s.src=i.createObjectURL(t),s.onload=function(){e.listObj[a]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},n(!0)})}}},c=(i("rseW"),i("ZrdR")),u=Object(c.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("上传图片\n  ")]),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":t.fileList,"show-file-list":!0,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,action:t.UploadUrl,name:"multipartFile","list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),t._v(" "),i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)],1)},[],!1,null,"0c2ffd0e",null);u.options.__file="editorImage.vue";var d=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],h=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen fontselect fontsizeselect"],f={name:"Tinymce",components:{editorImage:u.exports},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:Number,required:!1,default:360}},data:function(){return{includedComponents:"Tinymce",hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN"}}},computed:{language:function(){return this.languageTypeList[this.$store.getters.language]}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(e.tinymceId).setContent(t||"")})},language:function(){var t=this;this.destroyTinymce(),this.$nextTick(function(){return t.initTinymce()})}},mounted:function(){this.initTinymce()},activated:function(){this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{initTinymce:function(){var t=this,e=this;window.tinymce.init({language:this.language,selector:"#"+this.tinymceId,height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:h,fontsize_formats:"12px 14px 16px 18px 20px 22px 24px 26px 28px 30px",menubar:this.menubar,plugins:d,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(i){e.value&&i.setContent(e.value),e.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",function(){t.hasChange=!0,t.$emit("input",i.getContent())})},setup:function(t){t.on("FullscreenStateChanged",function(t){e.fullscreen=t.state})}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach(function(t){window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'+t.url+'" >')})}}},m=(i("zINK"),Object(c.a)(f,function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("div",{staticClass:"tinymce-container editor-container",class:{fullscreen:this.fullscreen}},[e("textarea",{staticClass:"tinymce-textarea",attrs:{id:this.tinymceId}}),this._v(" "),e("div",{staticClass:"editor-custom-btn-container"},[e("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:this.imageSuccessCBK}})],1)])])},[],!1,null,"07a26c3a",null));m.options.__file="index.vue";e.default=m.exports},"i3u+":function(t,e,i){"use strict";var a=i("rerW"),n=i.n(a),r=i("tEl0"),s={name:"ClassSelect",props:{defaultObj:{type:Object,default:function(){return{}}},teacherShow:{type:Boolean,default:function(){return!1}},isAdd:{type:Boolean,default:function(){return!0}}},data:function(){return{loading:!1,options:[],storeId:"",classList:[],classId:"",teacherList:[],teacherId:"",curriculumName:"",teacherRealName:"",storeName:"",teacherFirstFlag:!0,classFirstFlag:!0,storeFirstFlag:!0}},watch:{storeId:function(){if(this.getClass(),this.storeFirstFlag||(this.classId="",this.curriculumName="",this.teacherRealName="",this.teacherList=[],this.teacherId=""),this.storeFirstFlag=!1,this.options.length){var t=!0,e=!1,i=void 0;try{for(var a,r=n()(this.options);!(t=(a=r.next()).done);t=!0){var s=a.value;if(this.storeId===s.id)return void(this.storeName=s.name)}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}}},classId:function(){if(this.classFirstFlag||(this.teacherRealName="",this.teacherId=""),this.classFirstFlag=!1,this.classList.length&&this.teacherShow){var t=!0,e=!1,i=void 0;try{for(var a,r=n()(this.classList);!(t=(a=r.next()).done);t=!0){var s=a.value;if(this.classId===s.id)return void(this.curriculumName=s.name)}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}}},teacherId:function(){if(this.teacherFirstFlag=!1,this.classList.length&&this.teacherShow){var t=!0,e=!1,i=void 0;try{for(var a,r=n()(this.teacherList);!(t=(a=r.next()).done);t=!0){var s=a.value;if(this.teacherId===s.id)return this.teacherRealName=s.name,void this.editTeacher()}}catch(t){e=!0,i=t}finally{try{!t&&r.return&&r.return()}finally{if(e)throw i}}}},defaultObj:{handler:function(){this.listObj=this.defaultObj,this.listObj.storeId&&this.listObj.storeName&&this.getList(this.listObj.storeName),this.listObj.classId&&this.curriculumName&&this.getClass(this.listObj.storeId),this.listObj.teacherId&&this.listObj.teacherRealName&&this.getTeacher(this.listObj.classId)},immediate:!0,deep:!0}},created:function(){this.listObj=this.defaultObj},methods:{getList:function(t){var e=this,i={name:t};Object(r.c)(i).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);if(t.data.data){var i=t.data.data;e.options=i,!e.isAdd&&e.storeFirstFlag&&(e.storeId=e.listObj.storeId)}})},getClass:function(t){var e=this,i={storeId:t||this.storeId};Object(r.b)(i).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);if(t.data.data){var i=t.data.data;e.classList=i,!e.isAdd&&e.classFirstFlag&&(e.classId=e.listObj.classId)}})},getTeacher:function(t){var e=this,i={id:t||this.classId};Object(r.d)(i).then(function(t){if(t.data.code)return t.data.message&&e.$wran(t.data.message);if(t.data.data){var i=t.data.data;e.teacherList=i,!e.isAdd&&e.teacherFirstFlag&&(e.teacherId=e.listObj.teacherId)}})},editClass:function(){if(this.teacherShow)this.getTeacher();else{var t={curriculumName:this.curriculumName,curriculumId:this.classId,storeId:this.storeId,storeName:this.storeName};this.$emit("classCb",t)}},editTeacher:function(){var t={curriculumName:this.curriculumName,curriculumId:this.classId,storeId:this.storeId,storeName:this.storeName,teacherRealName:this.teacherRealName,teacherId:this.teacherId};this.$emit("classCb",t)}}},o=(i("l0DI"),i("ZrdR")),l=Object(o.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-select",{attrs:{"remote-method":t.getList,loading:t.loading,filterable:"",remote:"","reserve-keyword":"",placeholder:"请输入店铺关键词"},model:{value:t.storeId,callback:function(e){t.storeId=e},expression:"storeId"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{attrs:{placeholder:"请输入选择课程"},on:{change:t.editClass},model:{value:t.classId,callback:function(e){t.classId=e},expression:"classId"}},t._l(t.classList,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.id}})})),t._v(" "),i("el-select",{directives:[{name:"show",rawName:"v-show",value:t.teacherShow,expression:"teacherShow"}],attrs:{placeholder:"请输入讲师"},model:{value:t.teacherId,callback:function(e){t.teacherId=e},expression:"teacherId"}},t._l(t.teacherList,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.id}})}))],1)},[],!1,null,"cff28e52",null);l.options.__file="index.vue";e.a=l.exports},jXtQ:function(t,e,i){"use strict";var a=i("WhvB");i.n(a).a},l0DI:function(t,e,i){"use strict";var a=i("Kyc1");i.n(a).a},"qV/K":function(t,e,i){i("Tpec"),i("Urde"),t.exports=i("Yded")},rerW:function(t,e,i){t.exports={default:i("qV/K"),__esModule:!0}},rseW:function(t,e,i){"use strict";var a=i("5UkA");i.n(a).a},tEl0:function(t,e,i){"use strict";i.d(e,"c",function(){return n}),i.d(e,"b",function(){return r}),i.d(e,"d",function(){return s}),i.d(e,"a",function(){return o});var a=i("+WsE");function n(t){var e=t.name;return a.a.get("training/common/getTrainingCurriculumByName/"+e)}function r(t){var e=t.storeId;return a.a.get("training/common/getTrainingCurriculumByStoreId/"+e)}function s(t){var e=t.id;return a.a.get("training/common/getTeacherByCurriculumId/"+e)}function o(t){var e=t.phone;return a.a.get("training/common/getTrainingStudentByPhone/"+e)}},u8Kd:function(t,e,i){"use strict";i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n});var a="https://upload.my51share.com/pic",n="https://upload.my51share.com/file"},xGbm:function(t,e,i){"use strict";i.d(e,"a",function(){return a});i("LGhb"),i("Mpsw");function a(t){var e=new Date(t);return e.getFullYear()+"-"+((e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-")+((e.getDate()<10?"0"+e.getDate():e.getDate())+" ")+((e.getHours()<10?"0"+e.getHours():e.getHours())+":")+((e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":")+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())}},zINK:function(t,e,i){"use strict";var a=i("f1yn");i.n(a).a}}]);