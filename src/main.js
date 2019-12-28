import Vue from 'vue'
import App from './App.vue'

import Cookies from 'js-cookie'

import axios from 'axios'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'// 默认主题
if (process.env.NODE_ENV === 'development') { // production环境使用的是cdn
  require('element-ui/lib/theme-chalk/index.css')
}

import 'es6-promise/auto'

import store from './store'
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import './components/common/directives'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.inc()
NProgress.configure({ ease: 'ease', speed: 500, showSpinner: false }) // NProgress Configuration

import './assets/font/iconfont.css'
import '@/assets/css/transition.scss' // global transition css

import router from './router'

import './permission' // permission control

import * as customFilter from './utils/commonFilter' // customer filter js to auto registry

Vue.use(ELEMENT, {
  size: Cookies.get('size') || 'medium'
})

// 过滤器全局配置，自动挂载
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
})

Vue.prototype.$NProgress = NProgress
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
