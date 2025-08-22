import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

export async function setAvailabilityReminder(client) {
  new CronJob(
    '0 12,18 * * 2',
    async function () {
      const reminderChannel = await client.channels.fetch(
        client.config.channels.reminderChannelId,
      );

      const embedMessage = new EmbedBuilder()
        .setColor('Greyple')
        .setAuthor({ name: `Przypomnienie o dostępności` })
        .setDescription(
          'Zaznaczcie dostępność na przyszły tydzień do końca dzisiejszego dnia',
        );

      await reminderChannel.send({
        content: `<@${client.config.roles.availabilityReminderRoleId}>`,
        embeds: [embedMessage],
      });
    },
    null,
    true,
    'Europe/Warsaw',
  );
}
