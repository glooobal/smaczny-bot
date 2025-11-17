import axios from 'axios';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('gdynia')
    .setDescription('Zobacz dostępne zmiany w formularzu w Gdyni.'),

  async execute(interaction) {
    const res = await axios.get(interaction.client.config.apis.shiftsUrl);
    const shifts = res.data;

    let description;

    if (shifts.length > 0) {
      for (const shift of shifts) {
        if (shift.city === 'Gdynia') {
          description += `Data: ${shift.date} Godziny: ${shift.startTime} - ${shift.endTime}\n`;
        }
      }
    } else {
      description = 'Brak wolnych zmian do wzięcia'
    };

    const embedMessage = new EmbedBuilder()
      .setColor('Greyple')
      .setAuthor({ name: `Zmiany w formularzu - Gdynia` })
      .setDescription(description);

    await interaction.reply({ embeds: [embedMessage], flags: MessageFlags.Ephemeral });
  },
};
