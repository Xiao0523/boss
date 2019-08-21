<template>
  <div>
    <el-form label-width="80px" :model="cardGroup" :rules="rules" label-position="left" ref="cardGropForm">
      <el-form-item label="卡组名称" prop="name">
        <el-input v-model.trim="cardGroup.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="卡片张数" prop="num">
        <el-input-number v-model="cardGroup.num" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="卡组类型" prop="type">
        <el-select v-model="cardGroup.type">
          <el-option 
            v-for="item in cardGroupTypes" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {postCardGroup} from '@/api/cardGroup'
export default {
  name: 'cardGroupAdd',
  data() {
    return {
      cardGroup: {
        name: '',
        num: 1,
        type: ''
      },
      cardGroupTypes: [
        {
          label: '新手',
          value: 0,
        },
        {
          label: '普通',
          value: 1,
        }
      ],
      rules: {
        name: [
          {required: true, type: 'string', message: '请输入卡片组名称', trigger: 'blur'},
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
            message: '卡片组名称为中文、英文或数字',
            trigger: 'blur'
          }
        ],
        num: [
          {required: true, message: '请输入卡片组张数', trigger: 'blur'}
        ],
        type: [
           {required: true, message: '请输入卡片组类型', trigger: 'blur'},
        ]

      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$refs)
      this.$refs['cardGropForm'].validate((valid) => {
        if(!valid) return;
        postCardGroup(this.cardGroup)
        .then((res) => {
          if (res.data.code) {
            return this.$wran(res.data.message)
          }
          
          this.$success('操作成功！');
          this.$router.push({name: 'cardGroupList'});
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

