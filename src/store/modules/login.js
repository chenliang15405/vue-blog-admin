import * as userInfo from './userInfoConstant'

// initial state
const state = {
  // 用户登录状态,存储在sessionStorage中，防止刷新后没了
  username: sessionStorage.getItem('login_name') ? sessionStorage.getItem('login_name') : '',
  password: sessionStorage.getItem('password') ? sessionStorage.getItem('password') : '',
  role: sessionStorage.getItem('role') ? sessionStorage.getItem('role') : '',
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) { // 这里的res可以由页面传过来，改变底下的true或者false
    sessionStorage.setItem('login_name', res.username)
    sessionStorage.setItem('password', res.password)
    sessionStorage.setItem('role', res.role)

    commit(userInfo.SET_LOGIN_NAME, res.username)
    commit(userInfo.SET_LOGIN_PASSWORD, res.password)
    commit(userInfo.SET_LOGIN_ROLE, res.role)
  },

  /**
   * 设置token令牌
   * @param commit
   * @param token
   */
  setToken({ commit }, { token }) {
    console.log(token)
    sessionStorage.setItem('token', token) // TODO 可以设置为localStroage
    commit(userInfo.TOKEN, token)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    sessionStorage.removeItem('login_name')
    sessionStorage.removeItem('password')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('token')
    commit(userInfo.SET_LOGIN_NAME, '')
    commit(userInfo.SET_LOGIN_PASSWORD, '')
    commit(userInfo.SET_LOGIN_ROLE, '')
    commit(userInfo.TOKEN, '')
  }

}

const getters = {
  username: state => state.username,
  password: state => state.password,
  role: state => state.role,
  token: token => state.token
}

const mutations = {
  [userInfo.SET_LOGIN_NAME](state, username) {
    state.username = username
  },
  [userInfo.SET_LOGIN_PASSWORD](state, pwd) {
    state.password = pwd
  },
  [userInfo.SET_LOGIN_ROLE](state, role) {
    state.role = role
  },
  [userInfo.TOKEN](state, token) {
    state.token = token
  }
}

export default {
  namespaced: true, // 开启命令空间
  state, // 状态
  actions, // 提交mutations,可做异步操作
  getters, // 对数据进行一些操作
  mutations// 对状态做更改（同步）
}
