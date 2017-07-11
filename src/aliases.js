const fs = require('bluebird').promisifyAll(require('fs'))

class Aliases {
  constructor (url, encodage) {
    this.aliases = {}
    this.loadFile(url, encodage)
  }

  async loadFile (url, encodage) {
    try {
      this.aliases = JSON.parse(await fs.readFileAsync(url, encodage))
      console.log(`Aliases imported from ${url} !`)
    } catch (e) {
      console.error(e)
      process.exit()
    }
    return this
  }

  get (command) {
    return this.aliases[command] || command
  }
}

module.exports = Aliases
