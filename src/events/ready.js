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

      const [
        reactionRoleChannel,
      ] = await Promise.all([
        client.channels.fetch(client.config.reactionRole.channelId),
      ]);

      await reactionRoleChannel.messages.fetch(
        client.config.reactionRole.messageId,
      );

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
