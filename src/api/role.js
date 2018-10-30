import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/roles/list',
    method: 'post',
    params: query
  })
}

export function createRole(data) {
  return request({
    url: '/uac/roles/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/uac/roles/update',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/uac/roles/status',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: data
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
