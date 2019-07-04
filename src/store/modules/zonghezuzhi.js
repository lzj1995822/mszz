import {
  fetchALLTYPEInfo
} from '@/api/zonghezhili/duiwujianshe'

const zonghezuzhi = {
  state: {
    Types: {
    }
  },
  getters: {
    getPersonLevelType: state => state.Types.personLevelTypes,
    getPersonPositionType: state => state.Types.personPositionTypes
  },
  actions: {
    fetchALLTYPEInfo({
      commit
    }) {
      fetchALLTYPEInfo().then(res => {
        commit('SETORGINFOS', res)
      })
    }
  },
  mutations: {
    SETORGINFOS: (state, data) => {
      state.Types = data
    }
  }
}

export default zonghezuzhi



// WEBPACK FOOTER //
// ./src/store/modules/zonghezuzhi.js