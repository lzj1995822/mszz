import fetch from '@/utils/fetch'

export function login(username, password) {
  return fetch({
    url: '/login',
    method: 'post',
    params: {
      username:username,
      password:password,
      source:'web'
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/getLoginUserInfo',
    method: 'post',
    params:{
      token:token
    }
  })
}

export function logout(token) {
  return fetch({
    url: '/logout/'+token,
    method: 'post'
  })
}



// WEBPACK FOOTER //
// ./src/api/login.js