import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_production')
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [{
    path: '/login',
    alias: '/',
    name:'login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    name:'404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '/dashboard',
    alias: '/index',
    component: _import('dashboard/index'),
    name: 'dashboard',
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  base: 'msmis',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncSystemMap = [{
  path: '/systemManage',
  name: '系统运维管理',
  redirect: '/systemManage/index',
  component: Layout,
  icon: 'fa fa-user-circle fa-lg',
  noDropdown: true,
  children: [{
    path: 'index',
    name: '用户管理',
    component: _import('systemManage/index')
  }]
}, {
  path: '/roleManage',
  name: '角色管理',
  redirect: '/roleManage/authManage',
  component: Layout,
  icon: 'fa fa-vcard-o fa-lg',
  noDropdown: true,
  children: [{
    path: 'authManage',
    name: '角色管理',
    component: _import('systemManage/roleManage')
  }, {
    path: 'editRole',
    name: '编辑角色',
    hidden: true,
    component: _import('systemManage/editRole')
  }, {
    path: 'addRole',
    name: '添加角色',
    hidden: true,
    component: _import('systemManage/addRole')
  }]
},{
  path: '/logManage',
  name: '系统运维管理',
  redirect: '/logManage/index',
  component: Layout,
  icon: 'fa fa-paw fa-lg',
  noDropdown: true,
  children: [{
    path: 'index',
    name: '登录日志',
    component: _import('systemManage/logManage')
  }]
}]

export const asyncSchoolSecurityMap = [{
    path: '/schoolSecurity',
    component: Layout,
    name: '校园安全管理',
    redirect: '/schoolSecurity/index',
    icon: 'fa fa-university fa-lg',
    children: [{
        path: 'index',
        name: '校园信息检索',
        component: _import('schoolSecurityManage/schoolManage')
      },
      {
        path: 'addSchool',
        name: '添加校园信息',
        component: _import('schoolSecurityManage/addSchool')
      },
      {
        path: 'editSchool',
        name: '编辑校园信息',
        hidden: true,
        component: _import('schoolSecurityManage/editSchool')
      }
    ]
  },
  // {
  //   path: '/schoolVideo',
  //   component: Layout,
  //   name: '校园监控管理',
  //   redirect: '/schoolVideo/index',
  //   icon: 'fa fa-video-camera fa-lg',
  //   children: [{
  //       path: "index",
  //       name: '查看监控',
  //       component: _import('schoolSecurityManage/schoolVideoInfo')
  //     },
  //     {
  //       path: 'videoManage',
  //       name: '监控管理',
  //       component: _import('schoolSecurityManage/schoolVideoManage')
  //     },
  //     {
  //       path: 'add',
  //       name: '添加监控',
  //       component: _import('schoolSecurityManage/addSchoolVideo')
  //     },
  //     {
  //       path: 'edit',
  //       name: "编辑监控",
  //       hidden: true,
  //       component: _import('schoolSecurityManage/editSchoolVideo')
  //     }
  //   ]
  // }
]

// 网格建设
export const asyncNetMap = [{
    path: '/netManage',
    component: Layout,
    icon: 'fa fa-gg fa-lg',
    noDropdown: true,
    redirect: '/netManage/index',
    children: [{
      path: 'index',
      name: '网格结构图',
      component: _import('netManage/netGrid')
    }]
  },
  {
    path: '/netGridManage',
    name: '网格信息管理',
    redirect: '/netGridManage/index',
    icon: 'fa fa-table fa-lg',
    component: Layout,
    noDropdown: true,
    children: [{
        path: 'index',
        name: '网格信息检索',
        component: _import('netManage/netGridManage')
      },
      {
        path: 'edit',
        name: '编辑网格',
        hidden: true,
        component: _import('netManage/editNetGrid')
      }
    ]
  },
  {
    path: '/netMemberManage',
    component: Layout,
    name: '网格员管理',
    redirect: '/netMemberManage/index',
    icon: 'fa fa-user-o fa-lg',
    noDropdown: true,
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: '网格员检索',
      component: _import('netManage/netMemberManage')
    }, {
      path: 'add',
      name: '添加网格成员',
      hidden: true,
      component: _import('netManage/addGridMember'),
    }, {
      path: 'edit',
      name: "网格员编辑",
      hidden: true,
      component: _import('netManage/editNetMember')
    }]
  },
  {
    path: '/netMemberOribt',
    component: Layout,
    name: '网格员轨迹',
    redirect: '/netMemberOribt/index',
    icon: 'fa fa-user-o fa-lg',
    noDropdown: true,
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: '网格员轨迹',
      component: _import('netManage/netMemberOrbit')
    }]
  },
  {
    path: '/netOrbitManage',
    component: Layout,
    name: '网格员轨迹',
    redirect: '/netOrbitManage/index',
    icon: 'fa fa-exchange fa-lg',
    noDropdown: true,
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: '网格员轨迹查询',
      component: _import('netManage/netOrbitManage')
    }]
  },
  {
    path: '/netEventManage',
    name: '网格事件管理',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-info-circle fa-lg',
    redirect: '/netEventManage/index',
    children: [{
      path: 'index',
      name: '查看网格事件',
      component: _import('netManage/eventManage')
    },
    {
      path: 'disputeInfo',
      name: '矛盾纠纷事件详情',
      hidden: true,
      component: _import('contradictionManage/checkDetail')
    },
    {
      path: 'trafficInfo',
      name: '交通事故详情',
      hidden: true,
      component: _import('trafficManage/trafficEventInfo')
    },
    {
      path:'socialInfo',
      name:'社会治安事件详情',
      hidden: true,
      component: _import('publicSecurityManage/eventInfo')
    },
    {
      path: 'skyNetInfo',
      name: '天网巡防事件详情',
      hidden: true,
      component: _import('skynet/eventInfo')
    },
    {
      path: 'netGridEventInfo',
      name: '问题详情',
      hidden:true,
      component:_import('netManage/netEventInfo')
    }
  ]
  }
]

