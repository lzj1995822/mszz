import fetch from '@/utils/fetch'

/**
 * 获取所有纠纷
 */
export function getAllDispute(query){
    return fetch({
        url:'/dispute/getAll',
        method:"post",
        params:query
    })
}

/**
 * 根据纠纷ID获取详细信息
 * @param {*} id 
 */
export function getDisputeDetail(id){
    return fetch({
        url:'/dispute/getDetail',
        method:'get',
        params:{
            "disputeEventID":id
        }
    })
}

export function getDisputeBasicDetailToUpdate(id){
    return fetch({
        url:'/dispute/getDisputeBasicDetailToUpdate',
        method:'post',
        params:{
            id:id
        }
    })
}

export function insertDisputeEvent(query){
    return fetch({
        url:'/dispute/insertDisputeEvent',
        method:'post',
        data:query
    })
}

export function updateDisputeEvent(query){
    return fetch({
        url:'/dispute/updateDisputeEvent',
        method:'post',
        data:query
    })
}

export function deleteDisputeEvent(id){
    return fetch({
        url:'/dispute/deleteDisputeEvent',
        method:'post',
        params:{
            id:id
        }
    })
}

// /getDisputeEventCount
export function getDisputeEventCount(){
    return fetch({
        url:'/dispute/getDisputeEventCount',
        method:'post'
    })
}

export function getDisputeEventReporterQuery(query){
    return fetch({
        url:'/dispute/getDisputeEventReporterQuery',
        method:'post',
        params:query
    })
}
export function getDisputeEventDespatcherQuery(query){
    return fetch({
        url:'/dispute/getDisputeEventDespatcherQuery',
        method:'post',
        params:query
    })
}
export function getDisputeEventDeptDespatcherQuery(query){
    return fetch({
        url:'/dispute/getDisputeEventDeptDespatcherQuery',
        method:'post',
        params:query
    })
}
export function getDisputeEventHandlerQuery(query){
    return fetch({
        url:'/dispute/getDisputeEventHandlerQuery',
        method:'post',
        params:query
    })
}
export function getDisputeEventAuditorQuery(query){
    return fetch({
        url:'/dispute/getDisputeEventAuditorQuery',
        method:'post',
        params:query
    })
}

export function addDisputeEventInvolvedPersons(query){
    return fetch({
        url:'/dispute/addDisputeEventInvolvedPersons',
        method:'post',
        data:query
    })
}

export function addDisputeEventDistribute(query){
    return fetch({
        url:'/dispute/addDisputeEventDistribute',
        method:'post',
        data:query
    })
}

export function addDisputeEventDealing(query){
    return fetch({
        url:'/dispute/addDisputeEventDealing',
        method:'post',
        data:query
    })
}

export function addDisputeEventChecked(query){
    return fetch({
        url:'/dispute/addDisputeEventChecked',
        method:'post',
        data:query
    })
}

export function updateDisputeEventStatus(status,id){
    return fetch({
        url:'/dispute/updateDisputeEventStatus',
        method:'post',
        params:{
            status:status,
            id:id
        }
    })
}

export function isDistribute(id){
    return fetch({
        url:'/dispute/isDistribute',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getSubMeshEventCount(id) {
    return fetch({
      url:'/dispute/getSubMeshEventCount?netGridID='+id,
      method:'post'
    })
  }


// WEBPACK FOOTER //
// ./src/api/contradictionManage/index.js