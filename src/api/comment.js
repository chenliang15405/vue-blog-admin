import request from '../utils/request'

/*
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}) 通过request就是这样的请求，request返回一个带有header或者其他的baseUrl的axios实例给到了request变量，并且将response也封装到request中
*/
/*
*  get 请求，参数使用 params 会拼接到 url
*  post请求，需要使用data，作为请求体
*
*/
const getCommentData = (page, pageSize) => {
  return request({
    url: '/comment/list',
    method: 'get',
    params: {
      page,
      pageSize
    }
  })
}

export { getCommentData }
