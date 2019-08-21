import request from '@/http/api'

function getTurnTable() {
  return request.get('turnTable')
}

function patchTurnTable(data) {
  return request.patch('turnTable', {activityTurntableUpdateViewList: data})
}

export {
  getTurnTable,
  patchTurnTable
}

