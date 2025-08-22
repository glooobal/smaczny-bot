import { CronJob } from "cron";
import { EmbedBuilder } from "discord.js";

import { client } from '../../app.js';

export function setAvailabilityReminder() {
    new CronJob(
        '0 12,18 * * 2',
        async function () {
            const reminderChannel = client.channels.fetch(client.config.reminderChannelId);

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
}