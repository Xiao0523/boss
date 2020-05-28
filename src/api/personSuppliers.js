import request from '@/http/api'

function getSuppliersList(data) {
  return request.post('waimaoshuishou/person/suppliers', data)
}
function editSupplier(data) {
  return request.post('waimaoshuishou/person/supplier', data)
}
function getSupplier({ uuid }) {
  return request.get('waimaoshuishou/person/supplier/' + uuid)
}
function getcategoryList(data) {
  return request.post('waimaoshuishou/person/categories', data)
}
function editCategoryr(data) {
  return request.post('waimaoshuishou/person/category/product', data)
}
function getTags() {
  return request.get('waimaoshuishou/person/tags')
}
function editTags(data) {
  return request.post('waimaoshuishou/person/tag/product', data)
}
export { getSuppliersList, editSupplier, getSupplier, getcategoryList, editCategoryr, getTags, editTags }
