<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-select v-model="param.audit_stauts" placeholder="请选择审核状态" clearable
                   @change="stateChangeFn"
        >
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {setSession,getSession,clearOneSession} from '@/utils/session'
  export default {
    name: "kuaKuaMiNav",
    props: {
      from: {
        type: String // 来自哪个页面，根据这个参数的不同，调用不同的接口
      },
      param:{
        type:Object,
        default(){
          return {
            audit_stauts:0,
            pageSize: 10,
            pageNum: 1,
          }
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
        stateOptions: [{ value: 0, label: '未审核' },
          { value: 1, label: '审核通过' }, { value: 2, label: '审核失败' }]
      }
    },
    watch: {},
    methods: {
      stateChangeFn(val){
        if(this.param.audit_stauts === ''){return}
          this.param.audit_stauts=val

        // setSession('currentPage',1);
        this.searchFn()
      },
      searchFn(event) {
        for (let prop in this.param) {
          if (this.param[prop] === '' ||this.param[prop] ===null ) {
            delete this.param[prop]
          }
        }
        this.param.pageNum = 1
        setSession('param', this.param)
        this.$emit('searchFn',getSession('param'))
      },
      filter(){
          this.searchFn()
      },
    },
    created() {

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


