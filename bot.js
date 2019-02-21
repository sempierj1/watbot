var variables = require('./variables');
var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

//Variables could be cleaned up with Database implementation

var check = ["Thats almost like the screenshot I have of VoW. When you get to the second boss, the floor under you has doors that all have computer coding names.", "darkmare", "wat", "wot", "wut"];
var send = false;
var count = Math.floor(Math.random() * 11);
var renCountWat = 0;
var renCountQuestion = 0;
var renCountFace = 0;
var renData;
var dornsCount = 0;
var botCount = Math.floor(Math.random() * 5);
var firstLine = "";
var firstSender = "";
var out;
var late;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();

/*When Bot is initialized
 * Create connection with username and set variables to file data
 */


bot.once('ready', () => {
	renData = (fs.readFileSync(variables.renPath, 'utf-8')).split("/");
	renCountWat = renData[0];
	renCountQuestion = renData[1];
	renCountFace = renData[2];
	dornsCount = (fs.readFileSync(variables.dornsPath, 'utf-8'));
	bot.user.setPresence({game:{name:"THE OG"}, status:"online"});
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.user + ' - (' + bot.user.id + ')');
});

//Creates the 'Playing' message


/*Reads in messages from chat and decides upon responses
 * Will check who the user is and the message for various things detailed below.
 */
