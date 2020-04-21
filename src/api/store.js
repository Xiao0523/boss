import request from '@/http/api'

function getStoreList(data) {
  return request.post('training/store', data)
}

function getStoreAudit(data) {
  return request.post('training/store/examine', data)
}

export {
  getStoreList,
  getStoreAudit
}
