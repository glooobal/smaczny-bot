import { setAvailabilityReminder } from '../utils/jobs/availabilityReminder.js';
import { setMessagesSummary } from '../utils/jobs/messagesSummary.js';
import { setFormNotifications } from '../utils/jobs/formNotifications.js';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      setAvailabilityReminder();
      setMessagesSummary();
      setFormNotifications();

      const reactionRoleChannel = client.channels.fetch(
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
