// UserCard.js
import React, { useState } from 'react';
import WeatherModal from './WeatherModal'; // Компонент для відображення погоди
import UserMap from './UserMap'; // Компонент для відображення карти з користувачем

function UserCard({ user, onSave }) {
  const [showWeather, setShowWeather] = useState(false); // Стан для модального вікна погоди

  const location = `${user.location.city}, ${user.location.country}`; // Формуємо локацію користувача

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center md:flex-col md:text-left md:max-w-lg">
      <img
        className="rounded-full w-24 h-24 mb-4 md:mb-0 md:mr-4"
        src={user.picture.large}
        alt={user.name.first}
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">{`${user.name.first} ${user.name.last}`}</h2>
        <p className="text-gray-600">{user.gender}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{`${user.location.city}, ${user.location.country}`}</p>
        <div className="mt-4 flex space-x-2 justify-center md:justify-start">
          {onSave && (
            <button
              onClick={onSave} // Зберігає користувача
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          )}
          <button
            onClick={() => setShowWeather(true)} // Показує погоду
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Weather
          </button>
        </div>
      </div>
      {showWeather && <WeatherModal user={user} onClose={() => setShowWeather(false)} />} {/* Модальне вікно погоди */}
      <UserMap location={location} user={user} /> {/* Відображення карти */}
    </div>
  );
}

export default UserCard;
