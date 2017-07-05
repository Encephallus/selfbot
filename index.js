const Discord = require('discord.js')
const client = new Discord.Client()
const perms = require('./src/permissions/perms')
const decache = process.argv[2] === 'dev' ? require('decache') : undefined

client.on('ready', () => {
  console.log(`Logged in as:\t\t${client.user.tag}! \nId:\t\t\t${client.user.id}\nCurrent Timestamp:\t${Date.now()}`)
})

client.on('message', (msg) => {
  if (msg.content.slice(0, 2) === '$>') {
    /*
    **vivement la prochaine version
    **let {_: [command, ...arglist], ...options} = require('minimist-string')(msg.content.slice(2))
    */

    let options = require('minimist-string')(msg.content.slice(2))
    let {_: [command, ...arglist]} = options
    delete options._

    if (perms.check(client, msg.author, command)) {
      try {
        require('./src/commands/' + command)(msg, options, ...arglist)
      } catch (e) {
        console.log(e)
      } finally {
        process.argv[2] === 'dev' ? decache('./src/commands/' + command) : 0
      }
    }
  }
})

client.login(require('./token.js'))
