import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var routes = [
  {
    path: '/',
    component: () => import('@/module/views/index.vue')
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置 你还可以传别的配置参数
const router = new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

export default router
