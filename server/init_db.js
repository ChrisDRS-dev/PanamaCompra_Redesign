import db from './db.js';

// Crear tabla productos
// Si no existe, crearla
// id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, categoria TEXT, descripcion TEXT, precio REAL

db.prepare(`CREATE TABLE IF NOT EXISTS productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT,
  precio REAL NOT NULL
)`).run();

// Insertar productos de ejemplo solo si la tabla está vacía
const row = db.prepare('SELECT COUNT(*) as count FROM productos').get();
if (row.count === 0) {
  const productos = [
    // Suministros de Oficina y Papelería
    { nombre: 'Papel (resma)', categoria: 'Suministros de Oficina y Papelería', descripcion: 'Resma de papel tamaño carta', precio: 4.50 },
    { nombre: 'Bolígrafo', categoria: 'Suministros de Oficina y Papelería', descripcion: 'Bolígrafo azul, caja de 12', precio: 3.00 },
    { nombre: 'Carpeta', categoria: 'Suministros de Oficina y Papelería', descripcion: 'Carpeta plástica tamaño carta', precio: 1.20 },
    { nombre: 'Material de limpieza', categoria: 'Suministros de Oficina y Papelería', descripcion: 'Kit de limpieza para oficina', precio: 8.00 },
    { nombre: 'Tinta para impresora', categoria: 'Suministros de Oficina y Papelería', descripcion: 'Cartucho de tinta negra', precio: 18.00 },
    // Equipos Electrónicos y Tecnología
    { nombre: 'Computadora portátil', categoria: 'Equipos Electrónicos y Tecnología', descripcion: 'Laptop 8GB RAM, 256GB SSD', precio: 650.00 },
    { nombre: 'Impresora multifuncional', categoria: 'Equipos Electrónicos y Tecnología', descripcion: 'Impresora, escáner y copiadora', precio: 120.00 },
    { nombre: 'Monitor', categoria: 'Equipos Electrónicos y Tecnología', descripcion: 'Monitor LED 24"', precio: 95.00 },
    { nombre: 'Teclado', categoria: 'Equipos Electrónicos y Tecnología', descripcion: 'Teclado USB', precio: 12.00 },
    { nombre: 'Router', categoria: 'Equipos Electrónicos y Tecnología', descripcion: 'Router inalámbrico', precio: 35.00 },
    // Muebles y Equipos de Oficina
    { nombre: 'Escritorio', categoria: 'Muebles y Equipos de Oficina', descripcion: 'Escritorio de oficina 120x60cm', precio: 110.00 },
    { nombre: 'Silla de oficina', categoria: 'Muebles y Equipos de Oficina', descripcion: 'Silla ergonómica', precio: 85.00 },
    { nombre: 'Archivador', categoria: 'Muebles y Equipos de Oficina', descripcion: 'Archivador metálico', precio: 60.00 },
    // Servicios Profesionales
    { nombre: 'Consultoría legal', categoria: 'Servicios Profesionales', descripcion: 'Asesoría legal por hora', precio: 75.00 },
    { nombre: 'Diseño gráfico', categoria: 'Servicios Profesionales', descripcion: 'Diseño de logotipo', precio: 120.00 },
    { nombre: 'Desarrollo web', categoria: 'Servicios Profesionales', descripcion: 'Sitio web institucional', precio: 900.00 },
    { nombre: 'Capacitación', categoria: 'Servicios Profesionales', descripcion: 'Taller de capacitación', precio: 200.00 },
    // Servicios de Mantenimiento y Limpieza
    { nombre: 'Mantenimiento de impresora', categoria: 'Servicios de Mantenimiento y Limpieza', descripcion: 'Servicio técnico de impresora', precio: 40.00 },
    { nombre: 'Limpieza de oficinas', categoria: 'Servicios de Mantenimiento y Limpieza', descripcion: 'Servicio mensual', precio: 250.00 },
    { nombre: 'Fumigación', categoria: 'Servicios de Mantenimiento y Limpieza', descripcion: 'Fumigación de oficinas', precio: 90.00 },
    // Materiales de Construcción y Reparación
    { nombre: 'Cable eléctrico', categoria: 'Materiales de Construcción y Reparación', descripcion: 'Rollo de cable 50m', precio: 30.00 },
    { nombre: 'Herramientas', categoria: 'Materiales de Construcción y Reparación', descripcion: 'Kit básico de herramientas', precio: 45.00 },
    { nombre: 'Pintura', categoria: 'Materiales de Construcción y Reparación', descripcion: 'Galón de pintura blanca', precio: 22.00 },
    // Artículos Promocionales y Publicidad
    { nombre: 'Bolígrafo promocional', categoria: 'Artículos Promocionales y Publicidad', descripcion: 'Bolígrafo con logo', precio: 1.50 },
    { nombre: 'Taza personalizada', categoria: 'Artículos Promocionales y Publicidad', descripcion: 'Taza con logo', precio: 5.00 },
    { nombre: 'Publicidad digital', categoria: 'Artículos Promocionales y Publicidad', descripcion: 'Campaña en redes sociales', precio: 300.00 },
  ];
  const stmt = db.prepare('INSERT INTO productos (nombre, categoria, descripcion, precio) VALUES (?, ?, ?, ?)');
  for (const p of productos) {
    stmt.run(p.nombre, p.categoria, p.descripcion, p.precio);
  }
} 