import Vue from 'vue'
import App from './App.vue'

import Cookies from 'js-cookie'

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 默认主题

import 'es6-promise/auto'

import store from './store'
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import './components/common/directives'

import './assets/font/iconfont.css'

import router from './router'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium'
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
