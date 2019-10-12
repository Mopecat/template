import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {},
  getters,
  mutations,
  actions,
  modules: {}
})

export default store
