import request from '@/http/api'

function getscholarShipList({status = 1, pageNum = 1, pageSize = 10}) {
  return request.get('training/scholarShip/list/' + status + '/' + pageNum + '/' + pageSize)
}

function getScholarShipStatus({id, status}) {
  return request.get('training/scholarShip/examine/' + id + '/' + status)
}

export {
  getscholarShipList,
  getScholarShipStatus
}
