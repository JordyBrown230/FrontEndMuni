"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  ButtonBase,
  useMediaQuery,
} from "@mui/material";
import { getWeatherData, WeatherData } from "../../../services/clima.service";
import { useTheme } from "@mui/material/styles";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [selectedWeather, setSelectedWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Para detectar pantallas móviles

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
        setSelectedWeather(data[0]); // Mostrar el primer pronóstico por defecto
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSelectWeather = (weather: WeatherData) => {
    setSelectedWeather(weather);
  };

  // Formato de fecha 12h
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      weekday: "short",
      day: "numeric", // Muestra el día del mes
      month: "short", // Muestra el mes en formato corto
    };
    return new Date(dateString).toLocaleString("es-CR", options);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "80vh",
        borderRadius: "10px",
        maxWidth: "100%",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Pronóstico del Clima - La Cruz, Guanacaste
      </Typography>

      {/* Vista principal de clima seleccionado */}
      {selectedWeather && (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "40px", // Espacio entre la carta grande y la lista
            maxWidth: "600px",
            margin: "0 auto",
            border: "1px solid #ddd",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {formatDate(selectedWeather.datetime)}
          </Typography>
          <img
            src={`https://openweathermap.org/img/wn/${selectedWeather.icon}@2x.png`}
            alt={selectedWeather.description}
            style={{ width: 80, height: 80 }}
          />
          <Typography variant="h3">{selectedWeather.temperature}°C</Typography>
          <Typography color="textSecondary">
            {selectedWeather.description}
          </Typography>
          <Typography>
            Sensación térmica: {selectedWeather.feels_like}°C
          </Typography>
          <Typography>Humedad: {selectedWeather.humidity}%</Typography>
          <Typography>Viento: {selectedWeather.wind_speed} m/s</Typography>
          <Typography>Lluvia: {selectedWeather.rain} mm</Typography>
        </Box>
      )}

      {/* Lista de pronósticos (Horizontal en pantallas grandes, Vertical en móviles) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Cambia a lista vertical en móviles
          gap: "10px", // Espacio entre las tarjetas
          overflowX: isMobile ? "visible" : "auto", // Solo overflow horizontal en pantallas grandes
          justifyContent: isMobile ? "center" : "flex-start", // Centrado en móviles
          paddingBottom: "10px",
          marginTop: "20px", // Espacio entre la carta grande y la lista de pronósticos
        }}
      >
        {weatherData.map((weather) => (
          <ButtonBase
            key={weather.id}
            onClick={() => handleSelectWeather(weather)}
            sx={{
              display: "inline-block",
              width: { xs: "100%", sm: "150px", md: "180px" }, // Responsivo
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Card
              sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                border: "none",
              }}
            >
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  {formatDate(weather.datetime)}
                </Typography>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                  style={{ width: 50, height: 50 }}
                />
                <Typography variant="h6" sx={{ marginTop: "10px" }}>
                  {weather.temperature}°C
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {weather.description}
                </Typography>
              </CardContent>
            </Card>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};

export default WeatherForecast;
