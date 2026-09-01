import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let pool: mysql.Pool | null = null;
let tablesInitialized = false;

export async function ensureTablesExist() {
  if (tablesInitialized) return;
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER || 'finops_admin';
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE || 'cscloud_cms';
  const port = Number(process.env.MYSQL_PORT) || 3306;

  if (!host || !password) return;

  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port,
      ssl: {
        rejectUnauthorized: true,
      },
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`posts\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`slug\` VARCHAR(255) NOT NULL UNIQUE,
        \`featured_image\` TEXT,
        \`author\` VARCHAR(255) NOT NULL DEFAULT 'CSCloud Solutions Team',
        \`tags\` JSON,
        \`status\` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'published',
        \`published_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`post_translations\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`post_id\` INT NOT NULL,
        \`locale\` VARCHAR(10) NOT NULL,
        \`title\` VARCHAR(255) NOT NULL,
        \`description\` TEXT NOT NULL,
        \`content\` LONGTEXT NOT NULL,
        \`seo_title\` VARCHAR(255),
        \`seo_description\` TEXT,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_post_locale\` (\`post_id\`, \`locale\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`media_assets\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`filename\` VARCHAR(255) NOT NULL,
        \`blob_url\` TEXT NOT NULL,
        \`size_bytes\` INT DEFAULT 0,
        \`mime_type\` VARCHAR(100) DEFAULT 'image/jpeg',
        \`uploaded_by\` VARCHAR(255) DEFAULT 'admin',
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`site_sections\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`section_key\` VARCHAR(100) NOT NULL,
        \`locale\` VARCHAR(10) NOT NULL,
        \`content_json\` JSON NOT NULL,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY \`uk_section_locale\` (\`section_key\`, \`locale\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await connection.end();
    tablesInitialized = true;
    console.log('[MySQL Init] Tablas del CMS creadas o verificadas exitosamente.');
  } catch (error) {
    console.error('[MySQL Init Error]:', error);
  }
}

export function getDb() {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER || 'finops_admin';
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

    // Auto-inicializar tablas en segundo plano
    ensureTablesExist().catch(console.error);
  }

  return drizzle(pool, { schema, mode: 'default' });
}

export { schema };
