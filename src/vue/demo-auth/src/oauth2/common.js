export function objectExtend (a, b) {
  // Don't touch 'null' or 'undefined' objects.
  if (a == null || b == null) {
    return a
  }

  Object.keys(b).forEach(function (key) {
    if (Object.prototype.toString.call(b[key]) === '[object Object]') {
      if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
        a[key] = b[key]
      } else {
        a[key] = objectExtend(a[key], b[key])
      }
    } else {
      a[key] = b[key]
    }
  })

  return a
}

export function parseCookies (str) {
  if (str.length === 0) return {}
  const parsed = {}
  const pattern = new RegExp('\\s*;\\s*')
  str.split(pattern).forEach((i) => {
    const [encodedKey, encodedValue] = i.split('=')
    const key = decodeURIComponent(encodedKey)
    const value = decodeURIComponent(encodedValue)
    parsed[key] = value
  })
  return parsed
}

export function formatOptions (options) {
  const {
    path,
    domain,
    expires,
    secure
  } = options
  return [
    typeof path === 'undefined' || path === null ? '' : ';path=' + path,
    typeof domain === 'undefined' || domain === null ? '' : ';domain=' + domain,
    typeof expires === 'undefined' || expires === null ? '' : ';expires=' + expires.toUTCString(),
    typeof secure === 'undefined' || secure === null || secure === false ? '' : ';secure'
  ].join('')
}

export function formatCookie (key, value, options) {
  return [
    encodeURIComponent(key),
    '=',
    encodeURIComponent(value),
    formatOptions(options)
  ].join('')
}

/**
 * Get full path based on current location
 * @param  {Location} location
 * @return {String}
 */
export function getFullUrlPath (location) {
  const isHttps = location.protocol === 'https:'
  return location.protocol + '//' + location.hostname +
    ':' + (location.port || (isHttps ? '443' : '80')) +
    (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname)
}

/**
 * Parse query string variables
 * @param  {String} Query string
 * @return {String}
 */
export function parseQueryString (str) {
  let obj = {}
  let key
  let value;
  (str || '').split('&').forEach((keyValue) => {
    if (keyValue) {
      value = keyValue.split('=')
      key = decodeURIComponent(value[0])
      // eslint-disable-next-line
      obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true
    }
  })
  return obj
}

export function getUrlParams (search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  let params = {}
  hashes.map(hash => {
    let [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  })

  return params
}
