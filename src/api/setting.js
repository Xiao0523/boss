import request from '@/http/api'

function getSetting(data) {
  return request.get('training/config', data)
}

function editSetting(data) {
  return request.post('training/config/', data)
}

export {
  getSetting,
  editSetting
}
