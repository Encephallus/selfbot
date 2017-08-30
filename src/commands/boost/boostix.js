const defaultOptions = {
  here: true,
  message: '.',
  time: 1000 * 60
}

class Server {
  constructor (author, server, options) {
    options.message = options.message || options.m || defaultOptions.message
    options.time = parseInt(options.time || options.t || '0') * 1000 || defaultOptions.time

    if (options.random || options.r) {
      options.here = false
    }

    this.author = author
    this.server = server
    this.options = Object.assign({}, defaultOptions, options)
    console.log(this.options)
  }

  async boost () {
    (await this.channelToSend().send(this.options.message)).delete()
  }

  channelToSend () {
    if (this.options.here) {
      return this.options.channelToSend
    }
    return (this.server.channels.filter(channel => {
      return channel.type === 'text' && channel.permissionsFor(this.author).has('SEND_MESSAGES', true)
    }).random())
  }
}

class Boostix {
  constructor () {
    this.servers = {}
  }

  boostOn (author, channel, options) {
    try {
      options.channel = channel

      let server = new Server(author, channel.guild, options)
      server.interval = setInterval(x => server.boost(), server.options.time)

      if (this.servers[channel.guild.id]) {
        clearInterval(this.servers[channel.guild.id].interval)
        delete this.servers[channel.guild.id]
      }

      this.servers[channel.guild.id] = server
    } catch (e) {
      console.error(e)
    }
  }

  boostOff (server, options) {
    console.log(this.servers)
    let servers = options.all ? this.servers : {}
    for (let guild in servers) {
      clearInterval(guild.interval)
    }
    this.servers[server.id] ? clearInterval(this.servers[server.id].interval) : 0
  }
}

module.exports = new Boostix()
