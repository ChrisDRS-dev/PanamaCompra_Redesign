import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la base de datos (archivo local dentro de /server)
const dbPath = path.resolve(__dirname, 'database.db');
const db = new Database(dbPath);

export default db; 