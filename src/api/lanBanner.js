import request from '@/http/api'

function getBannerList(data) {
  return request.post('/training/banners', data)
}

function getBannerView({ id }) {
  return request.get('/training/banner/' + id)
}

function addClass(data) {
  return request.post('/training/banner', data)
}

export {
  getBannerList,
  getBannerView,
  addClass
}
