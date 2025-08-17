import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('kontakt')
    .setDescription(
      'Zobacz aktualne opcje kontaktu do naszych przełożonych.'
    ),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor("Greyple")
      .setAuthor({
        name: `@${interaction.user.username} - /kontakt`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Możesz napisać w aplikacji Telegram: \`${interaction.client.config.contact.phoneNumber}\`\n\n` +
        `lub jak zawsze napisać w aplikacji Scoober`
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
