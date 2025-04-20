import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Получаем ссылку на корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим React-приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
