//UPTIME CALLBACK
//24jam nonstop
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log('pinging');
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

 
require('dotenv').config();
const path = require('path');
const { formatNumber, embedURL } = require('./util/Util');
const { MessageEmbed } = require("discord.js");
const { Structures } = require('discord.js');
const { prefix, token } = require('./config.json');
const { TOKEN, OWNERS, PREFIX, INVITE } = process.env;
const Client = require('./structures/Client');
Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});
const client = new Client({
	commandPrefix: prefix,
	owner: '', //ah here we go
	invite: INVITE,
	disableMentions: 'everyone',
	disabledEvents: ['TYPING_START']
});

const leaveMsgs = require('./assets/json/leave-messages');

client.registry
	.registerDefaultTypes()
	.registerTypesIn(path.join(__dirname, 'types'))
	.registerGroups([
		['util', 'Utility'],
    ['music', 'Music'],
		['info', 'Info'],
		['random-res', 'Random Response'],
		['fun', 'Fun'],
    ['own', 'Owner']
	])
	.registerDefaultCommands({
		help: false,
		ping: false,
		prefix: false,
		commandState: false,
		unknownCommand: false
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	client.logger.info(`[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`);

});

//Listener Event: Bot Launched
client.on("ready", async () =>{
  console.log(`${client.user.username} Ready to fight`);
  setInterval(async () => {
    let ran = [`nez. | ${formatNumber(client.users.cache.size)} Users`]; //${client.guilds.cache.size} Server`, `${client.users.cache.size} Member`
    let dom = ran[Math.floor(Math.random() * ran.length)];
    client.user.setPresence({
      activity: {
        name: dom,
        type: "STREAMING",
        url: "https://www.twitch.tv/a"
      },
      status: "online"
    });
  }, 5000) // millsecond
});

//client.on('guildMemberRemove', async member => {
//	if (member.id === client.user.id) return null;
//	if (client.botListGuilds.includes(member.guild.id)) return null;
//	const channel = member.guild.systemChannel;
//	if (!channel || !channel.permissionsFor(client.user).has('SEND_MESSAGES')) return null;
//	if (channel.topic && channel.topic.includes('<nez:disable-leave>')) return null;
//	try {
//		const leaveMsg = leaveMsgs[Math.floor(Math.random() * leaveMsgs.length)];
//		await channel.send(leaveMsg.replace(/{{user}}/gi, `**${member.user.tag}**`));
//		return null;
//	} catch {
//		return null;
//	}
//}); //Delete // if u need add notification if member leave the server.

client.on('disconnect', event => {
	client.logger.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
	process.exit(0);
});

client.on('error', err => client.logger.error(err));
client.on('warn', warn => client.logger.warn(warn));
client.on('commandError', (command, err) => client.logger.error(`[COMMAND:${command.name}]\n${err.stack}`));
client.on('commandRun', (command, promise, message, args, fromPattern, result) => {
  console.log(`[INFO]: ${message.author.tag} runned ${command.name} command!`);
});


//tag event

 client.on('message', async message => {
  
   let embed = new MessageEmbed()
  .setColor('#eaadbd')
  .setDescription(`Hello **${message.author.tag}**, My prefix **\`${prefix}\`** || Or ${prefix}help  🎉🥳`)
  if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`)
 return message.channel.send(embed); 
   
 // if (message.author.bot || !message.guild) return;
 // let djimjam = ["nez."]
 // if(djimjam.includes(message.content)) //shit
 // return message.reply("I think you must write help after **nez.** 🤗");
   
      
 // if (message.author.bot || !message.guild) return;
 // let nez = ["nez,"]
 // if(nez.includes(message.content)) //shit
 // return message.say("😲 Oh no did you make a typo? i use (.) not (,)"); //im not activated this because top.gg mod ask me to delete this
}); 

client.login(token); //config.jason or env, what ever
