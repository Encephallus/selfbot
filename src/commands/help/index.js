// const fs = require('bluebird').promisifyAll(require('fs'))
const path = require('path')
const helper = new (require('./helper'))()

module.exports = async function (msg, options, arglist) {
  try {
    let commandsPath = path.join(__dirname, '..')
    let response = ''

    if (!helper.help) {
      await helper.loadFile(commandsPath, 'UTF-8')
      console.log(`liste des commandes chargé à partir du dossier ${commandsPath}`)
    }

    response = helper.gethelp(arglist[0], options)

    console.log(response)
  } catch (e) {
    console.log(e)
  }
}
