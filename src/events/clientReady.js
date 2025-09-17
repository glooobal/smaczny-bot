import { setAvailabilityReminder } from '../utils/jobs/availabilityReminder.js';
import { setMessagesSummary } from '../utils/jobs/messagesSummary.js';
import { setFormNotifications } from '../utils/jobs/formNotifications.js';

export default {
  name: 'clientReady',
  once: true,
  async execute(client) {
    try {
      await setAvailabilityReminder(client);
      await setMessagesSummary(client);
      await setFormNotifications(client);

      const reactionRoleChannel = await client.channels.fetch(
        client.config.channels.reactionRoleChannelId,
      );

      await reactionRoleChannel.messages.fetch(
        client.config.messages.reactionRoleMessageId,
      );

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
