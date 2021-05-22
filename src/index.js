const { EventEmitter } = require('events')
const Youtube = require('youtube-sr').default
const ytdl = require('ytdl-core-discord')
const move = require('./util/move.js')

class MusicPlayer extends EventEmitter {
  constructor() {
    super()
    this.queue = new Map()
  }

  /**
     * Add music to queue
     * @param {import('discord.js').Message} message 
     * @param {string} query 
     */
  async add(message, query) {
    if (!message?.member?.voice?.channel)   throw new Error('First, you should join to voice channel')
    if (!this.queue.has(message.guild.id))   this._initGuildQueue(message)
        
    const result = await Youtube.searchOne(query, 'video')
    let queue = this.queue.get(message.guild.id)
    let item = {
      title: result.title,
      url: result.url,
      thumbnail_img: result.thumbnail.displayThumbnailURL(),
      length: result.durationFormatted
    }

    queue.musics.push(item)

    this.emit('add', queue.textChannel, item)
  }

  /**
     * Play queue
     * @param {import('discord.js').Message} message 
     */
  async play(message) {
    if (!message?.member?.voice?.channel)   throw new Error('First, you should join to voice channel')
    if (!this.queue.has(message.guild.id))   throw new Error('Music not found')
    if (this.queue.get(message.guild.id).musics.length <= 0)    throw new Error('Music not found')

    let queue = this.queue.get(message.guild.id)
    let connection = await message.member.voice.channel.join()
    let stream = await ytdl(queue.musics[0].url)
    let dispatcher = connection.play(stream, {volume: queue.volume / 100, type: 'opus'})

    queue.voiceChannel = message.member.voice.channel
    queue.textChannel = message.channel
        
    dispatcher.on('start', () => this.emit('play', queue.textChannel, queue.musics[0]))

    dispatcher.on('finish', () => {
      this.emit('end', queue.textChannel)
      if (queue.loop == true)
        queue.musics = move(queue.musics, 0, -1)
      else
        queue.musics.shift()
      if (!queue.musics[0])
        this._destroyGuildQueue(message.guild.id)
      
      this.play(message)
    })
  }

  /**
     * Set volume
     * @param {import('discord.js').Message} message 
     */
  async volume(message, target_volume) {
    if (!message?.member?.voice?.channel)   throw new Error('First, you should join to voice channel')
    if (!this.queue.has(message.guild.id))   this._initGuildQueue(message)

    let queue = this.queue.get(message.guild.id)
    queue.volume = target_volume

    this.emit('volumeChanged', queue.textChannel, queue.volume)
  }

  _initGuildQueue(message) {
    this.queue.set(message.guild.id, {
      voiceChannel: message.member.voice.channel,
      textChannel: message.channel,
      musics: [],
      loop: false,
      volume: 50,
    })
  }

  _destroyGuildQueue(id) {
    this.emit('finish', this.queue.get(id).textChannel)
    this.queue.delete(id)
  }
}

module.exports = MusicPlayer