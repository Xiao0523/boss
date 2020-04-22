import request from '@/http/api'

function getStoreList(data) {
  return request.post('training/store', data)
}

function getStoreAudit(data) {
  return request.post('training/store/examine', data)
}

function getStoreInfo() {
  return request.get('training/store/main')
}

function getStoreDetail({ id }) {
  return request.get('training/store/' + id)
}

function getClassList(data) {
  return request.post('training/store/curriculum', data)
}

export {
  getStoreList,
  getStoreAudit,
  getStoreInfo,
  getStoreDetail,
  getClassList
}
