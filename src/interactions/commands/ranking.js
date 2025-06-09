import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { User } from '../../models/user.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ranking')
    .setDescription('Zobacz ranking wszystkich wysłanych wiadomości.'),
  async execute(interaction) {
    const topUsers = await User.find().sort({ messageCount: -1 }).limit(5);
    const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];

    let description = '';
    topUsers.forEach((user, index) => {
      description += `${medals[index]} <@${user.userId} — ${user.messageCount} wiadomości\n`;
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
