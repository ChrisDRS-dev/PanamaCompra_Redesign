import React, { useState } from 'react';
import './Login.css';

export default function Login({ visible, onClose, onLogin, onShowRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta?{' '}
          <button style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onShowRegister}>
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
} 