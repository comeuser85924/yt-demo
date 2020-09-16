import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import collect from '../views/collect.vue'
import playvideo from '../views/playvideo.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/collect',
    name: 'collect',
    component: collect
  },
  {
    path: '/playvideo',
    name: 'playvideo',
    component: playvideo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
