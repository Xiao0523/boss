import request from '@/http/api'

function getTalentShow(data) {
  return request.get('/training/common/getTrainingTalentShow', data)
}

function changeVote(data) {
  return request.patch('training/trainingTalentShow/composition/votes', data)
}

export {
  getTalentShow,
  changeVote
}