// 天网巡防
export const asyncTianWangeMap = [{
    path: '/skynetManage',
    component: Layout,
    name: '天网巡防',
    redirect: "/skynetManage/index",
    noDropdown: true,
    icon: 'fa fa-bar-chart fa-lg',
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: '信息统计',
      component: _import('skynet/index')
    }]
  }, {
    path: '/fenceManage',
    name: "巡防区域管理",
    component: Layout,
    icon: 'fa fa-connectdevelop fa-lg',
    redirect: '/fenceManage/index',
    noDropdown: true,
    children: [{
      path: 'index',
      name: '巡防区域划分',
      component: _import('skynet/fenceManage')
    }]
  },
  {
    path: '/trackManage',
    name: '巡防轨迹',
    component: Layout,
    icon: 'fa fa-exchange fa-lg',
    noDropdown: true,
    redirect: '/trackManage/index',
    children: [{
      path: 'index',
      name: '查看巡防轨迹',
      component: _import('skynet/trackManage')
    }]
  },
  {
    path: '/skyRanksManage',
    name: '巡防队伍管理',
    component: Layout,
    icon: 'fa fa-users fa-lg',
    redirct: '/skyRanksManage/index',
    children: [{
        path: 'index',
        name: '队伍检索',
        component: _import('skynet/skyranks')
      },
      {
        path: 'add',
        name: '添加队伍',
        component: _import('skynet/addSkyRanks')
      },
      {
        path: 'edit',
        name: '编辑队伍',
        hidden: true,
        component: _import('skynet/editSkyRanks')
      }
    ]
  },
  {
    path: '/skyPersonManage',
    name: '巡防队员管理',
    component: Layout,
    icon: 'fa fa-user fa-lg',
    redirect: '/skyPersonManage/index',
    children: [{
        path: "index",
        name: '巡防队员信息',
        component: _import('skynet/skyperson')
      },
      {
        path: 'add',
        name: "添加巡防队员",
        component: _import('skynet/addSkyPerson')
      },
      {
        path: 'edit',
        name: '编辑巡防队员信息',
        hidden: true,
        component: _import('skynet/editSkyPerson')
      }
    ]
  },
  {
    path: '/skyneteventUp',
    component: Layout,
    icon: 'fa fa-sun-o fa-lg',
    name: '天网巡防事件处理',
    redirect: '/skyneteventUp/index',
    noDropdown: true,
    children: [{
        path: 'index',
        name: '天网巡防事件上报',
        component: _import('skynet/eventManage')
      },
      {
        path: 'add',
        name: '添加事件',
        hidden: true,
        component: _import('skynet/addEvent')
      },
      {
        path: 'edit',
        name: '编辑事件',
        hidden: true,
        component: _import('skynet/editEvent')
      },
      {
        path: 'info',
        name: '事件详情',
        hidden: true,
        component: _import('skynet/eventInfo')
      }
    ]
  },
  {
    path: '/skyneteventPaifa',
    component: Layout,
    icon: 'fa fa-sun-o fa-lg',
    name: '天网巡防事件处理',
    noDropdown: true,
    redirect: '/skyneteventPaifa/index',
    children: [{
      path: 'index',
      name: '天网巡防事件派发',
      component: _import('skynet/eventPaifa')
    },
    {
      path: 'info',
      name: '事件详情',
      hidden: true,
      component: _import('skynet/eventInfo')
    }]
  },
  {
    path: '/skyneteventSelect',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-sun-o fa-lg',
    name: '天网巡防事件处理',
    redirect: '/skyneteventSelect/index',
    children: [{
      path: 'index',
      name: '天网巡防事件指派',
      component: _import('skynet/eventSelect')
    },
    {
      path: 'info',
      name: '事件详情',
      hidden: true,
      component: _import('skynet/eventInfo')
    }]
  },
  {
    path: '/skyneteventDeal',
    noDropdown: true,
    component: Layout,
    icon: 'fa fa-sun-o fa-lg',
    name: '天网巡防事件处理',
    redirect: '/skyneteventDeal/index',
    children: [{
      path: 'index',
      name: '天网巡防事件处理',
      component: _import('skynet/eventDeal')
    },
    {
      path: 'info',
      name: '事件详情',
      hidden: true,
      component: _import('skynet/eventInfo')
    }]
  },
  {
    path: '/skyneteventReview',
    noDropdown: true,
    component: Layout,
    icon: 'fa fa-sun-o fa-lg',
    name: '天网巡防事件处理',
    redirect: '/eventReview/index',
    children: [{
      path: 'index',
      name: '天网巡防事件审核',
      component: _import('skynet/eventReview')
    },
    {
      path: 'info',
      name: '天网巡防事件详情',
      hidden: true,
      component: _import('skynet/eventInfo')
    }]
  }
]

