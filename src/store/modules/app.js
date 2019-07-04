import Cookies from 'js-cookie'
import { getAllNetGrid } from "@/api/netGridManage";

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    routerNum: -1,
    NetGrid:null
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: state => {
      Cookies.set('sidebarStatus',0)
      state.sidebar.opened = false
    },
    OPEN_SIDEBAR: state => {
      Cookies.set('sidebarStatus',1)
      state.sidebar.opened = true
    },
    SETROUTE: (state, data) => {
      state.routerNum = data
    },
    SET_NETGRID:(state,data)=>{
      state.NetGrid = data;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CLOSESideBar: ({ commit }) => {
      commit('CLOSE_SIDEBAR')
    },
    OPENSIDERBAR: ({commit}) => {
      commit('OPEN_SIDEBAR')
    },
    setNetGrid:({commit})=>{
      getAllNetGrid().then(res => {
        let grid = res.data;
        for (let i in grid) {
          if(grid[i].fatherNetGridID==-1)
            grid[i].children = [];
        };
        let root = {
          fatherNetGridID:-2,
          netGridID:-1,
          netGridName:'茅山景区',
          children:[]
        }
        grid.push(root);
        setGrid(grid,root);
        commit('SET_NETGRID',root);
      });
    }
  }
}

function setGrid(grid,root){
  for(let i=0;i<grid.length;i++){
    if(grid[i].fatherNetGridID==root.netGridID){
      root.children.push(grid[i]);
    }
  }
  if(root.children)
    for(let i=0;i<root.children.length;i++){
      setGrid(grid,root.children[i]);
    }
}

export default app



// WEBPACK FOOTER //
// ./src/store/modules/app.js