// WeatherModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Для запиту погоди
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThermometer } from 'react-icons/wi'; // Іконки погоди

function WeatherModal({ user, onClose }) {
  const [weather, setWeather] = useState(null); // Стан для погоди
  const [hourlyTemps, setHourlyTemps] = useState([]); // Стан для погодинної температури

  const location = `${user.location.city}, ${user.location.country}`; // Локація користувача

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { latitude, longitude } = user.location.coordinates;
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`
        );
        setWeather(response.data.current_weather);
        setHourlyTemps(response.data.hourly?.temperature_2m || []); // Отримання погодинної температури
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Оновлювати кожні 5 хвилин

    return () => clearInterval(interval); // Очищення інтервалу
  }, [user]);

  const getWeatherIcon = (weathercode) => {
    switch (weathercode) {
      case 0:
        return <WiDaySunny className="text-yellow-500 text-4xl" />;
      case 2:
        return <WiCloud className="text-gray-500 text-4xl" />;
      case 3:
        return <WiRain className="text-blue-500 text-4xl" />;
      case 71:
        return <WiSnow className="text-blue-300 text-4xl" />;
      default:
        return <WiCloud className="text-gray-500 text-4xl" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-red-500">X</button>
        {weather ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Current Weather in {location}</h2>
            <div className="flex justify-center items-center mb-4">
              {getWeatherIcon(weather.weathercode)}
              <WiThermometer className="text-red-500 text-4xl ml-4" />
              <p className="ml-2 text-xl">{weather.temperature}°C</p>
            </div>
            {hourlyTemps.length > 0 ? (
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold mb-4">Hourly Weather</h2>
                <div className="overflow-auto h-48">
                  {hourlyTemps.map((temp, index) => (
                    <div key={index} className="flex justify-between p-2 border-b">
                      <span>{index + 1} hour</span>
                      <span>{temp}°C</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading hourly weather data...</p>
            )}
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherModal;
