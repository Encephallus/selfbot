const Discord = require('discord.js')

module.exports = function whereami (msg, options, ...arglist) {
  let embed = new Discord.RichEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL, 'https://www.google.fr/#q=' + msg.author.username)
    .setColor('#abc222')

  switch (msg.channel.type) {
    case 'dm':
      embed.setTitle('DMchannel with ' + msg.channel.recipient.tag)
        .setThumbnail(msg.channel.recipient.displayAvatarURL)
        .addField('Info sur ' + msg.channel.recipient.username + ':', '\u200B')
        .addField('id:', msg.channel.recipient.id, true)
        .addField('discriminator:', msg.channel.recipient.discriminator, true)
        .addBlankField()
      break
    case 'group':
      embed.setTitle(msg.channel.name ? msg.channel.name + 'Group Channel' : 'GroupDMchannel')
        .addField('Users:', msg.channel.recipients.map(x => x.tag).join('\n'), true)
        .addField('IDs:', msg.channel.recipients.map(x => x.id).join('\n'), true)
      break
    case 'text':
      embed.setTitle(msg.channel.guild.name)
        .setThumbnail(msg.channel.guild.iconURL)
        .addField('Name:', msg.channel.name, true)
        .setDescription(msg.channel.topic || '', true)
        .addField('Id:', msg.channel.id, true)
        .addField('Nsfw', msg.channel.nsfw ? 'true' : 'false')
      break
  }
  embed.addField('Channel id:', msg.channel.id)
    .setTimestamp(msg.channel.createdAt)
  try {
    msg.channel.send('', {embed: embed})
  } catch (e) {
    console.log(e)
  }
}
