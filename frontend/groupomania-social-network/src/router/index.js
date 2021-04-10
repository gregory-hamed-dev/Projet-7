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
    path: '/profil', 
    name: 'user profil',
    component: Profil,
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
   },
   {
     path: '/commentaire/:id',
     name: 'deleteCom',
     component: () => import ('../views/removeCom.vue')
   },

   {
     path: '/profil/:id',
     name: 'uniqueUserProfil',
     component: () => import ('../views/UniqueUserPage.vue')

   }
  
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
