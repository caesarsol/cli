const { existsSync } = require('fs')

const FRAMEWORK_PORT = 4567

module.exports = function () {
  if (!existsSync('config.rb')) {
    return false
  }

  return {
    framework: 'middleman',
    frameworkPort: FRAMEWORK_PORT,
    command: 'bundle',
    possibleArgsArrs: [['exec', 'middleman', 'server']],
    dist: 'build',
  }
}
