import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'

export const routes = {
  mode: 'history',
  routes: [{
    path: "/login",
    component: Login
  }, {
    path: "/main",
    component: Main
  }]
}