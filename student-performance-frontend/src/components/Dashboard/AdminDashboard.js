import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Navigate, useNavigate } from 'react-router-dom'; // Добавлен useNavigate

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Инициализация useNavigate

  useEffect(() => {
    axios.get('/auth/user/')
      .then(res => {
        if (res.data.is_superuser) {
          setAdminData(res.data);
        } else {
          setError('Вы не администратор');
        }
      })
      .catch(err => {
        setError('Ошибка при загрузке данных. Попробуйте позже.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!adminData) return <Navigate to="/" />;

  return (
    <div>
      <h1>Добро пожаловать, {adminData.username}!</h1>
      <p>Это административная панель</p>
      <button onClick={() => navigate('/logout')}>Выйти</button> {/* Кнопка выхода */}
    </div>
  );
};

export default AdminDashboard;
