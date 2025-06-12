import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

import { User } from '../models/User.js';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      const reactionRoleChannelId = client.config.reactionRole.channelId;
      const reactionRoleMessageId = client.config.reactionRole.messageId;
      const dailyRankingChannelId = client.config.ranking.dailyChannelId;

      const reactionRoleChannel = await client.channels.fetch(
        reactionRoleChannelId
      );
      const reactionRoleMessage = await reactionRoleChannel.messages.fetch(
        reactionRoleMessageId
      );

      new CronJob(
        '59 23 * * *',
        async function () {
          const dailyRankingChannel = await client.channels.fetch(
            dailyRankingChannelId
          );

          const topUsers = await User.find()
            .sort({ dailyMessages: -1 })
            .limit(5);
          const medals = ['🥇', '🥈', '🥉', '🏅', '🏅'];

          let description = '';
          topUsers.forEach((user, index) => {
            description += `${medals[index]} <@${user.userId}> — ${user.dailyMessages} wiadomości\n`;
          });

          const embedMessage = new EmbedBuilder()
            .setColor(client.config.embeds.color)
            .setAuthor({
              name: `Codzienny ranking wiadomości`,
            })
            .setDescription(description);

          await dailyRankingChannel.send({ embeds: [embedMessage] });
          await User.updateMany({}, { $set: { dailyMessages: 0 } });
        },
        null,
        true,
        'Europe/Warsaw'
      );

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
