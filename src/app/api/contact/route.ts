import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Required for Resend - cannot use sender's email directly
      replyTo: email, // This allows you to reply directly to the sender
      to: 'amarpandey2502@gmail.com', // Update this with your email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Contact form submission error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 