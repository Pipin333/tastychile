"use server"

import { neon } from '@neondatabase/serverless';

export async function addContactToWaitlist(formData: FormData) {
  const email = formData.get('email')?.toString();
  
  if (!email) {
    return { success: false, error: 'El correo es requerido' };
  }

  try {
    // Vercel y Neon inyectan ahora la variable DATABASE_URL o POSTGRES_URL 
    // y suelen anteponer el prefijo de tu proyecto. En tu caso, Vercel agregó "TASTY_".
    const dbUrl = process.env.DATABASE_URL 
      || process.env.POSTGRES_URL 
      || process.env.TASTY_DATABASE_URL 
      || process.env.TASTY_POSTGRES_URL;

    if (!dbUrl) {
      throw new Error("Faltan las variables de conexión a la base de datos");
    }

    const sql = neon(dbUrl);

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

export async function addB2BContact(formData: FormData) {
  const name = formData.get('name')?.toString();
  const company = formData.get('company')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString() || '';
  
  if (!name || !company || !email) {
    return { success: false, error: 'Nombre, empresa y correo son obligatorios' };
  }

  try {
    const dbUrl = process.env.DATABASE_URL 
      || process.env.POSTGRES_URL 
      || process.env.TASTY_DATABASE_URL 
      || process.env.TASTY_POSTGRES_URL;

    if (!dbUrl) {
      throw new Error("Faltan las variables de conexión a la base de datos");
    }

    const sql = neon(dbUrl);

    await sql`
      INSERT INTO b2b_contacts (name, company, email, message) 
      VALUES (${name}, ${company}, ${email}, ${message})
    `;
    
    return { success: true, message: '¡Mensaje enviado! Nos contactaremos a la brevedad.' };
  } catch (error) {
    console.error('Error guardando contacto B2B:', error);
    return { success: false, error: 'Hubo un error al enviar tu mensaje. Intenta de nuevo.' };
  }
}
