import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import { Icon } from '@iconify/vue2';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/person',
    name: 'Person',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {path: '/home',
   name: 'Home',
   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {path: '/login',
   name: 'Login',
   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {path: '/register',
   name: 'Register',
   component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {path: '/contact',
   name: 'Contact',
   component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
