
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?q=';
const PARAMS = '&units=metric&lang=ua&'
const API_KEY = 'appid=063c51f5bd4cc4f176c67724ff4cd230';

export class Api {
  static async getWeather(city = 'Kyiv') {
    try {
      const response = await fetch(`${WEATHER_API}${city}${PARAMS}${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }
}