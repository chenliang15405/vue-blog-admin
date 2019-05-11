import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserList(page, pageSize) {
  return request({
    url: '/user/list',
    method: 'get',
    params: { page, pageSize }
  })
}
