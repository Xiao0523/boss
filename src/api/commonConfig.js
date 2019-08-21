import request from '@/http/api'

function getConfigs() {
  return request.get('configInfo')
}

function putConfigs(data) {
  return request.put('configInfo', data)
}

export {
  getConfigs,
  putConfigs
}