/*
*  封装getters 方法获取到不同命令空间中getters的数据
*/
const getters = {
  username: state => state.login.username,
  password: state => state.login.password,
  role: state => state.login.role,
  token: state => state.login.token,
  collapse: state => state.home.collapse,
  theme: state => state.settings.theme,
  showSettings: state => state.settings.showSettings,
  tagsView: state => state.settings.tagsView,
  sidebarLogo: state => state.settings.sidebarLogo
}

export default getters
