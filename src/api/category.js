import request from '@/utils/request'

const getCategoryList = (page, pageSize) => {
  return request({
    url: '/category/list',
    method: 'get',
    params: {
      page,
      pageSize
    }
  })
}

export { getCategoryList }
