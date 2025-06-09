import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zaproszenie')
    .setDescription(
      'Zobacz oficjalny link lub kod QR do zaproszenia na serwer discord.'
    ),
  async execute(interaction) {
    const embedFile = new AttachmentBuilder('src/assets/qr-code.png', {
      name: 'qr-code.png',
    });

    const embedMessage = new EmbedBuilder()
      .setColor(interaction.client.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Zaproszenie`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(
        `Zaproś znajomych pyszniaków używając tego linku: **${interaction.client.config.discordInvite}**, lub użyj poniższego kodu QR!`
      )
      .setImage('attachment://qr-code.png');

    await interaction.reply({ embeds: [embedMessage], files: [embedFile] });
  },
};
