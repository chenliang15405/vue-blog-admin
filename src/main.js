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
import '@/assets/css/transition.scss' // global transition css

import router from './router'

import * as customFilter from './utils/commonFilter'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium'
})

// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
