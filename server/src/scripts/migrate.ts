import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const requiredVariables = ["PG_USER", "PG_PASSWORD", "PG_DATABASE"] as const;
const missingVariables = requiredVariables.filter(
  (name) => !process.env[name]
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing database environment variables: ${missingVariables.join(", ")}`
  );
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

async function migrate(): Promise<void> {
  const migrationsDirectory = path.resolve(process.cwd(), "migrations");
  const migrationFiles = (await fs.readdir(migrationsDirectory))
    .filter((fileName) => fileName.endsWith(".sql"))
    .sort();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  for (const fileName of migrationFiles) {
    const applied = await pool.query<{ name: string }>(
      "SELECT name FROM schema_migrations WHERE name = $1",
      [fileName]
    );

    if (applied.rowCount !== 0) {
      console.log(`Skipping ${fileName}`);
      continue;
    }

    const sql = await fs.readFile(
      path.join(migrationsDirectory, fileName),
      "utf8"
    );
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (name) VALUES ($1)",
        [fileName]
      );
      await client.query("COMMIT");
      console.log(`Applied ${fileName}`);
    } catch (error: unknown) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

migrate()
  .catch((error: unknown) => {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
