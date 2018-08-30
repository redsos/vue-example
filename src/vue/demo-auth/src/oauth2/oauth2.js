import { objectExtend, getFullUrlPath, getUrlParams } from './common.js'
import StorageFactory from './storage.js'
import ClientOAuth2 from 'client-oauth2'

/**
 * Default configuration
 */
let defaultOptions = {
  state: '',
  withCredentials: false,
  clientId: '',
  clientSecret: '',
  accessTokenUri: '',
  authorizationUri: '',
  redirectUri: getFullUrlPath(window.location),
  scopes: ['openid', 'profile', 'email']
}

export default class OAuth2 {
  constructor ($http, overrideOptions) {
    let options = objectExtend({}, defaultOptions)
    options = objectExtend(options, overrideOptions)
    let storage = StorageFactory(options)
    this.clientOAuth2 = new ClientOAuth2(options)

    this.ckey = '_ses__id-token'
    Object.defineProperties(this, {
      $http: {
        get () {
          return $http
        }
      },

      options: {
        get () {
          return options
        }
      },

      storage: {
        get () {
          return storage
        }
      }
    })
  }

  /**
   * Check if user is authenticated
   * @return {Boolean}
   */
  isAuthenticated () {
    let token = this.storage.getItem(this.ckey)
    if (!token) {
      return false
    }

    let tokenArray = token.split('.')
    if (tokenArray.length !== 3) { // Token with a valid JWT format XXX.YYY.ZZZ
      return false
    }

    const base64Url = tokenArray[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    const exp = JSON.parse(window.atob(base64)).exp
    if (typeof exp === 'number') {
      return Math.round(new Date().getTime() / 1000) < exp
    }

    return true
  }

  login () {
    if (this.isAuthenticated()) {
      return
    }

    let authURL = this.authCodeURL()
    window.location.href = authURL
  }

  callback (fn) {
    let url = window.location.href
    let params = getUrlParams(url)
    if (params.error) {
      fn(false, { errMsg: params.error })
      return
    }
    if (!params.code) {
      fn(false, { errMsg: 'no code in request' })
      return
    }
    if (params.state && params.state !== this.options.state) {
      fn(false, { errMsg: 'expected state ' + this.options.state + ' got ' + params.state })
      return
    }

    // let token = this.exchangeForToken(params.code)
    let o = this
    this.clientOAuth2.code.getToken(url).then(function (token) {
      let idToken = ''
      if (token.data && token.data.id_token) {
        idToken = token.data.id_token
      } else {
        idToken = token.accessToken
      }
      o.storage.setItem(o.ckey, idToken)
      fn(true, { token: idToken })
    }).catch(function (err) {
      if (err.body) {
        fn(false, { errMsg: err })
      }
    })
  }

  authCodeURL () {
    let url = this.options.authorizationUri + '?client_id=' + this.options.clientId +
      '&redirect_uri=' + encodeURIComponent(this.options.redirectUri) +
      '&response_type=code'
    if (this.options.scopes.length > 0) {
      url += '&scope=' + this.options.scopes.join('+')
    }
    if (this.options.state) {
      url += '&state=' + this.options.state
    }

    return url
  }

  exchangeForToken (code) {
    // let url = this.options.endpoint + this.options.tokenPath

    // let payload = {
    //   code: code,
    //   grant_type: 'authorization_code',
    //   redirect_uri: this.options.redirectUri
    // }

    // alert(this.$http.defaults.headers.post['content-type'])
    // this.$http.post(url, payload, {
    //   withCredentials: this.options.withCredentials,
    //   headers: { 'authorization': '' }
    // }).then(response => {
    //   alert(response.status)
    // })

    return code
  }

  getToken () {
    let token = this.storage.getItem(this.ckey)
    if (token) {
      return token
    }

    return ''
  }
}
