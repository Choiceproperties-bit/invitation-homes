import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://poqgtsltsziuwvzskgth.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcWd0c2x0c3ppdXd2enNrZ3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDU4NzcsImV4cCI6MjEwNjMyMTg3N30.c1yck8cVXksYxE1xVhPGw2Q6EQrLNbkI8IZXbQG-y3E';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function sendEmailViaBrevo({ to, subject, htmlContent, textContent }) {
  const apiKey = process.env.Bravo;
  if (!apiKey) {
    console.warn('Brevo (Bravo) API key not found in environment variables.');
    return { success: false, error: 'API key missing' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Invitation Homes', email: 'no-reply@invitation-homes.pages.dev' },
        to: [{ email: to }],
        subject,
        htmlContent,
        textContent
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Brevo API error:', data);
      return { success: false, error: data };
    }

    console.log('Email sent successfully via Brevo:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Failed to send email via Brevo:', err);
    return { success: false, error: err.message };
  }
}
