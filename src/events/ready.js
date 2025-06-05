import { config } from '../config.js';

const CHANNEL_ID = config.reactionRole.channelId;
const MESSAGE_ID = config.reactionRole.messageId;

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      // const channel = await client.channels.fetch(CHANNEL_ID);
      // const message = await channel.messages.fetch(MESSAGE_ID);

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
