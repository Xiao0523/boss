<template>
<div>
  <el-table
    :data="memberShareIp"
    style="width: 100%"
    max-height="700"
  >
    <el-table-column
      prop="ip"
      label="ip"
      >
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
      width="180">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'recordTheDetail',
    props:{
      memberShareIp:{
        type:Array,
        default(){
          return {}
        }
      }
    },
    computed: {
      // 登录信息
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    data() {
      return {
      }
    },
    methods:{},
    watch:{},
    created() {
    }
  }
</script>

<style scoped>

</style>
