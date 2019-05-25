import request from '@/utils/request'

function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

function getUserList(page, pageSize) {
  return request({
    url: '/user/list',
    method: 'get',
    params: { page, pageSize }
  })
}

const getAllUser = () => {
  return request({
    url: '/user/allList',
    method: 'get'
  })
}

export {
  login,
  getUserList,
  getAllUser
}
