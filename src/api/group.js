import request from '@/http/api'

function getGroupList() {
  return request.get('training/group')
}

function editGroup(data) {
  return request.post('training/group', data)
}

function getGroupView({ id }) {
  return request.get('training/group/' + id)
}

function delGroup({ id }) {
  return request.del('training/group/' + id)
}

export {
  getGroupList,
  editGroup,
  getGroupView,
  delGroup
}
