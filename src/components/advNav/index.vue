<template>
  <div>
    <el-row :gutter="20">
      <el-input class="input"
                placeholder="请输入标题"
                v-model="param.title"
                @keyup.enter.native="inputFn"
                clearable>
      </el-input>
     <!-- <el-select v-model="param.layoutType" clearable placeholder="请选择布局方式"
                 @change="layoutTypeChangeFn"
      >
        <el-option
          v-for="item in layoutWay"
          :key="item.layoutType"
          :label="item.text"
          :value="item.layoutType">
        </el-option>
      </el-select>-->
      <el-select v-model="param.sort" clearable placeholder="请选择排序方式"
                 @change="sortChangeFn"
      >
        <el-option
          v-for="item in  sortStatus"
          :key="item.sort"
          :label="item.text"
          :value="item.sort">
        </el-option>
      </el-select>
      <el-select v-model="param.isShow" clearable placeholder="请选择显示状态"
                 @change="displayChangeFn"
      >
        <el-option
          v-for="item in  displayStatus"
          :key="item.isShow"
          :label="item.text"
          :value="item.isShow">
        </el-option>
      </el-select>

    <!--  <el-date-picker
        v-model="param.startDay"
        type="datetime"
        placeholder="开始日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateChangeBeginTime"
      >
      </el-date-picker>
      <el-date-picker
        v-model="param.endDay"
        type="datetime"
        placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="dateChangeEndTime"
      >
      </el-date-picker>-->

   <!--   <el-select v-model="" clearable placeholder="请选择显示状态">
        <el-option
          v-for="item in  displayStatus"
          :key="item.id"
          :label="item.text"
          :value="item.id">
        </el-option>
      </el-select>-->
      <!--<el-button type="success" @click="searchFn">搜索</el-button>-->
      <el-button v-if="DisplayBtnText" @click="putawayFn">{{DisplayBtnText}}</el-button>
      <el-button type="warning" @click="resettingFn">重置</el-button>

      <el-button type="primary" @click="addFn">添加广告</el-button>
      <el-button type="primary" @click="RelationTagFn">批量关联标签</el-button>
      <!--<el-button type="primary" @click="goTagPageFn">批量关联标签</el-button>-->
    </el-row>
    <!--标签弹窗-->
    <menusDialog
      :isShow="visible"
      :title="'关联标签'"
      @cancelFn="visible = false"
      @confirmFn="confirmFn"
    >
      <el-transfer
        v-model="selectTransfer"
        :data="transferData"
        :titles="['所有标签列表', '关联标签列表']"
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
      param:{
        type:Object,
        default(){
          return {
            title: '',
            layoutType: '',
            startDay: '',
            endDay: '',
            isShow:'',
            pageNum: 1,
            pageSize: 10,
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
        transferData:[],
        selectTransfer:[], // 关联标签的id数组
        displayStatus: [{isShow: 1,text: '已上架'}, {isShow: 0,text: '未上架'}],
        layoutWay:[{layoutType:0,text:'详情下部'},{layoutType:2,text:'浮于详情上部'}],
        sortStatus:[{sort:1,text:'更新时间'},{sort:2,text:'创建时间'}],
        // param: {
        //   creator: '',
        //   layoutType: '',
        //   startDay: '',
        //   endDay: '',
        //   pageNum: 1,
        //   pageSize: 10,
        // },
        DisplayBtnText:'',
        isShowDisplayBtn:'',
        visible: false,
        tagList:[],
      }
    },
    watch: {},
    methods: {
      goTagPageFn() {
        if (!this.ids.length) {
          return this.$wran('请先选择广告')
        }
        this.$router.push('/categoryManager/categoryList')
      },
      resettingFn(){
        clearOneSession('param')
        clearOneSession('currentPage')
        this.$emit('updateListFn')
      },
      // 上下架状态
      displayChangeFn() {
        if(this.param.isShow === ''){return}
        if (this.param.isShow != -2) {
          this.isShowDisplayBtn = true
          this.param.isShow =this.param.isShow
          if(this.param.isShow == 1){
            this.DisplayBtnText = '下架'
          }else{
            this.DisplayBtnText = '上架'
          }
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      sortChangeFn(){
        if(this.param.sort=== ''){return}
        this.searchFn()
      },
      // 批量上架/下架
      putawayFn(){
        let state = null
        if(!this.ids.length){
          return this.$wran('请先勾选文章')
        }else if(this.param.isShow===''){
          return this.$wran('请先选择上架状态')
        } else if(this.param.isShow == 1){
          state = 0
        }else if(this.param.isShow == 0){
          state = 1
        }
        this.$req.post('v2/shareAdv/PutAwayAdv', {ids: this.ids,state:state}).then(res => {
          // console.log(res);
          this.$success(res.data.message)
          this.$emit('updateListFn')
        }).catch(err => {
          console.log(err);
        })
      },
      RelationTagFn(){
        if(this.ids.length){
          this.visible =true
        }else{
          return this.$wran('请先选择广告')
        }

        // console.log('获取',this.ids);
        this.transferData=[] // bug避免点击广告后，再点击标签，广告和标签数据会累加
        this.generateData()
      },
      // 批量关联标签
      confirmFn(){
        this.relevanceTags()
      },
      generateData() {
          let len = this.tagList.length
          for ( let i = 0; i < len; i++ ) {
            let tag = this.tagList[i]
            this.transferData.push({
              key: tag.id,
              label:tag.cname
            });
          }
      },
      transferChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        if ( direction == 'right' ) {
          this.selectTransfer = movedKeys
        }
      },
      // 获取标签列表
      getTagFn(){
        this.$req.get('v2/shareCategory/1/999').then(res=>{
          this.tagList=res.data.data.records
        }).catch(err=>{
          console.log(err);})
      },
      // 批量关联标签api
      relevanceTags(){
        if(this.selectTransfer.length == 0){
          return this.$wran('关联标签不能为空')
        }
        let realname = JSON.parse(this.userInfo).realname
        this.$req.post('v2/shareAdv/ContactAdvTag',{
          'tagIds':this.selectTransfer,
          'advIds':this.ids,
          "creator": realname
        }).then(res=>{
//          console.log(res);
          this.$success(res.data.message)
          this.visible=false
          this.$emit('updateListFn')

        }).catch(err=>{
          console.log(err);
          this.visible=false
        })
      },
      // 标题搜索
      inputFn(){
        if (event.keyCode == "13" && this.param.title){
          // setSession('currentPage',1);
          this.searchFn()
        }
      },
      layoutTypeChangeFn(){
        if(this.param.layoutType === ''){return}
        if (this.param.layoutType != -2) {
          this.param.layoutType =this.param.layoutType
          console.log(this.param.layoutType);
        }
        // setSession('currentPage',1);
        this.searchFn()
      },
      dateChangeBeginTime(start) {
        if (!start) {
          return
        }
        this.param.startDay = start
        // setSession('currentPage',1);
        // this.searchFn()
      },
      dateChangeEndTime(end){
        if(!end){ return}
        this.param.endDay = end
        // setSession('currentPage',1);
        this.searchFn()
      },
      selectedtTagFn(id){
        this.tagId=id
      },
      addFn() {
        switch ( this.from ) {
          case 'advList':
            this.$router.push('/advManager/advAdd')
            break;
        }
      },
      // 派发批量删除的事件
      delsFn() {
        this.$emit('delsFn')
      },
      searchFn(event) {
        let url = ''
        switch (this.from) {
          case 'advList':
            url = 'v2/shareAdv/fuzzySearchAdvertise'
        }
        for (let prop in this.param) {
          if (this.param[prop] === '' ||this.param[prop] ===null ) {
            delete this.param[prop]
          }
        }
        this.param.pageNum = 1
         setSession('param', this.param)
        this.$emit('searchFn',getSession('param'))
      },
    },
    created() {
  /*    switch ( this.from ) {
        case 'ArticleList':
          this.text = '文章标题'
          this.placeholder = '请输入文章标题'
          this.btnText = '添加文章'
          break;
      }*/
      this.getTagFn()
    }
  }
</script>

<style type="text/scss" lang="scss" scoped >
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


