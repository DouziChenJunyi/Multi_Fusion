import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/components/MultiSource.vue')
  },
  {
    path: '/multisource',
    component: () => import('@/components/MultiSource.vue')
  },
  {
    path: '/multiview',
    component: () => import('@/components/MultiView.vue')
  },
  {
    path: '/multimodel',
    component: () => import('@/components/MultiModel.vue')
  }
]
const createRouter = () => new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
/* eslint-disable no-new */
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

