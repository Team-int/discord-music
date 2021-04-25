import * as Discord from 'discord.js';


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