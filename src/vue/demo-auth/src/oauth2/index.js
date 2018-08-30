import OAuth2 from './oauth2.js'

/**
 * OAuth2 plugin
 * @param {Object} Vue
 * @param {Object} options
 */
function plugin (Vue, options) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  let oauth2 = null
  Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        if (!oauth2) {
          // Request handler library not found, throw error
          if (!this.$http) {
            throw new Error('Request handler instance not found')
          }

          oauth2 = new OAuth2(this.$http, options)
        }
        return oauth2
      }
    }
  })
}

/**
 * External factory helper for ES5 and CommonJS
 * @param  {Object} $http     Instance of request handling library
 * @param  {Object} options   Configuration object
 * @return {OAuth2}  OAuth2 instance
 */
plugin.factory = function ($http, options) {
  return new OAuth2($http, options)
}

export default plugin
