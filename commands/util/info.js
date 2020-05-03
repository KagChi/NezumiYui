const Command = require('../../structures/Command');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const { version: commandoVersion } = require('discord.js-commando');
const moment = require('moment');
require('moment-duration-format');
const { formatNumber, embedURL } = require('../../util/Util');
const { version, dependencies } = require('../../package');
const permissions = require('../../assets/json/permissions');
module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['stats', 'uptime'],
			group: 'util',
			memberName: 'info',
			description: 'Responds with detailed bot information.',
			guarded: true,
			clientPermissions: ['EMBED_LINKS']
		});
	}

	async run(msg) {
		const invite = await this.client.generateInvite(permissions);
    const srvr = 'https://discord.gg/YmJEcFR';
    const vte = 'https://top.gg/bot/686908676606263326';
		const owners = 'https://cdn.discordapp.com/attachments/688763072864976906/705776573546233937/702557406361550848.gif';
		const embed = new MessageEmbed()
      .setAuthor('Nezumi Stats', `${owners}`)
      .setThumbnail(this.client.user.displayAvatarURL()) //↣↢
			.setColor('RANDOM')
			.setFooter('©Vegui iMicca')
      .setTimestamp()
			.addField('↣ Servers ↢', formatNumber(this.client.guilds.cache.size), true)
      .addField('↣ Users ↢', formatNumber(this.client.users.cache.size), true)
      .addField('↣ Channels ↢', formatNumber(this.client.channels.cache.size), true)
			.addField('↣ Commands ↢', formatNumber(this.client.registry.commands.size), true)
      .addField('↣ Platform ↢' ,'Linux X64')
      .addField('↣ Cpu ↢', 'Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz')
			.addField('↣ Shards ↢', formatNumber(this.client.options.shardCount), true)
			.addField('↣ Memory Usage ↢' , `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
			.addField('↣ Uptime ↢', moment.duration(this.client.uptime).format('d:hh:mm:ss'), true)
			.addField('↣ Version ↢', `v${version}`, true)
			.addField('↣ Node.js ↢', process.version, true)
			.addField('↣ Discord.js ↢', `v${djsVersion}`, true)
			.addField('↣ Commando ↢', `v${commandoVersion}`, true)
    	.addField('↣ Support Server ↢', embedURL('Join Server', srvr), true)
			.addField('↣ Invite Me ↢', embedURL('Add Me', invite), true)
      .addField('↣ Vote Me ↢', embedURL('VOTE', vte), true)
      .addField('↣ Owner ↢',`<@271576733168173057> 👑`) //https://top.gg/bot/686908676606263326
    
		return msg.embed(embed);
	}
};