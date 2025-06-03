const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const MESSAGE_ID = process.env.DISCORD_MESSAGE_ID;

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    try {
      const channel = await client.channels.fetch(CHANNEL_ID);
      const message = await channel.messages.fetch(MESSAGE_ID);

      console.info(`Client has been logged in as ${client.user.tag}`);
    } catch (err) {
      console.error('Failed to load discord client', err);
    }
  },
};
