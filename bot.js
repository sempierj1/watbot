var variables = require('./variables');
var Discord = require('discord.io');
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



// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

/*When Bot is initialized
 * Create connection with username and set variables to file data
 */

bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	renData = (fs.readFileSync(variables.renPath, 'utf-8')).split("/");
	renCountWat = renData[0];
	renCountQuestion = renData[1];
	renCountFace = renData[2];
	dornsCount = (fs.readFileSync(variables.dornsPath, 'utf-8'));
});

//Creates the 'Playing' message
bot.setPresence({
	game: {
		name: "The OG"
	}
});

/*Reads in messages from chat and decides upon responses
 * Will check who the user is and the message for various things detailed below.
 */
bot.on('message', function (user, userID, channelID, message, evt) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`

	//Make sure watbot did not send the message
	if (user != "wat") {

		//Check if warcraftlogs are linked and respond with wowanalzyer link
		if (message.includes("warcraftlogs.com")) {
			var checklogs = message.split("/");
			bot.sendMessage({
				to: channelID,
				message: "https://www.wowanalyzer.com/report/" + checklogs[4]
			});
		}

		//Occasionally responds to emotes with the same emote.
		var splitMessage = message.split(':');
		if (splitMessage[1] != null && !splitMessage[1].includes("youtube.com") && splitMessage[2] != null) {
			if (Math.floor(Math.random() * 4) > 2) {
				bot.sendMessage({
					to: channelID,
					message: ":" + splitMessage[1] + ":"
				});
			}
		}

		if (user != "wat") {
			/*Checks Rennacs statements for wats, ?, or :/
			 * If found, will increment counts for !rennac response
			 * Will store counts in file
			 */
			if (userID == "238512398036631555") {
				if (message == "wat" || message == "Wat") {
					renCountWat++;
				}

				else if (message == "?") {
					renCountQuestion++;
				}
				else if (message == ":/") {
					renCountFace++;
				}
				fs.writeFile(variables.renPath, renCountWat + "/" + renCountQuestion + "/" + renCountFace, (err) => {
					if (err) throw err;
				});
			}
			/*Checks if message came from multbank
			 * Base on count, will respond with a smirk
			 */
			if (userID == "265161580201771010") {
				if (botCount == 0) {
					bot.sendMessage({
						to: channelID,
						message: ":smirk:"
					});
					botCount = Math.floor(Math.random() * 5);
				}
				else {
					botCount--;
				}
			}
			/*Checks for !rennac message
			 * Responds with his counts
			 */
			if (message.includes("!rennac")) {
				bot.sendMessage({
					to: channelID,
					message: renCountWat + " wats | " + renCountQuestion + " ?'s | " + renCountFace + " :/ 's "
				});
			}
			//Roll functionality (currently off per request)
			/*if(message.includes("!roll"))
				{
				bot.sendMessage({
					to:channelID,
					message: ":game_die: Rolled: " + Math.floor(Math.random()*101)
				});
				}*/
			/*Checks for !dorns message
			 * responds with number of responses to dorns
			 */
			if (message.includes("!dorns")) {
				bot.sendMessage({
					to: channelID,
					message: "I have responded to Dorns " + dornsCount + " times... <3 Dorns"
				});
			}
			/*Checks for !cad message
			 * Responds with statement
			 */
			if (message.includes("!cad")) {
				bot.sendMessage({
					to: channelID,
					message: "Cad? I don't see what the fuss is about... He's basically another Kardis"
				});
			}
			/*Checks for !q message
			 * Responds with statement
			 */
			if (message.includes("!q")) {
				bot.sendMessage({
					to: channelID,
					message: "Did someone say crayons!?"
				});
			}
			/*Checks for !ferdy message
			 * Responds with statement
			 */
			if (message.includes("!ferdy")) {
				bot.sendMessage({
					to: channelID,
					message: "*dies*"
				});
			}
			/*Checks for !raduk message
			 * Responds with statement
			 */
			if (message.includes("!raduk")) {
				bot.sendMessage({
					to: channelID,
					message: "Put me in coach!"
				});
			}
			/*Checks for !wat message
			 * Responds with statement
			 */
			if (message.includes("!wat")) {
				bot.sendMessage({
					to: channelID,
					message: "Oh, hi!"
				});
			}
			/*Checks each of the strings in the check array for a match with the received message
			 * If one is found send is set to true to indicate that a response of 'wat' can be sent
			 */
			for (i = 0; i < check.length; i++) {
				if (message.toUpperCase().includes(check[i].toUpperCase())) {
					send = true;
				}
			}
			/*If a message is to be sent and the randomized count for sending the message is 0 (Meaning the message will be sent)
			 * And the user is Dorns, will increment his variables
			 * 
			 * Currently NOT WORKING
			 */
			if (send && userID == "273275583071518720" && count == 0) {
				dornsCount++;
				fs.writeFile(dornsPath, dornsCount, (err) => {
					if (err) throw err;
				});
			}
			/*Checks if the message ends in a ?
			 * Avoids responses to ? in the middle of a statement
			 */
			if (message.substring(message.length - 1, message.length).includes("?")) {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					bot.sendMessage({
						to: channelID,
						message: ':thinking:'
					});
				}
				else {
					count--;
				}
				send = false;
			}
			//NYI
			else if (userID == "") {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					bot.sendMessage({
						to: channelID,
						message: 'Listen here motherfucker.'
					});
				}
				else {
					count--;
				}
				send = false;
			}
			/*Decides whether to send the message
			 * Checks that send is true, indicating that a statement has matched our checks
			 * Checks if count is 0, indicating that we have received enough reponses to add a natural feel to the responses
			 * 
			 * Sends a response of wat, or if count is not 0 will decriment count by 1
			 */
			else if (send) {
				if (count == 0) {
					count = Math.floor(Math.random() * 11);
					send = false;
					bot.sendMessage({
						to: channelID,
						message: 'wat'
					});
				}
				else {
					count--;
					send = false;
				}
			}
		}
	}
});

