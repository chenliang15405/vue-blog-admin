import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

import login from './modules/login'
import home from './modules/home'
import settings from './modules/settings'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    home,
    settings
  },
  state: {},
  mutations: {},
  actions: {},
  getters: getters
})

export default store
