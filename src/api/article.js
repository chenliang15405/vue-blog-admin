import request from '@/request'

const getArticleList = (page, pageSize) => {
  return request({
    url: '/article/list',
    method: 'get',
    params: {
      page,
      pageSize
    }
  })
}
/*
* axios({
    url: '/article/createblog',
    method: 'post',
    data:{}
  })
*/
const createArticle = (data) => {
  return request({
    url: '/article/article/',
    method: 'post',
    data
  })
}

// 保存为草稿
const createArticleDraft = (data) => {
  return request({
    url: '/article/createDraft',
    method: 'post',
    data
  })
}

// 删除图片
const deleteImageFile = (filePath) => {
  return request({
    url: '/article/file/delete',
    method: 'delete',
    params: {
      filePath
    }
  })
}

export {
  getArticleList,
  createArticle,
  createArticleDraft,
  deleteImageFile
}
