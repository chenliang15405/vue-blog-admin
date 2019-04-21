import * as userInfo from './userInfoConstant'

// initial state
const state = {
  // 用户登录状态,存储在sessionStorage中，防止刷新后没了
  username: sessionStorage.getItem('login_name') ? sessionStorage.getItem('login_name') : false,
  password: sessionStorage.getItem('password') ? sessionStorage.getItem('password') : false,
  role: ''
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) { // 这里的res可以由页面传过来，改变底下的true或者false
    sessionStorage.setItem('login_name', res.username)
    sessionStorage.setItem('password', res.password)
    // TODO 将role也存储在vuex中
    commit(userInfo.SET_LOGIN_NAME, res.username)
    commit(userInfo.SET_LOGIN_PASSWORD, res.password)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    sessionStorage.removeItem('login_name')
    sessionStorage.removeItem('password')
    commit(userInfo.SET_LOGIN_NAME, false)
  }

}

const getters = {
  username: state => state.username,
  password: state => state.password,
  role: state => state.role
}

const mutations = {
  [userInfo.SET_LOGIN_NAME](state, username) {
    state.username = username
  },
  [userInfo.SET_LOGIN_PASSWORD](state, pwd) {
    state.password = pwd
  }
}

export default {
  namespaced: true, // 开启命令空间
  state, // 状态
  actions, // 提交mutations,可做异步操作
  getters, // 对数据进行一些操作
  mutations// 对状态做更改（同步）
}
