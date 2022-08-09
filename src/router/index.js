import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { index: 1 }
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
        component: () => import('@/views/My'),
        meta: { index: 2 }
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/detail')
  }
]

const router = new VueRouter({
  routes
})

export default router
