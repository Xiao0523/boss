<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('articleContent')">
        <div class="card-panel-icon-wrapper icon-article">
          <svg-icon icon-class="article" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">文章总数 <span>{{pageData.articlesCount}}</span> </div>
          <!--<count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"/>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('memberContent')">
        <div class="card-panel-icon-wrapper icon-member">
          <svg-icon icon-class="member" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">会员总数{{pageData.membersCount}}</div>
          <!--<count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"/>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('depositContent')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">提现总额{{pageData.cashCount}}</div>
          <!--<count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"/>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('tagContent')">
        <div class="card-panel-icon-wrapper icon-tag">
          <svg-icon icon-class="tag" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">栏目标签{{tagLength}}</div>
          <!--<count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>-->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//import CountTo from 'vue-count-to'

export default {
  components: {
//    CountTo
  },
  props:{
    pageData:{
      type:Object
    }
  },
  computed:{
    tagLength(){
      if(this.pageData.tags){
        let tags =this.pageData.tags
//        console.log('tag',tags);
        return tags.length
      }
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('changeTab', type)
    }
  }
}
</script>

<style type="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-article {
         background: #40c9c6;
      }
      .icon-member {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4ea2a;
      }

      .icon-tag {
        background: #ebccd1;
      }
    }
    .icon-article{
      color: #40c9c6;
    }
    .icon-member {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4ea2a;
    }
    .icon-tag {
      color: #ebccd1;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
