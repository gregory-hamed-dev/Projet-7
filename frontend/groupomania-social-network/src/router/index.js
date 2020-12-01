import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', 
    name: 'Inscription', 
    component: Login,
  },

  { path: '/signup',
    name: 'Connexion', 
    component: () => import('../views/Signup.vue')},

  { path: '/home', 
    name: 'Mur', 
    component: () => import('../views/home.vue'),
  },

  {
    path: '/profil/:userId', 
    name: 'user profil',
    component: Profil,
   }, 

   {
    path: '/message/create',
    name: 'newMessage',
    component: () => import ('../views/newMessage.vue'),
  },

   {
    path: '/message/:id',
    name: 'MessageVue',
    component: () => import ('../views/UniqueMessagePage.vue'),
  },

   {
     path: '/message/update/:id',
     name: 'updateMessage',
     component: () => import ('../views/updateMessage.vue')
   }
  
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
