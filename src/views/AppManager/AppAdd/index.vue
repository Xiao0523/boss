<template>
<div>
  <appTemplet
    :source="'add'"
    @upDateFrom="upDateFrom"
  ></appTemplet>

</div>
</template>

<script>
  import appTemplet from '@/components/common/appTemplet'
  export default {
    name: "AppAdd",
    components: {
      appTemplet
    },
    computed: {},
    data() {
      return {
        formData:{}
      }
    },
    methods: {
      upDateFrom(val){
        this.formData=val
//        console.log('父组件获取的表单数据',this.formData);
        this.$req.post('addBackApp',this.formData).then(res=>{
          console.log(res);
          this.$success('发布App成功')
          this.$router.back()
        }).catch(err=>{
          console.log(err)})

      }
    },
    created() {
    }

  }
</script>

<style lang="scss" scoped>

</style>
