"use server"

import { neon } from '@neondatabase/serverless';

export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get('email')?.toString();
  
  if (!email) {
    return { success: false, error: 'El correo es requerido' };
  }

  try {
    // Neon requiere la variable de entorno DATABASE_URL que te darán al crear la BD
    if (!process.env.DATABASE_URL) {
      throw new Error("Falta la variable DATABASE_URL");
    }

    const sql = neon(process.env.DATABASE_URL);

    // Inserta el correo en la tabla "waitlist".
    await sql`
      INSERT INTO waitlist (email) 
      VALUES (${email}) 
      ON CONFLICT (email) DO NOTHING;
    `;
    
    return { success: true, message: '¡Suscripción exitosa!' };
  } catch (error) {
    console.error('Error guardando en la DB:', error);
    return { success: false, error: 'Hubo un error al suscribirte. Intenta de nuevo.' };
  }
}
