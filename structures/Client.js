const { CommandoClient } = require('discord.js-commando');
const { WebhookClient } = require('discord.js');
const DBL = require('dblapi.js');
const Collection = require('@discordjs/collection');
const winston = require('winston');

module.exports = class NezClient extends CommandoClient {
	constructor(options) {
		super(options);

		this.botListGuilds = BOT_LIST_GUILDS ? BOT_LIST_GUILDS.split(',') : [];
		this.logger = winston.createLogger({
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
				winston.format.printf(log => `[${log.timestamp}] [${log.level.toUpperCase()}]: ${log.message}`)
			)
		});
		this.dbl = TOP_GG_TOKEN ? new DBL(TOP_GG_TOKEN, this) : null;
    	this.games = new Collection();
	}
};