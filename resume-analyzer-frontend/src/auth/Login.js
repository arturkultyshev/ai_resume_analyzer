import React, { useState } from 'react';
import api from '../api/axios';
import { setToken } from '../utils/token';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('token/', { username, password });
    setToken(res.data.access);
    onLogin();  // перерисовать UI
  };

  return (
      <form onSubmit={handleSubmit} className="login-form">
          <input
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn">Войти</button>
      </form>
  );
}
