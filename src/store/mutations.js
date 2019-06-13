const mutations = {
  // set_batchRemove(state, arrID) {
  //   state.batchRemove = arrID
  // },
  // showInfoMsg(state, content) {
  //   console.log('show info msg:', content)
  //   state.msg.type = 'info'
  //   state.msg.content = content
  //   state.msg.count = state.msg.count + 1
  // },
  // setResList(state, res) {
  //   state.resList = res
  // },
  // setResTag(state, res) {
  //   state.resTag = res
  // },
  // setResAdv(state, res) {
  //   state.resAdv = res
  // },
  // setTagArr(state, arr) {
  //   state.tagArr = arr
  // },
  // setAdvArr(state, arr) {
  //   state.advArr = arr
  // }
  set_roleIds(state, roleIds) {
    state.roleIds = roleIds
  },
  set_adminIds(state, adminIds) {
    state.adminIds =adminIds
  },
  set_operaIds(state, operaIds) {
    state.operaIds =operaIds
  },
  set_tagIds(state,tagIds) {
    state.tagIds =tagIds
  },
  set_memberDetail(state, memberDetail) {
    state.memberDetail =memberDetail
  },
}
export default mutations
