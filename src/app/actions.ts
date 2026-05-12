"use server"

import { sql } from '@vercel/postgres';

export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get('email')?.toString();
  
  if (!email) {
    return { success: false, error: 'El correo es requerido' };
  }

  try {
    // Inserta el correo en la tabla "waitlist".
    // "ON CONFLICT" evita que de error si alguien registra el mismo correo 2 veces.
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
