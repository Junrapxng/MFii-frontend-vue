
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import Contact from '../pages/contact.vue'
import Register from '../pages/register.vue'
import Login from '../pages/login.vue'
import Innovation from '@/pages/user/innovation.vue'
import Admin from '@/pages/admin/index.vue'
import Dashboard from '@/pages/admin/dashboard.vue'
import UserManage from '@/pages/admin/userManage.vue'

const routes = [
    {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user/innovation',
    name: 'Innovation',
    component: Innovation
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/userManage',
    name: 'UserManage',
    component: UserManage
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),routes
})

export default router
