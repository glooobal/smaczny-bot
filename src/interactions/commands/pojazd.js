import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pojazd')
    .setDescription('Zobacz jak możesz zmienić pojazd którym się poruszasz.'),
  async execute(interaction) {
    await interaction.reply(
      'Aby zmienić pojazd, którym się poruszasz, wypełnij ten formularz: **[Kliknij tu](https://docs.google.com/forms/d/e/1FAIpQLScxN67ScmFbHft6fwBqPKTaTAPRQytf8umfFS3SUzQM__J9jQ/viewform)**'
    );
  },
};
