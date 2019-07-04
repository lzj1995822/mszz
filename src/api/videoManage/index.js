import fetch from '@/utils/fetch'
import {hex_md5} from '@/utils/md5'
/**
 * 接口访问ip和端口
 */
const IP_PORT = "http://122.97.218.162:18080";

/**
 * app_key
 */
const APP_KEY = "a592d676";

/**
 * 秘钥
 */
const SECRET = "69681c3587194a50a2b11f1335ad6f41";

const opUserUuid = 'c26a811c141a11e79aeeb32ef95273f2';

const netZoneUuid = '5b994421aced4e2d9a76179e8cc70734';

let regionCode ='363eb78e1a354a5297065c33e4fb165d'

export function getAllCamera(){
  return fetch({
    url:'http://122.97.218.162:28887/camera/getAll',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method:'post'
  })
}

//获取video类型编码
export function fetchVideoCode(){
    return fetch({
        url:'/video/getVideoCode',
        method:'get'
    })
}

//获取网格
export function fetchNetGrid(){
    return fetch({
        url:'/video/getNetGrid',
        method:'get'
    })
}

// /video/getVideoInfo 获取所有video信息(分页 select All) 参数 String videoName, Integer netGridID, int page, int pageSize
export function fetchVideoInfo(query){
    return fetch({
        url:'/video/getVideoInfo',
        method:'post',
        params:{
            videoName:query.videoName,
            netGridID:query.netGridID,
            page:query.page,
            pageSize:query.pageSize
        }
    })
}

// /video/getDetailByID 查看详情 参数 id
export function fetchDetail(id){
    return fetch({
        url:'/video/getDetailByID',
        method:'get',
        params:{
            'id':id
        }
    })
}
// /video/getToUpdateVideoInfo 点击修改调用该接口获取所有信息（编码不是汉字）参数 id
export function fetchEditVideoInfo(id){
    return fetch({
        url:'/video/getToUpdateVideoInfo',
        method:'get',
        params:{
            id:id
        }
    })
}
// /video/addVideo 添加    参数 Video对象
export function addVideo(query){
    return fetch({
        url:'/video/addVideo',
        method:'post',
        data:query
    })
}
// /video/updateVideo 修改 参数 Video对象
export function updateVideo(query){
    return fetch({
        url:'/video/updateVideo',
        method:'post',
        data:query
    })
}

// /video/deleteVideo 删除 参数 id
export function deleteVideo(id){
    return fetch({
        url:'/video/deleteVideo',
        method:'get',
        params:{
            id:id
        }
    })
}

//video/getNetGridForTree
export function getNetGridForTree(){
    return fetch({
        url:'/video/getNetGridForTree',
        method:'get'
    })
}

export function getVideoForTree(id){
    return fetch({
        url:'/video/getVideoForTree',
        params:{
            'id':id
        }
    })
}
regionCode = "363eb78e1a354a5297065c33e4fb165d,621ea1676a584103859baddf1914fdc4,20cf7fb6974f4fbabdd8b0703dda7fbe,98a3cfa65070443ba4edbbf67275319d,085fd71ea2fe435fbeb96ed1e9f62fc6,3a34501235784e439aae1362ad077d1e,73d77dff1e1c44339bd0af8062d62ade,a27265504cd5441f8b711df14fb5362d,99ede857aa4b4782815d2a2fa922846a,120a101b2a5d41d8a381f9312073aa67,607f73c02bbf4dea875f6293a7f15258,a27d8497be2b44b3a916980d4e519d3f";
export function getCameras(){
  let time = new Date().getTime();
  let strParam = {appkey:APP_KEY,time:time,pageNo:1, pageSize:1000,opUserUuid:opUserUuid, regionUuids:regionCode};
  let uri = "/openapi/service/vss/res/getCamerasEx";
  return fetch({
    url:IP_PORT + `${uri}?token=` + GetSinglePreviewToken(uri,strParam),
    method:'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify(strParam)
  });
}

export function getPreviewParamByCameraUuid(urls){
  let time = new Date().getTime();
  let strParam = {appkey:APP_KEY,time:time, pageNo: 1, pageSize: 10,
    opUserUuid:opUserUuid,cameraUuid:urls,netZoneUuid:netZoneUuid};
  let uri = "/openapi/service/vss/preview/getPreviewParamByCameraUuid";

  return fetch({
    url: IP_PORT + "/openapi/service/vss/preview/getPreviewParamByCameraUuid?token=" + GetSinglePreviewToken(uri,strParam),
    method:'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:JSON.stringify({
      appkey: APP_KEY,
      time: time,
      pageNo: 1,
      pageSize: 10,
      opUserUuid: opUserUuid,
      cameraUuid: urls,
      netZoneUuid: netZoneUuid
    })
  });
}

function GetSinglePreviewToken(uri,strParam) {
  return GenToken(uri, JSON.stringify(strParam), SECRET);
}

function GenToken(uri, strParam, mySecret) {
  let srcStr = uri + strParam + mySecret;
  var token = hex_md5(srcStr);    // 生成token
  return token;
}



// WEBPACK FOOTER //
// ./src/api/videoManage/index.js