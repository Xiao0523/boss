import request from '@/http/api'

function getTalentShow(data) {
  return request.get('/training/common/getTrainingTalentShow', data)
}

export {
  getTalentShow
}

