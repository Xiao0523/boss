<template>
  <div>
    <el-row>
       <el-button type="primary" @click="addReward">新增大转盘奖励</el-button>
    </el-row>
    <el-table
      class="table-box"
      border
      :data="rewardArr"
      :header-cell-style="tabHeader">
      
      <el-table-column align="center" label="类型" prop="type">
        <template slot-scope="scope">
          {{scope.row.type|formatType}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="奖励" prop="unit">
        <template slot-scope="scope">
          {{scope.row | formatReward}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="操作"> <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Dialog :title="'奖励编辑'" :width="'40%'" :is-show="isShow" @cancelFn="close('rewardForm')" @confirmFn="onSubmit('rewardForm')">
      <div>
        <el-form label-position="left" label-width="120px" :model="reward" :rules="rules" ref="rewardForm">
          <el-form-item label="奖励类型" prop="type">
            <el-select v-model="reward.type" placeholder="请选择">
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item 
            v-if="reward.type == 2" 
            label="奖励" 
            prop="unit" 
            :rules="[{required: true, pattern: /^([1-9]\d+)$/, message: '请填写奖励，值应为大于0的整数！', trigger: 'blur'}]">
            <el-input v-model.number.trim="reward.unit">
              <template slot="append">张</template>
            </el-input>
          </el-form-item>
          <el-form-item 
            v-else 
            label="奖励" 
            prop="unit" 
            :rules="[{required: true, pattern: /^\d+(\.\d{1,2})$/, message: '请填写奖励！', trigger: 'blur'}]"> 
            <el-input v-model.number.trim="reward.unit">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/components/common/dialog"
import {getTurnTableReward, postTurnTableReward, delTurnTableReward, patchTurnTableReward} from '@/api/turnTableReward'
export default {
  name: 'turnTableRewardList',
  components: {
    Dialog
  },
  data() {
    return {
      rewardArr: [],//奖励数据列表
      reward: {//奖励项
        type: '',
        unit: '',
      },
      typeArr: [{//奖励类型
        label: '红包',
        value: 0,
      }, {
        label: '随机红包',
        value: 1,
      },{
        label: '卡片',
        value: 2,
      }],
      isShow: false,//上传弹窗开关,
      rules: {
        type: [
          {required: true, message: '请选择奖励类型！', trigger: 'blur'}
        ],
      },
      tabHeader: {
        "background-color": "#F4F4F4",
        'color': "#666666",
        'border-top': "1px solid #BBBBBB",
        'border-bottom': "1px solid #BBBBBB",
        "font-size": "16px",
        "text-align": "center"
      },
    }
  },
  filters: {

    // 格式化奖励类型
    formatType(val) {
      let type = {
        0: '红包',
        1: '随机红包',
        2: '卡片'
      }

      return type[val] ? type[val] : '未知'
    },

    // 格式化奖励内容
    formatReward(reward) {
      let unitData = {
        0: '元',
        1: '元',
        2: '张'
      }

      let unit = reward.unit ? reward.unit : 0;
      return unit + unitData[reward.type]
    }
  },
  methods: {
    //添加 大转盘奖励
    addReward() {
      this.reward = {//奖励项
        type: '',
        unit: '',
      }
      this.isShow = true
    },

    // 点击编辑 按钮
    edit(index, row) {
      this.reward = Object.assign({}, row)
      this.isShow = true
    },

    //编辑大转盘奖励 
    editReward(reward) {
      patchTurnTableReward(reward)
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }

        this.close('rewardForm')
        this.$success('操所成功！');
        this.init()
      })
    },

    //删除大转盘奖励
    del(index, row) {
      this.$confirm('确定要删除该奖励吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {

        // 发起删除
        delTurnTableReward(row.id)
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          this.$success('操作成功！');

          this.rewardArr.splice(index, 1);
        })
        .catch((err) => {})
      })
      .catch((err) => {})
    },

    // 新增奖励
    createReward(reward) {
      postTurnTableReward(reward)
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }

        this.close('rewardForm')
        this.$success('操所成功！');
        this.init()
      })
    },

    //弹窗点击确定
    onSubmit(form) {
      this.$refs[form].validate( valid => {
        if(!valid) return

        let reward = Object.assign({}, this.reward)  

        if(!reward.id) {
          return this.createReward(reward)
        }
        this.editReward(reward)
      })
    },

    //关闭弹窗 并恢复初始状态
    close(form) {
      this.isShow = false;
      this.$refs[form].resetFields();
    },

    // 初始化 获取所有 大转盘奖励列表
    init() {
      getTurnTableReward()
      .then(res => {
        if(res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data || !res.data.data.length) return;
        this.rewardArr = res.data.data
      })
    }
  },

  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
.table-box {
  margin-top: 20px;
}


</style>


