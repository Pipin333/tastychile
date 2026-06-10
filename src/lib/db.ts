import { neon } from '@neondatabase/serverless';

const dbUrl = process.env.DATABASE_URL 
  || process.env.POSTGRES_URL 
  || process.env.TASTY_DATABASE_URL 
  || process.env.TASTY_POSTGRES_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL connection string is missing from environment variables.");
}

export const sql = neon(dbUrl);
