import request from '@/http/api'

function getGrowList() {
  return request.get('training/career')
}

function editGrow(data) {
  return request.post('training/career', data)
}

function getGrowDetail({ id }) {
  return request.get('training/career/' + id)
}

export {
  getGrowList,
  editGrow,
  getGrowDetail
}
