import UserDetail from '@/views/UserDetail.vue'
import UsersPage from '@/views/UsersPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UsersPage
  },
  {
    path: '/user/:id',
    name: 'user-detail',
    component: UserDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
