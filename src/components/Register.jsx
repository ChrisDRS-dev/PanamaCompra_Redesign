import React, { useState, useEffect } from 'react';
import '../styles/Login.css';

export default function Register({ visible, onClose, onRegister, onShowLogin, error, success, loading }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  // Limpiar mensajes cuando se cierra el modal
  useEffect(() => {
    if (!visible) {
      setLocalError('');
    } else {
      // Resetear campos cuando se abre el modal
      setNombre('');
      setEmail('');
      setPassword('');
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    // Validación básica
    if (!nombre || !email || !password) {
      setLocalError('Por favor complete todos los campos');
      return;
    }
    
    if (password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    await onRegister({ nombre, email, password });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Registro de Usuario</h2>
        {(error || localError) && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            border: '1px solid #f5c6cb',
            fontSize: '0.9em'
          }}>
            {error || localError}
          </div>
        )}
        {success && (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            border: '1px solid #c3e6cb',
            fontSize: '0.9em'
          }}>
            {success}
          </div>
        )}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
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