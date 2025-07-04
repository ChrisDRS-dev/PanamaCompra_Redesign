import React, { useState } from 'react';
import './Login.css';

export default function Register({ visible, onClose, onRegister, onShowLogin }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ nombre, email, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
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
          <button type="submit">Registrarse</button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿Ya tienes cuenta?{' '}
          <button style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={onShowLogin}>
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
} 