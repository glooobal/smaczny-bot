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
      .setColor("Greyple")
      .setImage('attachment://bonus.png');

    await interaction.reply({ embeds: [embedMessage], files: [embedFile] });
  },
};
