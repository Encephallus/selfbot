module.exports = function (msg, options, arglist) {
  options.r || options.remove ? msg.delete() : 0
  options.channelToSend = options.mp || options.pm ? msg.author.dmChannel : msg.channel
}
