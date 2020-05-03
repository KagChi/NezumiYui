const Command = require('../../structures/Command');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { trimArray } = require('../../util/Util');

module.exports = class UserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'user',
			aliases: ['user-info', 'member', 'member-info'],
			group: 'info',
			memberName: 'user',
			description: 'Responds with detailed information on a user.',
      hidden: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to get information on?',
					type: 'user',
					default: msg => msg.author
				}
			]
		});
	}

	async run(msg, { user }) {
		const embed = new MessageEmbed()
      .setTitle('Nezumi User Info')
			.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(user.tag)
      .addField('**↣ General Info ↢**',`•》ID : ${user.id}\n•》Discord Join Date : ${moment.utc(user.createdAt).format('MM/DD/YYYY h:mm A')}\n•》Verification : ${user.bot ? 'Bot' : 'Human'}\n•》Status : ${user.presence.status}\n•》Game : ${user.presence.game ? user.presence.game.name : 'None'}
`)
		if (msg.guild) {
			try {
				const member = await msg.guild.members.fetch(user.id);
				const defaultRole = msg.guild.roles.cache.get(msg.guild.id);
				const roles = member.roles.cache
					.filter(role => role.id !== defaultRole.id)
					.sort((a, b) => b.position - a.position)
					.map(role => role.name);
				embed
					.addField('**↣ Server Member Info ↢**', `•》Nickname : ${user.nickname ? user.nickname : 'No nickname'}\n•》Server Join : ${moment.utc(member.joinedAt).format('MM/DD/YYYY h:mm A')}\n•》Higest Role : ${member.roles.highest.id === defaultRole.id ? 'None' : member.roles.highest.name}\n•》Hoist Role : ${member.roles.hoist ? member.roles.hoist.name : 'None'}  `
   )
					.addField(`**Roles** (${roles.length})`, roles.length ? trimArray(roles, 6).join(', ') : 'None')
         .setFooter(`Req by : ${msg.author.tag}`)
         .setTimestamp()
					.setColor(member.displayHexColor);
			} catch {
				embed.setFooter('Failed to resolve member, showing basic user information instead.');
			}
		}
		return msg.embed(embed);
	}
};