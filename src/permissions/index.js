const JsonManager = require('../utils/JsonManager')

class PermsManager extends JsonManager {
  constructor (jsonPath, encodage) {
    super(jsonPath, encodage, 'perms')
    this.loadJSON()
  }

  async loadJSON () {
    await super.loadJSON()
    console.log(`Perms imported from ${this.path} !`)
  }

  check (msg, command) {
    if (this.perms.dev === msg.author.id) {
      return true
    }
    if (this.perms.overrigth[msg.author.id] && this.perms.overrigth[msg.author.id][command]) {
      return true
    }
    if (!this.perms.commands[command]) {
      return false
    }

    return this.perms.commands[command].reduce((acc, perm) => {
      return acc && msg.member.hasPermission(perm, false, true, true)
    }, true)
  }
}

module.exports = PermsManager
