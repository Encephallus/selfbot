const request = require('request-promise-native')
const cheerio = require('cheerio')

module.exports = async function (msg, options, arglist) {
  options.taille = options.taille || options.t
  console.log(options.taille)
  let requestOptions = {
    url: 'http://xmugen.chez.com',
    method: 'POST',
    form: {
      taille: options.taille || (options.e ? Math.floor(Math.random() * (35 - 10) + 10) : Math.floor(Math.random() * 4 + 1))
    },
    transform: cheerio.load
  }

  try {
    let $ = await request(requestOptions)
    let text = $('.bulle').text()
    let submitValue = $('input[type=submit]').attr('value')

    if (options.embed || options.e) {
      options.channelToSend.send('', {embed: require('./xmu_embed')(submitValue, text)})
      return
    }
    options.channelToSend.send(Math.random() < 0.05 && !options.taille ? submitValue : text)
  } catch (e) {
    console.error(e)
  }
}
