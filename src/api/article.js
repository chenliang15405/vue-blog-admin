import request from '@/utils/request'

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
    url: '/article/create',
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

export {
  getArticleList,
  createArticle,
  createArticleDraft
}
