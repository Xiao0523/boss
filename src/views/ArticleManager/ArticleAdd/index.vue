<template>
 <div>
   <articleTemplet
     :source="'add'"
     @upDateFrom="upDateFrom"
   ></articleTemplet>
 </div>
</template>

<script>
  import articleTemplet from'@/components/common/articleTemplet'
  export default {
    name: "ArticleAdd",
    components: {
      articleTemplet
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
        // 表单数据
        formData:{}
      }
    },
    methods: {
      upDateFrom(newFrom) { // 新的表单数据
//        console.log('upDateFrom',newFrom);
        this.formData = newFrom
//        console.log(this.formData);
        this.addArticleFn()
      },
      addArticleFn(){
//        console.log(2);
        console.log(this.userInfo);
        let realname = JSON.parse(this.userInfo).realname
        this.formData.createpeople=realname
        console.log(this.formData,'添加文章')
        this.$req.post('addBackHuoDong',this.formData).then(res=>{
          console.log(res);
          this.$success('发布成功')
          this.$router.go(-1)
        }).catch(err=>{}
        )
      }
    },
    watch: {},
    activated() {

    },
    created() {}

  }
</script>

<style type="text/scss" lang="scss" scoped>
  .top-box{
    display: flex;
    justify-content: space-between;
  .left{
    flex: 3;
    background-color: #fff;
    height: 100%;
  el-form-item{
    padding-right: 20px;
  }

  }
  .right{
    flex: 1;
    margin-left: 60px;
  }
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
