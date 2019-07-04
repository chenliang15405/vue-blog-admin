import request from '@/request'

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
    url: '/category/category/',
    method: 'get'
  })
}

export { getCategoryList, getAllCategoryList }
