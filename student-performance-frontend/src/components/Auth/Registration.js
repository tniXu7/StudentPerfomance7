import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('auth/register/', {
        username,
        password,
        email,
      });

      if (response.status === 201) {
        alert('Registration successful! Please login.');
        navigate('/');  // Перенаправляем на страницу логина после успешной регистрации
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
