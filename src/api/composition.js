import request from '@/http/api'

function getCompositionList({ talentShowId, status = 0, pageNum = 1, pageSize = 10}) {
  return request.get('training/trainingTalentShow/composition/' + talentShowId + '/' + status + '/' + pageNum + '/' + pageSize)
}

function getCompositionStatus(data) {
  return request.post('training/trainingTalentShow/examine', data)
}

function getCompositionDetail({ id }) {
  return request.get('training/trainingTalentShow/composition/detail/' + id)
}

export {
  getCompositionList,
  getCompositionStatus,
  getCompositionDetail
}
