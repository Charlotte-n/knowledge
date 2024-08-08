import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/analyze'
    },
    {
      path:'/analyze',
      name:'analyze',
      component:()=>import('../views/analyze/index.vue')
    },
    {
      path:'/manage',
      name:'manage',
      component:()=>import('../views/manage/index.vue')
    }

  ]
})

export default router
