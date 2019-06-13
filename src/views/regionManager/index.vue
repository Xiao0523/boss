<template>
  <div>
    <el-row>
      <el-col :span="3">
        <el-select v-model="provinceCode" clearable placeholder="请选择省份">
          <el-option
            v-for="item in provinceList"
            :key="item.provinceCode"
            :label="item.provinceName"
            :value="item.provinceCode">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="cityCode" clearable placeholder="请选择城市">
          <el-option
            v-for="item in cityList"
            :key="item.cityCode"
            :label="item.city"
            :value="item.cityCode">
          </el-option>
        </el-select>
      </el-col>
      <el-button type="primary" plain @click="cityDetailsFn(cityCode)">查看/编辑</el-button>
    </el-row>
    <!--详情-->
    <section v-if="isShowDetails" class="detailsBox">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="row">
          <el-form-item label="所在位置" class="item" >
            <el-input v-model="form.province" disabled ></el-input>
          </el-form-item>
          <el-form-item label="-" >
            <el-input v-model="form.city" disabled >     </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="经度区间" class="item" >
            <el-input v-model="form.longitude0" disabled ></el-input>
          </el-form-item>
          <el-form-item label="-" >
            <el-input v-model="form.longitude1" disabled >     </el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="纬度区间" class="item" >
            <el-input v-model="form.latitude0" disabled ></el-input>
          </el-form-item>
          <el-form-item label="-" >
            <el-input v-model="form.latitude1" disabled >     </el-input>
          </el-form-item>
        </div>
        <el-form-item label="城市状态" >
          <el-radio-group v-model="form.status">
            <el-radio :label="0">未发布</el-radio>
            <el-radio :label="1">预热（开始抓取）</el-radio>
            <el-radio :label="2">正式发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市标签" >
          <el-input v-model="form.tags"  placeholder="请输入城市标签"></el-input>
          <span class="tip">*注意：多个标签之间请用 <b>英文逗号</b> ( , ) 隔开 </span><span>例如：标签1,标签2</span>
        </el-form-item>
        <el-button type="primary" @click="updateFn">更新</el-button>
      </el-form>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'index',
    computed: {
    },
    data(){
      return{
        provinceCode:'',
        cityCode:'',
        provinceList:[], // 省列表
        cityList:[], // 市列表
        form:{},
        isShowDetails:false,
      }
    },
    watch:{
      provinceCode(val1,val2){
        if(val1 !=''){
          this.selectCity(val1)
        }
      }
    },
    methods: {
      updateFn(){
        this.$req.post('/updateCity',this.form).then(res => {
          this.$success(res.data.message)
        }).catch(err => {
        })
      },
      // 城市详情
      cityDetailsFn(cityCode){
        this.$req.get(`/selectDetail/${this.cityCode}`).then(res => {
          this.form= res.data.data[0]
          this.isShowDetails=true
          console.log(  this.form)
        }).catch(err => {
        })
      },
      // 选择省
      selectProvince() {
        this.$req.get('/selectProvince').then(res => {
          this.provinceList = res.data.data
        }).catch(err => {
        })
      },
      // 选择市
      selectCity(val) {
        this.cityCode = ''
        this.$req.get(`/selectCity/${this.provinceCode}` ).then(res => {
          this.cityList = res.data.data
        }).catch(err => {
        })
      }
    },
    created() {
      this.selectProvince()
    }
  }
</script>

<style scoped lang="scss">
  .detailsBox {
    margin-top: 60px;
    .row {
      display: flex;
      flex-direction: row
    }
    .tip{
      color: red;
    }
  }

</style>
