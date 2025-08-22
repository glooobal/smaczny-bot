import { config } from '../config.js';

const messageId = config.messages.reactionRoleMessageId;

const emojiRoleMap = {
  '🌃': config.roles.gdyniaRoleId,
  '🌇': config.roles.gdanskRoleId,
  '🚗': config.roles.carRoleId,
  '🛵': config.roles.scooterRoleId,
  '🚲': config.roles.bikeRoleId,
  '⚡': config.roles.electricRoleId,
  '🚨': config.roles.availabilityReminderRoleId,
};

export default {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.id !== messageId) return;

    const roleId = emojiRoleMap[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    if (!member.roles.cache.has(roleId)) {
      await member.roles.add(roleId);
    }
  },
};
