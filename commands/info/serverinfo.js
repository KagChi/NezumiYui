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
 let region = {
        "brazil": ":flag_br:",
        "eu-central": ":flag_eu:",
        "singapore": ":flag_sg:",
        "us-central": ":flag_us:",
        "sydney": ":flag_au:",
        "us-east": ":flag_us:",
        "us-south": ":flag_us:",
        "us-west": ":flag_us:",
        "eu-west": ":flag_eu:",
        "vip-us-east": ":flag_us:",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl:",
        "hongkong": ":flag_hk:",
        "russia": ":flag_ru:",
        "japan": ":flag_jp:",
        "southafrica": ":flag_za:"
    };
module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'server-info',
			aliases: ['server'],
			group: 'info',
			memberName: 'server',
			description: 'Get info on the server.',
      hidden: false,
			details: `Get detailed information on the server.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(msg) {
		msg.guild.members.fetch().then(fetchedMembers => {
	const totaldnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
      	msg.guild.members.fetch().then(fetchedMembers => {
	const totalonline = fetchedMembers.filter(member => member.presence.status === 'online');
        msg.guild.members.fetch().then(fetchedMembers => {
	const totalidle = fetchedMembers.filter(member => member.presence.status === 'idle');
        msg.guild.members.fetch().then(fetchedMembers => {
	const totaloff = fetchedMembers.filter(member => member.presence.status === 'offline');
  	const formats = ['png'];
		if (msg.guild.icon) formats.push('jpg', 'webp');
	const format = msg.guild.icon && msg.guild.icon.startsWith('a_') ? 'gif' : 'png';
		if (format === 'gif') formats.push('gif');
    	const rolestag = msg.guild.roles.cache             //ROLES DENGAN @ TAG COK
            .filter(r => r.id !== msg.guild.id)
            .map(r => r).join(", ") || 'none';
		return msg.embed({
      		title: 'Nezumi Server Info' ,
      		footer: `${msg.author.username}`,
			color: 3447003,
			description: `**${msg.guild.name}** (ID: ${msg.guild.id})\n**Owner: ${msg.guild.owner.user.tag} <:owner:711606469971148831>**\n(ID: ${msg.guild.ownerID})`,
			fields: [
				{
					name: '↣ Channels ↢',
					/* eslint-disable max-len */
					value: stripIndents`
						•》 ${msg.guild.channels.cache.filter(ch => ch.type === 'text').size} Text, ${msg.guild.channels.cache.filter(ch => ch.type === 'voice').size} Voice
            					•》 System Channel: ${msg.guild.systemChannel}
						•》 AFK: ${msg.guild.afkChannelID ? `<#${msg.guild.afkChannelID}> after ${msg.guild.afkTimeout / 60}min` : 'None.'}
					`,
					/* eslint-enable max-len */
					inline: true
				},
				{
					name: '↣ Member ↢',
					value: stripIndents`
						•》 Total Members ${msg.guild.memberCount}
            					•》 Humans: ${msg.guild.members.cache.filter(member => !member.user.bot).size} Bot: ${msg.guild.members.cache.filter(member => member.user.bot).size}
						•》 Online: ${totalonline.size}
						•》 Idle: ${totalidle.size}
						•》 Dont Disturb: ${totaldnd.size}
            					•》 Offline: ${totaloff.size}
					`,
					inline: true
				},
				{
					name: '↣ Other ↢',
					value: stripIndents`
						•》 Region: ${msg.guild.region}   ${region[msg.guild.region]}
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
			thumbnail: { url: msg.guild.iconURL({ format, size: 2048 }) }
		});
          })})})})
	}
};
