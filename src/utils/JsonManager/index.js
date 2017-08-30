const fs = require('bluebird').promisifyAll(require('fs'))

class JsonManager {
  constructor (jsonPath, encodage, name) {
    this.isDataLoaded = false
    this.name = name
    this.encodage = encodage
    this.path = jsonPath
  }

  async loadJSON () {
    try {
      this[this.name] = JSON.parse(await fs.readFileAsync(this.path, this.encodage))
    } catch (e) {
      console.error(e)
      process.exit()
    }
    this.isDataLoaded = true
  }

  async updateJSON () {
    try {
      await fs.writeFileAsync(this.path, JSON.stringify(this[this.name], null, 2), this.encodage)
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = JsonManager
