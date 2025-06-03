import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zmiany')
    .setDescription(
      'Zobacz jak teraz wygląda oddawanie i przyjmowanie zmian od innych kurierów.'
    ),
  async execute(interaction) {
    await interaction.reply(
      'Od 2 czerwca 2025 wszystkie zamiany należy zgłaszać przez ten formularz: **[Kliknij tu](https://docs.google.com/forms/d/e/1FAIpQLSe7T-1ynfCY96_wThvrWScBPmPAilEQAuNJ34tNx2nK6HC3lw/viewform)**\n\nMożliwe jest przekazywanie tylko całych zmian, a wszystkie zmiany rozpoczynające się przed 12:00 kolejnego dnia lub po 20:00 tego samego dnia należy zgłaszać najpóźniej do godziny 20:00\n\n**Pamiętaj:** jeśli zgłosisz chęć oddania zmiany, ale nikt jej nie przejmie, to nadal jesteś za nią odpowiedzialny.\nJeśli się nie pojawisz, otrzymasz nieobecność – tak jak było przedtem.\nOczywiście możesz nadal przyjść na tę zmianę i ją normalnie odbyć.'
    );
  },
};
