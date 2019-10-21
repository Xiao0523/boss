import request from '@/http/api'

function getWithdraw(data) {
  return request.post('happyRead/withdrawals', data)
}

function postExamine(data) {
  return request.post('happyRead/examine', data)
}

export {
  getWithdraw,
  postExamine
}
