import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stale-zmiany')
    .setDescription('Zobacz jak możesz zgłosić się do stałych zmian.'),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Stałe zmiany`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Aby zgłosić się do stałych zmian, wypełnij ten formularz: **[Kliknij tu](${config.forms.constantShiftsUrl})**`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
