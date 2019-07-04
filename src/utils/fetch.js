import axios from 'axios'
import router from '../router'
import {
  Message
} from 'element-ui'
import store from '../store'
import {
  getToken
} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修
  }
  config.headers['type'] = 'ajax'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.message == 'token error') {
      store.dispatch('FedLogOut').then(() => {
        router.replace({path:'/login'})
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else {
      return response.data
    }
  },error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service



// WEBPACK FOOTER //
// ./src/utils/fetch.js