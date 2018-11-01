import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/departments/',
    method: 'get',
    params: query
  })
}

export function createDepartment(data) {
  return request({
    url: '/uac/departments/',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/uac/departments/',
    method: 'put',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `/uac/departments/${data.id}/status/${data.status}`,
    method: 'put'
  })
}
