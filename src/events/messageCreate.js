import { User } from '../models/user.js';

export default {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;

    try {
      const user = await User.findOne({ userId: message.author.id });

      if (user) {
        user.messageCount += 1;
        await user.save();
      } else {
        await User.create({
          userId: message.author.id,
          username: message.author.username,
          messageCount: 1,
        });
      }
    } catch (err) {
      console.error('Error handling message', err);
    }
  },
};
