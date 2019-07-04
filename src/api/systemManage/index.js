import fetch from '@/utils/fetch'

export function addUser(query) {
    return fetch({
        url:'/user/addUser',
        method:'post',
        data:query
    })
}

export function updateUser(query) {
    return fetch({
        url:'/user/updateUser',
        method:'post',
        data:query
    })
}

export function deleteUser(id){
    return fetch({
        url:'/user/deleteUser',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getUserQuery(params){
    return fetch({
        url:'/user/getUserQuery',
        method:'post',
        params:params
    })
}

export function getAllRoleMenu(){
  return fetch({
    url:'/role/getAllRoleMenu',
    method:'get'
  })
}

export function addRoleMenu(query){
  return fetch({
    url:'/role/addRoleMenu',
    method:'post',
    data:query
  })
}

export function updateRole(query){
  return fetch({
    url:'/role/updateRoleMenu',
    method:'post',
    data:query
  })
}

export function deleteRole(id){
  return fetch({
    url:'/role/deleteRoleMenu',
    method:'post',
    params:{
      id:id
    }
  })
}

export function getRoleInfoByID(id){
  return fetch({
    url:'/role/getRoleInfoByID',
    method:'post',
    params:{
      id:id
    }
  })
}

// /api/user/getUserDetail 传id
export function getUserDetail(id){
  return fetch({
    url:'/user/getUserDetail',
    method:'post',
    params:{
      id:id
    }
  })
}

export function getLog(params){
  return fetch({
    url:'/log/getLoginLog',
    method:'post',
    params:params
  })
}



// WEBPACK FOOTER //
// ./src/api/systemManage/index.js