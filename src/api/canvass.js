
import request from '@/http/api'

function getCanvass(data) {
  return request.post('training/investment', data)
}

function editCanvassStatus(data) {
  return request.patch('training/investment', data)
}

export {
  getCanvass,
  editCanvassStatus
}
