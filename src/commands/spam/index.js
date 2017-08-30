module.exports = async function (msg, options, arglist) {
  try {
    let c = parseInt(arglist.pop())
    for (let i = c; i > 0; --i) {
      await options.channelToSend.send(arglist.join(' '))
    }
  } catch (e) {
    console.error(e)
  }
}
