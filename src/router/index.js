
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
import UPS from '@/pages/ups.vue'
import LAP from '@/pages/lap.vue'
import All_Catagories from '@/pages/all_catagories.vue'
import Innovation from '@/pages/user/innovation.vue'
import Admin from '@/pages/admin/index.vue'
import Dashboard from '@/pages/admin/dashboard.vue'
import UserManage from '@/pages/admin/userManage.vue'
import Documents from '@/pages/admin/documents.vue'
import Staff from '@/pages/staff/index.vue'
import newPost from '@/pages/staff/NewsPost.vue'
import ResearchManagement from '@/pages/staff/ResearchManagement.vue'
import MessageReply from '@/pages/staff/MessageReply.vue'
import Notfound from '../pages/NotFound.vue'
import UserEditProfile from '../pages/user/userEditProfile.vue'



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
    path: '/services/ups',
    name: 'UPS',
    component: UPS,
  },
  {
    path: '/services/lap',
    name: 'LAP',
    component: LAP,
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
  {
    path: '/admin/documents',
    name: 'Documents',
    component: Documents
  },
  {
    path: '/staff/',
    name: 'Staff',
    component: Staff
  },
  {
    path: '/staff/newPost',
    name: 'newPost',
    component: newPost
  },
  {
    path: '/staff/researchManagement',
    name: 'ResearchManagement',
    component: ResearchManagement
  },
  {
    path: '/staff/messageReply',
    name: 'MessageReply',
    component: MessageReply
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserEditProfile
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
