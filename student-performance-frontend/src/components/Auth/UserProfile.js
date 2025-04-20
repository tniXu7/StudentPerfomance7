import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const UserProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Проверка на наличие токена
    const token = localStorage.getItem('access');
    if (!token) {
      // Если нет токена, перенаправляем на страницу входа
      window.location.href = '/';
      return;
    }

    // Получаем данные о пользователе
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setData(res.data); // Устанавливаем данные о пользователе
      } catch (e) {
        console.error('Ошибка при получении данных пользователя:', e);
      }
    };

    fetchUser();
  }, []); // Массив зависимостей пуст, useEffect будет выполняться только один раз после первого рендера

  if (!data) return <p>Загрузка...</p>;

  const getRole = () => {
    if (data.is_superuser) return 'Администратор';
    if (data.is_teacher) return 'Преподаватель';
    return 'Студент';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Профиль пользователя</h2>
      <p><strong>Имя пользователя:</strong> {data.username}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Роль:</strong> {getRole()}</p>
    </div>
  );
};

export default UserProfile;
