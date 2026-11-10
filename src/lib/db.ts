import { neon } from '@neondatabase/serverless';

const dbUrl = 
  process.env.DATABASE_URL || 
  process.env.POSTGRES_URL || 
  process.env.TASTY_DATABASE_URL || 
  process.env.TASTY_POSTGRES_URL;

type NeonClient = ReturnType<typeof neon>;
let sqlClient: NeonClient | null = null;

if (dbUrl) {
  try {
    sqlClient = neon(dbUrl);
  } catch (err) {
    console.warn('[DB] Error initializing Neon DB client. Fallback to mock DB mode.', err);
  }
} else {
  console.warn('[DB] No DATABASE_URL found. Running in Mago de Oz (simulated) storage mode.');
}

/**
 * Executes a SQL query if DB is available, or logs safely in Mago de Oz mode.
 */
export async function queryDatabase(strings: TemplateStringsArray, ...values: unknown[]): Promise<unknown> {
  if (sqlClient) {
    try {
      return await sqlClient(strings, ...values);
    } catch (error) {
      console.warn('[DB] SQL execution error, continuing in Mago de Oz mode:', error);
      return [];
    }
  }
  // Fallback mock
  return [];
}

export const sql = queryDatabase;
