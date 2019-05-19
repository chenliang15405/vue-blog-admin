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

export { getArticleList }
