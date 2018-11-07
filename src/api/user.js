import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/uac/users/logininfo',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/uac/users',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/uac/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/uac/users',
    method: 'put',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `/uac/users/${data.id}/status/${data.status}`,
    method: 'put'
  })
}

export function updatePassword(data) {
  return request({
    url: '/uac/users/password',
    method: 'post',
    data
  })
}

export function getUserById(userId) {
  return request({
    url: '/uac/users/info',
    method: 'get',
    params: { userId }
  })
}

export function updateUserById(data) {
  return request({
    url: '/uac/users/user',
    method: 'post',
    data
  })
}

export function getRoles(userId) {
  return request({
    url: `/uac/users/${userId}/roles/`,
    method: 'get'
  })
}

export function bindUserRoles(data) {
  return request({
    url: `/uac/users/bindRoles`,
    method: 'post',
    data
  })
}
