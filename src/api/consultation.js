import request from '@/http/api'

function getConsulting(data) {
  return request.post('waimaoshuishou/consultation', data)
}
function editConsulting(uuid, status) {
  return request.patch('waimaoshuishou/consultation/' + uuid + '/' + status)
}
function getCategoryList(data) {
  return request.post('waimaoshuishou/category_list', data)
}
function editCategory(data) {
  return request.post('waimaoshuishou/category', data)
}

function delCategory(uuid, status) {
  return request.patch('waimaoshuishou/category/' + uuid + '/' + status)
}
function getArticleList(data) {
  return request.post('waimaoshuishou/article_list', data)
}
function getCategory() {
  return request.get('waimaoshuishou/category')
}
function AddArticle(data) {
  return request.post('waimaoshuishou/article', data)
}

function deleteArticle({ uuid }) {
  return request.del('waimaoshuishou/article/' + uuid)
}
export {
  getConsulting,
  editConsulting,
  getCategoryList,
  editCategory,
  delCategory,
  getArticleList,
  getCategory,
  AddArticle,
  deleteArticle
}
