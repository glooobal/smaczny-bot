import { SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pojazd')
    .setDescription('Zobacz jak możesz zmienić pojazd którym się poruszasz.'),
  async execute(interaction) {
    await interaction.reply(
      `Aby zmienić pojazd, którym się poruszasz, wypełnij ten formularz: **[Kliknij tu](${config.forms.vehicleChangeUrl})**`
    );
  },
};
