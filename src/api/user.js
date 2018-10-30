import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/uac/users/logininfo',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/uac/users/list',
    method: 'post',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/uac/users/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/uac/users/update',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/uac/users/status',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: data
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
