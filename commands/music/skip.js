const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song'],
      memberName: 'skip',
      group: 'music',
      description: 'Skip the current playing song',
      guildOnly: true
    });
  }

  run(message) {
    
    
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('You need to join voice channel first');
//    if (!message.member.voice.channel.id) return message.reply('only same channel can use this cmd');
      if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
      }   
        
  if(!message.guild.voice.connection)
  {
    return;
  }

  // Get the user's voiceChannel (if he is in one)
  let userVoiceChannel = message.member.voice.channel;

  // Return from the code if the user isn't in a voiceChannel
  if (!userVoiceChannel) {
    return;
  }

  // Get the client's voiceConnection
  let clientVoiceConnection = message.guild.voice.connection;

  // Compare the voiceChannels
  if (userVoiceChannel === clientVoiceConnection.channel) {
    // The client and user are in the same voiceChannel, the client can disconnect
    clientVoiceConnection.disconnect();
    message.guild.musicData.songDispatcher.end(); 
    const embed = new MessageEmbed()
    .setAuthor('Skip' ,'https://cdn.discordapp.com/attachments/688763072864976906/706472099082141696/661493093811617803.gif')
    .addField('Successfully skipped', `**${message.guild.musicData.nowPlaying.title}**`)
    .setTimestamp()
    .setFooter(`Skipped by ${message.author.username}`)
    message.say(embed);
  } else {
    // The client and user are NOT in the same voiceChannel
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }
     

    
}
};