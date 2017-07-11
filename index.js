const Discord = require('discord.js')
const client = new Discord.Client({disableEvents: ['TYPING_START']})
const perms = require('./src/permissions/perms')
const decache = process.argv[2] === 'dev' ? require('decache') : undefined

const aliases = new (require('./src/aliases'))('./aliases.json', 'UTF-8')

client.on('ready', () => {
  console.log(`Logged in as:\t\t${client.user.tag}! \nId:\t\t\t${client.user.id}\nCurrent Timestamp:\t${Date.now()}`)
})

client.on('message', (msg) => {
  if (msg.content.slice(0, 2) === '$>') {
    /**
    **vivement la prochaine version
    **let {_: [command, ...arglist], ...options} = require('minimist-string')(msg.content.slice(2))
    */
    let options = require('minimist-string')(msg.content.slice(2))
    let {_: [command, ...arglist]} = options
    command = aliases.get(command)
    delete options._
    console.log(arglist)
    if (perms.check(msg.author, command)) {
      try {
        require('./src/utils/set_global_options')(msg, options, arglist)
        require('./src/commands/' + command)(msg, options, arglist)
      } catch (e) {
        console.log(e)
      } finally {
        process.argv[2] === 'dev' ? decache('./src/commands/' + command) : 0
      }
    }
  }
/*
  else if (msg.content.length > 800 && !msg.author.bot) {
    try {
      try {
        console.log(`pavay cesar at ${msg.channel.guild.name} in channel ${msg.channel.name}`)
      } catch (e) {
        console.log(`pavay cesar at ${msg.channel.name}`)
      }
      require('./src/utils/mdrgpalu')(msg)
    } catch (e) {
      console.error(e)
    }
  }
*/
})

client.login(require('./token.js'))
