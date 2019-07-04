import { constantRouterMap,
         asyncZongZhiZuzhi,
         asyncSYRKMap,
         asyncTSRKMap,
         asyncDLXXMap,
         asyncDisputeEvent,
         asyncSocialMap,
         asynctrafficMap,
         asyncPublicSecurityMap,
         asyncWorkPerformanceMap,
         asyncVideoWatchMap,
         asyncWTSBMap,
         asyncTianWangeMap,
         asyncNetMap,
         asyncSchoolSecurityMap,
         asyncSystemMap } from '@/router/index'
import store from '@/store'
import router from '@/router'
import { getRoute } from '@/utils/auth' // 验权

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menus, index,role) {
  if(role=='超级管理员') return asyncRouterMap
  let accessMenus = menus[0].children.filter(item=>{
     if(item.visible === true){
       return item
     }
  })

  let res = asyncRouterMap.filter(item=>{
    if(item.path == index) return item
    else
    for (let x=0; x<accessMenus.length; x++)
      if(item.path == accessMenus[x].url){
        return item
      }
  })
  return res
}

import m from "@/utils/constRouter"

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
      return new Promise(resolve => {
        let routeMap = []
        const routeNum = getRoute('routeNum')
        if (routeNum === '1') {
          routeMap = asyncZongZhiZuzhi
        } else if (routeNum === '2') {
          routeMap = asyncSYRKMap
        } else if (routeNum === '3') {
          routeMap = asyncTSRKMap
        } else if (routeNum === '4') {
          routeMap = asynctrafficMap
        } else if (routeNum === '5') {
          routeMap = asyncPublicSecurityMap
        } else if (routeNum === '6') {
          routeMap = asyncSocialMap
        }else if (routeNum === '7') {
          routeMap = asyncDisputeEvent
        }else if (routeNum === '8') {
          routeMap = asyncDLXXMap
        }else if (routeNum === '9') {
          routeMap = asyncWorkPerformanceMap
        }else if (routeNum === '10') {
          routeMap = asyncVideoWatchMap
        }else if (routeNum === '11'){
          routeMap = asyncWTSBMap
        }else if (routeNum === '12'){
          routeMap =  asyncTianWangeMap
        }else if (routeNum === '13'){
          routeMap = asyncNetMap
        }else if (routeNum === '14') {
          routeMap = asyncSchoolSecurityMap
        } else if (routeNum === '15'){
          routeMap = asyncSystemMap
        } else if (routeNum === undefined) {
          router.push('/login')
        }
        let menus
        if(store.getters.user.userRole=='超级管理员'){
          menus = m
        }else if(store.getters.user.menu!=null){
          menus = store.getters.user.menu.filter(item=>{
            return item.id == routeNum
          })
        }else{
          menus = data.menu.filter(item=>{
            return item.id == routeNum
          })
        }
        const accessedRouters = filterAsyncRouter(routeMap, menus, menus[0].url,data.userRole)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission



// WEBPACK FOOTER //
// ./src/store/modules/permission.js