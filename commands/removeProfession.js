const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprofession')
        .setDescription("Choose a profession to get pinged when people @ that profession.")
        .addStringOption(option =>
            option.setName('profession')
            .setDescription('Professions')
            .setRequired(true)
            .addChoices(
                { name: 'Alchemy', value: 'Alchemist' },
                { name: 'Blacksmithing', value: 'Blacksmith' },
                { name: 'Enchanting', value: 'Enchanter' },
                { name: 'Engineering', value: 'Engineer' },
                { name: 'Inscription', value: 'Scribe' },
                { name: 'Jewelcrafting', value: 'Jewelcrafter' },
                { name: 'Leatherworking', value: 'Leatherworker' },
                { name: 'Tailoring', value: 'Tailor' }
            )
            ),

    async execute(interaction) {
        if(!interaction.guild) return;
        const roleCheck = interaction.options.getString('profession');
        const user = interaction.member;
        const guild = interaction.member.guild;
        const guildRole = guild.roles.cache.find(role => role.name === roleCheck);
        try{
            user.roles.add(guildRole);
            await interaction.reply({content: `User - ${interaction.user.username} has been added to the ${guildRole.name} role.`, ephemeral: true});
        }
        catch (error)
        {
            await interaction.reply({content: `Failed to add user - ${interaction.user.username} to the ${guildRole.name} role. If this continues to fail, let Altra know.`, ephemeral: true})
        }
    },
};