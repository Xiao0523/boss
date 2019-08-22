import request from '@/http/api'

function getSearchRoll() {
  return request.get('searchRoll')
}

function postSearchRoll(data) {
  return request.post('searchRoll', data)
}

function delSearchRoll(id) {
  return request.del(`searchRoll/${id}`)
}

export {
  getSearchRoll,
  postSearchRoll,
  delSearchRoll
}