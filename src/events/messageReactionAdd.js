const MESSAGE_ID = process.env.DISCORD_MESSAGE_ID;

const emojiRoleMap = {
  '🌃': process.env.DISCORD_ROLE_ID_GDYNIA,
  '🌇': process.env.DISCORD_ROLE_ID_GDANSK,
  '🚗': process.env.DISCORD_ROLE_ID_CAR,
  '🛵': process.env.DISCORD_ROLE_ID_SCOOTER,
  '🚲': process.env.DISCORD_ROLE_ID_BIKE,
  '⚡': process.env.DISCORD_ROLE_ID_ELECTRIC,
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
