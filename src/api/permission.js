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

export function deletePerm(id) {
  return request({
    url: `/uac/perms/${id}`,
    method: 'delete'
  })
}

export function menuNode() {
  return request({ url: '/uac/perms/menunode',
    method: 'get'
  })
}
export function getRolePerms(roleId) {
  return request({
    url: `/uac/roles/${roleId}/perms/`,
    method: 'get'
  })
}

export function getAllPerms() {
  const query = { type: 0, status: 0 }
  return request({
    url: '/uac/perms/',
    method: 'get',
    params: query
  })
}

export function getRouterTree() {
  return request({
    url: `/uac/perms/tree`,
    method: 'get'
  })
}

