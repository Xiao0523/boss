import request from '@/http/api'

function getCardGroup() {
  return request.get('cardGroup')
}

function postCardGroup(data) {
  return request.post('cardGroup', data)
}

function delCardGroup(id) {
  return request.del2('cardGroup', {cardGroupId: id})
}

function patchCardGroup(id) {
  return request.patch('cardGroup', {cardGroupId: id})
}

function getCard(cardGroupId) {
  return request.get(`card/${cardGroupId}`)
}

function postCard(data) {
  return request.post('card', data)
}

function patchCard(data) {
  return request.patch('card', data)
}

function delCard(id) {
  return request.del2('card', {cardId: id})
}

export {
  getCardGroup,
  postCardGroup,
  delCardGroup,
  patchCardGroup,
  getCard,
  postCard,
  patchCard,
  delCard
}