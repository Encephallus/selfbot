const Discord = require('discord.js')

module.exports = function whoami (msg, options, ...arglist) {
  let user = msg.mentions.users.last()
  let member = msg.mentions.members ? msg.mentions.members.last() : false

  let embed = new Discord.RichEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL, 'https://www.google.fr/#q=' + msg.author.username)
    .setColor('#abc222')
    .setTitle(user.tag)
    .addField('Username:', user.username, true)
    .addField('Discriminator:', '#' + user.discriminator, true)
    .addField('User id:', user.id, true)
    .addField('Created at:', user.createdAt)

  if (member) {
    embed.setColor(member.displayHexColor)
      .addBlankField()
      .addField('Member Guild Info:', '\u200B')
      .addField('Nickname:', member.nickname || user.username, true)
      .addField('Role:', member.highestRole, true)
      .addField('Status:', member.presence.status, true)
      .addField('Game:', member.presence.game ? member.presence.game.name : 'no game', true)
      .addField('Joined at:', member.joinedAt, true)
  }
  embed.setThumbnail(user.displayAvatarURL)
    .setFooter('By ' + msg.client.user.tag, msg.client.user.displayAvatarURL)
    .setTimestamp()
  try {
    msg.channel.send('', {embed: embed})
  } catch (e) {
    console.log(e)
  }
}
