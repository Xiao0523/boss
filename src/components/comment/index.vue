<template>
  <div>
    <el-dialog
      :visible.sync="diglogFlag"
      title="评论"
      width="30%"
      center
    >
      <span class="flex-box">
        <span class="score-title">评分：</span>
        <score :score.sync="form.score" />
      </span>
      <span class="diglog-textarea">
        <el-input id="" v-model="form.content" type="textarea" name="" cols="30" rows="10" placeholder="请输入评价" resize="none"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getComment">评论</el-button>
        <el-button @click="diglogFlag = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import score from '../score'
import { changeComment } from '@/api/comment'
export default {
  name: 'CommentInput',
  components: {
    score
  },
  props: {
    showFlag: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    curriculumId: {
      type: String,
      default: () => {
        return ''
      }
    },
    storeId: {
      type: String,
      default: () => {
        return ''
      }
    },
    teacherId: {
      type: String,
      default: () => {
        return ''
      }
    },
    type: {
      type: Number,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      diglogFlag: false,
      form: {
        content: '',
        curriculumId: '',
        score: 0,
        storeId: '',
        teacherId: '',
        type: ''
      }
    }
  },
  watch: {
    showFlag() {
      this.diglogFlag = this.showFlag
    },
    curriculumId() {
      this.form.curriculumId = this.curriculumId
    },
    type() {
      this.form.type = this.type
    },
    storeId() {
      this.form.storeId = this.storeId
    },
    teacherId() {
      this.form.teacherId = this.teacherId
    }
  },
  created() {
    this.diglogFlag = this.showFlag
    this.form.curriculumId = this.curriculumId
    this.form.type = this.type
    this.form.storeId = this.storeId
    this.form.teacherId = this.teacherId
    this.form.content = ''
    this.form.score = 0
  },
  methods: {
    getComment() {
      const getObj = this.form
      changeComment(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        this.$success('回复成功！')
        this.diglogFlag = false
        this.form = {
          content: '',
          curriculumId: '',
          score: 0,
          storeId: '',
          teacherId: '',
          type: ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  margin-bottom: 10px;
}
.score-title {
  margin-right: 10px;
  line-height: 24px;
}
</style>
