import fetch from '@/utils/fetch'

// /zz/getZZHomePageCount
export function getZZHomePageCount(){
  return fetch({
    url:'/zz/getZZHomePageCount',
    method:'get'
  })
}

/********************首页图表信息******************** */
/**
 * 获取首页户籍信息
 */
export function fetchIndexPopulationChartInfo(){
  return fetch({
    url:'/servedPerson/getServedPersonCount',
    method:'get'
  })
}

/**
 * 获取首页特殊人口信息
 */
export function fetchSpecialPersonChartInfo(){
  return fetch({
    url:'/specialPerson/getSpecialPersonCount',
    method:'get'
  })
}

/**
 * 获取服务记录信息
 */
export function fetchServedRecordChartInfo(){
  return fetch({
    url:"/served/getServedRecordCount",
    method:'get'
  })
}

/**
 * 获取所有机构成员信息
 * @param {*} query
 */
export function fetchJGMemberInfo(query) {
  return fetch({
    url: '/orgMember/query',
    method: 'Post',
    data: query
  })
}

/**
 * 添加机构成员
 * @param {*} query
 */
export function addJGMemberInfo(query) {
  return fetch({
    url: '/orgMember/add',
    method: 'POST',
    data: query
  })
}

/**
 * 根据OrgMemberID获取成员信息
 * @param {*} OrgMemberID
 */
export function fetchMemberInfoById(orgMemberID) {
  return fetch({
    url: '/orgMember/get/'+orgMemberID,
    method: 'get'
  })
}

/**
 * 更改成员的在职状态
 * @param {*} id
 */
export function changejGMemberStatusById(id, status) {
  return fetch({
    url: '/orgMember/updateStatus',
    method: 'get',
    params: {
      'orgMemberID': id,
      'status': status
    }
  })
}

/**
 * 更新组织成员信息
 * @param {*} query
 */
export function updateZuzhiMemberInfo(query) {
  return fetch({
    url: '/orgMember/update',
    method: 'post',
    data: query
  })
}

/**
 * 获取所有的人员管理中需要用到类别信息
 */
export function fetchALLTYPEInfo() {
  return fetch({
    url: '/orgMember/getSpecs',
    method: 'get'
  })
}

export function getOrgBasicInf(query){
  return fetch({
    url:'/orgMember/getOrgBasicInf',
    method:'post',
    params:{
      orgName:query.orgName,
      orgType:query.orgType,
      netGridID:query.netGridID,
      levelType:query.levelType,
      page:query.page,
      pageSize:query.pageSize
    }
  })
}

export function getOrgBasicInfDetail(id){
  return fetch({
    url:'/orgMember/getOrgBasicInfDetail',
    method:'post',
    params:{
      id:id
    }
  })
}

export function getOrgBasicInfDetailToUpdate(id){
  return fetch({
    url:'/orgMember/getOrgBasicInfDetailToUpdate',
    method:'post',
    params:{
      id:id
    }
  })
}

export function addOrgBasicInfo(query){
  return fetch({
    url:'/orgMember/addOrgBasicInfo',
    method:'post',
    data:query
  })
}

export function updateOrgBasicInfo(query){
  return fetch({
    url:'/orgMember/updateOrgBasicInfo',
    method:'post',
    data:query
  })
}

export function deleteOrgBasicInfo(id){
  return fetch({
    url:'/orgMember/deleteOrgBasicInfo',
    method:'post',
    params:{
      id:id
    }
  })
}



/********************服务对象信息********************************/
/**
 * 分页带条件查询服务对象信息
 */
export function fetchServedMemberInfo(query) {
  return fetch({
    url: '/served/query',
    method: 'POST',
    data: query
  })
}

/**
 * 根据id获取服务对象信息
 *
 * @param {*} id
 */
export function fetchServedMemberInfoById(id) {
  return fetch({
    url: '/served/getServedPersonInfo',
    method: 'get',
    params:{
      certifID:id
    }
  })
}

/**
 * 获取所有服务对象类型信息
 *
 */
export function fetchServedPersonType(){
  return fetch({
    url: '/served/spTypes',
    method: 'get'
  })
}

/**
 * 根据id删除服务对象信息
 * @param {*} id
 */
export function deleteServedMemberById(id) {
  return fetch({
    url: '',
    method: 'get'
  })
}

/**
 * 更新被服务对象信息
 * @param {*} query
 */

export function updateServedMemberInfo(type,obj) {
  return fetch({
    url: '/servedPerson/updateServedPerson',
    method: 'post',
    params:{
      type:type,
      object:JSON.stringify(obj)
    }
  })
}

/**
 * 添加(大陆)成员对象的基本信息
 *
 * @param {*} query
 */
export function addServedMemberBasicInfo(query){
  return fetch({
    url: '/served/addBasic',
    method: 'post',
    data: query
  })
}

/**
 * 添加被服务对象的流动人口信息
 *
 * @param {*} query
 */
