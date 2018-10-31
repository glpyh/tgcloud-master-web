import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  response => {
    if (response.data.code === 200) {
      if (response.data) {
        return response.data
      }
    }
    if (
      response.data.code === 10011039 ||
      response.data.code === 10011040 ||
      response.data.code === 10011041
    ) {
      console.info('登录超时', response.data)
      return Promise.reject(response)
    } else // 5000:一般常规错误 50004:非法的token; 50008:其他客户端登录了;  50012:Token 过期了;
    if (response.code === 5004 || response.code === 5008 || response.code === 5012) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    } else {
      Message({
        message: response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(response)
    }
  },
  error => {
    let message = error.message
    if (error.response.status && error.response.status === 404) {
      message = '请求资源离家出走了,等一会就回来'
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      message = error.response.data.message
    }
    console.log('err' + error) // for debug
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
