import request from '@/http/api'

function getStoreList({ name }) {
  return request.get('training/common/getTrainingCurriculumByName/' + name)
}

function getClassList({ storeId }) {
  return request.get('training/common/getTrainingCurriculumByStoreId/' + storeId)
}

function getTeacherList({ id }) {
  return request.get('training/common/getTeacherByCurriculumId/' + id)
}

function getAppInfo({ phone }) {
  return request.get('training/common/getTrainingStudentByPhone/' + phone)
}

export {
  getStoreList,
  getClassList,
  getTeacherList,
  getAppInfo
}
