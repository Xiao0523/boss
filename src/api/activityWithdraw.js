import request from '@/http/api'

function getWithdraw(params) {
  return request.get('activityCashWithdrawalView/list', params)
}

function patchWithdraw(loan, status) {
  return request.patch(`activityCashWithdrawalView/loan/${loan}/${status}`)
}

export {
  getWithdraw,
  patchWithdraw
}
