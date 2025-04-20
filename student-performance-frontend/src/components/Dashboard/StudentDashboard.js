// src/components/Dashboard/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useNavigate, Navigate } from 'react-router-dom';

const StudentDashboard = ({ setAuth }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get('auth/user/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.data.is_teacher) {
          setUserData(res.data);
        } else {
          navigate('/teacher-dashboard');
        }
      })
      .catch(() => {
        setError('Ошибка при загрузке данных.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuth(false);
    navigate('/');
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <Navigate to="/" />;

  return (
    <div>
      <h1>Привет, {userData.username}!</h1>
      <p>Добро пожаловать в панель студента.</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default StudentDashboard;
