const Discord = require('discord.js')

module.exports = function whoami (msg, options, ...arglist) {
  let embed = new Discord.RichEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL, 'https://github.com/Encephallus/selftbot')
    .setColor('#abc222')
    .setTitle('You are:')
    .setDescription('What you are')
    .setURL('https://www.google.fr/#q=' + msg.author.username)
    .addField('Username', msg.author.username, true)
    .addField('Discriminator', '#' + msg.author.discriminator, true)
    .addField('Id', msg.author.id, true)
    .setTimestamp()
  try {
    msg.channel.send('', {embed: embed})
  } catch (e) {
    console.log(e)
  }
}