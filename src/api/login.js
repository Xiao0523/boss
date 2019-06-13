import request from '@/http/api'
// 登录接口
export function loginFn(username, password) {
  return request.post('validUser', {
    username: username,
    password: password
  })
}

export function getInfoFn(id) {
  return request.get('backUserDetail', {
    id: id
  })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
