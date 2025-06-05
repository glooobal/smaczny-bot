import { SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('stale-zmiany')
    .setDescription('Zobacz jak możesz zgłosić się do stałych zmian.'),
  async execute(interaction) {
    await interaction.reply(
      `Aby zgłosić się do stałych zmian, wypełnij ten formularz: **[Kliknij tu](${config.forms.constantShiftsUrl})**`
    );
  },
};
