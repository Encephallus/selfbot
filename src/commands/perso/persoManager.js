const JsonManager = require('../../utils/JsonManager')
const aliases = new (require('../../aliases'))()

class PersoManager extends JsonManager {
  constructor (jsonPath, encodage) {
    super(jsonPath, encodage, 'perso')
    this.dev = {}
    this.dev.commands = {
      del: true,
      add: true
    }
  }

  async loadJSON () {
    await super.loadJSON()
    console.log(`Perso Commands imported from ${this.path} !`)
    console.log(this.perso)
  }

  async launchCommand (command, msg, options, arglist) {
    if (this.hasCommand(command)) {
      if (arglist[0] === 'set') {
        return await this.set(command, msg, arglist.slice(1).join(' '))
      } else {
        return await (async () => msg.channel.send(this.get(command)))()
      }
    }

    if (this.dev.commands[command] && this.isDev(msg.author)) {
      return await this[command](msg, options, arglist)
    }
  }

  isDev (author) {
    return author.id === this.perso.dev
  }

  hasCommand (name) {
    if (this.perso.commands[name]) {
      return true
    }
  }

  async add (msg, options, arglist) {
    let text = 'texte par défaut lol'
    let userid = msg.mentions.users.first().id
    let command = arglist[0]

    this.perso.commands[command] = {text, userid}
    await this.updateJSON()
    await aliases.set(command, 'perso ' + command)
    await msg.channel.send(`La commande ${arglist[0]} a été ajouté !`)
  }

  async del (msg, options, arglist) {
    delete this.perso.commands[arglist[0]]

    await this.updateJSON()
    await aliases.del(arglist[0])
    await msg.channel.send(`La commande ${arglist[0]} a été supprimée !`)
  }

  async set (command, msg, text) {
    if (this.perso.commands[command].userid === msg.author.id || this.isDev(msg.author)) {
      this.perso.commands[command].text = text
      await this.updateJSON()
      await msg.channel.send(`La commande ${command} a été modifiée !`)
    } else {
      await msg.channel.send(`${msg.author.username} est un fils de pute`)
    }
  }

  get (name) {
    return this.perso.commands[name].text
  }
}

module.exports = PersoManager
