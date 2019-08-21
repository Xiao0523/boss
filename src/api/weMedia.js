import request from '@/http/api'

function getArticles(data) {
  return request.post('media/articles', data)
}

function delArticle(id) {
  return request.del(`media/articles/${id}`)
}

function patchArticle(data) {
  return request.patch('media/changeCategory', data)
}

export {
  getArticles,
  delArticle,
  patchArticle,
}