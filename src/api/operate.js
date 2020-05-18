import request from '@/http/api'

function getOperate(data) {
  return request.post('training/operatingExpenseses', data)
}

function delOperate({ id }) {
  return request.del('training/operatingExpenses/' + id)
}

function getOperateDetail({ id }) {
  return request.get('training/operatingExpenses/' + id)
}

function editOperate(data) {
  return request.post('training/operatingExpenses', data)
}

export {
  getOperate,
  delOperate,
  getOperateDetail,
  editOperate
}
