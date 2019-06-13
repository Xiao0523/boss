<template>
<div>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="input-box">
        <span>{{text}}</span>
        <el-input class="input"
                  :placeholder="placeholder"
                  v-model="inputText"
                  clearable>
        </el-input>
      </div>
    </el-col>
    <el-col :span="5" v-if="from =='ArticleList'">
      <el-select v-model="tagId" clearable placeholder="请选择标签">
        <el-option
          v-for="item in tagList"
          :key="item.id"
          :label="item.cName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="9" v-if="from !=='ArticleList'">
      <div class="date-box">
        <span>日期</span>
        <el-date-picker
          v-model="startDate"
          type="datetime"
          placeholder="开始日期"
          value-format="yyyy-MM-dd HH:mm:ss"
         >
        </el-date-picker>
        <el-date-picker
          v-model="endDate"
          type="datetime"
          placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          >
        </el-date-picker>
      </div>
    </el-col>
    <el-col :span="6">
      <div>
        <el-button type="success" @click="searchFn">搜索</el-button>
        <el-button type="primary" @click="addFn">{{btnText}}</el-button>
        <el-button type="danger" @click="delsFn">批量删除</el-button>
      </div>
    </el-col>
  </el-row>
  <!--更多操作按钮-->
  <el-dropdown>
    <el-button type="primary" >
      更多<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in dropdown" :key="item.id" @click.native="moreFn(item.text)">{{item.text}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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
</div>
</template>

<script>
import menusDialog from '@/components/common/dialog'
  export default {
    name: "searchNav",
    props: {
      from: {
        type: String // 来自哪个页面，根据这个参数的不同，调用不同的接口
      },
      ids:{
        type:Array // 多选的id
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
        inputText: '',
        tagId:'',
        startDate: '',
        endDate: '',
        visible: false,
        moreBtnText:'',
        generateAdvflag: false, // 穿梭框异步加载数据设置，只执行一次，防止报错
        generateTagflag: false, // 穿梭框异步加载数据设置，只执行一次，防止报错
        dialogTitle: '',
        advList:[],
        tagList:[],
        titles:[], // 穿梭框左右标题
        transferData:[],
        selectTransfer:[], // 关联广告的id
        dropdown: [{id: 0, text: '批量关联广告'}, {id: 1, text: '批量关联标签'}]
      }
    },
    watch: {},
    methods: {
      selectedtTagFn(id){
        this.tagId=id
      },
      generateData() {
//        console.log(this.moreBtnText);
        if(this.moreBtnText == '批量关联广告'){
        let len = this.advList.length
        for ( let i = 0; i < len; i++ ) {
          let adv = this.advList[i]
          console.log(adv.id);
          this.transferData.push({
            key: adv.id,
            label:adv.title
          });
        }
      }else if(this.moreBtnText == '批量关联标签'){
//        console.log('标签');
        let len = this.tagList.length
        for ( let i = 0; i < len; i++ ) {
          let tag = this.tagList[i]
          this.transferData.push({
            key: tag.id,
            label:tag.cName
          });
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
        console.log('文章ids',this.ids);
        this.moreBtnText= text
        this.visible = true
        this.selectTransfer=[] // 清除上一次关联的数据
      /*  if(!this.generateAdvflag){
          this.generateData()
          this.generateAdvflag=true
        }*/
        if ( text == '批量关联广告' || !this.generateAdvflag ) {
          this.dialogTitle = '请选择要关联的广告'
          this.titles =['所有广告列表', '关联广告列表']
          this.transferData=[] // bug避免点击广告后，再点击标签，广告和标签数据会累加
          this.generateData()
          this.generateAdvflag=true
        } else if(text == '批量关联标签' || !this.generateTagflag) {
          this.dialogTitle = '请选择要关联的标签'
          this.titles =['所有标签列表', '关联标签列表']
          this.transferData=[]
          this.generateData()
          this.generateTagflag=true
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
      searchFn() {
        let parame = {}
        let url = ''
//        if ( !this.inputText && !this.startDate && !this.endDate ) {
//          return
//        }
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
        if ( this.inputText ) {
          parame.key = this.inputText
        }
        // 标签
        if ( this.tagId ) {
          parame.tagId = this.tagId
        }
        if ( this.startDate ) {
          parame.startDay = this.startDate
        }
        if ( this.endDate ) {
          parame.endDay = this.endDate
        }
//        parame.startDay = this.startDate
//        parame.endDay = this.endDate
        parame.pageNum = 1
        parame.pageSize = 10
        this.$req.post(url, parame).then(res => {
          this.$emit('searchFn', res,parame)
        }).catch(err => {
          console.log(err);
        })
      },
      // 批量关联广告api
      relevanceAdvs(){
        if(this.ids.length == 0 || this.selectTransfer.length == 0){
          return
        }
        this.$req.post('ContactArticleAndAdvertisement',{
          'advertisementIds':this.selectTransfer,
          'articleIds':this.ids
        }).then(res=>{
//          console.log(res);
          this.$success('关联广告成功')
          this.$emit('relevanceFn')
          this.visible=false

        }).catch(err=>{
          console.log(err);})
      },
      // 批量关联标签api
      relevanceTags(){
        if(this.ids.length == 0 || this.selectTransfer.length == 0){
          return
        }
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('ContactArticleAndTag',{
          'tagIds':this.selectTransfer,
          'articleIds':this.ids,
          "creator": realname
        }).then(res=>{
//          console.log(res);
          this.$success('关联标签成功')
          this.$emit('relevanceFn')
          this.visible=false

        }).catch(err=>{
          console.log(err);})
      },

      // 获取广告列表
      getAdvFn(){
        this.$req.get('v2/shareAdv/1/999').then(res=>{
          this.advList=res.data.data.records
        }).catch(err=>{
          console.log(err);})
      },
      // 获取标签列表
      getTagFn(){
        this.$req.get('v2/shareCategory/1/999').then(res=>{
          this.tagList=res.data.data.records
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
      this.getAdvFn()
      this.getTagFn()
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
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
