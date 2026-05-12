import { neon } from '@neondatabase/serverless';

const dbUrl = 'postgresql://neondb_owner:npg_Gniw5cTghy6J@ep-green-sun-ach8he6f-pooler.sa-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require';
const sql = neon(dbUrl);

async function setup() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS b2b_contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("¡Tabla 'b2b_contacts' creada exitosamente o ya existía!");
  } catch (err) {
    console.error("Error creando tabla B2B:", err);
  }
}
setup();
