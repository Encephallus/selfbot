const getEmbedUserInfo = require('../../utils/get_embed_user_info')

module.exports = function (msg, options, arglist) {
  let user = msg.author
  let member = msg.member ? msg.members : false

  let embed = getEmbedUserInfo(user, member)
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL, 'https://www.google.fr/#q=' + msg.author.username)

  try {
    options.channelToSend.send('', {embed: embed})
  } catch (e) {
    console.log(e)
  }
}
