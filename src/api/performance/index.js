import fetch from '@/utils/fetch'

export function getEventDataForCheck(param){
  return fetch({
    url:'/performance/getEventDataForCheck',
    method:'post',
    params:param
  })
}

export function getSubMeshEventDataForCheck(params){
  return fetch({
    url:'/performance/getSubMeshEventDataForCheck',
    method:'post',
    params:params
  })
}


export function getEventCountByStatus(param){
  return fetch({
    url:'/performance/getEventCountByStatus',
    method:'post',
    params:param
  })
}

export function getEventDataByNetGrid(param){
  return fetch({
    url:'/performance/getEventDataByNetGrid',
    method:'post',
    params:param
  })
}

export function getSubMeshEventDataByNetGrid(params) {
  return fetch({
    url:'/performance/getSubMeshEventDataByNetGrid',
    method:'post',
    params:params
  })
}


// WEBPACK FOOTER //
// ./src/api/performance/index.js