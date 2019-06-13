import req from '@/http/api'
import { Message } from 'element-ui'
// 触发msg的方法
// export const showInfoMsg = (state, content) => {
//   console.log('show info msg:', content)
//   state.msg.type = 'info'
//   state.msg.content = content
//   state.msg.count = state.msg.count + 1
// }
// 刪除
export const delFn = ({ commit, state }, { url, idArr }) => {
  console.log(url, idArr)
  req.post(url, { ids: idArr }).then(res => {
    Message({
      message: '删除成功',
      type: 'success'
    })
    window.location.reload()
    // visible = false
    // commit('showInfoMsg', '删除成功!')
  }).catch(err => {
    // visible = false
    console.log(err)
  })
}
// v2刪除--广告，标签
export const v2DelFn = ({ commit, state }, { url, idArr }) => {
  console.log(url, idArr)
  const idStr = idArr.join(',')
  req.post(url + `/${idStr}`).then(res => {
    console.log('删除成功', res)
    window.location.reload()
  }).catch(err => {
    console.log(err)
  })
}
// v2分类
// export const v2TagFn = ({ commit, state }, { tagUrl, pageNo, pageSize }) => {
//   // console.log(tagUrl, pageNo, pageSize)
//   req.get(tagUrl + `/${pageNo}/${pageSize}`).then(res => {
//     commit('setResTag', res)
//     // console.log(state.resAdv, 'state.resTag')
//   }).catch(err => {
//     // visible = false
//     console.log(err)
//   })
// }
