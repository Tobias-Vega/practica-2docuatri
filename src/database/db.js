import { createPool } from 'mysql2/promise';
import {
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
} from '../settings/environments.js';

const createMyPool = () => {
  try {
    const pool = createPool({
      database: DB_NAME,
      user: DB_USER,
      host: DB_HOST,
      port: DB_PORT,
    });

    return pool;
  } catch (error) {
    console.error('Hubo un error al conectar con la base de datos');
  }
};

const conn = createMyPool();

export { conn };