export function addFloatServedPersonInfo(query){
  return fetch({
    url:'/served/addFloating',
    method: 'post',
    data: query
  })
}

/**
 * 添加被服务对象的常驻人口信息
 *
 * @param {*} query
 */
export function addResidentServedPersonInfo(query){
  return fetch({
    url:'/served/addResident',
    method: 'post',
    data: query
  })
}

/**
 * 添加被服务对象留守人员的扩展信息
 * @param {*} query
 */
export function addStayedServedPersonInfo(query){
  return fetch({
    url:'/served/addStayed',
    method:'post',
    data: query
  })
}

/**
 * 添加被服务对象艾滋病记录信息
 * @param {*} query
 */
export function addAIDServedPersonInfo(query){
  return fetch({
    url:'/served/addAIDS',
    method:'post',
    data: query
  })
}

/**
 * 添加被服务对象的吸毒记录
 * @param {*} query
 */
export function addDrugServedPersonInfo(query){
  return fetch({
    url:'/served/addDrug',
    method:'post',
    data: query
  })
}

/**
 * 添加被服务人员的刑满释放记录
 * @param {*} query
 */
export function addEmancipistServedPersonInfo(query){
  return fetch({
    url:'/served/addEmancipist',
    method:'post',
    data:query
  })
}

/**
 * 添加被服务对象严重精神病人的记录
 * @param {*} query
 */
export function addPsychoticServedPersonInfo(query){
  return fetch({
    url:'/served/addPsychotic',
    method:'post',
    data:query
  })
}

/**
 * 获取被服务对象模块所需的编码表
 *
 */
export function fetchServedPersonManageTypes(){
  return fetch({
    url:'/served/allTypes',
    method:'get'
  })
}

/**
 * 获取人员职务编码表所有信息
 */
export function fetchPersonPositionType(){
  return fetch({
    url:'',
    method:'get'
  })
}


// /servedPerson/deleteServedPerson 删除Long id, String type
export function deleteServedPerson(type,id){
  return fetch({
    url:'/servedPerson/deleteServedPerson',
    method:'get',
    params:{
      id:id,
      type:type
    }
  })
}

/*******************服务对象记录信息***********************/
export function addServiceRecord(query){
  return fetch({
    url:'/served/addServiceRecord',
    method:'get',
    params:{
      orgMemberName:query.orgMemberName,
      orgMemberCertID:query.orgMemberCertID,
      servedPersonName:query.servedPersonName,
      servedPersonCertID:query.servedPersonCertID,
      servedPersonType:'',
      serverInf:query.serverInf,
      serverDate:query.serverDate
    }
  })
}


/**
 *分页获取所有服务记录
 *
 */
export function fetchServedRecord(query) {
  return fetch({
    url: '/orgMember/getServiceRecord',
    method: 'post',
    data: query
  })
}

// /orgMember/getOrgMemberByNameAndCertID 传name id 服务人搜索
export function getOrgMemberByNameAndCertID(name,id){
  return fetch({
    url:'/orgMember/getOrgMemberByNameAndCertID',
    method:'get',
    params:{
      name:name,
      id:id
    }
  })
}

// /servedPerson/selectByNameAndCertifID 传name certifID 服务对象搜索
export function selectByNameAndCertifID(name,id){
  return fetch({
    url:'/servedPerson/selectByNameAndCertifID',
    method:'get',
    params:{
      name:name,
      certifID:id
    }
  })
}


// http://223.112.65.198:9898/msmis/orgMember/getServedRecordDetail?orgMServedPID=25
export function fetchServedRecordDetail(id){
  return fetch({
    url:'/orgMember/getServedRecordDetail',
    method:'get',
    params:{
      'orgMServedPID':id
    }
  })
}

/**
 * 根据id删除服务记录
 * @param {*} id
 */
export function deleteServedRecordById(id) {
  return fetch({
    url: '',
    method: 'get'
  })
}

/**
 * 更新服务记录
 * @param {*} row
 */
export function updateServedRecordById(row) {
  return fetch({
    url: '',
    method: 'post',
    data: row
  })
}

// /served/updateRecord
export function updateRecord(id,content,date){
  return fetch({
    url:'/served/updateRecord',
    method:"get",
    params:{
      id:id,
      content:content,
      date:date
    }
  })
}

// /served/deleteRecord
export function deleteRecord(id){
  return fetch({
    url:"/served/deleteRecord?id="+id,
    method:'get'
  })
}

export function getServedStuff(query){
  return fetch({
    url:'/netGrid/getNetGridMemberQuery',
    method:'post',
    params:{
      isServicePerson:1,
      name:query.name,
      certID:query.certID,
      netGridID:query.netGridID,
      page:query.page,
      pageSize:query.pageSize
    }
  })
}



// WEBPACK FOOTER //
// ./src/api/zonghezhili/duiwujianshe.js