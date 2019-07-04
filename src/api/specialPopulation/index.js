import fetch from '@/utils/fetch'

/**
 * 获取所有艾滋病人的信息
 * @param {*} query
 */
export function fetchAIDSPerson(query) {
  return fetch({
    url: '/specialPerson/getAIDSdiseasenfo',
    method: 'post',
    params: {
      'name': query.name,
      'certifID': query.certifID,
      'netGridID': query.netGridID,
      'page': query.page,
      'pageSize': query.pageSize
    }
  })
}

/**
 * 获取所有社区矫正人员的信息
 * @param {*} query
 */
export function fetchCorrectionerPerson(query) {
  return fetch({
    url: '/specialPerson/getCommunityCorrectionerInfo',
    method: 'post',
    params: {
      'name': query.name,
      'certifID': query.certifID,
      'netGridID': query.netGridID,
      'page': query.page,
      'pageSize': query.pageSize
    }
  })
}


/**
 * 获取所有吸毒人员的信息
 * @param {*} query
 */
export function fetchDrugAddictsPerson(query) {
  return fetch({
    url: '/specialPerson/getDrugAddictsInfo',
    method: 'post',
    params: {
      'name': query.name,
      'certifID': query.certifID,
      'netGridID': query.netGridID,
      'page': query.page,
      'pageSize': query.pageSize
    }
  })
}

/**
 * 获取所有刑满释放人员的信息
 * @param {*} query
 */
export function fetchEmancipistPerson(query) {
  return fetch({
    url: '/specialPerson/getEmancipistInfo',
    method: 'post',
    params: {
      'name': query.name,
      'certifID': query.certifID,
      'netGridID': query.netGridID,
      'page': query.page,
      'pageSize': query.pageSize
    }
  })
}

/**
 * 获取所有精神病人员的信息
 * @param {*} query
 */
export function fetchPsychoticPerson(query) {
  return fetch({
    url: '/specialPerson/getPsychoticInfo',
    method: 'post',
    params: {
      'name': query.name,
      'certifID': query.certifID,
      'netGridID': query.netGridID,
      'page': query.page,
      'pageSize': query.pageSize
    }
  })
}

/**
 * 获取特殊人口的详细信息
 * @param {*} id
 */
export function fetchSpecialPeronDetail(id, type) {
  return fetch({
    url: '/specialPerson/getSpecialDetail',
    method: 'get',
    params: {
      'certifID': id,
      'type': type
    }
  })
}

// /specialPerson/getKeyYoungersQuery
export function getKeyYoungersQuery(query) {
  return fetch({
    url: '/specialPerson/getKeyYoungersQuery',
    method: 'post',
    params: {
      name: query.name,
      certifID: query.certifID,
      netGridID: query.netGridID,
      page: query.page,
      pageSize: query.pageSize
    }
  })
}


// 　 2017/12/16 22:49:30
// /getKeyYoungerHistogramCount
export function getKeyYoungerHistogramCount() {
  return fetch({
    url: '/specialPerson/getKeyYoungerHistogramCount',
    method: 'post'
  })
}

// /**
//  * 查询是否存在此人
//  * @param {*} query
//  */
// export function hasThisPerson(id){
//     return fetch({
//         url:'/servedPerson/checkServedPersonCertifID',
//         method:'get',
//         params:{
//             'certifID':id
//         }
//     })
// }
/**
 * 查询是否存在此人
 * @param {*} query
 */
export function hasThisPerson(id, type) {
  return fetch({
    url: '/specialPerson/checkSpecialPersonByCertifID',
    method: 'get',
    params: {
      'certifID': id,
      'type': type
    }
  })
}

/**
 * 添加特殊人口
 * @param {*} query
 * @param {*} type
 */
export function addSpecialPerson(query, type) {
  return fetch({
    url: '/specialPerson/addSpecialPerson',
    method: 'post',
    params: {
      'object': JSON.stringify(query),
      'type': type
    }
  })
}


/**
 * 获取首页图表信息
 */
export function getIndexChart() {
  return fetch({
    url: '/specialPerson/getSpecialPersonCountByType',
    method: 'get'
  })
}

/**
 * 获取饼图
 * @param {*} type
 */
export function getSpecialPersonPieChart(type) {
  return fetch({
    url: '/specialPerson/getSpecialPersonPieCount',
    method: 'get',
    params: {
      'type': type
    }
  })
}

/**
 * 更新特殊人口
 * @param {*} query
 * @param {*} type
 */
export function updateSpecialPerson(query, type) {
  return fetch({
    url: '/specialPerson/updateSpecialPerson',
    method: 'post',
    params: {
      'object': JSON.stringify(query),
      'type': type
    }
  })
}

/**
 * 删除特殊人口
 * @param {*} id
 * @param {*} type
 */
export function deleteSpecialPerson(id, type) {
  return fetch({
    url: "/specialPerson/deleteSpecialPerson",
    method: 'get',
    params: {
      'id': id,
      'type': type
    }
  })
}

export function getKeyYoungerPieCount() {
  return fetch({
    url: '/specialPerson/getKeyYoungerPieCount',
    method: 'get'
  })
}


export function getKeyPetitionersQuery(query) {
  return fetch({
    url: '/specialPerson/getKeyPetitionersQuery',
    method: 'post',
    params: {
      name: query.name,
      certifID: query.certifID,
      netGridID: query.netGridID,
      page: query.page,
      pageSize: query.pageSize
    }
  })
}

export function getKeyPetitionersPieCount() {
  return fetch({
    url: '/specialPerson/getKeyPetitionersPieCount',
    method: 'get'
  })
}



// WEBPACK FOOTER //
// ./src/api/specialPopulation/index.js