import Vue from 'vue'
import Router from 'vue-router'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}

export default new Router({
  // mode: 'history',
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
        },
        {
          path: '/article',
          component: resolve => require(['./pages/Article.vue'], resolve),
          meta: { title: '文章管理' }
        },
        {
          path: '/editor',
          component: resolve => require(['./pages/creative/TxtEditor.vue'], resolve),
          meta: { title: '富文本编辑器' }
        },
        {
          path: '/markdown',
          component: resolve => require(['./pages/creative/MarkDownEditor.vue'], resolve),
          meta: { title: 'markdown编辑器' }
        },
        {
          path: '/my',
          component: resolve => require(['./pages/My.vue'], resolve),
          meta: { title: '个人中心' }
        },
        {
          path: '/fileupload',
          component: resolve => require(['./pages/FileUpload.vue'], resolve),
          meta: { title: '文件资源' }
        },
        {
          path: '/published',
          component: resolve => require(['./pages/PublishSuccess.vue'], resolve),
          meta: { title: '发布成功' }
        },
        {
          path: '/bloggerMessage',
          component: resolve => require(['./pages/BloggerMessage.vue'], resolve),
          meta: { title: '消息通知' }
        }
      ]
    }

  ]

})
