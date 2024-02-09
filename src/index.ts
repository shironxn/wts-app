import "dotenv/config";
import { WeatherApi } from "./api/weather.api";
import { GeocodingApi } from "./api/geocoding.api";
import logger from "./utils/logger.util";
import promptSync from "prompt-sync";
import WeatherData from "./utils/interface";
import fs from "fs";
import clear from "console-clear"

class WeatherApp {
  constructor(private city: string) {}

  async getWeatherData(): Promise<WeatherData> {
    try {
      const weatherApp = new WeatherApi(this.city);
      const geocodingApp = new GeocodingApi(this.city);

      const weatherData = await weatherApp.getWeather();
      const geocodingData = await geocodingApp.getGeocoding();

      const data: WeatherData = {
        city: geocodingData.name,
        country: geocodingData.country,
        lat: geocodingData.lat,
        lon: geocodingData.lon,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
        weather: weatherData.weather.map((w: any) => ({
          main: w.main,
          description: w.description,
          icon: w.icon,
        })),
      };

      return data;
    } catch (error) {
      throw error;
    }
  }
}

const main = async () => {
  clear()
  console.log(fs.readFileSync("./src/utils/anime.txt", "utf-8"));

  const prompt = promptSync();
  const city: string = prompt("[>] Your City: ");
  const weatherApp = new WeatherApp(city);

  try {
    const data = await weatherApp.getWeatherData();
    console.log(data);
  } catch (error) {
    logger.error(error);
  }
};

main();
