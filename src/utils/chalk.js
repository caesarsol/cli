const chalk = require('chalk')

/**
 * Chalk instance for CLI
 * @param  {boolean} noColors - disable chalk colors
 * @return {object} - chalk instance or proxy noOp
 */
const safeChalk = function (noColors) {
  /* if no colors return proxy to chalk API */
  if (noColors) {
    return neverNull(chalk)
  }
  return chalk
}

const noop = function () {}

const neverNull = function (obj) {
  const match = function (some, none = noop) {
    return obj != null ? some(obj) : none()
  }
  return new Proxy(
    (some, none) => {
      if (some) {
        // has value return it with no chalk wrapper
        return some
      }
      if (!some && !none) return obj
      return match(some, none)
    },
    {
      get: (target, key) => {
        const obj = target()
        if (obj !== null && typeof obj === 'object') {
          return neverNull(obj[key])
        }
        return neverNull()
      },
      set: (target, key, val) => {
        const obj = target()
        if (obj !== null && typeof obj === 'object') {
          obj[key] = val
        }
        return true
      },
    }
  )
}

module.exports = safeChalk
