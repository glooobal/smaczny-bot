import { SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zaproszenie')
    .setDescription('Zobacz oficjalny link do zaproszenia na serwer discord.'),
  async execute(interaction) {
    await interaction.reply(
      `Zaproś znajomych pyszniaków używając tego linku: **${config.discordInvite}**`
    );
  },
};
