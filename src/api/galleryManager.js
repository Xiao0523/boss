import request from '@/http/api'

function getImgs(data) {
  data.pageSize = data.pageSize || 10
  if(data.tagId) {
    return getImgsByTagId(data)
  }
  return request.post('image/images', data)
}

function postImg(data) {
  return request.post('image/image', data)
}

function delImgs(idArray) {
  return request.del2('image/images', {id: idArray})
}

function getImgsByTagId(data) {
  return request.post('image/imagesByTagId', data)
}

export {
  getImgs,
  postImg,
  delImgs,
}