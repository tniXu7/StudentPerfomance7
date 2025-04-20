import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Удаляем токены из localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Обновляем состояние авторизации в родительском компоненте
    setAuth(false);

    // Перенаправляем на страницу входа
    navigate('/');
  }, [setAuth, navigate]);

  return (
    <div>
      <p>Выход...</p>
    </div>
  );
};

export default Logout;
