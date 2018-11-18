import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/departments/tree',
    method: 'get',
    params: query
  })
}

export function createDepartment(data) {
  return request({
    url: '/uac/departments',
    method: 'post',
    data
  })
}

export function updateDepartment(data) {
  return request({
    url: '/uac/departments',
    method: 'put',
    data
  })
}

export function deleteDepartment(id) {
  return request({
    url: `/uac/departments/${id}`,
    method: 'delete'
  })
}
