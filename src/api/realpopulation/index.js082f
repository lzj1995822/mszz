import fetch from '@/utils/fetch'

/**
 * 查询所有实有人口
 * @param {*} query 
 */
export function fetchResidentPerson(query){
    return fetch({
        url:'',
        method:'post',
        data:query
    })
}

/**
 * 查询所有流动人口
 * @param {*} query 
 */
export function fetchFloatingPerson(query){
    return fetch({
        url:'',
        method:'post',
        data:query
    })
}

/**
 * 查询所有留守人口
 * @param {*} query 
 */
export function fetchStayedPerson(query){
    return fetch({
        url:'',
        method:'post',
        data:query
    })
}

/**
 * 查询所有外籍人口
 * @param {*} query 
 */
export function fetchForeignerPerson(query){
    return fetch({
        url:'',
        method:'post',
        data:query
    })
}

/**
 * 获取柱状图信息
 */
// /population/getServedHistogramCount?type
export function getServedHistogramCount(type){
    return fetch({
        url:"/population/getServedHistogramCount?type="+type,
        method:'get'
    })
}

// /servedPerson/getServedPersonCount
export function getServedPersonCount(){
    return fetch({
        url:'/servedPerson/getServedPersonCount',
        method:'get'
    })
}

export function addHouse(query){
    return fetch({
        url:'/house/addHouse',
        method:'post',
        data:query
    })
}

export function updateHouse(query){
    return fetch({
        url:'/house/updateHouse',
        method:'post',
        data:query
    })
}

export function deleteHouse(id){
    return fetch({
        url:'/house/deleteHouse',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getHouseQuery(query){
    return fetch({
        url:'/house/getHouseQuery',
        method:'post',
        params:{
            name:query.name,
            address:query.address,
            page:query.page,
            pageSize:query.pageSize
        }
    })
}

export function getHouseDetail(id){
    return fetch({
        url:'/house/getHouseDetail',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getHouseDetailToUpdate(id){
    return fetch({
        url:'/house/getHouseDetailToUpdate',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getHouseCode(){
    return fetch({
        url:'/house/getHouseCode',
        method:'get'
    })
}


// WEBPACK FOOTER //
// ./src/api/realpopulation/index.js