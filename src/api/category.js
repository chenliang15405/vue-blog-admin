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

const getAllCategoryList = () => {
  return request({
    url: '/category/allList',
    method: 'get'
  })
}

export { getCategoryList, getAllCategoryList }
