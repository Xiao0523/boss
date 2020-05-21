<template>
  <div :class="{'disabled':disabled}" class="rate">
    <i v-for="i in 5" :key="i" :class="getClass(i)" class="iconfont el-icon-star-on" @mouseenter="disabled ? '' : curScore = i" @mouseleave="disabled? '' : curScore=''" @click="disabled ? '' : setScore(i)">
      <i v-if="disabled && i === Math.floor(score) + 1" :style="'width:' + width" class="iconfont el-icon-star-on"/>
    </i>
    <span v-if="showText" class="text">{{ curScore||score }}分</span>
  </div>
</template>

<script>
export default {
  name: 'MyRate',
  props: {
    score: {
      type: Number,
      default: 0
      // required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curScore: '',
      width: ''
    }
  },
  created: function() {
    this.getDecimal()
  },
  methods: {
    getClass(i) {
      if (this.curScore === '') {
        return i <= this.score ? 'icon-star' : 'icon-star-o'
      } else {
        return i <= this.curScore ? 'icon-star' : 'icon-star-o'
      }
    },
    getDecimal() {
      this.width = Number(this.score * 100 - Math.floor(this.score) * 100) + '%'
    },
    setScore(i) {
      this.$emit('update:score', i)// 使用`.sync`修饰符，对score 进行“双向绑定
    }
  }
}
</script>

<style lang="scss" scoped>
.rate{
  .iconfont{
    display: inline-block;
    position: relative;
    font-size: 24px;
    transition: .3s;
    & + .iconfont{
      margin-left: 5px;
    }
    .iconfont{
      position: absolute;
      left: 0;
      overflow: hidden;
    }
    &.icon-star-o{
      color: #c0c4cc;
    }
    &.icon-star {
      color: #f4cd17;
    }
  }
  &:not(.disabled) .iconfont:hover{
    transform: scale(1.2);
    cursor: pointer;
  }
}
</style>
