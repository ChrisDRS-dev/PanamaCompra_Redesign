import express from 'express';
import db from './db.js';
import './init_db.js'; // Inicializa las tablas si no existen
import cors from 'cors';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

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

// Funciones auxiliares para facturas
function generarNumeroFactura() {
  const fecha = new Date();
  const year = fecha.getFullYear().toString().slice(-2);
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FACT-${year}${mes}-${random}`;
}

function obtenerFacturaConItems(facturaId) {
  const factura = db.prepare('SELECT * FROM facturas WHERE id = ?').get(facturaId);
  if (!factura) return null;
  
  const items = db.prepare(`
    SELECT fi.*, p.nombre as producto_nombre 
    FROM factura_items fi 
    LEFT JOIN productos p ON fi.producto_id = p.id 
    WHERE fi.factura_id = ?
  `).all(facturaId);
  
  return { ...factura, items };
}

// Crear factura con ítems
app.post('/api/facturas', (req, res) => {
  const {
    usuario_id,
    cliente_nombre,
    cliente_identificacion = '',
    cliente_direccion = '',
    cliente_telefono = '',
    cliente_email = '',
    descripcion = '',
    subtotal,
    impuesto = 0,
    total,
    fecha_emision,
    fecha_vencimiento = null,
    items = []
  } = req.body;

  // Validaciones básicas
  if (!usuario_id || !cliente_nombre || subtotal === undefined || total === undefined || !fecha_emision) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'La factura debe tener al menos un ítem' });
  }

  const numero_factura = generarNumeroFactura();
  
  try {
    // Iniciar transacción
    const transaction = db.transaction(() => {
      // Insertar factura
      const facturaStmt = db.prepare(`
        INSERT INTO facturas (
          numero_factura, usuario_id, cliente_nombre, cliente_identificacion, 
          cliente_direccion, cliente_telefono, cliente_email, descripcion,
          subtotal, impuesto, total, fecha_emision, fecha_vencimiento
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const facturaInfo = facturaStmt.run(
        numero_factura,
        usuario_id,
        cliente_nombre,
        cliente_identificacion,
        cliente_direccion,
        cliente_telefono,
        cliente_email,
        descripcion,
        subtotal,
        impuesto,
        total,
        fecha_emision,
        fecha_vencimiento
      );
      
      const facturaId = facturaInfo.lastInsertRowid;
      
      // Insertar ítems de la factura
      const itemStmt = db.prepare(`
        INSERT INTO factura_items (
          factura_id, producto_id, descripcion, cantidad, precio_unitario, subtotal
        ) VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      for (const item of items) {
        itemStmt.run(
          facturaId,
          item.producto_id,
          item.descripcion,
          item.cantidad,
          item.precio_unitario,
          item.subtotal
        );
      }
      
      return facturaId;
    });
    
    const facturaId = transaction();
    const facturaCompleta = obtenerFacturaConItems(facturaId);
    
    res.status(201).json({ 
      message: 'Factura creada exitosamente', 
      factura: facturaCompleta 
    });
    
  } catch (err) {
    console.error('Error al crear factura:', err);
    res.status(500).json({ 
      error: 'Error al crear la factura',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Obtener facturas de un usuario con sus ítems
app.get('/api/facturas/usuario/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  
  try {
    // Obtener todas las facturas del usuario
    const facturas = db.prepare(`
      SELECT * FROM facturas 
      WHERE usuario_id = ? 
      ORDER BY fecha_emision DESC
    `).all(usuario_id);
    
    // Para cada factura, obtener sus ítems
    const facturasConItems = facturas.map(factura => ({
      ...factura,
      items: db.prepare(`
        SELECT fi.*, p.nombre as producto_nombre 
        FROM factura_items fi
        LEFT JOIN productos p ON fi.producto_id = p.id
        WHERE fi.factura_id = ?
      `).all(factura.id)
    }));
    
    res.json(facturasConItems);
  } catch (err) {
    console.error('Error al obtener facturas:', err);
    res.status(500).json({ 
      error: 'Error al obtener las facturas',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Obtener una factura específica por su ID
app.get('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const factura = obtenerFacturaConItems(id);
    
    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    
    res.json(factura);
  } catch (err) {
    console.error('Error al obtener factura:', err);
    res.status(500).json({ 
      error: 'Error al obtener la factura',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Actualizar factura con sus ítems
app.put('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  const {
    cliente_nombre,
    cliente_identificacion,
    cliente_direccion,
    cliente_telefono,
    cliente_email,
    descripcion,
    subtotal,
    impuesto,
    total,
    fecha_emision,
    fecha_vencimiento,
    estado,
    items = []
  } = req.body;

  // Validar que la factura exista
  const facturaExistente = db.prepare('SELECT id FROM facturas WHERE id = ?').get(id);
  if (!facturaExistente) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  try {
    // Iniciar transacción
    const transaction = db.transaction(() => {
      // Actualizar la factura
      const updateStmt = db.prepare(`
        UPDATE facturas SET
          cliente_nombre = ?,
          cliente_identificacion = ?,
          cliente_direccion = ?,
          cliente_telefono = ?,
          cliente_email = ?,
          descripcion = ?,
          subtotal = ?,
          impuesto = ?,
          total = ?,
          fecha_emision = ?,
          fecha_vencimiento = ?,
          estado = ?
        WHERE id = ?
      `);
      
      updateStmt.run(
        cliente_nombre,
        cliente_identificacion,
        cliente_direccion,
        cliente_telefono,
        cliente_email,
        descripcion,
        subtotal,
        impuesto,
        total,
        fecha_emision,
        fecha_vencimiento,
        estado,
        id
      );
      
      // Eliminar los ítems actuales
      db.prepare('DELETE FROM factura_items WHERE factura_id = ?').run(id);
      
      // Insertar los nuevos ítems
      if (Array.isArray(items) && items.length > 0) {
        const itemStmt = db.prepare(`
          INSERT INTO factura_items (
            factura_id, producto_id, descripcion, cantidad, precio_unitario, subtotal
          ) VALUES (?, ?, ?, ?, ?, ?)
        `);
        
        for (const item of items) {
          itemStmt.run(
            id,
            item.producto_id,
            item.descripcion,
            item.cantidad,
            item.precio_unitario,
            item.subtotal
          );
        }
      }
      
      return id;
    });
    
    const facturaId = transaction();
    const facturaActualizada = obtenerFacturaConItems(facturaId);
    
    res.json({ 
      message: 'Factura actualizada exitosamente',
      factura: facturaActualizada
    });
    
  } catch (err) {
    console.error('Error al actualizar factura:', err);
    res.status(500).json({ 
      error: 'Error al actualizar la factura',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Eliminar factura (y sus ítems por CASCADE)
app.delete('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  
  // Verificar que la factura exista
  const factura = db.prepare('SELECT id FROM facturas WHERE id = ?').get(id);
  if (!factura) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }
  
  try {
    // Iniciar transacción (aunque el CASCADE manejaría la eliminación de ítems)
    const transaction = db.transaction(() => {
      // Eliminar la factura (los ítems se eliminarán en cascada)
      const stmt = db.prepare('DELETE FROM facturas WHERE id = ?');
      const result = stmt.run(id);
      return result.changes > 0;
    });
    
    const eliminada = transaction();
    
    if (eliminada) {
      res.json({ message: 'Factura eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'No se pudo eliminar la factura' });
    }
    
  } catch (err) {
    console.error('Error al eliminar factura:', err);
    res.status(500).json({ 
      error: 'Error al eliminar la factura',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM productos').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Configuración del transportador de correo con Mailtrap
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.MAILTRAP_PORT) || 2525,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  },
  tls: {
    // No fallar en certificados inválidos (útil para pruebas)
    rejectUnauthorized: false
  }
});

// Endpoint para enviar factura por correo
app.post('/api/enviar-factura', (req, res) => {
  const { to, subject, text, pdfBase64, nombreArchivo = 'factura.pdf' } = req.body;

  if (!to || !pdfBase64) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  // Convertir base64 a buffer
  const pdfBuffer = Buffer.from(pdfBase64, 'base64');

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'PanamaCompra'}" <${process.env.EMAIL_FROM || 'noreply@panamacompra.com'}>`,
    to,
    subject: subject || 'Factura de compra',
    text: text || 'Adjunto encontrará su factura de compra.',
    attachments: [
      {
        filename: nombreArchivo,
        content: pdfBuffer,
        contentType: 'application/pdf',
        encoding: 'base64'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ error: 'Error al enviar el correo', details: error.message });
    }
    console.log('Correo enviado:', info.messageId);
    res.json({ message: 'Correo enviado correctamente', messageId: info.messageId });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});