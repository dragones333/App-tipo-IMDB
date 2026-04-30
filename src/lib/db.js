import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

let pool;

function getPool() {
  const { DB_PASS, DB_HOSTNAME, DB_NAME, DB_USER } = env;

  if (!DB_HOSTNAME || !DB_NAME || !DB_USER) {
    throw new Error('Faltan variables de entorno de la base de datos: DB_HOSTNAME, DB_NAME o DB_USER');
  }

  pool ??= mysql.createPool({
    host: DB_HOSTNAME,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  return pool;
}

/**
 * Ejecuta una consulta con parámetros (prepared statement).
 * @param {string} query - Consulta SQL con ?
 * @param {Array} params - Parámetros para reemplazar ?
 * @returns {Promise<any>} - Resultado de la consulta
 */
export async function query(query, params = []) {
  const [rows] = await getPool().execute(query, params);
  return rows;
}

