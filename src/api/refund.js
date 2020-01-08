import request from '@/http/api'

function getRefundList({pageNum = 1, pageSize = 10}) {
  return request.get('training/refund/' + pageNum + '/' + pageSize)
}

function getRefundStatus(data) {
  return request.post('training/refundExamine/', data)
}

export {
  getRefundList,
  getRefundStatus
}
