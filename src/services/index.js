
const WEATHER_TODAY = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const PARAMS = '&units=metric&lang=us&'
const API_KEY = 'appid=063c51f5bd4cc4f176c67724ff4cd230';

export class Api {
  static async getWeather(city = 'Kyiv') {
    const response = await fetch(`${WEATHER_TODAY}${city}${PARAMS}${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json();
  }

  static async getWeatherHourly(city) {
    const response = await fetch(`${WEATHER_FORECAST}${city}${PARAMS}${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json();
  }

  static async getWeatherHourlyByCoord(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&${PARAMS}${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status)
    }
    return await response.json();
  }
}