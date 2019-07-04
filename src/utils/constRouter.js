const routers = [
  {
    id: 8,
    url: "/dlxxIndex",
    name: "地理信息系统",
    className: "dlxt",
    visible: true,
    icon: require("../assets/neiye/dlxx_b.png"),
    children: []
  },
  {
    id: 1,
    url: "/zongzhizuzhi",
    name: "综治组织及综合业务",
    className: "zhyw",
    visible: true,
    icon: require("../assets/neiye/zz_b.png"),
    children: [
      {
        url: "/orgManage",
        name: "机构管理",
        visible: true
      },
      {
        url: "/jigougl",
        name: "社会服务",
        visible: true
      }
    ]
  },
  {
    id:10,
    url:'/videoWatchIndex',
    name:'视频监控',
    className:'spjk',
    visible:true,
    icon:require('../assets/neiye/sphy_b.png'),
    children:[
    ]
  },
  {
    id: 2,
    url: "/syrkIndex",
    name: "实有人口",
    className: "syrk",
    visible: true,
    icon: require("../assets/neiye/syrk_b.png"),
    children: [
      {
        url: "/syrkManage",
        name: "实有人口管理",
        visible: true
      },
      {
        url: "/houseManage",
        name: "房屋管理",
        visible: true
      }
    ]
  },
  {
    id: 3,
    url: "/tsrkIndex",
    name: "特殊人群",
    className: "tsrq",
    visible: true,
    icon: require("../assets/neiye/tsrq_b.png"),
    children: [
      {
        url: "/tsrkManage",
        name: "特殊人群管理",
        visible: true
      },
      {
        url: "/keyPetitioner",
        name: "重点上访人员管理",
        visible: true
      },
      {
        url: "/keyYoungerManager",
        name: "重点青少年管理",
        visible: true
      }
    ]
  },
  {
    id:11,
    url:'/wtsbIndex',
    name:'问题上报',
    className:'wtsb',
    visible:true,
    icon:require('../assets/wtsb.png'),
    children:[
      {
        url: "/WTeventUp",
        name: "问题事件上报",
        isEvent: true,
        visible: true
      },
      {
        url: "/WTeventPaifa",
        name: "问题事件派发",
        isEvent: true,
        visible: true
      },
      {
        url: "/WTeventSelect",
        name: "问题事件指派",
        isEvent: true,
        visible: true
      },
      {
        url: "/WTeventDeal",
        name: "问题事件处理",
        isEvent: true,
        visible: true
      },
      {
        url: "/WTeventReview",
        name: "问题事件审核",
        isEvent: true,
        visible: true
      }
    ]
  },
  {
    id: 6,
    url: "/ecAndsocial",
    name: "非公有制经济组织和社会组织",
    className: "fgyz",
    visible: true,
    icon: require("../assets/neiye/fgyz_b.png"),
    children: [
      {
        url: "/fgyzManage",
        name: "非公有制经济组织",
        visible: true
      },
      {
        url: "/socialOrgManage",
        name: "非公有制社会组织",
        visible: true
      }
    ]
  },
  {
    id: 5,
    url: "/publicSecurityManage",
    name: "社会治安",
    className: "shza",
    visible: true,
    icon: require("../assets/neiye/shza_b.png"),
    hasEvent: true,
    children: [
      {
        url: "/viewManager",
        name: "景区执勤点",
        visible: true
      },
      {
        url: "/importantCompany",
        name: "巡查记录检索",
        visible: true
      },
      {
        url: "/DeliveryManage",
        name: "物流企业管理",
        visible: true
      },
      {
        url: "/ImportantOrgManage",
        name: "重点企业",
        visible: true
      },
      {
        url: "/publicSecurityeventUp",
        name: "治安事件上报",
        isEvent: true,
        visible: true
      },
      {
        url: "/publicSecurityeventPaifa",
        name: "治安事件派发",
        isEvent: true,
        visible: true
      },
      {
        url: "/publicSecurityeventSelect",
        name: "治安事件指派",
        isEvent: true,
        visible: true
      },
      {
        url: "/publicSecurityeventDeal",
        name: "治安事件处理",
        isEvent: true,
        visible: true
      },
      {
        url: "/publicSecurityeventReview",
        name: "治安事件审核",
        isEvent: true,
        visible: true
      }
    ]
  },
  {
    id: 7,
    url: "/disputeIndex",
    name: "矛盾纠纷排查化解",
    className: "mdpc",
    visible: true,
    hasEvent: true,
    icon: require("../assets/neiye/mdjf_b.png"),
    children: [
      {
        url: "/DisputeeventUp",
        name: "矛盾纠纷事件上报",
        isEvent: true,
        visible: true
      },
      {
        url: "/DisputeeventPaifa",
        name: "矛盾纠纷事件派发",
        isEvent: true,
        visible: true
      },
      {
        url: "/DisputeeventSelect",
        name: "矛盾纠纷事件指派",
        isEvent: true,
        visible: true
      },
      {
        url: "/DisputeeventDeal",
        name: "矛盾纠纷事件处理",
        isEvent: true,
        visible: true
      },
      {
        url: "/DisputeeventReview",
        name: "矛盾纠纷事件审核",
        isEvent: true,
        visible: true
      }
    ]
  },
  {
    id: 14,
    url: "/schoolSecurity",
    name: "校园及周边安全",
    className: "xyzb",
    visible: true,
    icon: require("../assets/neiye/xy_b.png"),
    children: []
  },
  {
    id: 4,
    url: "/trafficIndex",
    name: "交通管理",
    className: "jtgl",
    visible: true,
    hasEvent: true,
    icon: require("../assets/neiye/jtgl_b.png"),
    children: [
      {
        url: "/keyDriverManage",
        name: "重点驾驶员管理",
        visible: true
      },
      {
        url: "/keyVehiclesManage",
        name: "重点车辆管理",
        visible: true
      },
      {
        url: "/trafficeventUp",
        name: "交通事故上报",
        isEvent: true,
        visible: true
      },
      {
        url: "/trafficeventPaifa",
        name: "交通事故派发",
        isEvent: true,
        visible: true
      },
      {
        url: "/trafficeventSelect",
        name: "交通事故指派",
        isEvent: true,
        visible: true
      },
      {
        url: "/trafficeventDeal",
        name: "交通事故处理",
        isEvent: true,
        visible: true
      },
      {
        url: "/trafficeventReview",
        name: "交通事故审核",
        isEvent: true,
        visible: true
      }
    ]
  },
  {
    id: 13,
    url: "/netManage",
    name: "网格化管理",
    className: "wghgl",
    visible: true,
    icon: require("../assets/neiye/wghgl_b.png"),
    children: [
      {
        url: "/netGridManage",
        name: "网格信息管理",
        visible: true
      },
      {
        url: "/netMemberManage",
        name: "网格员管理",
        visible: true
      },
      {
        url: '/netMemberOribt',
        name: '网格员轨迹',
        visible:true
      },
      {
        url:'/netOrbitManage',
        name:'轨迹查询',
        visible:true
      },
      {
        url: "/netEventManage",
        name: "网格事件查看",
        visible: true
      }
    ]
  },
  {
    id: 12,
    url: "/skynetManage",
    name: "天网巡防",
    className: "twxf",
    visible: true,
    hasEvent: true,
    icon: require("../assets/neiye/twcx_b.png"),
    children: [
      {
        url: "/fenceManage",
        name: "巡防区域划分",
        visible: true
      },
      {
        url: "/trackManage",
        name: "寻防轨迹",
        visible: true
      },
      {
        url: "/skyRanksManage",
        name: "巡防队伍管理",
        visible: true
      },
      {
        url: "/skyPersonManage",
        name: "巡防队员管理",
        visible: true
      },
      {
        url: "/skyneteventUp",
        name: "天网巡防事件上报",
        isEvent: true,
        visible: true
      },
      {
        url: "/skyneteventPaifa",
        name: "天网巡防事件派发",
        isEvent: true,
        visible: true
      },
      {
        url: "/skyneteventSelect",
        name: "天网巡防事件指派",
        isEvent: true,
        visible: true
      },
      {
        url: "/skyneteventDeal",
        name: "天网巡防事件处理",
        isEvent: true,
        visible: true
      },
      {
        url: "/skyneteventReview",
        name: "天网巡防事件审核",
        isEvent: true,
        visible: true
      }
    ]
  },
  {
    id: 9,
    url: "/performanceIndex",
    name: "工作绩效考评",
    className: "gzjxkh",
    icon: require("../assets/neiye/gzjx_b.png"),
    visible: true,
    children: []
  },
  {
    id: 15,
    url: "/systemManage",
    name: "运维支持(系统管理)",
    className: "xtgl",
    visible: true,
    icon: require("../assets/neiye/ywzc_b.png"),
    children: [
      {
        url: "/roleManage",
        name: "角色管理",
        visible: true
      },
      {
        url:'/roleManage',
        name:"日志管理",
        visible:true
      }
    ]
  }
]

export default routers;



// WEBPACK FOOTER //
// ./src/utils/constRouter.js