const Discord = require('discord.js')

module.exports = function getEmbedUserInfo (user, member) {
  let embed = new Discord.RichEmbed()
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
    .setFooter('By ' + user.client.user.tag, user.client.user.displayAvatarURL)
    .setTimestamp()
  return embed
}
