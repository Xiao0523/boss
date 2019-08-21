import request from '@/http/api'

function getTurnTableReward() {
  return request.get('turnTableReward')
}

function postTurnTableReward(data) {
  return request.post('turnTableReward', data)
}

function delTurnTableReward(id) {
  return request.del2('turnTableReward', {id: id})
}

function patchTurnTableReward(data) {
  return request.patch('turnTableReward', data)
}

export {
  getTurnTableReward,
  postTurnTableReward,
  delTurnTableReward,
  patchTurnTableReward
}