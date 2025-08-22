import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { User } from '../../models/User.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ranking')
    .setDescription('Zobacz ranking wszystkich wysłanych wiadomości.'),

  async execute(interaction) {
    const users = await User.find();
    const totalMessages = users.reduce(
      (sum, user) => sum + (user.totalMessages || 0),
      0,
    );

    const topUsers = users
      .filter((user) => user.totalMessages > 0)
      .sort((a, b) => b.totalMessages - a.totalMessages)
      .slice(0, 5);

    const medals = ['🥇', '🥈', '🥉', '🏅', '🎖'];

    let description = `Łącznie wysłanych zostało **${totalMessages}** wiadomości\n\n**Najlepsi użytkownicy:**\n`;

    topUsers.forEach((user, index) => {
      const percentage = ((user.totalMessages / totalMessages) * 100).toFixed(
        1,
      );
      description += `${medals[index]} <@${user.userId}> — ${user.totalMessages} wiadomości (${percentage}%)\n`;
    });

    const embedMessage = new EmbedBuilder()
      .setColor('Greyple')
      .setAuthor({ name: `Ranking wszystkich wiadomości` })
      .setDescription(description);

    await interaction.reply({ embeds: [embedMessage] });
  },
};
