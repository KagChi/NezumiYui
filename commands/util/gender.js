const Command = require('../../structures/Command');
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const client = require('../../structures/Client');
module.exports = class GenderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'gender',
			aliases: ['guess-gender', 'gender-guess'],
			group: 'fun',
			memberName: 'gender',
			description: 'Determines the gender of a name.',
      			hidden: true,
			credit: [
				{
					name: 'Genderize.io',
					url: 'https://genderize.io/',
					reason: 'API'
				}
			],
			args: [
				{
					key: 'name',
					prompt: 'Write the name !',
					type: 'string'
				}
			]
		});
	}

	async run(msg, { name }) {
		try {
			const { body } = await request
				.get(`https://api.genderize.io/`)
				.query({ name });
			if (!body.gender) return msg.say(`Hmm.. icant guess **${body.name}** gender is.`);
      const embed = new MessageEmbed()
      .setTitle('Nezumi Gender Guess')
      .setThumbnail('https://cdn.discordapp.com/emojis/702502988966526977.gif?v=1')
      .setColor('#1e0f46')
      .addField('**> Name :** ', `${body.name}`)
      .addField('**> Gender :** ', `${body.gender}`)
      .addField('**> Possibility :** ', `${Math.round(body.probability * 100)}%`)
      .addField('**That\'s why i pretty sure if** ',`${body.name} **is** ${body.gender}`)
      .setFooter(msg.author.tag)
      .setTimestamp()
      msg.say(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};