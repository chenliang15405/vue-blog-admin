import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: resolve => require(['./pages/Login.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['./pages/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['./pages/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/user',
          component: resolve => require(['./pages/User.vue'], resolve),
          meta: { title: '用户管理' }
        },
        {
          path: '/article',
          component: resolve => require(['./pages/User.vue'], resolve),
          meta: { title: '文章管理' }
        },
        {
          path: '/label',
          component: resolve => require(['./pages/Label.vue'], resolve),
          meta: { title: '标签管理' }
        },
        {
          path: '/comment',
          component: resolve => require(['./pages/Comment.vue'], resolve),
          meta: { title: '评论管理' }
        },
        {
          path: '/category',
          component: resolve => require(['./pages/Category.vue'], resolve),
          meta: { title: '分类管理' }
        }
      ]
    }

  ]

})
