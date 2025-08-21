import axios from 'axios';
import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

import { User } from '../models/User.js';

let lastShifts = [];

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      const [
        reactionRoleChannel,
        gdanskShiftsChannel,
        gdyniaShiftsChannel,
        reminderChannel,
        dailyRankingChannel,
      ] = await Promise.all([
        client.channels.fetch(client.config.reactionRole.channelId),
        client.channels.fetch(client.config.gdanskShiftsChannelId),
        client.channels.fetch(client.config.gdyniaShiftsChannelId),
        client.channels.fetch(client.config.reminderChannelId),
        client.channels.fetch(client.config.dailyChannelId),
      ]);

      await reactionRoleChannel.messages.fetch(
        client.config.reactionRole.messageId,
      );

      new CronJob(
        '*/1 * * * *',
        async function () {
          const res = await axios.get(client.config.shiftsApiUrl);
          const shifts = res.data;

          const newShifts = shifts.filter(
            (s) =>
              !lastShifts.some(
                (ls) =>
                  ls.date === s.date &&
                  ls.startTime === s.startTime &&
                  ls.endTime === s.endTime &&
                  ls.city === s.city,
              ),
          );

          if (newShifts.length > 0) {
            for (const shift of newShifts) {
              const shiftEmbed = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                  name: `Nowa zmiana w formularzu! - ${shift.city}`,
                })
                .setDescription(
                  `Data: ${shift.date}\nGodziny: ${shift.startTime} - ${shift.endTime}`,
                );

              switch (shift.city) {
                case 'Gdańsk':
                  await gdanskShiftsChannel.send({ embeds: [shiftEmbed] });
                  break;
                case 'Gdynia':
                  await gdyniaShiftsChannel.send({ embeds: [shiftEmbed] });
                  break;
              }
            }
          }

          lastShifts = shifts;
        },
        null,
        true,
        'Europe/Warsaw',
      );

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
