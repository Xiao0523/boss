import request from '@/http/api'

function getRewardList({ id }) {
  return request.get('training/trainingTalentShow/reward/' + id)
}

function getRewardStatus(data) {
  return request.post('training/trainingTalentShow/reward', data)
}

export {
  getRewardList,
  getRewardStatus
}
