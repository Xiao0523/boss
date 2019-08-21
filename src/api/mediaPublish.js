import request from '@/http/api'

function getPublishList(data) {
  return request.post('media/publishInfo', data)
}

export {
  getPublishList
}