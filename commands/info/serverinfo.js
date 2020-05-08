const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');

const humanLevels = {
	0: 'None',
	1: 'Low',
	2: 'Medium',
	3: '(╯°□°）╯︵ ┻━┻',
	4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server-info',
			aliases: ['server'],
			group: 'info',
			memberName: 'server',
			description: 'Get info on the server.',
      hidden: true,
			details: `Get detailed information on the server.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(msg) {
        const rolestag = msg.guild.roles.cache             //ROLES DENGAN @ kadang lupa
            .filter(r => r.id !== msg.guild.id)
            .map(r => r).join(", ") || 'none';
		return msg.embed({
      title: 'Nezumi Server Info' , //(this.client.user.tag) what ever h3h3h3
      footer:`${msg.author.username}`,
			color: 3447003,
			description: `${msg.guild.name} (ID: ${msg.guild.id})`,
			fields: [
				{
					name: '↣ Channels ↢',
					value: stripIndents`
						•》 ${msg.guild.channels.cache.filter(ch => ch.type === 'text').size} Text, ${msg.guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice
            			•》 System Channel: ${msg.guild.systemChannel}
						•》 AFK: ${msg.guild.afkChannelID ? `<#${msg.guild.afkChannelID}> after ${msg.guild.afkTimeout / 60}min` : 'None.'}
					`,
					inline: true
				},
				{
					name: '↣ Member ↢',
					value: stripIndents`
						•》 ${msg.guild.memberCount} members
						•》 Owner: ${msg.guild.owner.user.tag}
						(ID: ${msg.guild.ownerID})
					`,
					inline: true
				},
				{
					name: '↣ Other ↢',
					value: stripIndents`
						•》 Region: ${msg.guild.region}
						•》 Created at: ${moment.utc(msg.guild.createdAt).format('MM/DD/YYYY h:mm A')}
            •》 You Joined at :  ${moment.utc(msg.member.joinedAt).format('MM/DD/YYYY h:mm A')}
				    •》 Notification: ${msg.guild.defaultMessageNotifications}
						•》 Verification Level: ${humanLevels[msg.guild.verificationLevel]}`,
          inline: false
				},
        {
					name: `Roles\(${msg.guild.roles.cache.size}\)`,
					value: stripIndents`
					    ${rolestag}`
				}
			],
			thumbnail: { url: msg.guild.iconURL() }
		});
	}
};