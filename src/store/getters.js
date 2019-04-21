/*
*  封装getters 方法获取到不同命令空间中getters的数据
*/
const getters = {
  username: state => state.login.username,
  password: state => state.login.password,
  role: state => state.login.role
}
export default getters
