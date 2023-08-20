import axios from "axios";

export class GeocodingApi {
  constructor(protected city: string) {}

  async getGeocoding() {
    const responses = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${process.env.API_KEY}`
    );

    const { name, lat, lon, country, state } = responses.data[0];
    return { name, lat, lon, country, state };
  }
}
