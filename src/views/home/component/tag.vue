<template>
<div>
  <section>
    <el-row >
      <el-col :span="8" >
        <p class="title">文章转发榜</p>
        <ul>
          <li class="item" v-for="item in forwardViews" @click="goDetails(item.hdId)">
            <span v-if="item.tags.length">{{item.tags}} -</span>
            <span>{{item.title}}</span>
            <span>{{item.count}}</span>
          </li>
        </ul>
      </el-col>
      <el-col :span="8" :offset="3">
        <p class="title">文章阅读榜</p>
        <ul>
          <li class="item"  v-for="item in readViews"  @click="goDetails(item.hdId)">
            <span v-if="item.tags.length">{{item.tags}} -</span>
            <span>{{item.title}}</span>
            <span>{{item.count}}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
    <tagCharts :chartData=pageData></tagCharts>
  </section>

  <section class="comment">
    <!--<uploadArticle :chartData=ArticleHandAndCrawler :width=uploadArticle_width></uploadArticle>-->
    <!--<withdrawal :chartData1=cashDay :width=withdrawal_width></withdrawal>-->
    <!--<withdrawalTotal :chartData1=cashTotal :width=withdrawal_width></withdrawalTotal>-->
    <div class="tagBox">
      <el-tag type="success" class="tag">手动上传每日新增文章：{{ArticleAdd.articleByDayHand}}</el-tag>
      <el-tag type="danger" class="tag">手动上传总文章：{{ArticleAdd.totalArticleHand}}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">爬虫每日新增文章：{{ArticleAdd.articleByDayCrawler}}</el-tag>
      <el-tag type="danger" class="tag">爬虫总文章：{{ArticleAdd.totalArticleCrawler }}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">日提现金额：{{cashLaunch.cashByDay }}</el-tag>
      <el-tag type="danger" class="tag">总提现金额：{{cashLaunch.totalCash}}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">日未支付：{{cashLaunch.cashLaunchByDay}}</el-tag>
      <el-tag type="danger" class="tag">总未支付：{{cashLaunch.totalCashLaunch}}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">文章日转发：{{forwardNum.forwardByDay}}</el-tag>
      <el-tag type="danger" class="tag">文章总转发：{{forwardNum.forwardTotal}}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">文章日阅读朋友圈：{{readNum.circleByDay }}</el-tag>
      <el-tag type="danger" class="tag">文章总阅读朋友圈：{{readNum.circleTotal }}</el-tag>
    </div>
    <div class="tagBox">
      <el-tag type="success" class="tag">文章日阅读微信：{{readNum.groupByDay}}</el-tag>
      <el-tag type="danger" class="tag">文章总阅读微信：{{readNum.groupTotal}}</el-tag>
    </div>
  </section>
</div>


</template>

<script>
     import tagCharts from './tagCharts'
     import uploadArticle from './uploadArticle'
     import withdrawal from './withdrawal'
     import  withdrawalTotal from './withdrawal/total'


    export default {
        name: "tag",
        components: {
          tagCharts, // 栏目
          uploadArticle, //
          withdrawal, // 每日提现
          withdrawalTotal // 总提现
        },
        computed: {
          ArticleHandAndCrawler() {
            let obj = {}
            let Articleadd = []
            let Articletotal = []
            let initiateWithdrawal=[]
            Articleadd.push(this.ArticleAdd.articleByDayHand, this.ArticleAdd.articleByDayCrawler)
            Articletotal.push(this.ArticleAdd.totalArticleHand, this.ArticleAdd.totalArticleCrawler)
            obj.Articleadd = Articleadd
            obj.Articletotal = Articletotal
            obj.xText = ['手动上传', '爬虫']
            return obj
          },
          cashDay() {
            let obj = {}
            let cashLaunchByDay = []
            let cashByDay = []
            cashLaunchByDay.push(this.cashLaunch.cashLaunchByDay)
            cashByDay.push(this.cashLaunch.cashByDay)
            obj.cashLaunchByDay = cashLaunchByDay
            obj.cashByDay = cashByDay
            obj.xText = ['每日提现']
            return obj
          },
          cashTotal() {
            let obj = {}
            let totalCash = []
            let totalCashLaunch = []
            totalCashLaunch.push(this.cashLaunch.totalCashLaunch)
            totalCash.push(this.cashLaunch.totalCash)
            obj.totalCashLaunch =totalCashLaunch
            obj.totalCash =totalCash
            obj.xText = ['总提现']
            return obj
          }
        },
        data() {
            return {
              pageData:{},
              forwardViews:[], // 转发榜
              readViews:[], // 阅读榜
              ArticleAdd:{},// 上传文章数据
              cashLaunch:{},// 提现数据
              forwardNum:{}, // 转发数据
              readNum:{}, // 阅读数据
              uploadArticle_width:'20%' ,
              withdrawal_width:'12%'

            }
        },
        methods: {
          goDetails(id){
            this.$router.push({
              path: '/ArticleManager/ArticleDetails',
              query: {
                id: id
              }
            })
          },
          initData(){
            this.$req.get('statistics/info').then(res=>{
            this.pageData=res.data.data
              this.forwardViews=this.pageData.forwardViews
              this.readViews=this.pageData.readViews
            }).catch(err=>{
              console.log(err);
            })
          },
          // 文章爬虫和上传
          getArticleAddNumFn() {
            this.$req.get('statistics/getArticleAddNum').then(res=>{
              this.ArticleAdd=res.data.data
            }).catch(err=>{
              console.log(err);
            })
          },
          // 提现
          getCashLaunch() {
            this.$req.get('statistics/getCashLaunch').then(res => {
              console.log(res.data.data)
              this.cashLaunch = res.data.data
            }).catch(err => {
              console.log(err)
            })
          },
          // 转发统计
          forwardTypeNum() {
            this.$req.get('statistics/forwardTypeNum').then(res => {
              this.forwardNum = res.data.data
            }).catch(err => {
              console.log(err)
            })
          },
          // 阅读统计
          readNumCount(){
            this.$req.get('statistics/readNumCount').then(res => {
              this.readNum = res.data.data
              console.log(this.readNum)
            }).catch(err => {
              console.log(err)
            })
          }
        },
        created() {
          this.initData()
          this.getArticleAddNumFn()
          this.getCashLaunch()
          this.forwardTypeNum()
          this.readNumCount()
        }

    }
</script>

<style type="text/scss" lang="scss" scoped>
  .tagBox{
    margin-right: 50px;
    .tag{
      font-size: 16px;
      margin-top: 20px;
    }
  }

  .comment{
    display: flex;
    flex-direction: row;

  }
.title{
  font-size:16px;
  font-weight: bold;
}
  .item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span{
      display: inline-block;
      line-height: 30px;
      cursor:pointer;

    }
  }
  .tag{
    margin-right: 20px;
    cursor:pointer;
  }
</style>
