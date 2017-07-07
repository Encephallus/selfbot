const Discord = require('discord.js')

module.exports = function (submit, text) {
  return new Discord.RichEmbed()
    .setTitle(submit)
    .setDescription(text)
    .setAuthor('xMusiic', 'http://i.imgur.com/8kfvHGR.jpg', 'http://xmugen.chez.com')
    .setColor('PURPLE')
    .setThumbnail('http://i.imgur.com/8kfvHGR.jpg')
    .setFooter('Tiré du site http://xmugen.chez.com')
    .setTimestamp()
}
