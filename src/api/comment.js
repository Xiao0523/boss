import request from '@/http/api'

function changeComment(data) {
  return request.post('training/manualComment', data)
}

export {
  changeComment
}
