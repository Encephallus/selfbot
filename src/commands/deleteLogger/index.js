const DeleteLogger = require('./delete_logger.js')

module.exports = function (msg, options, arglist) {
  if (!this.deleteLogger) {
    console.log('create Logger')
    this.deleteLogger = new DeleteLogger(msg)
  }

  let deleteLogger = this.deleteLogger

  if (arglist[0] === 'stop' || options.stop) {
    deleteLogger.stop(msg)
    msg.channel.send('On arrête le log sur ce serveur')
  } else {
    console.log(`start log on the server ${msg.guild.name}`)
    deleteLogger.start(msg)
    msg.channel.send('On va voir quel est le fdp qui delete maintenant')
  }
}
