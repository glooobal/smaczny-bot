import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych ulubionych przełożonych.'
    ),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Kontakt`,
        iconURL: interaction.user.avatarURL(),
      })
      .addFields(
        {
          name: 'Gdynia',
          value: `${config.contact.gdyniaEmail}`,
          inline: true,
        },
        {
          name: 'Gdańsk',
          value: `${config.contact.gdanskEmail}`,
          inline: true,
        },
        {
          name: 'Telefon (Telegram)',
          value: `${config.contact.phoneNumber}`,
          inline: true,
        }
      )
      .setFooter({ text: 'Inna sprawa? - Użyj czatu w aplikacji Scoober' });

    await interaction.reply({ embeds: [embedMessage] });
  },
};
