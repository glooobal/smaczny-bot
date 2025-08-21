import { config } from '../config.js';

const MESSAGE_ID = config.reactionRole.messageId;

const emojiRoleMap = {
  '🌃': config.reactionRole.gdyniaRoleId,
  '🌇': config.reactionRole.gdanskRoleId,
  '🚗': config.reactionRole.carRoleId,
  '🛵': config.reactionRole.scooterRoleId,
  '🚲': config.reactionRole.bikeRoleId,
  '⚡': config.reactionRole.electricRoleId,
  '🚨': config.reactionRole.availabilityReminder,
};

export default {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.id !== MESSAGE_ID) return;

    const roleId = emojiRoleMap[reaction.emoji.name];
    if (!roleId) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);

    if (!member.roles.cache.has(roleId)) {
      await member.roles.add(roleId);
    }
  },
};
