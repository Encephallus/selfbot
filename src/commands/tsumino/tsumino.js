const cheerio = require('cheerio')
const Discord = require('discord.js')
const request = require('request-promise-native')

const defaultOptions = {
  url: 'http://www.tsumino.com/Browse/Random',
  resolveWithFullResponse: true
}

const defaultSearchOptions = {
  url: 'http://www.tsumino.com/Books/Operate',
  method: 'POST',
  resolveWithFullResponse: true,
  form: {
    PageNumber: 1,
    Text: '',
    Sort: 'Random',
    List: 0,
    Length: 0,
    MinimumRating: 0
  },
  transform: JSON.parse
}

const tags = {
  tag: 1,
  category: 2,
  collection: 3,
  group: 4,
  artist: 5,
  parody: 6,
  character: 7,
  uploader: 8
}

function capitalize (str, ...separators) {
  for (let i = 0; i < separators.length; i++) {
    str = str.split(separators[i]).map(x => x[0].toUpperCase() + x.slice(1)).join(separators[i])
  }
  return str
}

class Tsumino {
  constructor (options, arglist) {
    if (options.h || options.help) {
      this.help = true
      return
    }
    if (options.random || !this.checkOptions(options, arglist)) {
      console.log(this.options = defaultOptions)
    } else {
      console.log(this.searchOptions = this.parseOptions(options, arglist))
    }
  }

  async getResult () {
    if (this.help) {
      return ['usage']
    } else if (this.error) {
      return ['No result sorry T_T']
    }
    this.options = this.options || await this.search()
    return this.infoBook(await request(this.options))
  }

  async search () {
    let info = await request(this.searchOptions)
    if (!info.Data[0]) {
      this.error = true
      return
    }
    return {
      url: 'http://www.tsumino.com/Book/Info/' + info.Data[0].Entry.Id,
      resolveWithFullResponse: true
    }
  }

  infoBook (response) {
    let $ = cheerio.load(response.body)
    console.log($('meta[name=description]').attr('content'))
    let embed = new Discord.RichEmbed()
      .setColor('#abc222')
      .setURL(response.request.href)
      .setTitle($('meta[name=description]').attr('content').slice(0, 256))
      .setImage($('meta[name="twitter:image"]').attr('content'))
      .setDescription($('meta[name="twitter:description"]').attr('content'))

    return [response.request.href, {embed: embed}]
  }

  checkOptions (options, arglist) {
    let s = options.s || options.S || options.sort || options.Sort
    s = options.p || options.P || options.Page || options.page || s
    s = options.Length || options.length || options.L || options.l || s
    s = options.minrat || options.MinRat || s
    for (let i in tags) {
      s = s || options[i]
    }
    return s || arglist.length
  }

  parseOptions (options, arglist) {
    let ret = defaultSearchOptions

    ret.form.Text = arglist.join(' ')
    ret.form.Sort = capitalize(options.s || options.S || options.sort || options.Sort || ret.form.Sort, ' ')
    ret.form.PageNumber = options.p || options.P || options.Page || options.page || ret.form.PageNumber
    ret.form.Length = options.Length || options.length || options.L || options.l || ret.form.Length
    ret.form.MinimumRating = options.minrat || options.MinRat || ret.form.MinimumRating

    ret.form.Tags = []

    for (let tag in tags) {
      if (options.hasOwnProperty(tag)) {
        ret.form.Tags.push(...capitalize(options[tag], ' ', '-', '_').split(' ').map(x => {
          return {
            Type: tags[tag],
            Text: (x[0] === '-' ? x.slice(1) : x).replace('_', ' '),
            Exclude: x[0] === '-'
          }
        }))
      }
    }
    return ret
  }
}

module.exports = Tsumino
