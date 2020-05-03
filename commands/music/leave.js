const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Leaves voice channel if in one'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join ke channel dan coba lagi');
  // if (!message.member.permissions.has("MANAGE_CHANNELS") && message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Nope u cant use leave command :)");
    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      return message.reply('There is no song playing right now!');
    }
    if (!message.guild.musicData.queue)
      return message.say('There are no songs in queue');
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
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  } else {
    // The client and user are NOT in the same voiceChannel
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }
    

  }
};
