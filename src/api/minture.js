import request from '@/http/api'
// v2广告
export function v2AdvFn() {
  request.get('/v2/shareAdv/1/999')
}
// export function getInfoFn(id) {
//   return request.get('backUserDetail', {
//     id: id
//   })
// }
