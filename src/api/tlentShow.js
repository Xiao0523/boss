import request from '@/http/api'

function getTlentShowList({ status = 0, pageNum = 1, pageSize = 10 }) {
  return request.get('training/trainingTalentShow/list/' + status + '/' + pageNum + '/' + pageSize)
}

function addTlentShow(data) {
  return request.post('training/trainingTalentShow/add', data)
}

function getTlentShow({ id }) {
  return request.get('training/trainingTalentShow/detail/' + id)
}

function editTlentShow(data) {
  return request.post('training/trainingTalentShow/edit', data)
}

function delTlentShow({ id }) {
  return request.del('training/trainingTalentShow/delete/' + id)
}

export {
  getTlentShowList,
  addTlentShow,
  getTlentShow,
  editTlentShow,
  delTlentShow
}
