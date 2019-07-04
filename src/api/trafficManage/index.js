import fetch from '@/utils/fetch'

// /key/getVechiclesCode
export function fetchVechiclesCode(){
    return fetch({
        url:'/key/getVechiclesCode',
        method:'post'
    })
}

// /key/getVehiclesInfo
export function fetchVehiclesInfo(query){
    return fetch({
        url:'/key/getVehiclesInfo',
        method:'post',
        params:query
    })
}

// /key/getDetailByID 详情 参数传id
export function fetchDetailByID(id){
    return fetch({
        url:'/key/getDetailByID',
        method:'post',
        params:{
            id:id
        }
    })
}

export function addKeyVehicles(query){
    return fetch({
        url:'/key/addKeyVehicles',
        method:'post',
        data:query
    })
}

// /key/updateKeyVehicles 修改
export function updateKeyVehicle(query){
    return fetch({
        url:'/key/updateKeyVehicles',
        method:'post',
        data:query
    })
}

// /key/deleteKeyVehicles 删除 参数传id
export function deleteKeyVehicles(id){
    return fetch({
        url:'/key/deleteKeyVehicles',
        method:'post',
        params:{
            id:id
        }
    })
}

// /key/getDrivingLicenseCode获取编码
export function fetchDriverLiscenseCode(){
    return fetch({
        url:'/key/getDrivingLicenseCode',
        method:'post'
    })
}

// /key/getKeyDriverInfo 分页
export function fetchKeyDricerInfo(query){
    return fetch({
        url:'/key/getKeyDriverInfo',
        method:'post',
        params:query
    })
}

// /key/getDetaileByDriverID 查看详情
export function fetchDetaileByDriverID(id){
    return fetch({
        url:'/key/getDetaileByDriverID',
        method:'post',
        params:{
            id:id
        }
    })
}


// /key/getDetailToUpdateDriver 点击修改获取详情(编码 不是汉字)
export function fetchDetailToUpdateDriver(id){
    return fetch({
        url:'/key/getDetailToUpdateDriver',
        method:'post',
        params:{
            id:id
        }
    })
}

// /key/addKeyDriver 添加
export function addKeyDriver(query){
    return fetch({
        url:'/key/addKeyDriver',
        method:'post',
        data:query
    })
}

// /key/updateKeyDriver 修改
export function updateKeyDriver(query){
    return fetch({
        url:'/key/updateKeyDriver',
        method:"post",
        data:query
    })
}

// /key/deleteKeyDriver 删除
export function deleteKeyDriver(id){
    return fetch({
        url:'/key/deleteKeyDriver',
        method:'post',
        params:{
            id:id
        }
    })
}


// /trafficAccident/getTrafficCodes获取交通事故所需编码
export function fetchTrafficCodes(){
    return fetch({
        url:'/trafficAccident/getTrafficCodes',
        method:'post'
    })
}

// /trafficAccident/addTrafficAccidentBasic 添加交通事故基本信息
export function addTrafficAccidentBasic(query){
    return fetch({
        url:'/trafficAccident/addTrafficAccidentBasic',
        method:'post',
        data:query
    })
}

// /trafficAccident/addTrafficAccidentInvolvedPersons 涉案人员
export function addTrafficAccidentInvolvedPersons(query){
    return fetch({
        url:'/trafficAccident/addTrafficAccidentInvolvedPersons',
        method:'post',
        data:query
    })
}

// /trafficAccident/getTrafficAccidentQuery 
export function getTrafficAccidentQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentQuery',
        method:'post',
        params:query
    })
} 

// /trafficAccident/getTrafficAccidentDetail
export function getTrafficAccidentDetail(id){
    return fetch({
        url:"/trafficAccident/getTrafficAccidentDetail?id="+id,
        method:'post'
    })
}

// /trafficAccident/updateAccidentInvolvedPersons 修改涉案人员
export function updateAccidentInvolvedPersons(query){
    return fetch({
        url:'/trafficAccident/updateAccidentInvolvedPersons',
        method:'post',
        data:query
    })
}

// /trafficAccident/deleteAccidentInvolvedPersons 删除涉案人员
export function deleteAccidentInvolvedPersons(id){
    return fetch({
        url:'/trafficAccident/deleteAccidentInvolvedPersons?id='+id,
        method:'post'
    })
}

// /trafficAccident/updateTrafficAccident 修改事故
export function updateTrafficAccident(query){
    return fetch({
        url:'/trafficAccident/updateTrafficAccident',
        method:'post',
        data:query
    })
}

// /trafficAccident/deleteTrafficAccident 删除事故
export function deleteTrafficAccident(id){
    return fetch({
        url:'/trafficAccident/deleteTrafficAccident?id='+id,
        method:'post'
    })
}

// /trafficAccident/getTrafficAccidentDetailToUpdate 修改事故之前调用的详情接口 传id
export function getTrafficAccidentDetailToUpdate(id){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentDetailToUpdate?id='+id,
        method:'post'
    })
}

// /trafficAccident/getTrafficAccidentHistogramCount
export function getTrafficAccidentHistogramCount(){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentHistogramCount',
        method:'post'
    })
}

export function getTrafficAccidentReporterQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentReporterQuery',
        method:'post',
        params:query
    })
}
export function getTrafficAccidentDespatcherQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentDespatcherQuery',
        method:'post',
        params:query
    })
}
export function getTrafficAccidentDeptDespatcherQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentDeptDespatcherQuery',
        method:'post',
        params:query
    })
}
export function getTrafficAccidentHandlerQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentHandlerQuery',
        method:'post',
        params:query
    })
}
export function getTrafficAccidentAuditorQuery(query){
    return fetch({
        url:'/trafficAccident/getTrafficAccidentAuditorQuery',
        method:'post',
        params:query
    })
}


export function addTrafficAccidentDistribute(query){
    return fetch({
        url:'/trafficAccident/addTrafficAccidentDistribute',
        method:'post',
        data:query
    })
}
export function addTrafficAccidentChecked(query){
    return fetch({
        url:'/trafficAccident/addTrafficAccidentChecked',
        method:'post',
        data:query
    })
}
export function addTrafficAccidetDealingBasic(query){
    return fetch({
        url:'/trafficAccident/addTrafficAccidetDealingBasic',
        method:'post',
        data:query
    })
}

export function updateTrafficAccidentStatus(type,id){
    return fetch({
        url:'/trafficAccident/updateTrafficAccidentStatus',
        method:'post',
        params:{
            type:type,
            id:id
        }
    })
} 

export function getSubMeshEventCount(id) {
    return fetch({
      url:'/trafficAccident/getSubMeshEventCount?netGridID='+id,
      method:'post'
    })
  }
  


// WEBPACK FOOTER //
// ./src/api/trafficManage/index.js