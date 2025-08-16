import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stale-zmiany')
    .setDescription('Zobacz jak możesz zgłosić się do stałych zmian.'),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor("Greyple")
      .setAuthor({
        name: `@${interaction.user.username} - /stale-zmiany`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Aby zgłosić się do stałych zmian, wypełnij ten formularz: **[Kliknij tu](${interaction.client.config.forms.constantShiftsUrl})**`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
