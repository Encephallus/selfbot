/*
module.exports = function debanall (msg) {
  msg.channel.guild.fetchBans()
  .then(members => members.map(member => {
    msg.channel.guild.unban(member)
    msg.channel.guild.addMember(member)
    member.send('désolé, petit problème technique')
  }))
  .catch(err => console.error(err))
}
*/
