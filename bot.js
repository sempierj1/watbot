var variables = require('./variables');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const {token} = require('./auth.json');
const fs = require('node:fs');
const path = require('node:path');

//Variables could be cleaned up with Database implementation

const check = ["Thats almost like the screenshot I have of VoW. When you get to the second boss, the floor under you has doors that all have computer coding names.", "darkmare", "wat", "wot", "wut"];
const beans = ["https://tenor.com/view/crazy-eyes-kid-pork-and-beans-beans-gif-19099849", "https://tenor.com/view/beans-tommy-ann-margaret-the-who-gif-17812511","https://tenor.com/view/food-beans-cook-soup-gif-7312038","https://tenor.com/view/time-for-beans-good-mythical-morning-good-morning-gif-12223772","https://tenor.com/view/rove-beans-baked-beans-bean-bath-messy-gif-19055038"];
var send = false;
var count = Math.floor(Math.random() * 11);
var dornsCount = 0;
var botCount = Math.floor(Math.random() * 25);
var simCount = Math.floor(Math.random() * 5 + 5)
var firstLine = "";
var firstSender = "";
var snarkCount = 20;
var snark = Math.floor(Math.random()*snarkCount+100);
var forumCount = Math.floor(Math.random()*11);
var replied = false;
var curse = ["fuck", "damn", "bitch", "ass", "shit", "hate"];
var praise = ["good", "great", "love", "thanks", "thx"];
// Configure logger settings


// Initialize Discord Bot
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/*When Bot is initialized
 * Create connection with username and set variables to file data
 */

bot.once('ready', () => {
	dornsCount = (fs.readFileSync(variables.dornsPath, 'utf-8'));
	bot.user.setPresence({game:{name:"THE OG"}, status:"online"});
});


/*Reads in messages from chat and decides upon responses
 * Will check who the user is and the message for various things detailed below.
 */
bot.on("messageCreate", function(message) {
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
		var respCheck = function(element){
			return message.content.includes(element);
		};
		if(replied){
			replied = false;
		if(message.content.includes("bot") && curse.some(respCheck))
		{
			message.channel.send("No one asked you, bitch.");
		}
		else if(message.content.includes("bot") && praise.some(respCheck))
		{
			message.channel.send(":smile:")
		}
	}
		//Check if warcraftlogs are linked and respond with wowanalzyer link
		if (message.content.includes("warcraftlogs.com")) {
			var index = message.content.indexOf("https://www.warcraftlogs.com/reports/");
			var msg = message.content.substring(index + 37);
			message.reply("https://www.wowanalyzer.com/report/" + msg
			);
		}
		//Occasionally responds to emotes with the same emote.
		var splitcontent = message.content.split(':');
		if (splitcontent[1] != null && !splitcontent[1].includes(".com") && splitcontent[2] != null) {
			if (Math.floor(Math.random() * 4) > 2) {
				message.channel.send(":" + splitcontent[1] + ":");
			}
		}
		/*
		if(!message.content.includes("www") && !message.content.includes("http") && sexTape == 0)
		{
			message.channel.send("Title of your sex tape!");
			sexTape = Math.floor(Math.random()*sexCount + 125);
			replied = true;
		}
		else if(!message.content.includes("www") && sexTape > 0)
		{
			sexTape--;
		}
		*/
		if(message.content.includes("forum") && forumCount == 0)
		{
			forumCount = Math.floor(Math.random()*11);
			message.channel.send("The forums is not only a great place to get your suggestion seen, but it is also a great place to get support from fellow players to both uplift your voice and help refine your message. Like a single candle in a dark room one voice can only accomplish so much. Five, ten, fifty thousand voices can change the World... of Warcraft");
		}
		else if(message.content.includes("forum"))
		{
			forumCount--;
		}
		if(!message.content.includes("www") && !message.content.includes("http") && snark == 0)
		{
			var temp = Array.from(message.content);
			var z = Math.floor(Math.random()*2);
			var upper;
			if(z == 0)
			{
				temp[0] = temp[0].toLowerCase();
				upper = true;
			}
			else
			{
				temp[0] = temp[0].toUpperCase();
				upper = false;
			}
			var y = 0;
			for(var i = 1; i < temp.length; i++)
			{
				if(y==0)
				{
				var y = Math.floor(Math.random()*2+1);
				upper = !upper;
				}
				if(upper && temp[i] != ' ')
				{
					temp[i] = temp[i].toUpperCase();
				}
				else if(temp[i] != ' ')
				{
					temp[i] = temp[i].toLowerCase();
				}
				y--;
			}
			message.channel.send(temp.join(''));
			replied = true;
			snark = Math.floor(Math.random()*snarkCount+100);
		}
		else if(!message.content.includes("www") && snark > 0)
		{
			snark--;
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

			/*if(message.author.id == "201851037315760128") {
				if(cadCount == 0) {
					message.channel.send("HEY MAGE, WHERE'S MY TABLE?");
					cadCount = Math.floor(Math.random() * 15);
				}
				else{
					cadCount--;
				}
			}*/
			if (message.content.includes("sim") && simCount == 0)
			{
				simCount = Math.floor(Math.random()*5 + 5);
				message.channel.send("The guys at H2P said the sims were pretty much similar"
				);
			}
			else if(message.content.includes("sim"))
			{
				simCount--;
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
			
			if (message.content.includes("!dorns")) {
				message.channel.send("Dorns watch out!"
				);
			}
			/*Checks for !cad content
			 * Responds with statement
			 */
			if (message.content.includes("!cad")) {
					message.channel.send("HEY MAGE, WHERE'S MY TABLE?");
			}
			if(message.content.includes("!brodie"))
			{
				message.channel.send("that bot... not a fan");
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
				var x = Math.floor(Math.random()*2)+1;
				if(x == 1)
				{
				message.channel.send("Hail the creator!"
				);
				}
				else
				{
				message.channel.send("Hey Altra, don't forget your tokens.");
				}
			}
			
			if (message.content.includes("!syl")) {
				message.channel.send("No, I will not wear a crown on my..."
				);
			}
			
			if (message.content.includes("!shena")) {
				message.channel.send("Sub to Shena!"
				);
			}
			
			if (message.content.includes("!kardis")) {
				message.channel.send(":/"
				);
			}
			if (message.content.includes("!demona")) {
				message.channel.send("Dr. Demona says - 'It's cancer'"
				);
			}
			if (message.content.includes("!dark")) {
				message.channel.send("Yiff in hell!"
				);
			}

			if (message.content.includes("!beans")) {
				message.channel.send(beans[Math.floor(Math.random()*5)]);
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

bot.login(token);
