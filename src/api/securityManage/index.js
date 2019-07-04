import fetch from '@/utils/fetch'

// /key/getKeyEnterpriseUSCcode 重点企业编码
export function getKeyEnterpriseUSCcode() {
  return fetch({
    url: '/key/getKeyEnterpriseUSCcode',
    method: 'get'
  })
}

// /key/getInspectRecDetail 查看详情 传id
export function getInspectRecDetail(id) {
  return fetch({
    url: '/key/getInspectRecDetail',
    method: 'get',
    params: {
      id: id
    }
  })
}

// /key/getInspectRecInfo 分页的
export function getInspectRecInfo(query) {
  return fetch({
    url: '/key/getInspectRecInfo',
    method: 'get',
    params: query
  })
}

// /key/addInspectRecord 添加
export function addInspectRecord(query) {
  return fetch({
    url: "/key/addInspectRecord",
    method: 'post',
    data: query
  })
}

// /SSEvent/getSSEventCode 获取编码
export function getSSEventCode() {
  return fetch({
    url: '/SSEvent/getSSEventCode',
    method: 'get'
  })
}

// /SSEvent/addSSEventBasic 添加基本信息
export function addSSEventBasic(query) {
  return fetch({
    url: '/SSEvent/addSSEventBasic',
    method: 'post',
    data: query
  })
}

// /SSEvent/addSSEventInvolvedPersons 添加涉案人员
export function addSSEventInvolvedPersons(query) {
  return fetch({
    url: '/SSEvent/addSSEventInvolvedPersons',
    method: 'post',
    data: query
  })
}

// /dutyPoint/addScenicAreaDutyPoint 添加景区执勤点
export function addScenicAreaDutyPoint(query) {
  return fetch({
    url: '/dutyPoint/addScenicAreaDutyPoint',
    method: 'post',
    data: query
  })
}

//分页获取景区执勤点
export function getDutyPointQuery(query) {
  return fetch({
    url: '/dutyPoint/getDutyPointQuery',
    method: 'get',
    params: query
  })
}

//获取景区执勤点详情
export function getDutyPointDetail(id) {
  return fetch({
    url: '/dutyPoint/getDutyPointDetail?id=' + id,
    method: 'get'
  })
}

//获取编辑详情
export function getDutyDetailToUpdate(id) {
  return fetch({
    url: '/dutyPoint/getDutyDetailToUpdate?scenicAreaDutyPointID=' + id,
    method: 'get'
  })
}

// 更新景区执勤点信息
export function updateDutyPoint(query) {
  return fetch({
    url: '/dutyPoint/updateDutyPoint',
    method: 'post',
    data: query
  })
}

export function deleteDutyPoint(id) {
  return fetch({
    url: '/dutyPoint/deleteDutyPoint?scenicAreaDutyPointID=' + id,
    method: 'get'
  })
}

// /SSEvent/getSSQuery
export function getSSQuery(query) {
  return fetch({
    url: '/SSEvent/getSSQuery',
    method: 'get',
    params:query
  })
}

export function getSSDetail(id) {
  return fetch({
    url: "/SSEvent/getSSDetail?id=" + id,
    method: "get"
  })
}

// /SSEvent/getDetailToUpdate 传SSEventID
export function getDetailToUpdate(id) {
  return fetch({
    url: '/SSEvent/getDetailToUpdate?SSEventID=' + id,
    method: 'get'
  })
}

// /SSEvent/updateSSEvent
export function updateSSEvent(query) {
  return fetch({
    url: '/SSEvent/updateSSEvent',
    method: "post",
    data: query
  })
}

export function updateSSEventInvolvedPersons(query) {
  return fetch({
    url: '/SSEvent/updateSSEventInvolvedPersons',
    method: 'post',
    data: query
  })
}

export function deleteSSEventInvolvedPersons(id) {
  return fetch({
    url: '/SSEvent/deleteSSEventInvolvedPersons?id=' + id,
    method: 'get'
  })
}

export function deleteSSEventMedia(id, type) {
  return fetch({
    url: '/SSEvent/deleteSSEventMedia',
    method: 'get',
    params: {
      id: id,
      type: type
    }
  })
}

// /SSEvent/getSSCountVO
export function getSSCountVO() {
  return fetch({
    url: '/SSEvent/getSSCountVO',
    method: 'get'
  })
}

export function deleteSSEvent(id) {
  return fetch({
    url: '/SSEvent/deleteSSEvent?id=' + id,
    method: 'get'
  })
}


// /getSSEventReporterQuery 上报者分页
export function getSSEventReporterQuery(query) {
  return fetch({
    url: '/SSEvent/getSSEventReporterQuery',
    method: 'post',
    params:query
  })
}

//派发者分页
export function getSSEventDespatcherQuery(query) {
  return fetch({
    url: '/SSEvent/getSSEventDespatcherQuery',
    method: 'post',
    params:query
  })
}

//部门负责人分页
export function getSSEventDeptDespatcherQuery(query) {
  return fetch({
    url: '/SSEvent/getSSEventDeptDespatcherQuery',
    method: 'post',
    params:query
  })
}

//处理者分页
export function getSSEventHandlerQuery(query) {
  return fetch({
    url: '/SSEvent/getSSEventHandlerQuery',
    method: 'post',
    params: query
  })
}

//审核者分页
export function getSSEventAuditorQuery(query) {
  return fetch({
    url: '/SSEvent/getSSEventAuditorQuery',
    method: 'post',
    params: query
  })
}


// 添加派发信息
export function insertSSEventDistribute(query) {
  return fetch({
    url: '/SSEvent/insertSSEventDistribute',
    method: 'post',
    data: query
  })
}

// 添加事件处理处理基本信息
export function insertSSEventDealingBasic(query) {
  return fetch({
    url: '/SSEvent/insertSSEventDealingBasic',
    method: 'post',
    data: query
  })
}

//添加事件审核信息
export function insertSSEventChecked(query) {
  return fetch({
    url: '/SSEvent/insertSSEventChecked',
    method: 'post',
    data: query
  })
}

export function updateSSEventStatus(type, id) {
  return fetch({
    url: '/SSEvent/updateSSEventStatus',
    method: 'post',
    params: {
      type: type,
      id: id
    }
  })
}

// /getUserInfoByKey
export function getUserInfoByKey(key) {
  return fetch({
    url: '/sp/getUserInfoByKey',
    method: 'post',
    params: {
      key: key
    }
  })
}

export function getSubMeshEventCount(id) {
  return fetch({
    url:'/SSEvent/getSubMeshEventCount?netGridID='+id,
    method:'post'
  })
}


// WEBPACK FOOTER //
// ./src/api/securityManage/index.js