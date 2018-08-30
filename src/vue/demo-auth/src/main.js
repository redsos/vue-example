import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import OAuth2 from './oauth2'
import Buefy from 'buefy'
import 'buefy/lib/buefy.min.css'
import App from '@/App.vue'
import { routes } from '@/router/router.js'

if (process.env.VUE_APP_API_ENDPOINT) {
  axios.default.baseURL = process.env.VUE_APP_API_ENDPOINT
}
if (axios.default.baseURL === undefined ||
  axios.default.baseURL === '') {
  axios.default.baseURL = 'http://localhost:6100'
}

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(OAuth2, {
  clientId: 'ses-console',
  clientSecret: 'ZXhhbXBsZS1hcHAtc2VjcmV0',
  state: 'sesconsole',
  accessTokenUri: 'http://sso-dex:5556/dex/token',
  authorizationUri: 'http://sso-dex:5556/dex/auth',
  redirectUri: 'http://127.0.0.1:8080/oauth2'
})
Vue.use(Buefy)

const router = new VueRouter(routes)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
