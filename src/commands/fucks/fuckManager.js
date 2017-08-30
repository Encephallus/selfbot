const JsonManager = require('../../utils/JsonManager')

class FuckManager extends JsonManager {
  constructor (jsonPath, encodage) {
    super(jsonPath, encodage, 'fucks')
  }

  async loadJSON () {
    await super.loadJSON()
    console.log(`Fucks links imported from ${this.path} !`)
  }

  rand () {
    try {
      if (!this.isDataLoaded) {
        console.log('links missing')
        return
      }
      return this.fucks.links[Math.floor(Math.random() * this.fucks.links.length)]
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = FuckManager
