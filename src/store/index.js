import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import jigouzuzhi from './modules/zonghezuzhi'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    jigouzuzhi
  },
  getters
})

export default store



// WEBPACK FOOTER //
// ./src/store/index.js