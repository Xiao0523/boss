import request from '@/http/api'

function getSuppliersList(data) {
  return request.post('waimaoshuishou/person/suppliers' ,data)
}
function editCategory(data) {
  return request.post('waimaoshuishou/category' ,data)
}

function delCategory(uuid,status) {
  return request.patch('waimaoshuishou/category/' + uuid + '/' + status )
}
function getArticleList(data) {
  return request.post('waimaoshuishou/article_list',data )
}
function getCategory() {
  return request.get('waimaoshuishou/category')
}
function AddArticle(data) {
  return request.post('waimaoshuishou/article',data )
}

function deleteArticle({ uuid }) {
  return request.del('waimaoshuishou/article/' + uuid)
}
export {
  getSuppliersList,
  editCategory,
  delCategory,
  getArticleList,
  getCategory,
  AddArticle,
  deleteArticle
}