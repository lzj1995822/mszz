import fetch from '@/utils/fetch'

export function getSchoolCode() {
    return fetch({
        url:'/school/getSchoolCode',
        method:'get'
    })
}

export function addSchool(query){
    return fetch({
        url:'/school/addSchool',
        method:'post',
        data:query
    })
}
export function deleteSchool(id){
    return fetch({
        url:'/school/deleteSchool',
        method:'post',
        params:{
            id:id
        }
    })
}
export function updateSchool(query){
    return fetch({
        url:'/school/updateSchool',
        method:'post',
        data:query
    })
}
export function getSchoolDetail(id){
    return fetch({
        url:'/school/getSchoolDetail',
        method:'post',
        params:{
            id:id
        }
    })
}
export function getSchoolDetailToUpdate(id){
    return fetch({
        url:'/school/getSchoolDetailToUpdate',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getSchoolQuery(query){
    return fetch({
        url:'/school/getSchoolQuery',
        method:'post',
        params:{
            name:query.name,
            type:query.type,
            netGridID:query.netGridID,
            page:query.page,
            pageSize:query.pageSize
        }
    })
}

export function getSchoolVideoQuery(query){
    return fetch({
        url:'/school/getSchoolVideoQuery',
        method:'post',
        params:{
            schoolName:query.schoolName,
            netGridID:query.netGridID,
            page:query.page,
            pageSize:query.pageSize
        }
    })
}

export function addSchoolVideo(query){
    return fetch({
        url:'/school/addSchoolVideo',
        method:'post',
        data:query
    })
}

export function deleteSchoolVideo(id){
    return fetch({
        url:'/school/deleteSchoolVideo',
        method:'post',
        params:{
            id:id
        }
    })
}

export function updateSchoolVideo(query){
    return fetch({
        url:'/school/updateSchoolVideo',
        method:'post',
        data:query
    })
}

export function getSchoolVideoDetail(id){
    return fetch({
        url:'/school/getSchoolVideoDetail',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getSchoolVideoDetailToUpdate(id){
    return fetch({
        url:'/school/getSchoolVideoDetailToUpdate',
        method:'post',
        params:{
            id:id
        }
    })
}

export function getVideoForTree(id){
    return fetch({
        url:'/school/getVideoForTree',
        method:'post',
        params:{
            id:id
        }
    })
}
export function getSchoolForTree(){
    return fetch({
        url:'/school/getSchoolForTree',
        method:'post'
    })
}

// export function get(){
//     return fetch({
//         url:'/school/getVideoForTree',
//         method:'post'
//     })
// }


// WEBPACK FOOTER //
// ./src/api/schoolManage/index.js