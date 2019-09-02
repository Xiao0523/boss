import request from '@/http/api'

function getTags(data) {
  data.pageSize = data.pageSize || 10
  return request.post('image/tags', data)
}

function delTags(idArray) {
  return request.del2('image/tags', {id: idArray})
}

function postTag(data) {
  return request.post('image/tag', data)
}



export {
  getTags,
  delTags,
  postTag,
}