import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Убедитесь, что URL правильный
});

// Настройка интерцептора для добавления JWT токена в заголовок запроса
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // Получаем токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Добавляем токен в заголовок
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
