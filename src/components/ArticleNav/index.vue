<template>
  <div>
    <el-row :gutter="20">
      <el-input class="input"
                :placeholder="placeholder"
                v-model="param.key"
                @keyup.enter.native="inputFn"
                clearable>
      </el-input>
        <el-select v-model="param.tagId" clearable placeholder="请选择标签"   @change="tagChangeFn">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.cname"
            :value="item.id"
          >
          </el-option>
        </el-select>

      <el-select v-model="param.isPutaway" clearable placeholder="请选择显示状态"
                 @change="displayChangeFn"
      >
        <el-option
          v-for="item in  displayStatus"
          :key="item.isPutaway"
          :label="item.text"
          :value="item.isPutaway">
        </el-option>
      </el-select>
      <el-select v-model="param.isTop" clearable placeholder="请选择置顶状态"
                 @change="topChangeFn"
      >
        <el-option
          v-for="item in topState"
          :key="item.isTop"
          :label="item.text"
          :value="item.isTop">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="param.startTime"
        type="datetime"
        placeholder="开始日期"
        @change="dateChangeBeginTime"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-date-picker
        v-model="param.endTime"
        type="datetime"
        placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateChangeEndTime"
      >
      </el-date-picker>
    <!--  <el-select v-model="param.articleSource" clearable placeholder="请选择来源"
                 @change="sourceChangeFn"
      >
        <el-option
          v-for="item in source"
          :key="item.articleSource"
          :label="item.text"
          :value="item.articleSource">
        </el-option>
      </el-select>-->
      <el-select v-model="param.videoDuring" clearable placeholder="分类"
                 @change="sortChangeFn"
      >
        <el-option
          v-for="item in sort"
          :key="item.videoDuring"
          :label="item.text"
          :value="item.videoDuring">
        </el-option>
      </el-select>
    </el-row>

    <el-row style="margin-top: 30px;">
      <el-date-picker
        v-model="param.startDay"
        type="datetime"
        placeholder="更新开始日期"
        @change="dateChangeBeginDay"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-date-picker
        v-model="param.endDay"
        type="datetime"
        placeholder="更新结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateChangeEndDay"
      >
      </el-date-picker>
      <el-button type="warning" @click="resettingFn">重置</el-button>
      <el-button type="primary" @click="addFn">{{btnText}}</el-button>
      <el-button type="danger" @click="delsFn">批量删除</el-button>
      <el-button @click="upFn" v-if="isShowTopBtn">{{TopBtnText}}</el-button>
      <el-button @click="putawayFn" v-if="isShowDisplayBtn">{{DisplayBtnText}}</el-button>
      <el-button @click="orderFn">预约</el-button>
      <el-dropdown>
        <el-button type="primary" >
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in dropdown" :key="item.id" @click.native="moreFn(item.text)">{{item.text}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
    <menusDialog
      :isShow="visible"
      :title="dialogTitle"
      @cancelFn="visible = false"
      @confirmFn="confirmFn"
    >
      <el-transfer
        v-model="selectTransfer"
        :data="transferData"
        :titles=titles
        :button-texts="['移除', '添加']"
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
        @change="transferChange"
      ></el-transfer>
    </menusDialog>
   <!--预约的弹窗-->
    <menusDialog
      :isShow="orderVisible"
      :title="'预约'"
      @cancelFn="orderVisible = false"
      @confirmFn="orderConfirmFn"
    >
      <section>
    日期：   <el-date-picker
     v-model="order.putawayTime"
     type="datetime"
     placeholder="请选择预约日期时间"
     value-format="yyyy-MM-dd HH:mm:ss"
     @change="dateChangeputawayTime"
   >
   </el-date-picker>
        <div style="margin-top: 20px;">
          <el-radio-group v-model="order.isPutaway">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="0">下架</el-radio>
          </el-radio-group>
        </div>
      </section>
    </menusDialog>
  </div>
</template>

