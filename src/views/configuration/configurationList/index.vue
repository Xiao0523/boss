<template>
  <div>
    <el-form class="config" label-position="left" :model="content" label-width="260px">
      <el-form-item label="开奖配置 lotteryCron">
        <el-input v-model.trim="content.lotteryCron"></el-input>
      </el-form-item>
      <el-form-item label="最多观看视频数 maxReadVideo">
        <el-input v-model.trim="content.maxReadVideo"></el-input>
      </el-form-item>
      <el-form-item label="最多评论视频数 maxCommentVideo">
        <el-input v-model.trim="content.maxCommentVideo"></el-input>
      </el-form-item>
      <el-form-item label="最多分享视频数 maxShareVideo">
        <el-input v-model.trim="content.maxShareVideo"></el-input>
      </el-form-item>
      <el-form-item label="最大阅读文章 maxReadArticle">
        <el-input v-model.trim="content.maxReadArticle"></el-input>
      </el-form-item>
      <el-form-item label="最多评论文章数 maxCommentArticle">
        <el-input v-model.trim="content.maxCommentArticle"></el-input>
      </el-form-item>
      <el-form-item label="最多分享文章数 maxShareArticle">
        <el-input v-model.trim="content.maxShareArticle"></el-input>
      </el-form-item>
      <el-form-item label="下期中奖号码 rewardCode">
        <el-input v-model.trim="content.rewardCode"></el-input>
      </el-form-item>
      <el-form-item label="是否公开 rewardStatus">
        <el-input v-model.trim="content.rewardStatus"></el-input>
      </el-form-item>
      <el-form-item label="奖池累计 lottery">
        <el-input v-model.trim="content.lottery"></el-input>
      </el-form-item>
      <el-form-item label="排行榜第一名卡片数 no1">
        <el-input v-model.trim="content.no1"></el-input>
      </el-form-item>
      <el-form-item label="排行榜第二名卡片数 no2">
        <el-input v-model.trim="content.no2"></el-input>
      </el-form-item>
      <el-form-item label="排行榜第三名卡片数 no3">
        <el-input v-model.trim="content.no3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存配置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import {getConfigs, putConfigs} from '@/api/commonConfig'
export default {
  name: 'configurationList',
  data() {
    return {
      content: {
        lotteryCron: '',//开奖cron表达式
        maxReadVideo: '',//最多观看视频数
        maxCommentVideo: '',//最多评论视频数
        maxShareVideo: '',//最多分享视频数
        maxReadArticle: '',//最多阅读文章次数
        maxCommentArticle: '',//最多评论文章数
        maxShareArticle: '',//最多分享文章数
        rewardCode: '',//下期中奖号码
        rewardStatus: '',//是否公开
        lottery: '',//奖池累计
        no1: '',// 排行榜第一名卡片数 
        no2: '',// 排行榜第二名卡片数 
        no3: ''// 排行榜第三名卡片数
        
      },
    }
  },
  methods: {
    // 上传配置内容
    onSubmit() {
      
      putConfigs(this.content).then(res => {
        this.$success('操所成功！')
        this.init()
      });

    },

    //初始化 获取配置内容 
    init() {
      getConfigs().then(res => {
        if(res.data.code) return
        if (!res.data.data) return
        this.content = res.data.data
      })
    }
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.config {
  width: 50%;
}
</style>

