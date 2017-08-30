const Discord = require('discord.js')
const client = new Discord.Client({disableEvents: ['TYPING_START']})
const decache = process.argv[2] === 'dev' ? require('decache') : undefined
// const reactManager = require('./src/reactManager')

const perms = new (require('./src/permissions'))('./jsonfiles/perms.json', 'UTF-8')
const aliases = new (require('./src/aliases'))('./jsonfiles/aliases.json', 'UTF-8')

client.on('ready', () => {
  console.log(`Logged in as:\t\t${client.user.tag}! \nId:\t\t\t${client.user.id}\nCurrent Timestamp:\t${Date.now()}`)
})

client.on('message', async (msg) => {
  // reactManager.manage(msg)
  if (msg.content.slice(0, 2) === ';;' && !msg.author.bot) {
    /**
    **vivement la prochaine version
    **let {_: [command, ...arglist], ...options} = require('minimist-string')(msg.content.slice(2))
    */
    let request = msg.content.slice(2).split(' ')
    request.unshift(aliases.get(request.shift()))

    let options = require('minimist-string')(request.join(' '))
    let {_: [command, ...arglist]} = options
    delete options._
    console.log(command, arglist)
    if (perms.check(msg, command)) {
      try {
        await require('./src/utils/set_global_options')(msg, options, arglist)
        require('./src/commands/' + command)(msg, options, arglist)
      } catch (e) {
        console.log(e)
      } finally {
        process.argv[2] === 'dev' ? decache('./src/commands/' + command) : 0
      }
    }
  }
 // /*
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
// */
})

client.on('mentionned', (msg) => {
  console.log(`Mentionned channel:\t\t${msg.channel.name}! \nguild:\t\t\t${msg.guild.name}\n\nby:\t${msg.author.username}`)
})

client.login(require('./token.js'))
