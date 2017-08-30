const boostix = require('./boostix')

module.exports = function (msg, options, arglist) {
  try {
    msg.delete()
    if (options.stop || arglist.map(x => x.toLowerCase()).filter(x => x === 'stop').length >= 1) {
      boostix.boostOff(msg.guild, options)
    } else {
      boostix.boostOn(msg.client.user, msg.channel, options)
    }
  } catch (e) {
    console.error(e)
  }
}
