import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dmc/exceptions',
    method: 'get',
    params: query
  })
}
