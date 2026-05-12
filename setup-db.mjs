import { neon } from '@neondatabase/serverless';
const sql = neon('postgresql://neondb_owner:npg_Gniw5cTghy6J@ep-green-sun-ach8he6f-pooler.sa-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require');

async function setup() {
  try {
    await sql
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    ;
    console.log("¡Tabla 'waitlist' creada exitosamente o ya existía!");
  } catch (err) {
    console.error("Error creando tabla:", err);
  }
}
setup();
