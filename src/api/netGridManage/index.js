import fetch from '@/utils/fetch'

export function getInfoByPage(params) {
  return fetch({
    url: '/netGrid/getNetGridMemberQuery',
    method: 'post',
    params: params
  })
}

export function addInfo(params) {
  return fetch({
    url: '/netGrid/insertNetGridMember',
    method: 'post',
    data: params
  })
}

export function getEditInfo(id) {
  return fetch({
    url: '/netGrid/getNetGridMemberDetailToUpdate',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function update(params) {
  return fetch({
    url: '/netGridMember/updateNetGridMember',
    method: 'post',
    data: params
  })
}

// /deleteNetGridMember
export function deleteById(id) {
  return fetch({
    url: '/netGridMember/deleteNetGridMember',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function getNetGridMemberDetail(id) {
  return fetch({
    url: "/netGrid/getNetGridMemberDetail",
    method: 'post',
    params: {
      id: id
    }
  })
}

export function getNetGridMemberHistogram() {
  return fetch({
    url: '/netGrid/getNetGridMemberHistogram',
    method: "get"
  })
}

// 上报者分页
export function getNetGridEventReporterQuery(query) {
  return fetch({
    url: '/netGrid/getNetGridEventReporterQuery',
    method: 'post',
    params: query
  })
}

// 指派者分页信息
export function getNetGridEventDespatcherQuery(query) {
  return fetch({
    url: '/netGrid/getNetGridEventDespatcherQuery',
    method: 'post',
    params: query
  })
}
//部门负责人分页信息
export function getNetGridEventDeptDespatcherQuery(query) {
  return fetch({
    url: '/netGrid/getNetGridEventDeptDespatcherQuery',
    method: 'post',
    params: query
  })
}

// 事件处理者分页信息
export function getNetGridEventHandlerQuery(query) {
  return fetch({
    url: '/netGrid/getNetGridEventHandlerQuery',
    method: 'post',
    params: {
      id: query.id,
      kind: query.kind,
      name: query.name,
      netGridID: query.netGridID,
      status: query.status,
      page: query.page,
      pageSize: query.pageSize
    }
  })
}

// 事件审核者分页信息
export function getNetGridEventAuditorQuery(query) {
  return fetch({
    url: '/netGrid/getNetGridEventAuditorQuery',
    method: 'post',
    params: query
  })
}


// insertNetGridEventBasic
export function insertNetGridEventBasic(query) {
  return fetch({
    url: '/netGrid/insertNetGridEventBasic',
    method: 'post',
    data: query
  })
}

// /addNetGridEventInvolvedPersons
export function addNetGridEventInvolvedPersons(query) {
  return fetch({
    url: '/netGrid/addNetGridEventInvolvedPersons',
    method: 'post',
    data: query
  })
}

// 事件处理
export function addNetGridEventDealingBasic(query) {
  return fetch({
    url: '/netGrid/addNetGridEventDealingBasic',
    method: 'post',
    data: query
  })
}


// 事件派发
export function addNetGridEventDistribute(query) {
  return fetch({
    url: '/netGrid/addNetGridEventDistribute',
    method: 'post',
    data: query
  })
}

// 事件审核
export function addNetGridEventChecked(query) {
  return fetch({
    url: '/netGrid/addNetGridEventChecked',
    method: 'post',
    data: query
  })
}

// updateNetGridEventStatus
export function updateNetGridEventStatus(type, id) {
  return fetch({
    url: '/netGrid/updateNetGridEventStatus',
    method: 'post',
    params: {
      type: type,
      id: id
    }
  })
}

// getNetGridEventDetail
export function getNetGridEventDetail(id) {
  return fetch({
    url: '/netGrid/getNetGridEventDetail',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function getNetGridQuery(query){
  return fetch({
    url:'/netGrid/getNetGridQuery',
    method:'post',
    params:query
  })
}

export function getNetGridDetail(id){
  return fetch({
    url:'/netGrid/getNetGridDetail',
    method:'post',
    params:{
      id:id
    }
  })
}

export function deleteNetGrid(id){
  return fetch({
    url:'/netGrid/deleteNetGrid',
    method:'post',
    params:{
      id:id
    }
  })
}

export function addNetGrid(query){
  return fetch({
    url:'/netGrid/addNetGrid',
    method:'post',
    data:query
  })
}

export function updateNetGrid(query){
  return fetch({
    url:'/netGrid/updateNetGrid',
    method:'post',
    data:query
  })
}

export function getNetGridEventCount(){
  return fetch({
    url:'/netGrid/getNetGridEventCount',
    method:'get'
  })
}

export function getNetGridMemberByFatherID(id){
  return fetch({
    url:'/netGrid/getNetGridMemberByFatherID',
    method:'get',
    params:{
      id:id
    }
  })
}

export function addNetGridMember(param){
  return fetch({
    url:'/netGridMember/addNetGridMember',
    method:'post',
    data:param
  })
}

export function getNetGridByFaterID(id){
  return fetch({
    url:'/netGrid/getNetGridByFaterID?netGridID='+id,
    method:'get'
  })
}

export function getAllNetGrid(){
  return fetch({
    url:'/netGrid/getAllNetGrid',
    method:'get'
  })
}

export function getNetGridMemberForOrg(id){
  return fetch({
    url:'/netGridMember/getNetGridMemberForOrg',
    method:'get',
    params:{
      id:id
    }
  })
}


// http://223.112.65.198:9898/msmis/dispute/getDisputeEventForNetGrid?page=1&pageSize=10 网格
// http://223.112.65.198:9898/msmis/SSEvent/getSSEventForNetGrid?page=1&pageSize=10 社会治安
// http://223.112.65.198:9898/msmis/trafficAccident/getTrafficAccidentForNetGrid?page=1&pageSize=10 交通事故
// http://223.112.65.198:9898/msmis/sp/getSPEventForNetGrid?page=1&pageSize=10 天网巡防
export function getDisputeEventForNetGrid(query){
  return fetch({
    url:'/dispute/getDisputeEventForNetGrid',
    method:'post',
    params:query
  })
}
export function getSSEventForNetGrid(query){
  return fetch({
    url:'/SSEvent/getSSEventForNetGrid',
    method:'post',
    params:query
  })
}
export function getTrafficAccidentForNetGrid(query){
  return fetch({
    url:'/trafficAccident/getTrafficAccidentForNetGrid',
    method:'post',
    params:query
  })
}
export function getSPEventForNetGrid(query){
  return fetch({
    url:'/sp/getSPEventForNetGrid',
    method:'post',
    params:query
  })
}

export function getNetGridEventForNetGrid(query){
  return fetch({
    url:'/netGrid/getNetGridEventForNetGrid',
    method:'post',
    params:query
  })
}

export function getSubMeshEventCount(id) {
  return fetch({
    url:'/netGrid/getSubMeshEventCount?netGridID='+id,
    method:'post'
  })
}

export function updateNetGridID(url,big,id) {
  return fetch({
    url:url,
    method:'post',
    params:{
      netGridID:big,
      id:id
    }
  })
}

//获取网格员
export function getUserForNetGridMember(params){
  return fetch({
    url:'/netGridMember/getUserForNetGridMember',
    method:'get',
    params
  })
}

//获取所有网格员轨迹配置信息
export function getAllMemberConfig(params){
  return fetch({
    url:'/netGridMember/getAllMemberConfig',
    method:'get',
    params
  })
}

//新增轨迹配置
export function addNetGridMemberTrailConfig(data){
  return fetch({
    url:'/netGridMember/addNetGridMemberTrailConfig',
    method:'post',
    data
  })
}

//修改轨迹配置
export function updateNetGridMemberTrailConfig(data){
  return fetch({
    url:'/netGridMember/updateNetGridMemberTrailConfig',
    method:'post',
    data
  })
}

export function deleteNetGridMemberTrailConfig(id){
  return fetch({
    url:'/netGridMember/deleteNetGridMemberTrailConfig?id='+id,
    method:'get'
  })
}

export function getGridMemberTrail(params){
  return fetch({
    url:'/netGridMember/getGridMemberTrail',
    method:'get',
    params
  })
}


// WEBPACK FOOTER //
// ./src/api/netGridManage/index.js