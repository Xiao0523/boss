import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
// 定义混合
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
])
  },
  mounted() {
    // 写法：混合里实现函数的调用，在需要使用的页面里定义函数
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playlist(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method')
    }
  }
}
