module.exports = async function (msg, options, arglist) {
  msg.channel.send(await msg.client.generateInvite())
}
