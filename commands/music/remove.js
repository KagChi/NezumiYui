const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Remove a specific song from queue',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt: 'What song number do you want to remove from queue?',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    //   if (!message.member.permissions.has("MANAGE_CHANNELS") && message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Hey who are you? u can remove this song, just author");
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      return message.reply('Please enter a valid song number');
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('Join a channel and try again');

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

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    return message.say(`Removed song number ${songNumber} from queue`);
  } else {
    // The client and user are NOT in the same voiceChannel
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }


  }
};
