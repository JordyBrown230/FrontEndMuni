import axiosApi from './api.service';

// Definición de la interfaz para el tipo de datos de clima
export interface WeatherData {
  id: number;
  datetime: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  rain: number;
}

export const getWeatherData = async (): Promise<WeatherData[]> => {
  try {
    const response = await axiosApi.get<WeatherData[]>('/obtener-datos-clima');
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
