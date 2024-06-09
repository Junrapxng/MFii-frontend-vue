
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
import All_Catagories from '@/pages/all_catagories.vue'
import Innovation from '@/pages/user/innovation.vue'
import Admin from '@/pages/admin/index.vue'
import Dashboard from '@/pages/admin/dashboard.vue'
import UserManage from '@/pages/admin/userManage.vue'
import Notfound from '../pages/NotFound.vue'


const routes = [
    {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about-us/contact',
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
    path: '/tt/all-categories',
    name: 'All_Catagories',
    component: All_Catagories,
  },
  {
    path: '/user/innovation/:id',
    name: 'Innovation',
    component: Innovation,
    props: true
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
  // catch all 404
 {
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: Notfound
 }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),routes
})

export default router
