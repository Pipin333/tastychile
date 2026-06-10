import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Error - Selva Alta Roasters</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: sans-serif; background: #f9fafb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #374151; }
            .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); text-align: center; max-width: 400px; border: 1px solid #e5e7eb; }
            h1 { color: #b45309; margin-top: 0; font-size: 24px; }
            p { font-size: 14px; line-height: 1.5; color: #6b7280; margin-bottom: 24px; }
            a { display: inline-block; background: #78350f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>⚠️ Enlace Inválido</h1>
            <p>No se especificó un correo electrónico de desuscripción válido.</p>
            <a href="/">Ir al Inicio</a>
          </div>
        </body>
        </html>
        `,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    // Update waitlist subscribed to false
    await sql`
      UPDATE waitlist 
      SET subscribed = false 
      WHERE email = ${email}
    `;

    // Render unsubscribe confirmation html page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Desuscripción Exitosa - Selva Alta Roasters</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f9fafb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #111827; }
          .card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); text-align: center; max-width: 450px; border: 1px solid #e5e7eb; }
          .icon { font-size: 48px; margin-bottom: 20px; }
          h1 { color: #78350f; margin-top: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.025em; }
          p { font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 30px; }
          .email { font-weight: bold; color: #111827; }
          .btn-group { display: flex; flex-direction: column; gap: 10px; }
          .btn-primary { display: inline-block; background: #78350f; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 15px; transition: background 0.2s; }
          .btn-primary:hover { background: #5c280b; }
          .btn-secondary { display: inline-block; color: #78350f; padding: 10px 20px; text-decoration: none; font-weight: 600; font-size: 14px; }
          .btn-secondary:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">📬</div>
          <h1>Suscripción Cancelada</h1>
          <p>El correo <span class="email">${email}</span> ha sido desuscrito de nuestras campañas masivas y boletines. No recibirás más correos publicitarios de Selva Alta.</p>
          <div class="btn-group">
            <a href="/" class="btn-primary">Volver al Inicio</a>
            <!-- Simple query to let them resubscribe -->
            <a href="/api/newsletter/unsubscribe/resubscribe?email=${encodeURIComponent(email)}" class="btn-secondary">¿Fue un error? Volver a suscribirme</a>
          </div>
        </div>
      </body>
      </html>
      `,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (error: any) {
    console.error('Error handling unsubscribe:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
