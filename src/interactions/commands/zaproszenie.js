import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zaproszenie')
    .setDescription('Zobacz oficjalny link do zaproszenia na serwer discord.'),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(interaction.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Zaproszenie`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Zaproś znajomych pyszniaków używając tego linku: **${interaction.config.discordInvite}**`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
