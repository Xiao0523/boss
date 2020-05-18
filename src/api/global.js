import request from '@/http/api'

function getChinaCity() {
  return request.get('/ChinaCity/1')
}

function getChinaCode({ code }) {
  return request.get('/ChinaCity/2/' + code)
}

export {
  getChinaCity,
  getChinaCode
}
