import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { User } from '../../models/User.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ranking')
    .setDescription('Zobacz ranking wszystkich wysłanych wiadomości.'),
  async execute(interaction) {
    const topUsers = await User.find().sort({ totalMessages: -1 }).limit(5);
    const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];

    let description = '';
    topUsers.forEach((user, index) => {
      description += `${medals[index]} <@${user.userId}> — ${user.totalMessages} wiadomości\n`;
    });

    const embedMessage = new EmbedBuilder()
      .setColor(interaction.client.config.embeds.color)
      .setAuthor({
        name: `@${interaction.user.username} - Ranking wszystkich wiadomości`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(description);

    await interaction.reply({ embeds: [embedMessage] });
  },
};
