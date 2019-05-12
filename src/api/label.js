import request from '@/utils/request'

export function getLabelList(page, pageSize) {
  return request({
    url: '/label/list',
    method: 'get',
    params: { page, pageSize }
  })
}
