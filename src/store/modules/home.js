// home.js 状态管理组件

const state = {
  collapse: false // side bar status
}

const actions = {
  collapseChage({ commit }, status) {
    commit('collapseChage', status)
  }
}

const mutations = {
  collapseChage(state, status) {
    state.collapse = status
  }
}

const getters = {
  collapse: state => state.collapse
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
