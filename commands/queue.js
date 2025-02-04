const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows Song Queue!'),
	async execute(interaction) {

        const queue = interaction.client.distube.getQueue(interaction);
        if (!queue) return interaction.reply(`There is nothing playing!`);

        const repeatModeNum = queue.repeatMode;
        if(repeatModeNum == 0){
            var repeatMode = "DISABLED";
        } else if (repeatModeNum == 1){
            var repeatMode = "THIS SONG ONLY";
        } else {
            var repeatMode = "ENTIRE QUEUE";
        }

        if(queue.songs.length > 16) {
            var q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).slice(0, 2).join("\n")
            var embed = new Discord.EmbedBuilder()
            .setTitle('Queue')
            .setDescription(`${q}\nand ${queue.songs.length - 2} more`)
            .setColor('Green')
            .setFooter({ text: `Repeat Mode: ${repeatMode}`});
            interaction.reply({ embeds: [embed] })
        } else {
            var q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
            var embed = new Discord.EmbedBuilder()
            .setTitle('Queue')
            .setDescription(`${q}`)
            .setColor('Green')
            .setFooter({ text: `Repeat Mode: ${repeatMode}`});
            interaction.reply({ embeds: [embed] })
        }
	},
};