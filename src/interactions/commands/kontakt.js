import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych ulubionych przełożonych.'
    ),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor(interaction.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Kontakt`,
        iconURL: interaction.user.avatarURL(),
      })
      .addFields(
        {
          name: 'Gdynia',
          value: `${interaction.config.contact.gdyniaEmail}`,
          inline: true,
        },
        {
          name: 'Gdańsk',
          value: `${interaction.config.contact.gdanskEmail}`,
          inline: true,
        },
        {
          name: 'Telefon (Telegram)',
          value: `${interaction.config.contact.phoneNumber}`,
          inline: true,
        }
      )
      .setFooter({ text: 'Inna sprawa? - Użyj czatu w aplikacji Scoober' });

    await interaction.reply({ embeds: [embedMessage] });
  },
};
