import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import OAuth2 from './oauth2'
import Buefy from 'buefy'
// import 'buefy/lib/buefy.min.css'
// import 'buefy/lib/buefy.css'
import 'buefy/dist/buefy.css'

import App from '@/App.vue'
import { routes } from '@/router/router.js'

if (process.env.VUE_APP_API_ENDPOINT) {
  axios.default.baseURL = process.env.VUE_APP_API_ENDPOINT
}
if (axios.default.baseURL === undefined ||
  axios.default.baseURL === '') {
  axios.default.baseURL = 'https://portal.example.com'
}

console.log(axios.default.baseURL)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(OAuth2, {
  clientId: 'example-app',
  clientSecret: 'XXXXXXXXXXXXXX',
  state: 'example-app',
  // state: 'sesconsole',
  accessTokenUri: 'https://xxxx.xx.com/token',
  authorizationUri: 'https://xxxx.xx.com/auth',
  redirectUri: 'https://portal.example.com/oauth2'
})
Vue.use(Buefy)

const router = new VueRouter(routes)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
