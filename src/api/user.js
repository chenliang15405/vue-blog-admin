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

const getBloggerInfo = (loginname) => {
  return request({
    url: `/user/admin/info/${loginname}`,
    method: 'get'
  })
}

const getBloggerMessageNotify = (status) => {
  return request({
    url: `/user/admin/blogger/message`,
    method: 'get',
    params: {
      status
    }
  })
}

const updateBloggerMessageStatus = (id, status) => {
  return request({
    url: '/user/admin/blogger/message',
    method: 'put',
    params: {
      id,
      status
    }
  })
}

export {
  login,
  getUserList,
  getAllUser,
  getBloggerInfo,
  getBloggerMessageNotify,
  updateBloggerMessageStatus
}
