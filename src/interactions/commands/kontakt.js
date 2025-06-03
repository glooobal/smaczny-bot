import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych ulubionych przełożonych.'
    ),
  async execute(interaction) {
    await interaction.reply(
      '**E-mail:**\nGdynia: gdynia@takeaway.com\nGdańsk i Sopot: gdansk@takeaway.com\n\n**Telefon (Telegram):**\n+48 577 700 062 (Tylko pilne sprawy, np. wypadki lub nagłe nieobecności)\n\n**Inne sprawy:** Użyj czatu w aplikacji Scoober'
    );
  },
};
