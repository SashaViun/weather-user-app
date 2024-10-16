// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Імпорт стилів
import App from './App'; // Імпорт головного компонента додатку

// Рендеримо додаток у кореневий елемент HTML-документа
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Вставка в елемент з id "root"
);
