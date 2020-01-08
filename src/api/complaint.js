import request from '@/http/api'

function getComplaintList({status = 0, pageNum = 1, pageSize = 10}) {
  return request.get('training/trainingTalentShow/complaint/' + status + '/' + pageNum + '/' + pageSize)
}

function getComplaintStatus(data) {
  return request.post('training/trainingTalentShow/complaint', data)
}

export {
  getComplaintList,
  getComplaintStatus
}
