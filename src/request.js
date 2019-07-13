import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 10000 // request timeout
})

// 设置post请求头
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log('request header token', store.getters.token)
    if (store.getters.token) {
    //   // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    if (response.headers.token) {
      // console.log('response', response)
      return response
    }
    const res = response.data
    // console.log('res', res)
    if (res.code !== 20000) {
      // 20002:密码错误;
      if (res.code === 20002) {
        // 直接返回对象
        return res
      }

      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      //  20001:失败;  20003:权限不足;
      if (res.code === 20003) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // TODO 重新登录
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload() // 为了重新实例化vue-router对象 避免bug
          // })
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    // 如果返回的不是JSON数据格式，就会进入error
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
