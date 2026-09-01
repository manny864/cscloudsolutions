import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let pool: mysql.Pool | null = null;

export function getDb() {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER || 'cscsadmin';
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE || 'cscloud_cms';
  const port = Number(process.env.MYSQL_PORT) || 3306;

  if (!host || !password) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  return drizzle(pool, { schema, mode: 'default' });
}

export { schema };
