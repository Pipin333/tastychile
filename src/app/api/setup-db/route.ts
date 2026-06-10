import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL 
      || process.env.POSTGRES_URL 
      || process.env.TASTY_DATABASE_URL 
      || process.env.TASTY_POSTGRES_URL;

    if (!dbUrl) {
      return NextResponse.json({ success: false, error: 'Database connection string not found' }, { status: 500 });
    }

    const sql = neon(dbUrl);

    // 1. Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        customer_address TEXT,
        customer_city VARCHAR(100),
        customer_region VARCHAR(100),
        items JSONB NOT NULL,
        subtotal INTEGER NOT NULL,
        shipping INTEGER DEFAULT 0,
        total INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        source VARCHAR(20) DEFAULT 'b2c',
        mp_preference_id VARCHAR(255),
        mp_payment_id VARCHAR(255),
        mp_payment_status VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Create b2b_contacts table if not exists (safeguard)
    await sql`
      CREATE TABLE IF NOT EXISTS b2b_contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Alter waitlist table to add new columns if they do not exist
    await sql`
      ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS subscribed BOOLEAN DEFAULT true;
    `;
    await sql`
      ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS name VARCHAR(255);
    `;
    await sql`
      ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS source VARCHAR(20) DEFAULT 'club';
    `;

    return NextResponse.json({ success: true, message: 'Database setup successfully completed!' });
  } catch (error: any) {
    console.error('Error setting up DB:', error);
    return NextResponse.json({ success: false, error: error.message || 'Error occurred during database setup' }, { status: 500 });
  }
}
