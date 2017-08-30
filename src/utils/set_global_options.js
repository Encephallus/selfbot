module.exports = async function (msg, options, arglist) {
  options.r || options.remove ? msg.delete() : 0
  if (options.mp === true || options.pm === true) {
    options.channelToSend = msg.author.dmChannel || await msg.author.createDM()
  } else if (options.mp || options.pm) {
    options.channelToSend = msg.mentions.users.last().dmChannel || await msg.mentions.users.last().createDM()
  } else {
    options.channelToSend = msg.channel
  }
}
