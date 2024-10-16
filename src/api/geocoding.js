// geocoding.js
import axios from 'axios';

const API_KEY = 'a0ce80071a59419a836b0ceb138f2081'; // Вставте свій OpenCage API ключ

// Функція для отримання координат на основі локації
export const fetchCoordinates = async (location) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${API_KEY}`
    );
    const { lat, lng } = response.data.results[0].geometry;
    return { latitude: lat, longitude: lng };
  } catch (error) {
    console.error('Error fetching coordinates', error);
    return { latitude: 0, longitude: 0 }; // Значення за замовчуванням, якщо виникла помилка
  }
};
