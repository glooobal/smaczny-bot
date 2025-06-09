import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych ulubionych przełożonych.'
    ),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(interaction.client.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Kontakt`,
        iconURL: interaction.user.avatarURL(),
      })
      .addFields(
        {
          name: 'Gdynia',
          value: `${interaction.client.config.contact.gdyniaEmail}`,
          inline: true,
        },
        {
          name: 'Gdańsk',
          value: `${interaction.client.config.contact.gdanskEmail}`,
          inline: true,
        },
        {
          name: 'Telefon (Telegram)',
          value: `${interaction.client.config.contact.phoneNumber}`,
          inline: true,
        }
      )
      .setFooter({ text: 'Inna sprawa? - Użyj czatu w aplikacji Scoober' });

    await interaction.reply({ embeds: [embedMessage] });
  },
};
