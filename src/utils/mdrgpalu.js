const reactString = ['🇲', '🇩', '🇷', '🙊', '🇬', '🙈', '🇵', '🇦', '🙉', '🇱', '🇺', '😂', '👌']

module.exports = async function (msg) {
  try {
    for (let i = 0; i < reactString.length; ++i) {
      await msg.react(reactString[i])
    }
  } catch (e) {
    console.error(e)
  }
}
