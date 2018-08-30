import OAuth2validators from '@/pages/OAuth2Callback.vue'
import Main from '@/pages/Main.vue'

export const routes = {
  mode: 'history',
  routes: [{
    path: '/oauth2',
    component: OAuth2validators
  }, {
    path: '/',
    component: Main
  },
  { path: '*', redirect: '/' }
  ]
}
