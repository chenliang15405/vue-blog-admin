import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login
  },
  state: {},
  mutations: {},
  actions: {},
  getters: getters
})

export default store
