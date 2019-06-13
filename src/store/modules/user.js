import { loginFn, getInfoFn } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
const user = {
  state: {
    token: getToken(), // userId
    name: '',
    avatar: '',
    roles: [],
    // -------------------------------------------------
    userId: '', // 根据用户id查询用户详情
    userInfo: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => { // userId
      state.token = token
    },
    SET_NAME: (state, name) => { // 用户名
      state.name = name
    },
    SET_ROLES: (state, roles) => { // 角色
      state.roles = roles
    },
    // ----------------------------------------------------------
    // SET_userId: (state, userId) => {
    //   state.userId = userId
    //   localStorage.setItem('userId', userId)
    // },
    set_userInfo: (state, msg) => {
      state.userInfo = msg
      localStorage.setItem('userInfo', JSON.stringify(msg))
    },
    remove_userInfo: (state) => {
      state.userInfo = null
      state.userId = null
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userId')
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // console.log(username, userInfo.password)
        // 原作者
        loginFn(username, userInfo.password).then(response => {
          const data = response.data.data
          // console.log(response.data.code);
          // --------------------------------------登录成功保存登录信息
          if (response.data.code === 0) {
            setToken(data.backUser.id)
            commit('SET_TOKEN', data.backUser.id)
            // commit('SET_userId', data.backUser.id)
          } else { // 登录失败的提示
            Message({
              message: response.data.message,
              type: 'error'
            })
          }
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // console.log('userId---', state.token)
        getInfoFn(state.token).then(response => {
          const data = response.data.data[0]
          console.log('用户id的数据', data)
          commit('set_userInfo', JSON.stringify(data))
          if (data.role && data.role.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.role)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.realname)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      commit('remove_userInfo', '')
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
