const Tesseract = require('tesseract.js')
const request = require('request-promise-native')

module.exports = async function (msg, options, arglist) {
  console.log('test debut')

  try {
    let url = msg.attachments.first().url
    let img = Buffer.from(await request({url: url, encoding: null}))
    let data = await Tesseract.recognize(img)

    console.log(data.text)
    options.channelToSend.send(data.text)
  } catch (e) {
    console.log(e)
  }
}
