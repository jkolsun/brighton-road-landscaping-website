import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { ConfigurationContextImpl } from 'twilio/lib/rest/conversations/v1/configuration';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  const data = await request.json();
  const { name, phone, services, notes } = data;

  try {
    await client.messages.create({
      body: `New Quote Request!\nName: ${name}\nPhone: ${phone}\nServices: ${services}\nNotes: ${notes}`,
      from: '+18555086289',
      to: '+14845351936' 
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('SMS send failed:', err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

