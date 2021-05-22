const Music = require('./src/index')
const Discord = require('discord.js')
const client = new Discord.Client()

const music = new Music()

client.on('message', async mesasge => {
  if (mesasge.content == '!play')  return music.play(mesasge)
  return music.add(mesasge, mesasge.content)
})

music.on('add', (textChannel, info) => {
  console.log(info)
})

music.on('play', info => {
  console.log(info)
})



client.login('ODA2Nzk3NDgwODA4Njc3Mzg2.YBuqtA.n1DKPpEjLUb5PWYCfjvqKtFZjO4')

