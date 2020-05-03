const { Command } = require('discord.js-commando');

module.exports = class StopMusicTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stop-trivia',
      aliases: [
        'stop-music-trivia',
        'skip-trivia',
        'end-trivia',
        'stop-trivia'
      ],
      memberName: 'stop-trivia',
      group: 'music',
      description: 'End the music trivia',
      			hidden: true,
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT']
    });
  }
   async run(message) {
  message.author.send("Stil Indev");
  message.channel.send("Check your Dm");
  }
}