const fucksManager = new (require('./fuckManager.js'))('./jsonfiles/fucks.json', 'UTF-8')

module.exports = async function (msg, options, arglist) {
  try {
    if (!fucksManager.isDataLoaded) {
      await fucksManager.loadJSON()
    }

    let target = msg.mentions.users.first()
    if (!msg.channel.nsfw || !target) {
      return
    }

    let launcher = msg.author
    if (msg.mentions.users.first().id === msg.client.user.id) {
      let tmp = target
      target = launcher
      launcher = tmp
    }
    let str = launcher.username + ' fucks you ' + target.username + '\n' + fucksManager.rand()
    msg.channel.send(str)
  } catch (e) {
    console.error(e)
  }
}
