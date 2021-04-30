const Music = require('./src/index').default;
const Discord = require('discord.js');
require("dotenv").config()
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



client.login(process.env.TOKEN)
