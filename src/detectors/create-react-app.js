const { hasRequiredDeps, hasRequiredFiles, getYarnOrNPMCommand, scanScripts } = require('./utils/jsdetect')

//
// detection logic - artificial intelligence!
//
module.exports = function () {
  // REQUIRED FILES
  if (!hasRequiredFiles(['package.json'])) return false
  // REQUIRED DEPS
  if (!hasRequiredDeps(['react-scripts'])) return false

  /** everything below now assumes that we are within create-react-app */

  const possibleArgsArrs = scanScripts({
    preferredScriptsArr: ['start', 'serve', 'run'],
    preferredCommand: 'react-scripts start',
  })

  return {
    framework: 'create-react-app',
    command: getYarnOrNPMCommand(),
    // the port that create-react-app normally outputs
    frameworkPort: 3000,
    env: { BROWSER: 'none', PORT: 3000 },
    stdio: ['inherit', 'pipe', 'pipe'],
    possibleArgsArrs,
    dist: 'public',
  }
}
