const Music = require('./src/index').default;
const Discord = require('discord.js');

const client = new Discord.Client();

const music = new Music();

client.on('message', async mesasge => {
    mesasge.awaitReactions().then(c =>{ 
    })
});

music.on('add', info => {
    console.log(info);
});

music.on('play', info => {
    console.log(info);
});



client.login('ODA2Nzk3NDgwODA4Njc3Mzg2.YBuqtA.T5nukgsXjCVIiNzj_cCahAeU7d8')