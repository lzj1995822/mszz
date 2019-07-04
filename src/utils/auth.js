import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const USER = 'user'

const LOGIN = "msmis_login_info"

export function setLogin(user){
  return Cookies.set(LOGIN,JSON.stringify(user))
}

export function getLogin(user){
  return Cookies.get(LOGIN)
}

export function deleteLogin(){
  return Cookies.remove(LOGIN)
}

export function getUser(){
  return Cookies.get(USER)
}

export function setUser(user){
  return Cookies.set(USER,user)
}

export function deleteUser(){
  return Cookies.remove(USER)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRoute(key, value) {
  return Cookies.set(key, value)
}

export function getRoute(key) {
  return Cookies.get(key)
}



// WEBPACK FOOTER //
// ./src/utils/auth.js