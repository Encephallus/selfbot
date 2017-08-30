module.exports = function (msg, options, arglist) {
  let str = 'texte visible \0 text invisible'

  str.length = 14
  console.log(str)
  msg.channel.send(str)
}
