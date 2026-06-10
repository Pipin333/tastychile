import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendNewsletterCampaign } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // 1. Verify authorization header using the secret
    const authHeader = request.headers.get('Authorization');
    const secret = process.env.NEWSLETTER_API_SECRET;

    if (!secret || !authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Valid bearer token required.' }, { status: 401 });
    }

    // 2. Parse request body
    const body = await request.json();
    const { subject, htmlContent } = body;

    if (!subject || !htmlContent) {
      return NextResponse.json({ success: false, error: 'Both subject and htmlContent are required fields.' }, { status: 400 });
    }

    // 3. Fetch active subscribers from waitlist table
    const subscribers = await sql`
      SELECT email FROM waitlist WHERE subscribed = true
    `;

    if (subscribers.length === 0) {
      return NextResponse.json({ success: true, message: 'No active subscribers found in waitlist.', sent: 0, failed: 0, total: 0 });
    }

    console.log(`[Newsletter Campaign] Starting campaign "${subject}" for ${subscribers.length} subscribers.`);

    // 4. Send the campaign emails with rate-limiting handled inside
    const result = await sendNewsletterCampaign(subject, htmlContent, subscribers as Array<{ email: string }>);

    console.log(`[Newsletter Campaign] Campaign finished. Sent: ${result.sent}, Failed: ${result.failed}, Total: ${result.total}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Campaign processed successfully.',
      sent: result.sent,
      failed: result.failed,
      total: result.total
    });

  } catch (error: any) {
    console.error('Error sending newsletter campaign:', error);
    return NextResponse.json({ success: false, error: error.message || 'Error occurred during newsletter campaign' }, { status: 500 });
  }
}
