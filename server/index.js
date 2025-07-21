import express from 'express';
import db from './db.js';
import './init_db.js'; // Inicializa las tablas si no existen
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API de PanamaCompra_Redesign funcionando');
});

// NOTA: En producción, las contraseñas deben ser hasheadas y nunca almacenadas en texto plano.

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)');
    stmt.run(nombre, email, hashedPassword);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(409).json({ error: 'El email ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }
});

// Login de usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const user = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ message: 'Login exitoso', user: { id: user.id, nombre: user.nombre, email: user.email } });
  } else {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// CRUD de facturas
// Crear factura
app.post('/api/facturas', (req, res) => {
  const { usuario_id, monto, descripcion, fecha } = req.body;
  if (!usuario_id || !monto || !fecha) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const stmt = db.prepare('INSERT INTO facturas (usuario_id, monto, descripcion, fecha) VALUES (?, ?, ?, ?)');
    stmt.run(usuario_id, monto, descripcion, fecha);
    res.status(201).json({ message: 'Factura creada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear factura' });
  }
});

// Obtener facturas de un usuario
app.get('/api/facturas/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  const facturas = db.prepare('SELECT * FROM facturas WHERE usuario_id = ?').all(usuario_id);
  res.json(facturas);
});

// Actualizar factura
app.put('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  const { monto, descripcion, fecha } = req.body;
  try {
    const stmt = db.prepare('UPDATE facturas SET monto = ?, descripcion = ?, fecha = ? WHERE id = ?');
    stmt.run(monto, descripcion, fecha, id);
    res.json({ message: 'Factura actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar factura' });
  }
});

// Eliminar factura
app.delete('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM facturas WHERE id = ?');
    stmt.run(id);
    res.json({ message: 'Factura eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar factura' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
}); 