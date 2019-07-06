import request from '@/request'

function login(data) {
  return request({
    url: '/admin/admin/login',
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
