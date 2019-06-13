import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import {setSession,getSession,clearOneSession} from '@/utils/session'

const whiteList = ['/login', '/authredirect'] // 不重定向白名单
// 全局路由钩子
router.beforeEach((to, from, next) => {
  // console.log('to',to);
  // console.log('from',from);
  // console.log('next',next);
  // if(to.path !='/ArticleManager/ArticleDetails' ||(to.path !== '/ArticleManager/ArticleList')){
  //   clearOneSession('param')
  // }
  // 以下是权限限制
  if (getToken()) { // 判断是否有userId
    console.log(getToken())
    next()
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 获取权限数据
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const roles = res.data.data[0].role // note: roles must be a array! such as: ['editor','develop']
          console.log('roles?---获取用户的权限：', roles)
        }).catch(() => {
          // store.dispatch('FedLogOut').then(() => {
          //   Message.error('验证失败,请重新登录')
          //   next({ path: '/' })
          // })
        })
      } else {
        console.log('====1')
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
