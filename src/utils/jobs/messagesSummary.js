import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

import { User } from '../../models/User.js';
import { client } from '../../app.js';

async function createSummaryJob({ cron, field, resetLabel, title }) {
  return new CronJob(
    cron,
    async function () {
      const users = await User.find();
      const totalMessages = users.reduce(
        (sum, user) => sum + (user[field] || 0),
        0,
      );

      const topUsers = users
        .filter((user) => user[field] > 0)
        .sort((a, b) => b[field] - a[field])
        .slice(0, 5);

      const medals = ['🥇', '🥈', '🥉', '🏅', '🎖'];
      let description = `${resetLabel} wysłanych zostało **${totalMessages}** wiadomości\n\n**Najlepsi użytkownicy:**\n`;

      topUsers.forEach((user, index) => {
        const percentage = ((user[field] / totalMessages) * 100).toFixed(1);
        description += `${medals[index]} <@${user.userId}> — ${user[field]} wiadomości (${percentage}%)\n`;
      });

      const embedMessage = new EmbedBuilder()
        .setColor('Greyple')
        .setAuthor({ name: title })
        .setDescription(description);

      const summaryChannel = await client.channels.fetch(
        client.config.channels.summaryChannelId,
      );
      await summaryChannel.send({ embeds: [embedMessage] });

      await User.updateMany({}, { $set: { [field]: 0 } });
    },
    null,
    true,
    'Europe/Warsaw',
  );
}

export async function setMessagesSummary() {
  await createSummaryJob({
    cron: '59 23 * * *',
    field: 'dailyMessages',
    resetLabel: 'Dzisiejszego dnia',
    title: `Ranking wiadomości - ${new Date().toLocaleDateString('pl-PL')}`,
  });

  await createSummaryJob({
    cron: '59 23 * * 7',
    field: 'weeklyMessages',
    resetLabel: 'Tego tygodnia',
    title: 'Ranking wiadomości tygodnia',
  });

  await createSummaryJob({
    cron: '01 00 1 * *',
    field: 'monthlyMessages',
    resetLabel: 'Tego miesiąca',
    title: 'Ranking wiadomości miesiąca',
  });
}
