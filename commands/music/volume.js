const { Command } = require('discord.js-commando');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Adjust song volume',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt: 'What volume would you like to set? from 1 to 200',
          type: 'integer',
          validate: wantedVolume => wantedVolume >= 1 && wantedVolume <= 200
        }
      ]
    });
  }
//MADE BY CTK
  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
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
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.say(`Current volume is: ${wantedVolume}%`);
  } else {
    // The client and user are NOT in the same voiceChannel
    message.channel.send('You can only execute this command if you share the same voiceChannel!');
  }

  }
};
