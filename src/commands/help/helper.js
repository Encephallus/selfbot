const fs = require('bluebird').promisifyAll(require('fs'))
const path = require('path')

class Helper {
  constructor () {
    this.help = false
  }

  async loadFile (commandsPath, encodage) {
    this.help = {}
    this.help.commands = {}
    this.help.allcommands = await fs.readdirAsync(commandsPath, encodage)
    this.help.listcommands = this.help.allcommands.filter(function (x) {
      try {
        let usagePath = path.join(commandsPath, x, 'usage.json')
        fs.accessSync(usagePath, fs.constants.R_OK)
        console.log(x + 'is added to the documented command')
        return true
      } catch (e) {
        return false
      }
    })
    this.help.listcommands.map((x) => {
      this.help.commands[x] = JSON.parse(fs.readFileSync(path.join(commandsPath, x, 'usage.json')))
    })
  }

  gethelp (command, options) {
    if (!command) {
      if (options.all) {
        return this.help.allcommands
      } else {
        return this.help.listcommands
      }
    }
    return this.help.commands[command]
  }
}

module.exports = Helper
