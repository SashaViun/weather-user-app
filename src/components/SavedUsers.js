// SavedUsers.js
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard'; // Компонент для відображення кожного користувача
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Для анімації

function SavedUsers() {
  const [savedUsers, setSavedUsers] = useState([]); // Стан для збережених користувачів
  const [loading, setLoading] = useState(true); // Стан завантаження

  // Завантаження збережених користувачів при першому рендері
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('savedUsers')) || [];
    setSavedUsers(users);
    setLoading(false); // Завершення завантаження
  }, []);

  // Функція для видалення користувача
  const handleRemove = (userId) => {
    const updatedUsers = savedUsers.filter(user => user.login.uuid !== userId);
    setSavedUsers(updatedUsers); // Оновлюємо стан
    localStorage.setItem('savedUsers', JSON.stringify(updatedUsers)); // Оновлюємо localStorage
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Saved Users</h1>
      {loading ? (
        <p>Loading saved users...</p> // Відображаємо "Loading", поки йде завантаження
      ) : (
        <TransitionGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedUsers.length > 0 ? (
            savedUsers.map(user => (
              <CSSTransition key={user.login.uuid} timeout={500} classNames="fade">
                <div>
                  <UserCard user={user} />
                  <button
                    onClick={() => handleRemove(user.login.uuid)} // Видалення користувача
                    className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </CSSTransition>
            ))
          ) : (
            <p>No saved users.</p> // Якщо немає збережених користувачів
          )}
        </TransitionGroup>
      )}
    </div>
  );
}

export default SavedUsers;
