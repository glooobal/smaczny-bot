import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

import { User } from '../models/User.js';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      // const reactionRoleChannelId = client.config.reactionRole.channelId;
      // const reactionRoleMessageId = client.config.reactionRole.messageId;

      // const reactionRoleChannel = await client.channels.fetch(
      //   reactionRoleChannelId,
      // );

      // await reactionRoleChannel.messages.fetch(reactionRoleMessageId);

      // const dailyRankingChannelId = client.config.dailyChannelId;
      // const dailyRankingChannel = await client.channels.fetch(
      //   dailyRankingChannelId,
      // );

      const reminderChannelId = client.config.reminderChannelId;
      const reminderChannel = await client.channels.fetch(reminderChannelId);

      /** Availability Remider */
      new CronJob(
        '0 12,18 * * 2',
        async function () {
          const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({ name: `Przypomnienie o dostępności` })
            .setDescription(
              'Zaznaczcie dostępność na przyszły tydzień do końca dzisiejszego dnia',
            );

          await reminderChannel.send({
            content: `<@${client.config.reactionRole.availabilityReminder}>`,
            embeds: [embedMessage],
          });
        },
        null,
        true,
        'Europe/Warsaw',
      );

      /** Daily Messages Summary */
      new CronJob(
        '59 23 * * *',
        async function () {
          const users = await User.find();
          const totalMessages = users.reduce(
            (sum, user) => sum + (user.dailyMessages || 0),
            0,
          );

          const topUsers = users
            .filter((user) => user.dailyMessages > 0)
            .sort((a, b) => b.dailyMessages - a.dailyMessages)
            .slice(0, 5);

          const medals = ['🥇', '🥈', '🥉', '🏅', '🎖'];

          const now = new Date();
          const formattedDate = now.toLocaleDateString('pl-PL');

          let description = `Dzisiejszego dnia wysłanych zostało **${totalMessages}** wiadomości\n\n**Najlepsi użytkownicy:**\n`;

          topUsers.forEach((user, index) => {
            const percentage = (
              (user.dailyMessages / totalMessages) *
              100
            ).toFixed(1);
            description += `${medals[index]} <@${user.userId}> — ${user.dailyMessages} wiadomości (${percentage}%)\n`;
          });

          const embedMessage = new EmbedBuilder()
            .setColor('#3b3b3b')
            .setAuthor({ name: `Ranking wiadomości - ${formattedDate}` })
            .setDescription(description);

          await dailyRankingChannel.send({ embeds: [embedMessage] });
          await User.updateMany({}, { $set: { dailyMessages: 0 } });
        },
        null,
        true,
        'Europe/Warsaw',
      );

      /** Weekly Messages Summary */
      new CronJob(
        '59 23 * * 7',
        async function () {
          const users = await User.find();
          const totalMessages = users.reduce(
            (sum, user) => sum + (user.weeklyMessages || 0),
            0,
          );

          const topUsers = users
            .filter((user) => user.weeklyMessages > 0)
            .sort((a, b) => b.weeklyMessages - a.weeklyMessages)
            .slice(0, 5);

          const medals = ['🥇', '🥈', '🥉', '🏅', '🎖'];

          let description = `Tego tygodnia wysłanych zostało **${totalMessages}** wiadomości\n\n**Najlepsi użytkownicy:**\n`;

          topUsers.forEach((user, index) => {
            const percentage = (
              (user.weeklyMessages / totalMessages) *
              100
            ).toFixed(1);
            description += `${medals[index]} <@${user.userId}> — ${user.weeklyMessages} wiadomości (${percentage}%)\n`;
          });

          const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({ name: `Ranking wiadomości tygodnia` })
            .setDescription(description);

          await dailyRankingChannel.send({ embeds: [embedMessage] });
          await User.updateMany({}, { $set: { weeklyMessages: 0 } });
        },
        null,
        true,
        'Europe/Warsaw',
      );

      /** Monthly Messages Summary */
      new CronJob(
        '59 23 1 * *',
        async function () {
          const users = await User.find();
          const totalMessages = users.reduce(
            (sum, user) => sum + (user.monthlyMessages || 0),
            0,
          );

          const topUsers = users
            .filter((user) => user.monthlyMessages > 0)
            .sort((a, b) => b.monthlyMessages - a.monthlyMessages)
            .slice(0, 5);

          const medals = ['🥇', '🥈', '🥉', '🏅', '🎖'];

          let description = `Tego miesiąca wysłanych zostało **${totalMessages}** wiadomości\n\n**Najlepsi użytkownicy:**\n`;

          topUsers.forEach((user, index) => {
            const percentage = (
              (user.monthlyMessages / totalMessages) *
              100
            ).toFixed(1);
            description += `${medals[index]} <@${user.userId}> — ${user.monthlyMessages} wiadomości (${percentage}%)\n`;
          });

          const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({ name: `Ranking wiadomości miesiąca` })
            .setDescription(description);

          await dailyRankingChannel.send({ embeds: [embedMessage] });
          await User.updateMany({}, { $set: { monthlyMessages: 0 } });
        },
        null,
        true,
        'Europe/Warsaw',
      );

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
