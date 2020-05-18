import { getCategoryList } from '@/api/store'

export const category = {
  mounted() {
    const id = this.$route.query.id
    if (id) {
      this.getList(id)
    }
  },
  methods: {
    getList(id) {
      const getObj = {
        storeId: id
      }
      getCategoryList(getObj).then(res => {
        if (res.data.code) return res.data.message && this.$warn(res.data.message)
        if (!res.data.data.length) return
        this.categoryList = this.categoryList && [
          ...this.categoryList,
          ...res.data.data
        ]
      })
    }
  }
}
