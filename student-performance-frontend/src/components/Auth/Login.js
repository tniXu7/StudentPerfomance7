// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';

const Login = ({ setAuth, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('auth/token/', { username, password });
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      const userRes = await axios.get('auth/user/', {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
        },
      });

      const user = userRes.data;
      setAuth(true);

      if (user.is_superuser) {
        setUserRole('admin');
        navigate('/admin-dashboard');
      } else if (user.is_teacher) {
        setUserRole('teacher');
        navigate('/teacher-dashboard');
      } else {
        setUserRole('student');
        navigate('/student-dashboard');
      }

    } catch (err) {
      console.error('Ошибка при логине:', err);
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
