function lstchan (msg, options, ...arglist) {
  let rep = msg.guild.channels.filter(channel => {
    if ((options.h || options.hidden) && channel.members.get(msg.author.id) !== undefined) {
      delete options.h
      delete options.hidden
      return false
    }
    for (let i in options) {
      if ((channel.hasOwnProperty(i) && channel[i] !== options[i]) || (!channel.hasOwnProperty(i) && options[i] === true)) {
        return false
      }
    }
    return true
  }).map(channel => `-${channel.name}`).join('\n')
  rep = 'list channels:\n' + rep
  msg.channel.send(rep)
}

module.exports = lstchan
