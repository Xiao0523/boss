import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
// import req from '@/utils/request' // 请求
import api from './http/api'
import '@/icons' // icon
import '@/permission' // permission control
import echarts from 'echarts'
import VDistpicker from 'v-distpicker' // 省市区
import * as filters from '@/utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI, { locale })
Vue.component('v-distpicker', VDistpicker)
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$req = api
Vue.prototype.$axios = axios // 原生请求
// 错误提示
Vue.prototype.$wran = function(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}
// 成功提示
Vue.prototype.$success = function(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success'
  })
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
