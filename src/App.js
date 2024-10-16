// App.js
import React from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './components/UserList'; // Компонент списку користувачів
import SavedUsers from './components/SavedUsers'; // Компонент збережених користувачів
import './App.css'; // Стилі для додатку

function App() {
  return (
    <Router>
      {/* Навігаційне меню */}
      <nav className="p-4 bg-gray-800 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl">User List</Link> {/* Посилання на головну сторінку */}
          <Link to="/saved-users" className="text-xl">Saved Users</Link> {/* Посилання на збережених користувачів */}
        </div>
      </nav>

      {/* Оголошення маршрутів */}
      <Routes>
        <Route path="/" element={<UserList />} /> {/* Список користувачів */}
        <Route path="/saved-users" element={<SavedUsers />} /> {/* Збережені користувачі */}
      </Routes>
    </Router>
  );
}

export default App;
