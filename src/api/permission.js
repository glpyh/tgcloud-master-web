import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/permissions/tree',
    method: 'post',
    params: query
  })
}

export function createPerm(data) {
  return request({
    url: '/uac/permissions/add',
    method: 'post',
    data
  })
}

export function updatePerm(data) {
  return request({
    url: '/uac/permissions/update',
    method: 'post',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: '/uac/permissions/status',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: data
  })
}

export function menuNode() {
  return request({ url: '/uac/permissions/menunode',
    method: 'get'
  })
}

export function getRolePerms(roleId) {
  return request({
    url: '/uac/permissions/getRolePerms',
    method: 'get',
    params: { roleId }
  })
}

export function getAllPerms() {
  return request({
    url: '/uac/permissions/allPerms',
    mounted: 'get'
  })
}

export function updateRolePerms(data) {
  return request({
    url: '/uac/permissions/updateRolePerms',
    method: 'post',
    data
  })
}

export function flashPerms() {
  return request({
    url: '/uac/permissions/flashPerms',
    method: 'get'
  })
}
