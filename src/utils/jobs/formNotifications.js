import axios from 'axios';
import { CronJob } from 'cron';
import { EmbedBuilder } from 'discord.js';

import { client } from '../../app.js';

let lastShifts = [];

export async function setFormNotifications() {
  new CronJob(
    '*/1 * * * *',
    async function () {
      const gdanskShiftsChannel = await client.channels.fetch(
        client.config.channels.gdanskShiftsChannelId,
      );
      const gdyniaShiftsChannel = await client.channels.fetch(
        client.config.channels.gdyniaShiftsChannelId,
      );

      const res = await axios.get(client.config.apis.shiftsUrl);
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
}
