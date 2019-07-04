import fetch from '@/utils/fetch'

/**
 * 获取两公所需编码
 */
export function getOrgCode(){
    return fetch({
        url:'/Nonpublic/getNopublicCode',
        method:'get'
    })
}

/**
 * 获取经济组织信息
 * @param {*} query 
 * @param {*} type 
 */
export function fetchEconomyInfo(query){
    return fetch({
        url:'/Nonpublic/getNonPublicEconomyOrgInfo',
        method:'get',
        params:{
            'name':query.name,
            'type':query.type,
            'netGridID':query.netGridID,
            'isLogisticsEnterprise':query.isLogisticsEnterprise,
            'isKeyEnterprise':query.isKeyEnterprise,
            'page': query.page, // 页码
            'pageSize': query.pageSize // 页号
        }
    })
}

/**
 * 获取经济组织详细信息
 * @param {*} code 
 */
export function getEconomyOrgDetail(code){
    return fetch({
        url:'/Nonpublic/getNonPublicEconomyOrgDetail',
        method:'get',
        params:{
            'code':code
        }
    })
}

/**
 * 添加经济组织
 * @param {*} query 
 */
export function addEconomyOrg(query){
    return fetch({
        url:'/Nonpublic/addNonpublic',
        method:'post',
        data:query
    })
}

/**
 * 更新经济组织
 * @param {*} query 
 */
export function updateEconomyOrg(query){
    return fetch({
        url:'/Nonpublic/updateNonpublic',
        method:'post',
        data:query
    })
}

/**
 * 删除经济组织信息
 * @param {*} query 
 */
export function deleteEconomyOrg(id){
    return fetch({
        url:'/Nonpublic/deleteNonpublic',
        method:'get',
        params:{
            'code':id
        }
    })
}

/**
 * 获取编辑的经济组织信息
 */
export function getEcnonmyUpdateInfo(code){
    return fetch({
        url:'/Nonpublic/getToUpdateInfo',
        method:'get',
        params:{
            'code':code
        }
    })
}

/**
 * 获取经济组织统计图
 */
export function getEconomyHistogram(){
    return fetch({
        url:'/Nonpublic/getEconomyHistogram',
        method:'get'
    })
}


/**
 * 获取社会组织所需编码
 */
export function fetchSocietyOrgInfo(query){
    return fetch({
        url:"/Nonpublic/getSocietyOrgInfo",
        method:'post',
        params:{
            'name':query.name,
            'type':query.type,
            'netGridID':query.netGridID,
            'page': query.page, // 页码
            'pageSize': query.pageSize // 页号
        }
    })
}

/**
 * 获取社会组织图表
 */
export function getSocietyOrgHistogram(){
    return fetch({
        url:'/Nonpublic/getSocietyOrgHistogram',
        method:'get'
    })
}

// /Nonpublic/getSocietyOrgDetailByCode详细
// /Nonpublic/addSocietyOrg添加
// /Nonpublic/updateSocietyOrg修改
// /Nonpublic/deleteSocietyOrg删除
// /Nonpublic/getToUpdateSocietyOrgInfo编辑
// /Nonpublic/getSocietyOrgHistogram柱状图

/**
 * 获取详细页信息
 * @param {*} code 
 */
export function getSocietyOrgDetailByCode(code){
    return fetch({
        url:'/Nonpublic/getSocietyOrgDetailByCode',
        method:'get',
        params:{
            'code':code
        }
    })
}

/**
 * 添加社会组织
 * @param {*} query 
 */
export function addSocietyOrg(query){
    return fetch({
        url:'/Nonpublic/addSocietyOrg',
        method:'post',
        data:query
    })
}

/**
 * 更新社会组织
 * @param {*} query 
 */
export function updateSocietyOrg(query){
    return fetch({
        url:'/Nonpublic/updateSocietyOrg',
        method:'post',
        data:query
    })
}

/**
 * 删除社会组织
 * @param {*} code 
 */
export function deleteSocietyOrg(code){
    return fetch({
        url:'/Nonpublic/deleteSocietyOrg',
        method:'get',
        params:{
            'code':code
        }
    })
}

/**
 * 获取编辑页详细信息
 * @param {*} code 
 */
export function getToUpdateSocietyOrgInfo(code){
    return fetch({
        url:'/Nonpublic/getToUpdateSocietyOrgInfo',
        method:'get',
        params:{
            'code':code
        }
    })
}


// WEBPACK FOOTER //
// ./src/api/orgManage/index.js