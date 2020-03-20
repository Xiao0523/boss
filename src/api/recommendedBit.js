import request from '@/http/api'

function getList(data) {
  return request.post('/training/curriculumRecommends', data)
}

function addRecommend(data) {
  return request.post('/training/curriculumRecommend', data)
}

function getRecommendView({ id }) {
  return request.get('/training/curriculumRecommend/' + id)
}

export {
  getList,
  addRecommend,
  getRecommendView
}
