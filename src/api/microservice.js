import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dmc/microservices',
    method: 'get',
    params: query
  })
}

export function createMicroservice(data) {
  return request({
    url: '/dmc/microservices',
    method: 'post',
    data
  })
}

export function updateMicroservice(data) {
  return request({
    url: '/dmc/microservices',
    method: 'put',
    data
  })
}

export function deleteMicroservice(id) {
  return request({
    url: `/dmc/microservices/${id}`,
    method: 'delete'
  })
}

export function updateStatus(data) {
  return request({
    url: `/dmc/microservices/${data.id}/status/${data.status}`,
    method: 'put'
  })
}

export function refreshRoutes() {
  return request({
    url: '/dmc/microservices/reflesh/routes',
    method: 'put'
  })
}
