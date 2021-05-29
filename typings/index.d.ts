import * as Discord from 'discord.js';

declare module 'music-discord' {
    export interface Music {
        title: string;
        url: string;
        thumbnail_img: string;
        length: string;
    }

    class MusicPlayer {
        constructor(prefix: string): void;

        async add(message: Discord.Message): void;
        async play(message: Discord.Message): void;
        async loop(message: Discord.Message): void;
        async volume(message: Discord.Message): void;

        on(event: string | symbol, listener: (...args: any[]) => void): void;
        on(prefix: 'added', listener: (channel: Discord.TextChannel, music: Music) => void): void;
        on(prefix: 'added', listener: (channel: Discord.TextChannel, music: Music) => any): void;
        on(prefix: 'added', listener: (channel: Discord.TextChannel, music: Music) => Promise<void>): void;
        on(prefix: 'added', listener: (channel: Discord.TextChannel, music: Music) => Promise<any>): void;
        on(prefix: 'play', listener: (channel: Discord.TextChannel, music: Music) => void): void;
        on(prefix: 'play', listener: (channel: Discord.TextChannel, music: Music) => any): void;
        on(prefix: 'play', listener: (channel: Discord.TextChannel, music: Music) => Promise<void>): void;
        on(prefix: 'play', listener: (channel: Discord.TextChannel, music: Music) => Promise<any>): void;
        on(prefix: 'end', listener: (channel: Discord.TextChannel) => void): void;
        on(prefix: 'end', listener: (channel: Discord.TextChannel) => any): void;
        on(prefix: 'end', listener: (channel: Discord.TextChannel) => Promise<void>): void;
        on(prefix: 'end', listener: (channel: Discord.TextChannel) => Promise<any>): void;
        on(prefix: 'volumeChanged', listener: (channel: Discord.TextChannel, volume: number) => void): void;
        on(prefix: 'volumeChanged', listener: (channel: Discord.TextChannel, volume: number) => any): void;
        on(prefix: 'volumeChanged', listener: (channel: Discord.TextChannel, volume: number) => Promise<void>): void;
        on(prefix: 'volumeChanged', listener: (channel: Discord.TextChannel, volume: number) => Promise<any>): void;
        on(prefix: 'finish', listener: (channel: Discord.TextChannel) => void): void;
        on(prefix: 'finish', listener: (channel: Discord.TextChannel) => any): void;
        on(prefix: 'finish', listener: (channel: Discord.TextChannel) => Promise<void>): void;
        on(prefix: 'finish', listener: (channel: Discord.TextChannel) => Promise<any>): void;
        on(prefix: 'loopEnabled', listener: (channel: Discord.TextChannel) => void): void;
        on(prefix: 'loopEnabled', listener: (channel: Discord.TextChannel) => any): void;
        on(prefix: 'loopEnabled', listener: (channel: Discord.TextChannel) => Promise<void>): void;
        on(prefix: 'loopEnabled', listener: (channel: Discord.TextChannel) => Promise<any>): void;
        on(prefix: 'loopDisabled', listener: (channel: Discord.TextChannel) => void): void;
        on(prefix: 'loopDisabled', listener: (channel: Discord.TextChannel) => any): void;
        on(prefix: 'loopDisabled', listener: (channel: Discord.TextChannel) => Promise<void>): void;
        on(prefix: 'loopDisabled', listener: (channel: Discord.TextChannel) => Promise<any>): void;
    }
    export = MusicPlayer
}

export interface queue {
    video: {
        url: string,
        thumbnail: string,
    },
    user: {
        tag: string,
    }
}

export interface guildQueue {
    onListen: boolean;
    loop: boolean;
    queue: Array<queue>;
    volume: number;
    m_channel: Discord.TextChannel;
    v_channel: Discord.VoiceChannel;
    connection: Discord.VoiceConnection;
    dispatcher?: Discord.StreamDispatcher;
}

export class Music {
    constructor(): void;

    public play(query: String, message: Discord.Message): Promise<void>;
    public playMusic(guildQueue: guildQueue): Promise<void>;
    public initGuildQueue(message: Discord.Message): Promise<void>;
}