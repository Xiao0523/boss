<template>
  <div>
    <categoryTemplet
      :form="data"
      :source="'edit'"
      @confirmFn="confirmFn"
    ></categoryTemplet>
  </div>
</template>

<script>
import categoryTemplet from '../categoryTemplet'
  export default {
    name: "categoryEdit",
    components: {
      categoryTemplet
    },
    computed: {},
    data() {
      return {
      query:{},
        data:{}
      }
    },
    methods: {
      confirmFn(val){
        console.log(val);
        this.$req.post(`v2/shareCategory/update`,val).then(res=>{
          console.log(res);
          this.$success('更新成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err);
        })
      },
      inintData(){
        this.$req.get(`v2/shareCategory/detail/${this.query.id}`).then(res=>{
         this.data=  res.data.data
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {
   this.query  =this.$route.query
      this.inintData()
    }

  }
</script>

<style lang="scss" scoped>

</style>
