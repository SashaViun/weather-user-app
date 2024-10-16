// UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Для виконання HTTP-запитів
import UserCard from './UserCard'; // Компонент для відображення кожного користувача
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Для анімації

function UserList() {
  const [users, setUsers] = useState([]); // Стан для користувачів
  const [loading, setLoading] = useState(true); // Стан завантаження

  // Функція для отримання користувачів з API
  const fetchUsers = async () => {
    setLoading(true); // Початок завантаження
    try {
      const response = await axios.get('https://randomuser.me/api/?results=6'); // Отримання 6 користувачів
      setUsers(response.data.results); // Збереження користувачів у стані
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Завершення завантаження
    }
  };

  // Функція для збереження користувача у localStorage
  const handleSave = (userToSave) => {
    let savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
    const alreadySaved = savedUsers.some(savedUser => savedUser.login.uuid === userToSave.login.uuid);

    if (!alreadySaved) {
      savedUsers = [...savedUsers, userToSave]; // Додаємо користувача
      localStorage.setItem('savedUsers', JSON.stringify(savedUsers)); // Оновлюємо localStorage
      setUsers(users.filter(user => user.login.uuid !== userToSave.login.uuid)); // Видаляємо користувача з головного екрану
      alert('User saved!'); // Виведення повідомлення
    }
  };

  useEffect(() => {
    fetchUsers(); // Викликаємо fetchUsers після першого рендеру компонента
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">User List</h1>
      {loading ? (
        <p>Loading users...</p> // Відображаємо "Loading", поки йде завантаження
      ) : (
        <TransitionGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.length > 0 ? (
            users.map(user => (
              <CSSTransition key={user.login.uuid} timeout={500} classNames="fade">
                <UserCard user={user} onSave={() => handleSave(user)} />
              </CSSTransition>
            ))
          ) : (
            <p>No users available.</p> // Повідомлення, якщо користувачів немає
          )}
        </TransitionGroup>
      )}
      <div className="text-center mt-8">
        <button
          onClick={fetchUsers} // Оновлення списку користувачів
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Load more users
        </button>
      </div>
    </div>
  );
}

export default UserList;