// 综治组织及综合业务路由
export const asyncZongZhiZuzhi = [{
    path: '/zongzhizuzhi',
    component: Layout,
    redirect: '/zongzhizuzhi/index',
    name: '社会综合治理系统',
    icon: 'fa fa-bank fa-lg',
    noDropdown: true,
    meta: {
      role: ['admin']
    },
    children: [{
      path: 'index',
      name: '首页信息',
      component: _import('zongzhizuzhi/index')
    }]
  }, {
    path: '/orgManage',
    name: '机构管理',
    component: Layout,
    icon: 'fa fa-fa fa-lg',
    redirect: '/orgManage/index',
    children: [{
        path: 'index',
        name: '机构信息检索',
        component: _import('zongzhizuzhi/orgManage')
      },
      {
        path: 'add',
        name: '添加机构信息',
        component: _import('zongzhizuzhi/addOrg')
      },
      {
        path: 'edit',
        name: '机构信息编辑',
        hidden: true,
        component: _import('zongzhizuzhi/orgEdit')
      },
      {
        path: 'info',
        name: '机构详细信息',
        hidden: true,
        component: _import('zongzhizuzhi/orgInfo')
      }
    ]
  },
  {
    path: '/jigougl', //
    component: Layout,
    icon: 'fa fa-balance-scale fa-lg',
    name: '社会服务',
    redirect: '/jigougl/orgMemberInfo',
    children: [{
        path: 'orgMemberInfo', // 机构成员信息
        name: '机构成员信息',
        component: _import('zongzhizuzhi/jgMemberManage')
      },
      {
        path: 'editMemberInfo', // 编辑机构成员信息
        name: '机构成员信息编辑',
        hidden: true,
        component: _import('zongzhizuzhi/jgMemberEdit')
      },
      {
        path: 'addMemberInfo', // 增加机构成员信息
        name: '添加机构成员信息',
        hidden: true,
        component: _import('zongzhizuzhi/addjgMember')
      },
      {
        path: 'servedPerson',
        name: '服务人员信息',
        component: _import('zongzhizuzhi/servedStuff')
      }, {
        path: 'addServedPerson',
        name: '添加网格成员',
        hidden: true,
        component: _import('netManage/addGridMember'),
      }, {
        path: 'editServedPerson',
        name: "网格员编辑",
        hidden: true,
        component: _import('netManage/editNetMember')
      },
      {
        path: 'ServedPersonInfo', // 被服务对象信息
        name: '服务对象信息',
        component: _import('zongzhizuzhi/ServedPersonInfo')
      },
      {
        path: 'MemberServedPersonRecordInfo', // 机构成员为服务对象人员服务记录
        name: '服务记录',
        component: _import('zongzhizuzhi/MemberServedPersonRecord')
      },
      {
        path: 'addNewServedRecord',
        name: '添加服务记录',
        hidden: true,
        component: _import('zongzhizuzhi/addMemberServedPersonRecord')
      },
      {
        path: 'editNewServedRecord',
        name: '编辑服务记录',
        hidden: true,
        component: _import('zongzhizuzhi/editMemberServedPersonRecord')
      },
      {
        path: 'addCNServedPerson',
        name: '添加大陆服务对象信息',
        hidden: true,
        component: _import('zongzhizuzhi/addCNServedPerson')
      },
      {
        path: 'addENServedPerson',
        name: '添加境外人员服务对象信息',
        hidden: true,
        component: _import('zongzhizuzhi/addENServedPerson')
      },
      {
        path: 'ServedPersonDetail',
        name: '服务对象信息详情',
        hidden: true,
        component: _import('zongzhizuzhi/ServedPersonDetailInfo')
      },
      {
        path: 'ForeignerServedDetail',
        name: '外籍服务对象信息详情',
        hidden: true,
        component: _import('zongzhizuzhi/ServedForeignerDetail')
      },
      {
        path: 'ServedPersonEdit', // 被服务对象信息编辑
        name: '服务对象信息编辑',
        hidden: true,
        component: _import('zongzhizuzhi/ServedPersonEdit')
      },
      {
        path: 'ServedForeignerEdit', // 境外人员服务对象编辑
        name: '境外人员服务对象编辑',
        hidden: true,
        component: _import('zongzhizuzhi/ServedForeignerEdit')
      },
      {
        path: 'foreignerManage', // 外籍人士管理
        name: '外籍人士管理',
        hidden: true,
        component: _import('zongzhizuzhi/ForeignerManage')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 工作绩效考核
export const asyncWorkPerformanceMap = [{
  path: '/performanceIndex',
  component: Layout,
  name: '工作绩效考核',
  icon: 'fa fa-bar-chart fa-lg',
  redirect: '/performanceIndex/index',
  noDropdown: true,
  children: [{
    path: 'index',
    name: '数据统计',
    component: _import('workPerformanceManage/index')
  }]
}]


// 视频监控模块
export const asyncVideoWatchMap = [{
    path: '/videoWatchIndex',
    component: Layout,
    name: '视频监控',
    icon: 'fa fa-play-circle-o fa-lg',
    noDropdown: true,
    redirect: '/videoWatchIndex/index',
    children: [{
      path: 'index',
      name: '视频查看',
      component: _import('videoWatch/index')
    },
    {
            path: 'addVideo',
            name: '添加视频',
            hidden: true,
            component: _import('videoWatch/addVideo')
          },
          {
            path: 'editVideo',
            name: '编辑视频',
            hidden: true,
            component: _import('videoWatch/editVideo')
          },
  ]
  },
  // {
  //   path: '/videoManage',
  //   component: Layout,
  //   name: '视频管理',
  //   icon: 'fa fa-cog fa-spin',
  //   noDropdown: true,
  //   redirect: '/videoManage/vmanage',
  //   children: [{
  //       path: 'vmanage',
  //       name: '视频检索',
  //       component: _import('videoWatch/videoManage')
  //     },
  //     {
  //       path: 'addVideo',
  //       name: '添加视频',
  //       hidden: true,
  //       component: _import('videoWatch/addVideo')
  //     },
  //     {
  //       path: 'editVideo',
  //       name: '编辑视频',
  //       hidden: true,
  //       component: _import('videoWatch/editVideo')
  //     },
  //     {
  //       path: 'videoInfo',
  //       name: '视频详情',
  //       hidden: true,
  //       component: _import('videoWatch/videoInfo')
  //     }
  //   ]
  // }
]


// 社会治安模块
export const asyncPublicSecurityMap = [{
    path: '/publicSecurityManage',
    name: '社会治安管理',
    component: Layout,
    redirect: '/publicSecurityManage/index',
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    children: [{
      path: 'index',
      name: '数据统计',
      component: _import('publicSecurityManage/index')
    }]
  },
  {
    path: '/viewManager',
    name: '景区执勤点',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-resistance fa-lg',
    redirect: '/viewManager/index',
    children: [{
        path: 'index',
        name: '景区执勤点管理',
        component: _import('publicSecurityManage/viewManager')
      },
      {
        path: 'addViewManager',
        name: '新增景区执勤点',
        hidden: true,
        component: _import('publicSecurityManage/addviewManager')
      },
      {
        path: 'viewManageInfo',
        name: '景区执勤点详细情',
        hidden: true,
        component: _import('publicSecurityManage/viewManageInfo')
      },
      {
        path: 'EditviewManage',
        name: '编辑景区执勤点',
        hidden: true,
        component: _import('publicSecurityManage/editviewManage')
      }
    ]
  },
  {
    path: '/importantCompany',
    component: Layout,
    name: '巡查记录检索',
    icon: 'fa fa-book fa-lg',
    noDropdown: true,
    redirect: '/importantCompany/inspectRecord',
    children: [{
        path: 'inspectRecord',
        name: '巡查记录管理',
        component: _import('publicSecurityManage/inspectRecord')
      },
      {
        path: 'InspectRecordInfo',
        name: '巡查记录详细信息',
        hidden: true,
        component: _import('publicSecurityManage/InspectRecordInfo')
      },
      {
        path: 'addInspectRecord',
        name: '添加巡查记录',
        hidden: true,
        component: _import('publicSecurityManage/addInspectRecord')
      }
    ]
  },
  {
    path: '/watchCompanyInfo',
    component: Layout,
    hidden: true,
    redirect: '/watchCompanyInfo/index',
    children: [{
      path: 'index',
      name: '查看企业详情',
      hidden: true,
      component: _import('publicSecurityManage/CompanyInfo')
    }]
  },
  {
    path: '/DeliveryManage',
    component: Layout,
    icon: 'fa fa-truck fa-lg',
    noDropdown: true,
    name: '物流企业',
    redirect: '/DeliveryManage/index',
    children: [{
        path: 'index',
        name: '物流企业管理',
        component: _import('publicSecurityManage/deliveryManage')
      },
      {
        path: 'addDeliveryOrg',
        name: '添加物流企业',
        hidden: true,
        component: _import('publicSecurityManage/addCompany')
      },
      {
        path: 'editDeliveryOrg',
        name: '编辑物流企业',
        hidden: true,
        component: _import('publicSecurityManage/editCompany')
      }
    ]
  },
  {
    path: '/ImportantOrgManage',
    component: Layout,
    icon: 'fa fa-resistance fa-lg',
    noDropdown: true,
    name: '重点企业',
    redirect: '/DeliveryManage/index',
    children: [{
        path: 'index',
        name: '重点企业管理',
        component: _import('publicSecurityManage/ImportantOrgManage')
      },
      {
        path: 'addImportantCompany',
        name: '添加重点企业',
        hidden: true,
        component: _import('publicSecurityManage/addCompany')
      },
      {
        path: 'editImportantOrg',
        name: '编辑物流企业',
        hidden: true,
        component: _import('publicSecurityManage/editCompany')
      }
    ]
  }, {
    path: '/publicSecurityeventUp', // 命案管理
    name: '治安事件管理',
    icon: 'fa fa-free-code-camp fa-lg',
    redirect: '/publicSecurityeventUp/index',
    component: Layout,
    noDropdown: true,
    children: [{
        path: 'index',
        name: '治安事件上报',
        component: _import('publicSecurityManage/eventManage')
      },
      {
        path: 'addEvent',
        name: '添加事件',
        hidden: true,
        component: _import('publicSecurityManage/addEvent')
      },
      {
        path: 'editEvent',
        name: '治安事件编辑',
        hidden: true,
        component: _import('publicSecurityManage/edithomicideManage')
      },
      {
        path: 'info',
        name: '事件详细信息',
        hidden: true,
        component: _import('publicSecurityManage/eventInfo')
      }
    ]
  },
  {
    path: '/publicSecurityeventPaifa', // 命案管理
    name: '治安事件管理',
    icon: 'fa fa-free-code-camp fa-lg',
    redirect: '/publicSecurityeventPaifa/index',
    component: Layout,
    noDropdown: true,
    children: [{
      path: 'index',
      name: '治安事件派发',
      component: _import('publicSecurityManage/eventPaifa')
    },
    {
      path: 'info',
      name: '事件详细信息',
      hidden: true,
      component: _import('publicSecurityManage/eventInfo')
    }]
  },
  {
    path: '/publicSecurityeventSelect', // 命案管理
    name: '治安事件管理',
    icon: 'fa fa-free-code-camp fa-lg',
    redirect: '/publicSecurityeventSelect/index',
    component: Layout,
    noDropdown: true,
    children: [{
      path: 'index',
      name: '治安事件指派',
      component: _import('publicSecurityManage/eventSelect')
    },
    {
      path: 'info',
      name: '事件详细信息',
      hidden: true,
      component: _import('publicSecurityManage/eventInfo')
    }]
  },
  {
    path: '/publicSecurityeventDeal', // 命案管理
    name: '治安事件管理',
    icon: 'fa fa-free-code-camp fa-lg',
    redirect: '/publicSecurityeventDeal/index',
    component: Layout,
    noDropdown: true,
    children: [{
      path: 'index',
      name: '治安事件处理',
      component: _import('publicSecurityManage/eventDeal')
    },
    {
      path: 'info',
      name: '事件详细信息',
      hidden: true,
      component: _import('publicSecurityManage/eventInfo')
    }]
  },
  {
    path: '/publicSecurityeventReview', // 命案管理
    name: '治安事件管理',
    icon: 'fa fa-free-code-camp fa-lg',
    redirect: '/publicSecurityeventReview/index',
    component: Layout,
    noDropdown: true,
    children: [{
      path: 'index',
      name: '治安事件审核',
      component: _import('publicSecurityManage/eventReview')
    },
    {
      path: 'info',
      name: '事件详细信息',
      hidden: true,
      component: _import('publicSecurityManage/eventInfo')
    }]
  }
]

// 交通管理模块
export const asynctrafficMap = [{
    path: '/trafficIndex',
    component: Layout,
    name: '交通管理',
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    redirect: '/trafficIndex/index',
    children: [{
      path: 'index',
      name: '数据统计',
      component: _import('trafficManage/index')
    }]
  },
  {
    path: '/keyDriverManage',
    component: Layout,
    icon: 'fa fa-meh-o fa-lg',
    noDropdown: true,
    name: '交通管理',
    redirect: '/keyDriverManage/index',
    children: [{
        path: 'index',
        name: '重点驾驶员管理',
        component: _import('trafficManage/keyDriverManage')
      },
      {
        path: 'addKeyDriver',
        name: '添加重点驾驶员',
        hidden: true,
        component: _import('trafficManage/addKeyDriver')
      },
      {
        path: 'keyDriverInfo',
        name: '查看重点驾驶员信息',
        hidden: true,
        component: _import('trafficManage/keyDriverInfo')
      },
      {
        path: 'editDriverInfo',
        name: '编辑重点驾驶员',
        hidden: true,
        component: _import('trafficManage/editDriverInfo')
      }
    ]
  },
  {
    path: '/keyVehiclesManage',
    component: Layout,
    name: '交通管理',
    icon: 'fa fa-car fa-lg',
    noDropdown: true,
    redirect: '/keyVehiclesManage/index',
    children: [{
        path: 'index',
        name: '重点车辆管理',
        component: _import('trafficManage/KeyVehiclesManage')
      },
      {
        path: 'addKeyCar',
        name: '添加重点车辆',
        hidden: true,
        component: _import('trafficManage/addKeyVehicle')
      },
      {
        path: 'editKeyCar',
        name: '编辑重点车辆',
        hidden: true,
        component: _import('trafficManage/editKeyVehicle')
      },
      {
        path: 'keyCarInfo',
        name: '重点车辆信息',
        hidden: true,
        component: _import('trafficManage/keyVehicleInfo')
      }
    ]
  },
  {
    path: '/trafficeventUp',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '交通事故处理',
    noDropdown: true,
    redirect: '/trafficeventUp/index',
    children: [{
        path: 'index',
        name: '交通事故上报',
        component: _import('trafficManage/eventManage')
      },
      {
        path: 'addTrafficEvent',
        name: '添加事件',
        hidden: true,
        component: _import('trafficManage/addTrafficEvent')
      },
      {
        path: 'info',
        name: '查看详情',
        hidden: true,
        component: _import('trafficManage/trafficEventInfo')
      },
      {
        path: 'editTrafficEvent',
        hidden: true,
        name: '编辑事件',
        component: _import('trafficManage/editTrafficEvent')
      }
    ]
  },
  {
    path: '/trafficeventPaifa',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '交通事故处理',
    redirect: '/trafficeventPaifa/index',
    children: [{
      path: 'index',
      name: '交通事故派发',
      component: _import('trafficManage/eventPaifa')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('trafficManage/trafficEventInfo')
    }]
  },
  {
    path: '/trafficeventSelect',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '交通事故处理',
    redirect: '/trafficeventSelect/index',
    children: [{
      path: 'index',
      name: '交通事故指派',
      component: _import('trafficManage/eventSelect')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('trafficManage/trafficEventInfo')
    }]
  },
  {
    path: '/trafficeventDeal',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '交通事故处理',
    redirect: '/trafficeventDeal/index',
    children: [{
      path: 'index',
      name: '交通事故处理',
      component: _import('trafficManage/eventDeal')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('trafficManage/trafficEventInfo')
    }]
  },
  {
    path: '/trafficeventReview',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '交通事故处理',
    redirect: '/trafficeventReview/index',
    children: [{
      path: 'index',
      name: '交通事故审核',
      component: _import('trafficManage/eventReview')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('trafficManage/trafficEventInfo')
    }]
  }
]

export const asyncWTSBMap = [{
    path: '/wtsbIndex',
    component: Layout,
    redirect: '/wtsbIndex/index',
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    children: [{
      path: 'index',
      name: '数据统计',
      component: _import('netManage/index')
    }]
  },
  {
    path: '/WTeventUp',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '问题事件处理',
    noDropdown: true,
    redirect: '/WTeventUp/index',
    children: [{
        path: 'index',
        name: '问题事件上报',
        component: _import('netManage/netEvent')
      },
      {
        path: 'addEvent',
        name: '添加事件',
        hidden: true,
        component: _import('netManage/addNetEvent')
      },
      {
        path: 'info',
        name: '查看详情',
        hidden: true,
        component: _import('netManage/netEventInfo')
      }
    ]
  },
  {
    path: '/WTeventPaifa',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '问题事件处理',
    redirect: '/WTeventPaifa/index',
    children: [{
      path: 'index',
      name: '问题事件派发',
      component: _import('netManage/eventPaifa')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('netManage/netEventInfo')
    }]
  },
  {
    path: '/WTeventSelect',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '问题事件处理',
    redirect: '/WTeventSelect/index',
    children: [{
      path: 'index',
      name: '问题事件指派',
      component: _import('netManage/eventSelect')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('netManage/netEventInfo')
    }]
  },
  {
    path: '/WTeventDeal',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '问题事件处理',
    noDropdown: true,
    redirect: '/WTeventDeal/index',
    children: [{
      path: 'index',
      name: '问题事件处理',
      component: _import('netManage/eventDeal')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('netManage/netEventInfo')
    }]
  },
  {
    path: '/WTeventReview',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '问题事件处理',
    noDropdown: true,
    redirect: '/WTeventReview/index',
    children: [{
      path: 'index',
      name: '问题事件审核',
      component: _import('netManage/eventReview')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('netManage/netEventInfo')
    }]
  }
]

// 非公有制社会经济和社会组织模块
export const asyncSocialMap = [{
    path: '/ecAndsocial',
    component: Layout,
    name: '数据统计',
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    redirect: '/ecAndsocial/index',
    children: [{
      path: 'index',
      name: '数据统计',
      component: _import('socialOrganizationManage/index')
    }]
  },
  {
    path: '/fgyzManage',
    component: Layout,
    name: '非公有制经济组织管理',
    noDropdown: true,
    redirect: '/fgyzManage/economyOrgManage',
    icon: 'fa fa-university fa-lg',
    children: [{
        path: 'economyOrgManage',
        name: '非公有制经济组织',
        component: _import('socialOrganizationManage/economyOrgManage')
      },
      {
        path: 'addEconomyOrg',
        name: '添加非公有经济组织',
        hidden: true,
        component: _import('socialOrganizationManage/addEconomyOrg')
      },
      {
        path: 'economyOrgInfo',
        name: '查看详细信息',
        hidden: true,
        component: _import('socialOrganizationManage/economyOrgInfo')
      },
      {
        path: "editEconomyOrgInfo",
        name: '编辑非公有经济组织信息',
        hidden: true,
        component: _import('socialOrganizationManage/editEconomyOrgInfo')
      }
    ]
  },
  {
    path: '/socialOrgManage',
    redirect: '/socialOrgManage/index',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-th-large fa-lg',
    children: [{
        path: 'index',
        name: '非公有制社会组织',
        component: _import('socialOrganizationManage/socialOrgManage')
      },
      {
        path: 'addSocialOrg',
        name: '添加非公有社会组织',
        hidden: true,
        component: _import('socialOrganizationManage/addSocialOrg')
      },
      {
        path: 'editSocialOrgInfo',
        name: '编辑非公有制社会组织信息',
        hidden: true,
        component: _import('socialOrganizationManage/editSocialOrgInfo')
      },
      {
        path: 'socialOrgInfo',
        name: '社会组织详细信息',
        hidden: true,
        component: _import('socialOrganizationManage/socialOrgInfo')
      }
    ]
  }
]

//矛盾纠纷排查
export const asyncDisputeEvent = [{
    path: '/disputeIndex',
    component: Layout,
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    name: '矛盾纠纷管理',
    redirect: '/disputeIndex/index',
    children: [{
      path: 'index',
      name: '数据统计',
      component: _import('contradictionManage/index')
    }]
  },
  {
    path: '/DisputeeventUp',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '矛盾纠纷处理',
    noDropdown: true,
    redirect: '/DisputeeventUp/index',
    children: [{
        path: 'index',
        name: '矛盾纠纷事件上报',
        component: _import('contradictionManage/eventManage')
      },
      {
        path: 'addEvent',
        name: '添加事件',
        hidden: true,
        component: _import('contradictionManage/addNewEvent')
      },
      {
        path: 'info',
        name: '查看详情',
        hidden: true,
        component: _import('contradictionManage/checkDetail')
      }
    ]
  },
  {
    path: '/DisputeeventPaifa',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '矛盾纠纷处理',
    redirect: '/DisputeeventPaifa/index',
    children: [{
      path: 'index',
      name: '矛盾纠纷事件派发',
      component: _import('contradictionManage/eventPaifa')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('contradictionManage/checkDetail')
    }]
  },
  {
    path: '/DisputeeventSelect',
    component: Layout,
    noDropdown: true,
    icon: 'fa fa-calendar-minus-o fa',
    name: '矛盾纠纷处理',
    redirect: '/DisputeeventSelect/index',
    children: [{
      path: 'index',
      name: '矛盾纠纷事件指派',
      component: _import('contradictionManage/eventSelect')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('contradictionManage/checkDetail')
    }]
  },
  {
    path: '/DisputeeventDeal',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '矛盾纠纷处理',
    noDropdown: true,
    redirect: '/DisputeeventDeal/index',
    children: [{
      path: 'index',
      name: '矛盾纠纷事件处理',
      component: _import('contradictionManage/eventDeal')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('contradictionManage/checkDetail')
    }]
  },
  {
    path: '/DisputeeventReview',
    component: Layout,
    icon: 'fa fa-calendar-minus-o fa',
    name: '矛盾纠纷处理',
    noDropdown: true,
    redirect: '/DisputeeventReview/index',
    children: [{
      path: 'index',
      name: '矛盾纠纷事件审核',
      component: _import('contradictionManage/eventReview')
    },
    {
      path: 'info',
      name: '查看详情',
      hidden: true,
      component: _import('contradictionManage/checkDetail')
    }]
  }
]

//地理信息模块路由
export const asyncDLXXMap = [{
    path: '/dlxxIndex',
    component: Layout,
    icon: 'fa fa-globe fa-lg',
    noDropdown: true,
    redirect: '/dlxxIndex/index',
    children: [{
      path: 'index',
      name: '地理信息系统',
      icon: 'fa fa-support fa-lg',
      component: _import('geographyManage/index')
    }]
  },
  {
    path: '/dlxx',
    redirct: 'index',
    component: _import('dashboard/index'),
    name: '返回主菜单',
    icon: 'fa fa-home fa-lg',
    noDropdown: true,
    children: [{
      path: 'index',
      component: _import('dashboard/index'),
      name: '返回主菜单',
      hidden: true
    }]
  }
]


// 实有人口模块路由
export const asyncSYRKMap = [{
    path: '/syrkIndex',
    component: Layout,
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    redirect: '/syrkIndex/index',
    children: [{
      path: 'index',
      name: '信息汇总',
      icon: 'fa fa-bar-chart fa-lg',
      component: _import('populationManage/index')
    }]
  },
  {
    path: '/syrkManage',
    component: Layout,
    name: '实有人口管理',
    icon: 'fa fa-users fa-lg',
    redirect: '/syrkManage/czrkManage',
    children: [{
        path: 'czrkManage', //常住人口管理
        name: '户籍人口',
        component: _import('populationManage/residentManage')
      },
      {
        path: 'floatPersonManage', // 流动人口管理
        name: '流动人口',
        component: _import('populationManage/floatingPopulation')
      },
      {
        path: 'stayedPopulation', // 留守人口
        name: '留守人口',
        component: _import('populationManage/stayedPopulation')
      },
      // {
      //   path: 'foreignerPopulation', // 境外人口
      //   name: '境外人口',
      //   component: _import('populationManage/foreignerPopulation')
      // },
      {
        path: 'syrkpersonInfo',
        name: '人口信息',
        hidden: true,
        component: _import('populationManage/personInfo')
      },
      {
        path: 'addPopulation',
        name: '添加实有人口',
        component: _import('populationManage/addPopulationByType')
      },
      {
        path: 'editSyrkPersonInfo',
        name: '编辑实有人口',
        hidden: true,
        component: _import('populationManage/editPopulationInfo')
      }
    ]
  },
  {
    path: '/houseManage',
    component: Layout,
    icon: 'fa fa-cubes fa-lg',
    name: '房屋管理',
    redirect: '/houseManage/index',
    children: [{
        path: 'index',
        name: '房屋信息检索',
        component: _import('populationManage/houseManage')
      },
      {
        path: 'add',
        name: '添加房屋信息',
        component: _import('populationManage/addHouse')
      },
      {
        path: 'edit',
        name: '编辑房屋信息',
        hidden: true,
        component: _import('populationManage/updateHouse')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 特殊人群模块
export const asyncTSRKMap = [{
    path: '/tsrkIndex',
    component: Layout,
    icon: 'fa fa-bar-chart fa-lg',
    noDropdown: true,
    redirect: '/tsrkIndex/index',
    children: [{
      path: 'index',
      name: '信息汇总',
      icon: 'fa fa-bar-chart fa-lg',
      component: _import('specialPopulationManage/index')
    }]
  },
  {
    path: '/tsrkManage',
    component: Layout,
    name: '特殊人群管理',
    icon: 'fa fa-users fa-lg',
    redirect: '/tsrkManage/psychoticManage',
    children: [{
        path: 'psychoticManage',
        name: '严重精神病患者',
        component: _import('specialPopulationManage/psychoticManage')
      },
      {
        path: 'emancipistManage',
        name: '刑满释放人员',
        component: _import('specialPopulationManage/emancipistManage')
      },
      // {
      //   path: 'aidsManage',
      //   name: '艾滋病感染者',
      //   component: _import('specialPopulationManage/AIDSManage')
      // },
      {
        path: 'sjjzManage',
        name: '社区矫正人员',
        component: _import('specialPopulationManage/communityCorrectionerPopulation')
      },
      // {
      //   path: 'drugAddictsManage',
      //   name: '吸毒人员',
      //   component: _import('specialPopulationManage/drugAddictsManage')
      // },
      // {
      //   path:'keyPetitioner',
      //   name:'重点上访人员',
      //   component:_import('specialPopulationManage/keyPetitioner')
      // },
      // {
      //   path:'keyYoungManage',
      //   name: '重点青少年',
      //   component:_import('specialPopulationManage/keyYoungManage')
      // },
      {
        path: 'addSpecialPerson',
        name: '添加特殊人口',
        component: _import('specialPopulationManage/addSpecialPerson')
      },
      {
        path: 'watchSpecialInfo',
        name: '查看特殊人口信息',
        hidden: true,
        component: _import('specialPopulationManage/specialInfo')
      },
      {
        path: 'editSpecialPerson',
        name: '编辑特殊人口信息',
        hidden: true,
        component: _import('specialPopulationManage/editSpecialPerson')
      }
    ]
  },
  {
    path: '/keyPetitioner',
    component: Layout,
    name: '重点上访人员管理',
    redirect: '/keyPetitioner/index',
    icon: 'fa fa-universal-access fa-lg',
    noDropdown: true,
    children: [{
      path: 'index',
      name: '重点上访人员管理',
      component: _import('specialPopulationManage/keyPetitioner')
    }]
  },
  {
    path: '/keyYoungerManager',
    component: Layout,
    name: '重点青少年管理',
    redirect: '/keyYoungerManager/index',
    icon: 'fa fa-user-circle-o fa-lg',
    noDropdown: true,
    children: [{
        path: 'index',
        name: '重点青少年检索',
        component: _import('keyYounger/keyYoungerManage')
      },
      {
        path: 'addKeyYounger',
        name: '添加重点青少年',
        hidden: true,
        component: _import('keyYounger/addKeyYounger')
      },
      {
        path: 'keyYoungerInfo',
        name: '重点青少年详情',
        hidden: true,
        component: _import('keyYounger/keyYoungerInfo')
      },
      {
        path: 'editYounger',
        name: '重点青少年编辑',
        hidden: true,
        component: _import('keyYounger/editKeyYounger')
      }
    ]
  }
]



// WEBPACK FOOTER //
// ./src/router/index.js