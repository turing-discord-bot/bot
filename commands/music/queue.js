const logger = require('../../utils/logger');
const { queueEmbed } = require('../../utils/embed');
const { queue } = require('./commons');

module.exports = {
    name: 'queue',
    description: 'Shows the play queue',
    guildOnly: true,
    args: false,
    aliases: ['q'],
    usage: '',
    execute(message, args) {
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel)
            return message.channel.send('You have to be in a voice channel to show  the play queue!');

        if (!serverQueue) return message.channel.send('There is no song that I could show!');

        if (serverQueue.songs.length > 0)
            return message.channel.send(queueEmbed(message, serverQueue.songs, serverQueue.playing));
        else
            return message.channel.send('There is no song that I could show!');
    },
};