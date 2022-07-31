import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
