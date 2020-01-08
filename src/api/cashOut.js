import request from '@/http/api'

function getCashOutList({pageNum = 1, pageSize = 10}) {
  return request.get('training/withdrawal/' + pageNum + '/' + pageSize)
}

function getCashOutStatus({id}) {
  return request.post('training/withdrawalExamine/' + id)
}

export {
  getCashOutList,
  getCashOutStatus
}
