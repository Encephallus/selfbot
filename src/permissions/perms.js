const fs = require('fs')

function check (user, command) {
  return user.id === user.client.user.id
}

exports.check = check
