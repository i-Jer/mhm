// init
console.log("Command Registration Initiated!")
const { REST, Routes } = require('discord.js');
const { clientId, token, test_token, testBotId } = require('../configs/config.json');
// line 24 to change token and line 32 to change clientId
const fs = require('fs');
const path = require('path');
const commands = [];

	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(__dirname, '../commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

const rest = new REST().setToken(token);
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();