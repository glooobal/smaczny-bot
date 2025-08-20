import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('wyplata')
    .setDescription('Zobacz jak wyglądają wypłaty 10-tego i 25-tego dnia miesiąca.'),
  async execute(interaction) {
    const embedMessage = new EmbedBuilder()
      .setColor("Greyple")
      .setAuthor({
        name: `@${interaction.user.username} - /wyplata`,
        iconURL: interaction.user.avatarURL(),
      })
      .setDescription(`Wynagrodzenie za 1-15 dni miesiąca wypłacane jest 25. dnia miesiąca i obejmuje wyłącznie godziny pracy.  
                       \nRozliczenie za zamówienia, napiwki i pozostałe godziny wypłacane jest do 10. dnia kolejnego miesiąca.  
                       \nNa przykładzie możesz podejrzeć to w **[tym arkuszu](${interaction.client.config.googleSheet})**.
      `);

    await interaction.reply({ embeds: [embedMessage] });
  },
};
