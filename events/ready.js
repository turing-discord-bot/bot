const { connect } = require('../utils/connecting');
const logger = require('../utils/logger');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        connect(client);
        logger.info(`${client.user.tag} has started and it is ready now.`);
    }
};