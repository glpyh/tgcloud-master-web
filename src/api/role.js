import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/roles/',
    method: 'get',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/uac/roles/',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/uac/roles/',
    method: 'put',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `/uac/roles/${data.id}/status/${data.status}`,
    method: 'put'
  })
}

export function getUserRoles(userId) {
  return request({
    url: '/uac/roles/getUserRoles',
    method: 'get',
    params: { userId }
  })
}

export function getAllRoles() {
  return request({
    url: '/uac/roles/allRoles',
    mounted: 'get'
  })
}

export function updateUserRoles(data) {
  return request({
    url: '/uac/roles/updateUserRoles',
    method: 'post',
    data
  })
}