<script>
  import menusDialog from '@/components/common/dialog'
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "searchNav",
    props: {
      from: {
        type: String // 来自哪个页面，根据这个参数的不同，调用不同的接口
      },
      ids:{
        type:Array // 多选的id
      },
      param: {
        type:Object,
        default(){
          return{
            key:'',
            startTime:'',
            endTime:'',
            startDay:'',
            endDay:'',
            tagId:'',
            isPutaway:'',// 上下架
            articleSource:'',// 爬虫，后台
            isTop:'',
            videoDuring:'',// 文章小视频
            pageNum:1,
            pageSize:10,
          }
        }
      }
    },
    components: {
      menusDialog
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        order:{
          putawayTime:'',
        },
        displayStatus: [ {isPutaway: 1,text: '已上架'}, {isPutaway: 0,text: '未上架'}],
        topState: [ {isTop: 1, text:'置顶'}, {isTop: 0, text:'未置顶'}],
        source: [ {articleSource:1,text: '后台上传'}, {articleSource:2,text: '爬虫'}],
        sort: [ {videoDuring: 1, text: '文章'}, {videoDuring: 2, text: '视频'}],
        isShowDisplayBtn:false,
        DisplayBtnText:'',
        isShowTopBtn:false,
        TopBtnText:'',
        visible: false,
        orderVisible:false, // 预约弹窗
        moreBtnText:'',
        generateAdvflag: false, // 穿梭框异步加载数据设置，只执行一次，防止报错
        generateTagflag: false, // 穿梭框异步加载数据设置，只执行一次，防止报错
        dialogTitle: '',
        tagList:[],
        titles:[], // 穿梭框左右标题
        transferData:[],
        selectTransfer:[], // 关联广告的id
        dropdown: [ {id: 1, text: '批量关联标签'}],
        // param:{
        //   key:'',
        //   startDay:'',
        //   endDay:'',
        //   tagId:'',
        //   isPutaway:'',// 上下架
        //   articleSource:'',// 爬虫，后台
        //   isTop:'',
        //   videoDuring:'',// 文章小视频
        //   pageNum:1,
        //   pageSize:10,
        //
        // }
      }
    },
    watch: {},
    methods: {
      // 重置当前页为1
      setCurrentPage1Fn() {
        let param = getSession('param')
        if (param === 'undefined' || param === undefined) {
          param = {}
        }
        param.pageNum = 1
        setSession('param', param)
        console.log('cz',getSession('param'))
      },
      // 重置
      resettingFn(){
        clearOneSession('param')
        clearOneSession('currentPage')
        this.$emit('updateListFn')
      },
      // 置顶/取消置顶
      upFn() {
        let state = null
        console.log('ids',this.ids);
        if(!this.ids.length){
         return this.$wran('请先勾选文章')
        }else if(this.param.isTop === ''){
          return this.$wran('请先选择置顶状态')
        }else if(this.param.isTop == 1 ){
          state = 0
        }else if(this.param.isTop == 0){
          state = 1

        }
        this.$req.post('articleTop', {ids: this.ids,state:state}).then(res => {
          this.$success(res.data.message)
          this.$emit('updateListFn')
          }
        ).catch(err => {
          console.log(err);
        })
      },
      // 批量上架/下架
      putawayFn(){
        let state = null
        if(!this.ids.length){
         return this.$wran('请先勾选文章')
        }else if(this.param.isPutaway===''){
          return this.$wran('请先选择上架状态')
        } else if(this.param.isPutaway == 1){
          state = 0
        }else if(this.param.isPutaway == 0){
          state = 1
        }
        this.$req.post('putAway', {ids: this.ids,state:state}).then(res => {
          // console.log(res);
          this.$success(res.data.message)
          this.$emit('updateListFn')
        }).catch(err => {
          console.log(err);
        })
      },
      // 预约
      orderFn(){
        if(!this.ids.length) {
          return this.$wran('请先勾选文章')
        }
        this.orderVisible=true

      },
      // 确定预约
      orderConfirmFn(){
        let url = 'orderPutaway'
        let realname = JSON.parse(this.userInfo).realname
        this.order.articleIds=this.ids
        this.order.creator=realname
        this.$req.post(url,this.order).then(res=>{
          // console.log(res);
          this.$success(res.data.message)
          this.$emit('updateListFn')
        }).catch(err=>{
          console.log(err);})
        this.orderVisible=false
      },
      // 标题搜索
      inputFn(){
        if (event.keyCode == "13" && this.param.key){
          this.param.key = this.param.key
          // setSession('currentPage',1); //
          this.searchFn()
        }
      },
      tagChangeFn() {
        if(this.param.tagId === ''){return}
        if (this.param.tagId!= -2) {
          this.param.tagId =this.param.tagId
          // console.log(this.param.tagId);
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      // 上下架状态
      displayChangeFn() {
        if(this.param.isPutaway === ''){return}
        if (this.param.isPutaway != -2) {
          this.isShowDisplayBtn = true
          this.param.isPutaway =this.param.isPutaway
          if(this.param.isPutaway == 1){
            this.DisplayBtnText = '下架'
          }else{
            this.DisplayBtnText = '上架'
          }
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      topChangeFn() {
        if(this.param.isTop === ''){return}
        if (this.param.isTop != -2 ) {
          this.isShowTopBtn = true
          this.param.isTop = this.param.isTop
          if(this.param.isTop == 1){
            this.TopBtnText = '取消置顶'
          }else{
            this.TopBtnText = '置顶'
          }
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      // 文章来源
/*      sourceChangeFn() {
      if(this.param.articleSource === ''){return}
        if (this.param.articleSource != -2) {
          this.param.articleSource = this.param.articleSource
        }
        // setSession('currentPage',1);
        this.searchFn()
      },*/
      // 文章小视频
      sortChangeFn(){
        if(this.param.videoDuring === ''){return}
        if (this.param.videoDuring != -2 ) {
          this.param.videoDuring = this.param.videoDuring
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeBeginTime(start){
        if(!start){return}
        this.param.startTime =start
        // setSession('currentPage',1);
        // this.searchFn()
      },
      dateChangeEndTime(end){
        if(!end){return}
        this.param.endTime = end
        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeBeginDay(start){
        if(!start){return}
        this.param.startDay =start
        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeEndDay(end){
        if(!end){return}
        this.param.endDay = end
        // setSession('currentPage',1);
        this.searchFn()
      },
      // 预约时间
      dateChangeputawayTime(putawayTime){
        this.order.putawayTime = putawayTime
      },
      generateData() {
        if (this.moreBtnText == '批量关联标签') {
//        console.log('标签');
          let len = this.tagList.length
          for (let i = 0; i < len; i++) {
            let tag = this.tagList[i]
            this.transferData.push({
              key: tag.id,
              label: tag.cname
            })
          }
        }
      },
      transferChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        if ( direction == 'right' ) {
          this.selectTransfer = movedKeys
        }
      },
      moreFn(text) {
        // console.log('文章ids',this.ids);
        this.moreBtnText= text
        if(!this.ids.length){
          return this.$wran('请先勾选文章')
        }else{
          this.visible = true
        }
        this.selectTransfer=[] // 清除上一次关联的数据
        /*  if(!this.generateAdvflag){
            this.generateData()
            this.generateAdvflag=true
          }*/
        if (text == '批量关联标签' || !this.generateTagflag) {
          this.dialogTitle = '请选择要关联的标签'
          this.titles = ['所有标签列表', '关联标签列表']
          this.transferData = []
          this.generateData()
          this.generateTagflag = true
        }
      },
      // 批量关联广告调用api
      confirmFn() {
        if( this.moreBtnText == '批量关联广告'){
          this.relevanceAdvs()
        }else if(this.moreBtnText == '批量关联标签'){
          this.relevanceTags()
        }
      },
      addFn() {
        switch ( this.from ) {
          case 'ArticleList':
            this.$router.push('/ArticleManager/ArticleAdd')
            break;
          case 'AppList':
            this.$router.push('/AppManager/AppAdd')
            break;
          case 'reportList':
            this.$router.push('/reportsManager/reportsAdd')
        }
      },
      // 派发批量删除的事件
      delsFn() {
        this.$emit('delsFn')
      },
      searchFn(event) {
        let url = ''
        switch ( this.from ) {
          case 'ArticleList':
            url = 'fuzzySearchHuoDong'
            break;
          case 'AppList':
            url = 'selectAppByTitle'

            break;
          case 'reportList':
            url = 'selectbaodaobytitle'

        }
        for (let prop in this.param) {
          if (this.param[prop] === '' || this.param[prop] === null) {
            delete this.param[prop]
          }
        }
        this.param.pageNum = 1
        setSession('param', this.param)
        this.$emit('searchFn', getSession('param'))
//        this.$emit('searchFn',this.param)
      },
      // 批
      relevanceAdvs(){
        if(this.ids.length == 0 || this.selectTransfer.length == 0){
          return
        }
        this.$req.post('ContactArticleAndAdvertisement',{
          'advertisementIds':this.selectTransfer,
          'articleIds':this.ids
        }).then(res=>{
//          console.log(res);
          this.$success(res.data.message)
          this.$emit('updateListFn')
          this.visible=false

        }).catch(err=>{
          console.log(err);})
      },
      // 批量关联标签api
      relevanceTags(){
        if(!this.selectTransfer.length){
          return this.$wran('必选添加所关联的标签/广告')
        }
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('ContactArticleAndTag',{
          'tagIds':this.selectTransfer,
          'articleIds':this.ids,
          "creator": realname
        }).then(res=>{
//          console.log(res);
          this.$success('关联标签成功')
          this.$emit('updateListFn')
          this.visible=false

        }).catch(err=>{
          console.log(err);})
      },
      // 获取标签列表
      getTagFn(){
        this.$req.get('v2/shareCategory/1/999').then(res=>{
          this.tagList=res.data.data.records
          this.tagList.unshift({id:-1,cname:'无标签'});
//          console.log(this.tagList);
        }).catch(err=>{
          console.log(err);})
      }
    },
    created() {
      switch ( this.from ) {
        case 'ArticleList':
          this.text = '文章标题'
          this.placeholder = '请输入文章标题'
          this.btnText = '添加文章'

          break;
        case 'AppList':
          this.text = '应用名'
          this.placeholder = '请输入应用名'
          this.btnText = '添加应用'
          break;
        case 'reportList':
          this.text = '报道标题'
          this.placeholder = '请输入报道标题'
          this.btnText = '添加报道'
          break;
      }
      this.getTagFn()
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .input{
    width:210px;
  }
  .input-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    span{
      display: inline-block;
      width: 160px;
      box-sizing: border-box;
      text-align: center;
    }
  }
</style>

