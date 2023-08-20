interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export default WeatherData;
