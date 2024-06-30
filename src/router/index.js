
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, } from 'vue-router'
import Home from '../pages/index.vue'
import Contact from '../pages/contact.vue'
import Register from '../pages/register.vue'
import Login from '../pages/login.vue'
import UPS from '@/pages/ups.vue'
import LAP from '@/pages/lap.vue'
import All_Catagories from '@/pages/all_catagories.vue'
import Innovation from '@/pages/user/innovation.vue'
import Admin from '@/pages/admin/index.vue'
import UserManage from '@/pages/admin/userManage.vue'
import Documents from '@/pages/admin/documents.vue'
import Staff from '@/pages/staff/index.vue'
import newPost from '@/pages/staff/NewsPost.vue'
import ResearchManagement from '@/pages/staff/ResearchManagement.vue'
import MessageReply from '@/pages/staff/MessageReply.vue'
import Notfound from '../pages/NotFound.vue'
import UserEditProfile from '../pages/user/userEditProfile.vue'
import { useUserStore } from '@/store/user'
import MessagePage from '../pages/user/userMessagePage.vue'


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
    component: Admin,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/userManage',
    name: 'UserManage',
    component: UserManage,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/documents',
    name: 'Documents',
    component: Documents,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/staff/',
    name: 'Staff',
    component: Staff,
    meta: {
      requiresAuth: true,
      roles: ['staff', 'admin']
    },
  },
  {
    path: '/staff/newPost',
    name: 'newPost',
    component: newPost,
    meta: { requiresAuth: true, roles: ['staff', 'admin'] },
  },
  {
    path: '/staff/researchManagement',
    name: 'ResearchManagement',
    component: ResearchManagement,
    meta: { requiresAuth: true, roles: ['staff', 'admin'] },
  },
  {
    path: '/staff/messageReply',
    name: 'MessageReply',
    component: MessageReply,
    meta: { requiresAuth: true, roles: ['staff', 'admin'] },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserEditProfile,
    meta: { requiresAuth: true, role: 'user' },
  },
  {
    path: '/message',
    name: 'Message',
    component: MessagePage,
    meta: { requiresAuth: true, role: 'user' },
  },


  // catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: Notfound
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes
});
// navigation path check role
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user) {
      await userStore.fetchUser();
    }

    if (userStore.user) {
      if (to.meta.role && userStore.user.resutl.role !== to.meta.role) {
        next({ name: 'Home' }); // Redirect to home if the user doesn't have the required role
      } else {
        next();
      }
    } else {
      next({ name: 'Login' }); // Redirect to login if the user is not authenticated
    }
  } else {
    next(); // Make sure to always call next()!
  }
});


export default router
