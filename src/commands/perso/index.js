const persoManager = new (require('./persoManager.js'))('./jsonfiles/perso.json', 'UTF-8')

module.exports = async function (msg, options, arglist) {
  try {
    if (!persoManager.isDataLoaded) {
      await persoManager.loadJSON()
    }
    if (msg.author.bot) {
      return
    }
    let command = arglist.shift()
    await persoManager.launchCommand(command, msg, options, arglist)
  } catch (e) {
    console.error(e)
  }
}
