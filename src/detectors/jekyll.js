const { existsSync } = require('fs')

const FRAMEWORK_PORT = 4000

module.exports = function () {
  if (!existsSync('_config.yml')) {
    return false
  }

  return {
    framework: 'jekyll',
    frameworkPort: FRAMEWORK_PORT,
    command: 'bundle',
    possibleArgsArrs: [['exec', 'jekyll', 'serve', '-w']],
    dist: '_site',
  }
}
