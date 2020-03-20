import request from '@/http/api'

function getStoreList({ name }) {
  return request.get('/training/common/getTrainingCurriculumByName/' + name)
}

function getClassList({ storeId }) {
  return request.get('/training/common/getTrainingCurriculumByStoreId/' + storeId)
}

export {
  getStoreList,
  getClassList
}
