import * as youtubeSr from 'youtube-sr';
import * as Discord from 'discord.js';
import ytdl from 'ytdl-core-discord';
import { EventEmitter } from 'events';

export default class {
    constructor() {
        const event = new EventEmitter();
        this.on = event.on;
        this.emit = event.emit;
        this.queue = new Map();
    }

    /**
     * Play music
     * @param {String} query 
     * @param {Discord.Message} message 
     */
    async play(query, message) {
        let srResult = await youtubeSr.default.searchOne(query, "video", true);


        if (!this.queue.has(message.guild.id))
            this.initGuildQueue(message);
        
        /**
         * @type {import('../typings/index').guildQueue}
         */
        let guildQueue = this.queue.get(message.guild.id);
        guildQueue.onListen = true;
        
        guildQueue.queue.push({
            video: {
                url: srResult.url,
                thumbnail: srResult.thumbnail,
            },
            user: {
                tag: message.author.tag,
            }
        });

        this.emit('add', guildQueue.queue[0]);
        this.playMusic(guildQueue);
    }

    /**
     * @param {import('../typings/index').guildQueue} guildQueue 
     */
    async playMusic(guildQueue) {
        if (guildQueue.queue.length == 1) {
            const stream = await ytdl(guildQueue.queue[0].video.url);

            guildQueue.dispatcher =
            guildQueue
            .connection
            .play(stream, {type: "opus"});

            this.emit('play', guildQueue.queue[0]);

            guildQueue.dispatcher.on('finish', () => {
                if (!guildQueue.loop)
                    guildQueue.queue.shift();
                if (guildQueue.queue.length <= 0)
                    this.emit('finish', guildQueue.m_channel);
                
                this.emit('end');
                this.playMusic(guildQueue);
            });
        } else {
            guildQueue.dispatcher.on('finish', async () => {
                if (!guildQueue.loop)
                    guildQueue.queue.shift();
                if (guildQueue.queue.length <= 0)
                    this.emit('finish', guildQueue.m_channel);
                
                const stream = await ytdl(guildQueue.queue[0].video.url);
                guildQueue.dispatcher =
                guildQueue
                .connection
                .play(stream, {type: "opus"});

                this.emit('play', guildQueue.queue[0]);
                this.emit('end');
                this.playMusic(guildQueue);
            });
        }
    }

    /**
     * @param {Discord.Message} message 
     */
    async initGuildQueue(message) {
        let guildQueue = this.queue.set(message.guild.id);
        guildQueue = guildQueue.get(message.guild.id);
        guildQueue.loop = false;
        guildQueue.queue = [];
        guildQueue.volume = 50;
        guildQueue.onListen = false;
        guildQueue.m_channel = message.channel;
        guildQueue.v_channel = message.member.voice.channel;
        guildQueue.connection = await message.member.voice.channel.join();
    }
}