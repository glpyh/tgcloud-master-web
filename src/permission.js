import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
// import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permissiom judge function
function hasPermission(permissions, perms) {
  // if (!perms) return true // 如果没有在router-> index.js里设置动态路由的权限就直接通过
  // return permissions.some(role => perms.indexOf(role) >= 0)
  return true
}

const whiteList = [''] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) {
    // determine if there has token
    /* has token*/
    if (!store.getters.id) {
      // 判断当前用户是否已拉取完user_info信息
      store
        .dispatch('GetUserInfo')
        .then(res => {
          // 拉取user_info
          const permissions = res.result.permissions // note: 返回该用户拥有的权限
          const routers = res.result.routers
          store.dispatch('GenerateRoutes', { permissions, routers }).then(() => {
            // 根据permissions权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            store.dispatch('FedLogOut').then(() => {
              // Message.error('授权失效, 请重新登录')
              window.location.href = process.env.PASSPORT_URL + '?redirectUrl=' + window.location.href
              next()
            })
          }
          return Promise.reject(error)
        })
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      if (hasPermission(store.getters.permissions, to.meta.perms)) {
        next() //
      } else {
        next({ path: '/401', replace: true, query: { noGoBack: true }})
      }
      // 可删 ↑
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // next('/login') // 否则全部重定向到登录页
      window.location.href = process.env.PASSPORT_URL + '?redirectUrl=' + window.location.href
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
