function lstchan (msg, options, ...arglist) {
  console.log(options, arglist)

  let rep = msg.guild.channels.filter(channel => {
    if ((options.h || options.hidden) && (channel.members.get(msg.author.id) !== undefined || channel.type !== 'text')) {
      return false
    }/*
    for (let i in options) {
      if ((channel.hasOwnProperty(i) && channel[i] !== options[i])) {
        return false
      }
    }*/
    return true
  }).map(channel => `-${channel.name}`).join('\n')
  rep = 'list channels:\n' + rep
  msg.channel.send(rep)
}

module.exports = lstchan
