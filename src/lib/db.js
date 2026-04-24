import mysql from 'mysql2/promise';
import { DB_PASS, DB_HOSTNAME, DB_NAME, DB_USER } from '$env/static/private';

const pool = mysql.createPool({
  host: DB_HOSTNAME,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Ejecuta una consulta con parámetros (prepared statement).
 * @param {string} query - Consulta SQL con ?
 * @param {Array} params - Parámetros para reemplazar ?
 * @returns {Promise<any>} - Resultado de la consulta
 */
export async function query(query, params = []) {
  const [rows] = await pool.execute(query, params);
  return rows;
}

