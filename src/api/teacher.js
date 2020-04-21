import request from '@/http/api'

function getTeacherList(data) {
  return request.post('training/recommendTeachers', data)
}

function getTeacherDetail({ id }) {
  return request.get('training/recommendTeacher/' + id)
}

function editTeacher(data) {
  return request.post('training/recommendTeacher', data)
}

export {
  getTeacherList,
  getTeacherDetail,
  editTeacher
}
