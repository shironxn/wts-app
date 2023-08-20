import axios from "axios";
import { GeocodingApi } from "./geocoding.api";

export class WeatherApi extends GeocodingApi {
  constructor(city: string) {
    super(city);
  }

  async getWeather() {
    const { lat, lon } = await this.getGeocoding();

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    );

    return response.data;
  }
}
