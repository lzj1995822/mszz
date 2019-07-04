import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, setUser } from '@/utils/auth'


const user = {
  state: {
    token: getToken(),
    name: null,
    avatar: null,
    roles: [],
    menus:[],
    user:null,
    loginInfo:null,
    page:{
      A:1,
      B:1,
      C:1,
      D:1,
      E:1,
      F:1,
      G:1,
      H:1,
      I:1,
      J1:1,
      J2:1,
      J3:1,
      J4:1,
      J5:1,
      K:1,
      L:1,
      M:1,
      N:1,
      O:1,
      P:1,
      Q1:1,
      Q2:1,
      Q3:1,
      Q4:1,
      Q5:1
    }
  },

  mutations: {
    SET_PAGE(state,obj){
      Object.keys(state.page).forEach(x=>{
        state.page[x] = 1;
      })
      state.page[obj.name] = obj.index;
    },
    INIT_PAGE(state,name){
      Object.keys(state.page).forEach(x=>{
        if(x!=name){
          state.page[x] = 2;
        }
      })
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_USER: (state, user) =>{
      state.user = user
      if(user.menu!=null)
        state.user.menu = JSON.parse(user.menu)
    },
    SET_ADMIN_ROUTE: (state, menu)=>{
      state.user.menu = menu
    },
    SET_LOGIN_INFO: (state, info)=>{
      state.loginInfo = info
    }
  },

  actions: {
    setMenus({commit}, menus) {
      commit('SET_MENUS', menus)
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(res => {
          if(res.data != 'error'&&res.data.user.roleName!='APP'){
            setToken(res.data.token)
            setUser(JSON.stringify(res.data.user))
            commit('SET_USER', res.data.user)
            commit('SET_LOGIN_INFO',res.data.loginInfo)
            commit('SET_TOKEN', res.data.token)
            resolve()
          }else{
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_USER',data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user



// WEBPACK FOOTER //
// ./src/store/modules/user.js