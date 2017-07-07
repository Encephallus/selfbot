const Discord = require('discord.js')

module.exports = function (msg, options, ...arglist) {
  let embed = new Discord.RichEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL, 'https://www.google.fr/#q=' + msg.author.username)
    .setColor('#abc222')

  switch (msg.channel.type) {
    case 'dm':
      embed.setTitle('DMchannel with ' + msg.channel.recipient.tag)
        .addField('Info sur ' + msg.channel.recipient.username + ':', '\u200B')
        .addField('id:', msg.channel.recipient.id, true)
        .addField('discriminator:', msg.channel.recipient.discriminator, true)
        .addBlankField()
        .setThumbnail(msg.channel.recipient.displayAvatarURL)
      break
    case 'group':
      embed.setTitle(msg.channel.name ? msg.channel.name + ' Group Channel' : 'GroupDMchannel')
        .addField('Users:', msg.channel.recipients.map(x => x.tag).join('\n'), true)
        .addField('IDs:', msg.channel.recipients.map(x => x.id).join('\n'), true)
        .setThumbnail(`https://cdn.discordapp.com/channel-icons/${msg.channel.id}/${msg.channel.icon}.png`)
      break
    case 'text':
      embed.setTitle(msg.channel.guild.name)
        .addField('Name:', msg.channel.name, true)
        .setDescription(msg.channel.topic || '', true)
        .addField('Id:', msg.channel.id, true)
        .addField('Nsfw:', msg.channel.nsfw ? 'true' : 'false', true)
        .setThumbnail(msg.channel.guild.iconURL)
      break
  }
  embed.addField('Channel id:', msg.channel.id, true)
    .addField('Created At:', msg.channel.createdAt)
    .setFooter('By ' + msg.client.user.tag, msg.client.user.displayAvatarURL)
    .setTimestamp()
  try {
    msg.channel.send('', {embed: embed})
  } catch (e) {
    console.log(e)
  }
}
