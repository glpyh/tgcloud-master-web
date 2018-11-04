import { constantRouterMap } from '@/router'
const _import = require('../../router/_import_' + process.env.NODE_ENV)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(permissions, route) {
//   if (route.meta && route.meta.perms) {
//     permissions.some(permission => route.meta.perms.indexOf(permission) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, permissions) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(permissions, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, permissions)

//         return route.children.length > 0
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

function initComponent(asyncRouterMap) {
  if (!asyncRouterMap || asyncRouterMap.length === 0) { return }
  asyncRouterMap.forEach(element => {
    if (element.component) {
      element.component = _import(element.component)
      initComponent(element.children)
    }
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      const asyncRouterMap = data.routers
      initComponent(asyncRouterMap)
      commit('SET_ROUTERS', asyncRouterMap)

      // const permissions = data.permissions
      // return new Promise(resolve => {
      //   const { permissions } = data
      //   const accessedRouters = filterAsyncRouter(asyncRouterMap, permissions)
      //   commit('SET_ROUTERS', accessedRouters)
      //   resolve()
      // })
    }
  }
}

export default permission
