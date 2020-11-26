import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', 
    name: 'Inscription', 
    component: Login},

  { path: '/signup',
    name: 'Connexion', 
    component: () => import('../views/Signup.vue')},

  { path: '/home/:userId', 
    name: 'Mur', 
    component: () => import('../views/home.vue')},

  {
    path: '/profil/:userId', 
    name: 'user profil',
    component: Profil,
    params: true}
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
