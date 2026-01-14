import { Client, Pool } from 'pg';

const pool = new Pool({
  database: import.meta.env.VITE_PGDATABASE,//import.meta.env.PGDATABASE,
  user: import.meta.env.VITE_PGUSER,//import.meta.env.PGUSER,
  host: import.meta.env.VITE_PGHOST,
  port: Number(import.meta.env.VITE_PGPORT || 5433),
  password: import.meta.env.VITE_PGPASSWORD
});
export const connectToDB = async () => await pool.connect();
export const query = async (query) => await pool.query(query)