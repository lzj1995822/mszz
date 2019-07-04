import fetch from '@/utils/fetch'

export function send(param){
  return fetch({
    url:'/send',
    method:'post',
    params:param
  })
}



// WEBPACK FOOTER //
// ./src/api/index.js