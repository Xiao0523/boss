<template>
  <div>
    <el-row>
      <el-button type="primary" @click="edit">编辑</el-button>
      <!-- <el-button type="primary" @click="onSubmit">提交</el-button> -->
    </el-row>

    <el-table
      :data="turnTableArr"
      :header-cell-style="tabHeader"
      class="table-box"
      border>
      <el-table-column align="center" label="索引" prop="index" />
      <el-table-column align="center" label="中奖概率" prop="probability"/>
      <el-table-column align="center" label="奖品" prop="turntableRewardId">
        <template slot-scope="scope">
          {{ getRewardNameById(scope.row.turntableRewardId) | getRewardLabel }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="remark"/>
    </el-table>

    <Dialog :title="'大转盘编辑'" :width="'60%'" :is-show="isShow" @cancelFn="close('turnTableForm')" @confirmFn="onSubmit('turnTableForm')">

      <el-form v-for="(item, idx) in turnTableEditForm" ref="turnTableForm" :inline="true" :key="idx" :model="item" :rules="rules" label-width="100px">
        <el-form-item label="索引">{{ item.index }} </el-form-item>
        <el-form-item label="中奖概率" prop="probability">
          <el-input v-model.number.trim="item.probability"/>
        </el-form-item>
        <el-form-item label="奖品" prop="turntableRewardId" >
          <el-select v-model="item.turntableRewardId" clearable @visible-change="toggle(item, $event)">
            <el-option
              v-for="reward in rewardArr"
              :key="reward.id"
              :value="reward.id"
              :disabled="reward.disabled"
              :label="reward | getRewardLabel"/>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="item.remark"/>
        </el-form-item>
        <!-- </div> -->
      </el-form>
    </Dialog>
  </div>
</template>
<script>
import Dialog from '@/components/common/dialog'
import { getTurnTable, patchTurnTable } from '@/api/turnTable'
import { getTurnTableReward } from '@/api/turnTableReward'
export default {
  name: 'TurnTableList',
  components: {
    Dialog
  },
  filters: {
    // 格式化奖励类型
    formatType(val) {
      const type = {
        0: '红包',
        1: '随机红包',
        2: '卡片',
        3: '谢谢参与'
      }

      return type[val] ? type[val] : '未知'
    },

    // 格式化奖励项显示
    getRewardLabel(reward) {
      if (!reward) return
      const typeData = {
        0: '红包',
        1: '随机红包',
        2: '卡片',
        3: '谢谢参与'
      }

      const unitData = {
        0: '元',
        1: '元',
        2: '张',
        3: '谢谢参与'
      }

      let label = typeData[reward.type] ? typeData[reward.type] : '未知'
      const unit = unitData[reward.type] ? unitData[reward.type] : ''
      const num = reward.unit ? reward.unit : 0
      label += num + unit
      if (reward.type == 3) {
        label = '谢谢参与'
      }
      return label
    }
  },
  data() {
    return {
      turnTableArr: [0, 1, 2, 3, 4, 5, 6, 7].map((item, i) => { return { index: i, id: '', img: '', turntableRewardId: '', remark: '', probability: '' } }), // 大转盘数据
      rewardArr: [], // 大转盘奖品数据列表
      turnTableEditForm: [], // 大转盘编辑列表
      rules: {
        turntableRewardId: [
          { required: true, message: '请选择奖励！', trigger: 'blur' }
        ],
        probability: [
          { required: true, type: 'number', message: '卡片概率为0~1之间！', trigger: 'blur' },
          {
            pattern: /^(1|0)$|(0\.\d+)$/,
            message: '卡片概率为0~1之间！',
            trigger: 'blur'
          }
        ],
        remark: [
          { required: true, type: 'string', message: '请填写卡片备注！', trigger: 'blur' }
        ]
      },
      isShow: false, // 弹窗显示标识
      tabHeader: {
        'background-color': '#F4F4F4',
        'color': '#666666',
        'border-top': '1px solid #BBBBBB',
        'border-bottom': '1px solid #BBBBBB',
        'font-size': '16px',
        'text-align': 'center'
      }
    }
  },

  created() {
    this.init()

    // 获取所有大转盘奖励
    getTurnTableReward()
      .then(res => {
        if (res.data.code) {
          return res.data.message && this.$wran(res.data.message)
        }
        if (!res.data.data || !res.data.data.length) return
        this.rewardArr = res.data.data
      })
  },

  methods: {
    getRewardNameById(turntableRewardId) {
      if (!this.rewardArr || !this.rewardArr.length) return
      return this.rewardArr.find(item => item.id == turntableRewardId)
    },

    // 打开编辑
    edit(index, row) {
      this.turnTableEditForm = JSON.parse(JSON.stringify(this.turnTableArr))
      this.isShow = true
    },

    // 弹窗点击确定
    onSubmit(form) {
      const formArr = this.$refs[form]
      const len = this.$refs[form].length
      const promisArr = []

      for (let i = 0; i < len; i++) {
        const validPromise = new Promise((resolve, reject) => {
          formArr[i].validate(valid => {
            if (!valid) {
              return reject(valid)
            }
            resolve(valid)
          })
        })
        promisArr.push(validPromise)
      }
      Promise.all(promisArr)
        .then(res => {
          patchTurnTable(this.turnTableEditForm)
            .then(res => {
              if (res.data.code) {
                return res.data.message && this.$wran(res.data.message)
              }

              this.close(form)
              this.$success('操所成功！')
              this.init()
            })
            .catch(err => {})
        })
        .catch(err => {
          console.error(err)
        })
    },

    // 关闭时 回复原状
    close(form) {
      this.isShow = false
      this.$refs[form].forEach(item => item.resetFields())
    },

    // 下拉选择框 转盘项和 奖品是一一对应关系 已经被其他占用的 需要被禁止选取
    // 找到 所有转盘项 的 选取的奖品 剔除 被点击项的 奖品
    // 奖品列表 中把 已经被选中 的 设置为禁用
    toggle(item, isVisible) {
      console.log(item)
      if (!isVisible) return
      const turntableRewardIdArr = []
      this.turnTableEditForm.forEach(tableItem => {
        if (tableItem.id !== item.id) {
          turntableRewardIdArr.push(tableItem.turntableRewardId)
        }
      })

      if (!turntableRewardIdArr || !turntableRewardIdArr.length) return
      const rewardArr0 = JSON.parse(JSON.stringify(this.rewardArr))
      const rewardArr = rewardArr0.map(reward => {
        if (turntableRewardIdArr.indexOf(reward.id) > -1) {
          reward.disabled = true
        } else {
          reward.disabled = false
        }
        return reward
      })
      this.rewardArr = rewardArr
    },

    // 获取大转盘数据
    init() {
      getTurnTable()
        .then(res => {
          if (res.data.code) {
            return res.data.message && this.$wran(res.data.message)
          }
          if (!res.data.data || !res.data.data.length) return
          this.turnTableArr = res.data.data
        })
        .catch(err => {})
    }

  }
}
</script>
<style lang="scss" scoped>
.table-box{
  margin-top: 20px;
}

</style>

