import request from '@/http/api'

function getVerson(data) {
  return request.get('training/version', data)
}

function editVerson(data) {
  return request.post('training/version', data)
}

export {
  getVerson,
  editVerson
}
