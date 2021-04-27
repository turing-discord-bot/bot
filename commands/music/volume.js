const logger = require('../../utils/logger');
const { prefix } = require('../../config.json');
const { queue } = require('./commons');

module.exports = {
    name: 'volume',
    description: 'Changes the volume level. Without arguments sets to default. Min: 0.1, Max: 2, Default: 1. ',
    guildOnly: true,
    args: false,
    aliases: ['v'],
    usage: '[<value>  |  +  |  -]',
    example: `${prefix}volume +, ${prefix}volume -, ${prefix}volume 0.5, ${prefix}volume`,
    execute(message, args) {
        const serverQueue = queue.get(message.guild.id);
        if (!message.member.voice.channel)
            return message.channel.send('You have to be in a voice channel to set  the volume!');

        if (!serverQueue) return message.channel.send('There is no connection that I set volume!');

        if (args.length === 0) {
            serverQueue.volume = 1;
        } else if (args.length > 1) {
            return message.channel.send('Invalid volume value. Possible volumes -> +, - , value');
        } else {
            if (args[0] === '+') {
                if (serverQueue.volume + 0.2 > 2)
                    serverQueue.volume = 2;
                else
                    serverQueue.volume += 0.2;
            } else if (args[0] === '-') {
                if (serverQueue.volume - 0.2 < 0.1)
                    serverQueue.volume = 0.1;
                else
                    serverQueue.volume -= 0.2;
            } else {
                try {
                    args[0] = args[0].replace(',', '.');
                    const newVolume = parseFloat(args[0]);
                    if (newVolume < 0.1 || newVolume > 2)
                        return message.channel.send('Invalid volume value. Possible volumes are between 0.1 and 2');
                    serverQueue.volume = newVolume;
                } catch (e) {
                    return message.channel.send('Invalid volume value. Possible volumes -> +, - , value');
                }
            }
        }
        serverQueue.connection.dispatcher.setVolume(serverQueue.volume);
    },
}
;