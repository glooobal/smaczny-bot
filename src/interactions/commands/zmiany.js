import { SlashCommandBuilder } from 'discord.js';

import { config } from '../../config.js';

export default {
  data: new SlashCommandBuilder()
    .setName('zmiany')
    .setDescription(
      'Zobacz jak teraz wygląda oddawanie i przyjmowanie zmian od innych kurierów.'
    ),
  async execute(interaction) {
    await interaction.reply(`
Od 2 czerwca 2025 wszystkie zamiany należy zgłaszać przez ten formularz: **[Kliknij tu](${config.forms.shiftChangeUrl})**

**Pamiętaj:**  
Możliwe jest przekazywanie tylko **całych zmian**!
Jeśli zgłosisz chęć oddania zmiany, ale nikt jej nie przejmie, to nadal jesteś za nią odpowiedzialny.  
Jeśli się nie pojawisz, otrzymasz nieobecność – tak jak było przedtem.  
Oczywiście możesz nadal przyjść na tę zmianę i ją normalnie odbyć.
    `);
  },
};
