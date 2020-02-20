import request from '@/http/api'

function getMerchantList(data) {
  return request.post('training/business', data)
}

function getAudit(data) {
  return request.post('training/examine', data)
}

function getTypeList(data) {
  return request.get('training/category/levelOne', data)
}

function getTypeListTwo(data) {
  return request.get('training/category/levelTwo/' + data)
}

function getListDetail({ id }) {
  return request.get('training/category/detail/' + id)
}

function addList(data) {
  return request.post('training/category', data)
}

function editList(data) {
  return request.patch('training/category', data)
}

function getBusinessDetail({ id }) {
  return request.get('training/business/' + id)
}

export {
  getMerchantList,
  getAudit,
  getTypeList,
  getTypeListTwo,
  addList,
  editList,
  getListDetail,
  getBusinessDetail
}
