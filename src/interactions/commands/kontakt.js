import { SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych ulubionych przełożonych.'
    ),
  async execute(interaction) {
    await interaction.reply(`
**E-mail:**
Gdynia: ${config.contact.gdyniaEmail}
Gdańsk i Sopot: ${config.contact.gdanskEmail}

**Telefon (Telegram):** 
${config.contact.phoneNumber}

**Inne sprawy:**
Użyj czatu w aplikacji Scoober
    `);
  },
};
