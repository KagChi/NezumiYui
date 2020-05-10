const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')
module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold', 'stop'],
      memberName: 'pause',
      group: 'music',
      description: 'Pause the current playing song',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');
   //   if (!message.member.permissions.has("MANAGE_CHANNELS") && message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Only author can stop me :)");
    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.say('There is no song playing right now!');
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
    message.guild.musicData.songDispatcher.pause();
    const embed = new MessageEmbed()
    .setTitle('⏸ Song Paussed')
    .addField('Successfully Pause', `**${message.guild.musicData.nowPlaying.title}**`)
    message.say(embed);
  } else {
    // The client and user are NOT in the same voiceChannel
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }

  }
};
