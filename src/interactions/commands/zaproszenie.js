import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zaproszenie')
    .setDescription('Zobacz oficjalny link do zaproszenia na serwer discord.'),
  async execute(interaction) {
    await interaction.reply('**discord.gg/pyszniaki**');
  },
};