bot.on("message", message => {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`
	/*
	if (content.includes("!out")) {
		out = (fs.readFileSync(variables.calPath, 'utf-8')).split(/\r?\n/);
		var msg;
		for(i = 0; i < out.length; i++)
		{
			if(out[i].split(",")[1] == "out")
			{
				msg+=out[i].split(",")[0];
				msg+="\n";
			}
		}
		bot.send({
			to: channelID,
			content: msg
		});
	}

	if (content.includes("!late")) {
		out = (fs.readFileSync(variables.calPath, 'utf-8')).split(/\r?\n/);
		var msg;
		for(i = 0; i < out.length; i++)
		{
			if(out[i].split(",")[1] == "late")
			{
				msg+=out[i].split(",")[0];
				msg+="\n";
			}
		}
		bot.send({
			to: channelID,
			content: msg
		});
	}*/
	//Make sure watbot did not send the content
	if (!message.author.bot) {


		/*if(content.split(" ")[0] == "out")
		{
			if(!content.split(" ")[1][0].isNaN())
		}*/
		//Check for duplicate "meme" contents
		if(firstLine == "")
		{
			firstLine = message.content;
			firstSender = message.author.id;
		}
		else
		{
			if(message.content == firstLine && firstSender != message.author.id)
			{
				firstLine = "";
				firstSender = "";
				message.channel.send(
					message.content
				);
			}
			else
			{
			firstLine = message.content
			firstSender = message.author.id
			}
		}

		//Check if warcraftlogs are linked and respond with wowanalzyer link
		if (message.content.includes("warcraftlogs.com")) {
			var index = message.content.indexOf("https://www.warcraftlogs.com/reports/");
			var msg = message.content.substring(index + 37, message.content.length-1);
			message.channel.send("https://www.wowanalyzer.com/report/" + msg
			);
		}

		//Occasionally responds to emotes with the same emote.
		var splitcontent = message.content.split(':');
		if (splitcontent[1] != null && !splitcontent[1].includes("youtube.com") && splitcontent[2] != null) {
			if (Math.floor(Math.random() * 4) > 2) {
				message.channel.send(":" + splitcontent[1] + ":");
			}
		}

			/*Checks Rennacs statements for wats, ?, or :/
			 * If found, will increment counts for !rennac response
			 * Will store counts in file
			 */
			if (message.author.id == "238512398036631555") {
				if (message.content == "wat" || message.content == "Wat") {
					renCountWat++;
				}

				else if (message.content == "?") {
					renCountQuestion++;
				}
				else if (message.content == ":/") {
					renCountFace++;
				}
				fs.writeFile(variables.renPath, renCountWat + "/" + renCountQuestion + "/" + renCountFace, (err) => {
					if (err) throw err;
				});
			}
			/*Checks if content came from multbank
			 * Base on count, will respond with a smirk
			 */
			if (message.author.id == "265161580201771010") {
				if (botCount == 0) {
					message.channel.send(":smirk:"
					);
					botCount = Math.floor(Math.random() * 5);
				}
				else {
					botCount--;
				}
			}
			/*Checks for !rennac content
			 * Responds with his counts
			 */
			if (message.content.includes("!rennac")) {
				message.channel.send(renCountWat + " wats | " + renCountQuestion + " ?'s | " + renCountFace + " :/ 's "
				);
			}
			//Roll functionality (currently off per request)
			/*if(content.includes("!roll"))
				{
				bot.send({
					to:channelID,
					content: ":game_die: Rolled: " + Math.floor(Math.random()*101)
				});
				}*/
			/*Checks for !dorns content
			 * responds with number of responses to dorns
			 */
			if (message.content.includes("!dorns")) {
				message.channel.send("I have responded to Dorns " + dornsCount + " times... <3 Dorns"
				);
			}
			/*Checks for !cad content
			 * Responds with statement
			 */
			if (message.content.includes("!cad")) {
				message.channel.send("Cad? I don't see what the fuss is about... He's basically another Kardis"
				);
			}
			/*Checks for !q content
			 * Responds with statement
			 */
			if (message.content.includes("!q")) {
				message.channel.send("Did someone say crayons!?"
				);
			}
			/*Checks for !ferdy content
			 * Responds with statement
			 */
			if (message.content.includes("!ferdy")) {
				message.channel.send("*dies*"
				);
			}
			/*Checks for !raduk content
			 * Responds with statement
			 */
			if (message.content.includes("!raduk")) {
				message.channel.send("Put me in coach!"
				);
			}
			/*Checks for !wat content
			 * Responds with statement
			 */
			if (message.content.includes("!wat")) {
				message.channel.send("Oh, hi!"
				);
			}

			if (message.content.includes("!altra")) {
				message.channel.send("Hail the creator!"
				);
			}
			/*Checks each of the strings in the check array for a match with the received content
			 * If one is found send is set to true to indicate that a response of 'wat' can be sent
			 */
			for (i = 0; i < check.length; i++) {
				if (message.content.toUpperCase().includes(check[i].toUpperCase())) {
					send = true;
				}
			}
			/*If a content is to be sent and the randomized count for sending the content is 0 (Meaning the content will be sent)
			 * And the user is Dorns, will increment his variables
			 * 
			 * Currently NOT WORKING
			 */
			if(message.author.id == "273275583071518720"){
				dornsCount++;
				fs.writeFile(variables.dornsPath, dornsCount, (err) => {
					if (err) throw err;
				});
				message.channel.send("**" + message.content + "**")
			}

			if (send && message.author.id == "273275583071518720" && count == 0) {
				dornsCount++;
				fs.writeFile(variables.dornsPath, dornsCount, (err) => {
					if (err) throw err;
				});
			}
			/*Checks if the content ends in a ?
			 * Avoids responses to ? in the middle of a statement
			 */
			if (message.content.substring(message.content.length - 1, message.content.length).includes("?")) {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					message.channel.send(':thinking:');
				}
				else {
					count--;
				}
				send = false;
			}
			//NYI
			/*else if (userID == "") {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					bot.send({
						to: channelID,
						content: 'Listen here motherfucker.'
					});
				}
				else {
					count--;
				}
				send = false;
			}
			/*Decides whether to send the content
			 * Checks that send is true, indicating that a statement has matched our checks
			 * Checks if count is 0, indicating that we have received enough reponses to add a natural feel to the responses
			 * 
			 * Sends a response of wat, or if count is not 0 will decriment count by 1
			 */
			else if (send) {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					send = false;
					message.channel.send('wat'
					);
				}
				else {
					count--;
					send = false;
				}
			}
		}
});

bot.login(auth.token);
