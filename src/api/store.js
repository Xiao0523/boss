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

function getCategoryList({ storeId }) {
  return request.get('training/store/category/' + storeId)
}

function getClassList(data) {
  return request.post('training/store/curriculum', data)
}

function getClassDetail({ storeId, id }) {
  return request.get('training/store/curriculum/' + storeId + '/' + id)
}

function getTeacherList(data) {
  return request.post('training/store/teacher', data)
}

function getTeacherDetail({ storeId, id }) {
  return request.get('training/store/teacher/' + storeId + '/' + id)
}

function getStudentList(data) {
  return request.post('training/store/student', data)
}

function getOrderList(data) {
  return request.post('training/store/order', data)
}

function getCommentList(data) {
  return request.post('training/store/comment', data)
}

function getCommentOpen({ id }) {
  return request.post('training/store/comment/' + id)
}

function getCommentClose({ id }) {
  return request.del('training/store/comment/' + id)
}

function getCommentDetail({ id, storeId }) {
  return request.get('training/store/comment/' + id + '/' + storeId)
}

function editWeight(data) {
  return request.post('training/weight', data)
}

export {
  getStoreList,
  getStoreAudit,
  getStoreInfo,
  getStoreDetail,
  getClassList,
  getClassDetail,
  getTeacherList,
  getTeacherDetail,
  getCategoryList,
  getStudentList,
  getOrderList,
  getCommentList,
  getCommentOpen,
  getCommentClose,
  getCommentDetail,
  editWeight
}
