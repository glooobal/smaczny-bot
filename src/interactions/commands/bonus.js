import {
  AttachmentBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('bonus')
    .setDescription('Zobacz aktualnie obowiązujący bonus.'),
  async execute(interaction) {
    const embedFile = new AttachmentBuilder('src/assets/bonus.png', {
      name: 'bonus.png',
    });

    const embedMessage = new EmbedBuilder()
      .setColor(interaction.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Aktualny bonus`,
        iconURL: interaction.user.avatarURL(),
      })
      .setImage('attachment://bonus.png');

    await interaction.reply({ embeds: [embedMessage], files: [embedFile] });
  },
};
