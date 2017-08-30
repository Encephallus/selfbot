const Discord = require('discord.js')

function getEmbedMsgInfo (msg, user, member) {
  let embed = new Discord.RichEmbed()
    .setColor('#abc222')
    .setTitle('Message:')
    .setDescription(msg.cleanContent)
    .addField('author:', user.tag, true)
  if (member) {
    embed.addField('Nickname:', member.nickname || user.username, true)
  }
  embed.setThumbnail(user.displayAvatarURL)
    .addField('Channel:', msg.channel.name)
    .addField('Date:', msg.createdAt)
    .setFooter('By ' + user.client.user.tag, user.client.user.displayAvatarURL)
    .setTimestamp()
  return embed
}

class DeleteLogger {
  constructor (msg) {
    this.servers = {}
    msg.client.on('messageDelete', msg => this.process(msg))
  }

  start (msg) {
    this.servers[msg.guild.id] = {}
    this.servers[msg.guild.id].channel = msg.channel
  }

  stop (msg) {
    delete this.servers[msg.guild.id]
  }

  process (msg) {
    if (this.servers[msg.guild.id] && !msg.system) {
      this.servers[msg.guild.id].channel.send('', {embed: getEmbedMsgInfo(msg, msg.author, msg.member)})
    }
  }
}

module.exports = DeleteLogger
