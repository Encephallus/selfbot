const JsonManager = require('../utils/JsonManager')

class AliasesManager extends JsonManager {
  constructor (jsonPath, encodage) {
    if (AliasesManager.instance !== undefined) {
      return AliasesManager.instance
    }
    super(jsonPath, encodage, 'aliases')
    this.constructor.instance = this
    this.loadJSON()
  }

  async loadJSON () {
    await super.loadJSON()
    console.log(`Aliases imported from ${this.path} !`)
  }

  async set (alias, command) {
    this.aliases[alias] = command
    await this.updateJSON()
    console.log(`l'alias ${alias} -> ${command} à été créé`)
  }

  async del (alias) {
    delete this.aliases[alias]
    await this.updateJSON()
    console.log(`l'alias ${alias} à été supprimé`)
  }

  get (command) {
    return this.aliases[command] || command
  }
}

module.exports = AliasesManager
