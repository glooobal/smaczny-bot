import axios from 'axios';

const urls = {
  gdańsk:
    'https://api.open-meteo.com/v1/forecast?latitude=54.3523&longitude=18.6491&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,rain,snowfall&timezone=Europe%2FBerlin&forecast_days=1',
  gdynia:
    'https://api.open-meteo.com/v1/forecast?latitude=54.5189&longitude=18.5319&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,rain,snowfall&timezone=Europe%2FBerlin&forecast_days=1',
};

export async function getWeather(city) {
  try {
    const url = urls[city];
    if (!url)
      console.error('Error while fetching weather: unrecognised city name');

    const res = await axios.get(url);
    const data = res.data.current;

    return {
      temperature: data.temperature_2m,
      feelsLike: data.apparent_temperature,
      humidity: data.relative_humidity_2m,
      wind: data.wind_speed_10m,
      rain: data.rain,
      snow: data.snowfall,
    };
  } catch (err) {
    console.error('Error while fetching weather:', err);
    return null;
  }
}
