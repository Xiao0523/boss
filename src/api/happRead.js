import request from '@/http/api'

function getNovelList(data) {
    data.categoryId = data.categoryId  || 0
    data.pageSize = data.pageSize || 10
    return request.post('happyRead/notes', data)
}
function getCategoryList() {
    return request.get('happyRead/category')
}

function delNovel(noteId) {
    return request.del(`happyRead/note/${noteId}`)
}

function postNovelCategoryRelation(data) {
    return request.post('happyRead/categoryNoteRelation', data)
}

function getNovelCategoryRelateionById(noteId) {
    return request.post(`happyRead/noteCategoryRelation/${noteId}`)
}


function postNovel(data) {
    return request.post('happyRead/note', data)
}

export{
    postNovel,
    getNovelList,
    delNovel,
    postNovelCategoryRelation,
    getNovelCategoryRelateionById,
    getCategoryList
}