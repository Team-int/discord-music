const Music = require('./src/index')
const Discord = require('discord.js')
const client = new Discord.Client()

const music = new Music('!')

client.on('message', async message => {
  if (message.content.startsWith('!add')) return music.add(message)
  if (message.content == '!play')  return music.play(message)
})

music.on('add', (textChannel, info) => {
  console.log(info)
})



client.login('ODA2Nzk3NDgwODA4Njc3Mzg2.YBuqtA.SIjXhhoUuoaLX_r3yvvMBCK9fng')

