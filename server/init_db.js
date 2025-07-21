// import db from './db.js';

// Crear tabla de usuarios
// const createUsuarios = `
// CREATE TABLE IF NOT EXISTS usuarios (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     nombre TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL,
//     creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
// );
// `;

// db.exec(createUsuarios);

// Crear tabla de facturas
// const createFacturas = `
// CREATE TABLE IF NOT EXISTS facturas (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     usuario_id INTEGER NOT NULL,
//     monto REAL NOT NULL,
//     descripcion TEXT,
//     fecha DATETIME NOT NULL,
//     creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
// );
// `;

// db.exec(createFacturas);

// console.log('Tablas creadas o ya existentes.'); 