import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getWeather } from '../../utils/apis/weather.js';

export default {
  data: new SlashCommandBuilder()
    .setName('pogoda')
    .setDescription('Zobacz aktualną pogodę w twoim mieście.')
    .addStringOption((option) =>
      option
        .setName('miasto')
        .setDescription('Wybierz swoje miasto')
        .setRequired(true)
        .addChoices(
          { name: 'Gdańsk', value: 'gdańsk' },
          { name: 'Gdynia', value: 'gdynia' },
        ),
    ),
  async execute(interaction) {
    const city = interaction.options.getString('miasto');
    const weather = await getWeather(city);

    let cityName;
    if (city === 'gdańsk') cityName = 'Gdańsk';
    else if (city === 'gdynia') cityName = 'Gdynia';

    let embedColor = 'Greyple';
    if (weather.temperature >= 20) embedColor = 'Yellow';
    else if (weather.temperature <= 12) embedColor = 'Blue';

    let embedDescription;
    if (weather.rain)
      embedDescription = `Będzie padać deszcz (${weather.rain} mm) 🌧️`;
    else if (weather.snow)
      embedDescription = `Będzie padać śnieg (${weather.snow} cm) ☃️`;
    else if (weather.rain && weather.snow)
      embedDescription = `Będzie padać śnieg i deszcz (🌧️ ${weather.rain} mm, ☃️ ${weather.snow} cm)`;
    else if (!weather.rain || !weather.snow)
      embedDescription = 'Nie są prognozowane żadne opady ⛅';

    const embedMessage = new EmbedBuilder()
      .setColor(embedColor)
      .setAuthor({ name: `Pogoda - ${cityName}` })
      .setDescription(embedDescription)
      .addFields(
        {
          name: '🌡️ Temperatura',
          value: `${weather.temperature}°C`,
          inline: true,
        },
        {
          name: '⛅ Odczuwalna',
          value: `${weather.feelsLike}°C`,
          inline: true,
        },
        { name: '🌬️ Wiatr', value: `${weather.wind} km/h` },
        { name: '💧 Wilgotność', value: `${weather.humidity}%` },
      );

    await interaction.reply({ embeds: [embedMessage] });
  },
};
