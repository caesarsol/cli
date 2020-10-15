const path = require('path')

module.exports.detectFunctionsBuilder = async function (projectDir) {
  const detectors = require('fs')
    .readdirSync(path.join(__dirname, '..', 'function-builder-detectors'))
    // only accept .js detector files
    .filter((x) => x.endsWith('.js'))
    .map((det) => require(path.join(__dirname, '..', `function-builder-detectors/${det}`)))

  for (const detector of detectors) {
    const settings = await detector(projectDir)
    if (settings) {
      return settings
    }
  }
}
