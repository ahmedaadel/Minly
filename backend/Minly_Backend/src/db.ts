import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'minly_db',
  connectionLimit: 10
});