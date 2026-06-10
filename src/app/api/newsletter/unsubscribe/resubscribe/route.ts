import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return new NextResponse('Missing email parameter', { status: 400 });
    }

    // Update waitlist subscribed back to true
    await sql`
      UPDATE waitlist 
      SET subscribed = true 
      WHERE email = ${email}
    `;

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <title>Suscripción Restaurada - Selva Alta Roasters</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f9fafb; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; color: #111827; }
          .card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); text-align: center; max-width: 450px; border: 1px solid #e5e7eb; }
          .icon { font-size: 48px; margin-bottom: 20px; }
          h1 { color: #78350f; margin-top: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.025em; }
          p { font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 30px; }
          .email { font-weight: bold; color: #111827; }
          .btn-primary { display: inline-block; background: #78350f; color: white; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 15px; transition: background 0.2s; }
          .btn-primary:hover { background: #5c280b; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">🎉</div>
          <h1>¡Suscripción Restaurada!</h1>
          <p>Hemos vuelto a activar tu suscripción para el correo <span class="email">${email}</span>. Seguirás recibiendo nuestros boletines y avisos sobre café de especialidad.</p>
          <a href="/" class="btn-primary">Volver al Inicio</a>
        </div>
      </body>
      </html>
      `,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (error: any) {
    console.error('Error handling resubscribe:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
