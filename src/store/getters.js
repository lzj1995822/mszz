const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  getRoute: state => state.app.routerNum,
  menus: state => state.user.menus,
  user: state=> state.user.user,
  loginInfo: state=>state.user.loginInfo,
  page: state=>state.user.page,
  netgrid: state=>state.app.NetGrid
}
export default getters



// WEBPACK FOOTER //
// ./src/store/getters.js