import request from '@/request'

function login(data) {
  return request({
    url: '/user/admin/login',
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

const getUserInfo = (loginname) => {
  return request({
    url: `/user/admin/info/${loginname}`,
    method: 'get'
  })
}

export {
  login,
  getUserList,
  getAllUser,
  getUserInfo
}
