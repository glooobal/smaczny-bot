import { AttachmentBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('bonus')
    .setDescription('Zobacz aktualnie obowiązujący bonus.'),
  async execute(interaction) {
    const file = new AttachmentBuilder('src/assets/bonus.png', {
      name: 'bonus.png',
    });

    await interaction.reply({ files: [file] });
  },
};
