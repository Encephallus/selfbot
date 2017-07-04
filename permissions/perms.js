const fs = require('fs')

function check (client, user, command) {
  return user.id === client.user.id
}

exports.check = check
