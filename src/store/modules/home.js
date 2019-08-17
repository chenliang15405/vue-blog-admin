// home.js 状态管理组件

const state = {
  collapse: false, // side bar status
  messageNum: 0
}

const actions = {
  collapseChage({ commit }, status) {
    commit('collapseChage', status)
  },
  changeMessage({ commit }, num) {
    commit('changeMessage', num)
  }
}

const mutations = {
  collapseChage(state, status) {
    state.collapse = status
  },
  changeMessage(state, num) {
    state.messageNum = num
  }
}

const getters = {
  collapse: state => state.collapse,
  messageNum: state => state.messageNum
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
