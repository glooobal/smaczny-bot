import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zmiany')
    .setDescription(
      'Zobacz jak teraz wygląda oddawanie i przyjmowanie zmian od innych kurierów.'
    ),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Zmiany`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Aby przyjąć, oddać lub wymienić zmianę użyj tego formularza: **[Kliknij tu](${config.forms.shiftChangeUrl})**\n\nMożliwe jest przekazywanie tylko całych zmian!`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
