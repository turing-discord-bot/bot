const logger = require('../../utils/logger');

module.exports = {
    name: 'dice',
    description: 'Rolls a dice and give points if you know the number',
    guildOnly: true,
    args: false,
    aliases: [],
    usage: '',
    execute: async function(message, args) {
        const numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];

        const dice = numbers[Math.floor(Math.random() * 6)];

        message.reply(`I roll a dice. Can you guess number?`).then(async msg => {
            try {
                await msg.react('1️⃣');
                await msg.react('2️⃣');
                await msg.react('3️⃣');
                await msg.react('4️⃣');
                await msg.react('5️⃣');
                await msg.react('6️⃣');

                msg.awaitReactions((reaction, user) =>
                    user.id === message.author.id, { max: 1, time: 30000 },
                ).then(async collected => {
                    if (collected.first().emoji.name === dice) {
                        message.channel.send('Congratulations you guessed correctly and earn 20 points');
                    } else {
                        message.channel.send('Ops, not this time. One more try?');
                    }
                    setTimeout(() => {
                        msg.reactions.removeAll();
                    }, 30000);
                }).catch((error) => {
                    logger.error(error, message.guild.id);
                    msg.reply('No reaction after 30 seconds, operation canceled');
                });
            } catch (error) {
                    logger.error('One of the emojis failed to react in dice.', message.guild.id);
            }


        });
    },
};