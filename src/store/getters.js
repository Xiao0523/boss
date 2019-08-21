const getters = {
  language: state => state.app.language, // 中文
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // userId
  avatar: state => state.user.avatar,
  name: state => state.user.name, // 角色名
  roles: state => state.user.roles,
  // 以上为作者的
  // ----------------------------------------------
  // loginInfo: (state) => {
  //   if (!state.loginInfo) {
  //     state.loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
  //   }
  //   return state.loginInfo
  // },
  roleIds:state=>state.roleIds,
  adminIds:state=>state.adminIds,
  operaIds:state=>state.operaIds,
  tagIds:state=>state.tagIds,
  memberDetail:state=>state.memberDetail,
  userInfo: (state) => {
    if (!state.user.userInfo) {
      return JSON.parse(localStorage.getItem('userInfo'))
    }
    return state.user.userInfo
  }
  // userId: (state) => {
  //   if (!state.userId) {
  //     state.userId = localStorage.getItem('userId')
  //   }
  //   return state.userId
  // },
  // batchRemove: state => state.batchRemove, // 批量删除
  // resTag: state => state.resTag, // 列表res
  // resAdv: state => state.resAdv, // 列表res
  // tagArr: state => state.tagArr, // 列表res
  // advArr: state => state.advArr // 列表res

}
export default getters
