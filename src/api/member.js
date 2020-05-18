import request from '@/http/api'

function getStudentList(data) {
  return request.post('training/students', data)
}

function getStudentInfo({ id }) {
  return request.get('training/student/' + id)
}

function getStudentCousor({ id }) {
  return request.get('/training/student/curriculum/' + id)
}

function getStudentOrder({ id }) {
  return request.get('/training/student/order/' + id)
}

function getStudentMoney({ id }) {
  return request.get('training/student/scholarship/' + id)
}

function getStudentShow({ id }) {
  return request.get('training/student/talentShow/' + id)
}

function editStudentWx(data) {
  return request.post('/training/customerWX', data)
}

export {
  getStudentList,
  getStudentInfo,
  getStudentCousor,
  getStudentOrder,
  getStudentMoney,
  getStudentShow,
  editStudentWx
}
