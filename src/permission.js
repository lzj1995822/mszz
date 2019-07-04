import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getToken,
  getRoute
} from '@/utils/auth' // 验权


router.beforeEach((to, from, next) => {
  if(store.state.app.NetGrid == null){
    store.dispatch('setNetGrid');
  }
  if (window.localStorage.getItem('hasF') == '1') {
    window.localStorage.setItem('hasF', 0)
    next()
    return
  } else if (from.path == to.path) {
    window.localStorage.setItem('hasF', '1')
    router.push(to.fullPath)
    return
  }


  if (!getToken() && to.path !== '/login') {
    next('/login')
  } else {
    if (getRoute('routeNum') !== undefined) {
      if (store.getters.user == null) {
        store.dispatch('GetInfo').then(res=>{
          store.dispatch('GenerateRoutes', res).then(() => {
            router.addRoutes(store.getters.addRouters)
          })
        })
      }
    }
    next()
  }
})



// WEBPACK FOOTER //
// ./src/permission.js