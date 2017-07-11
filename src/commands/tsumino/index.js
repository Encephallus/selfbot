const Tsumino = require('./tsumino')
// const Discord = require('discord.js')

module.exports = async function (msg, options, arglist) {
  console.log('tsumino request')
  console.log(arglist)
  if (!options.channelToSend.nsfw && options.channelToSend.guild) {
    options.channelToSend.send('Dégage gamin, c\'est pas de ton âge')
    return
  }
  try {
    let tsmn = new Tsumino(options, arglist)
    options.channelToSend.send(...await tsmn.getResult())
  } catch (e) {
    console.error(e)
  }
}
