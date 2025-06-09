import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pojazd')
    .setDescription('Zobacz jak możesz zmienić pojazd którym się poruszasz.'),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Zmiana pojazdu`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Aby zmienić pojazd, którym się poruszasz, wypełnij ten formularz: **[Kliknij tu](${config.forms.vehicleChangeUrl})**`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
