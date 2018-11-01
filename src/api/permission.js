import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/uac/perms/',
    method: 'get',
    params: query
  })
}

export function createPerm(data) {
  return request({
    url: '/uac/perms/',
    method: 'post',
    data
  })
}

export function updatePerm(data) {
  return request({
    url: '/uac/perms/',
    method: 'put',
    data
  })
}

export function updateStatus(data) {
  return request({
    url: `/uac/perms/${data.id}/status/${data.status}`,
    method: 'put'
  })
}

export function menuNode() {
  return request({ url: '/uac/perms/menunode',
    method: 'get'
  })
}

export function getRolePerms(roleId) {
  return request({
    url: '/uac/perms/getRolePerms',
    method: 'get',
    params: { roleId }
  })
}

export function getAllPerms() {
  return request({
    url: '/uac/perms/allPerms',
    mounted: 'get'
  })
}

export function updateRolePerms(data) {
  return request({
    url: '/uac/perms/updateRolePerms',
    method: 'post',
    data
  })
}
