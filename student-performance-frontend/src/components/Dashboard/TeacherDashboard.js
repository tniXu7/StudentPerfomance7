import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate, Navigate } from 'react-router-dom'; 

const TeacherDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/user/')
      .then(res => {
        if (res.data.is_teacher) {
          setUserData(res.data);
        } else {
          navigate('/student-dashboard');
        }
      })
      .catch(err => {
        setError('Ошибка при загрузке данных. Попробуйте позже.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <Navigate to="/" />;

  return (
    <div>
      <h1>Добро пожаловать, {userData.username}!</h1>
      <p>Панель преподавателя</p>
      <button onClick={() => navigate('/logout')}>Выйти</button> {/* Кнопка выхода */}
    </div>
  );
};

export default TeacherDashboard;
