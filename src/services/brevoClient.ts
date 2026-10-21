export interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

export async function sendEmailViaBrevo({ to, subject, htmlContent, textContent }: EmailOptions) {
  const apiKey = (process.env as any).BREVO_API_KEY || (process.env as any).Bravo;
  if (!apiKey) {
    console.warn('Brevo API key not found in environment variables.');
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
  } catch (err: any) {
    console.error('Failed to send email via Brevo:', err);
    return { success: false, error: err?.message ?? String(err) };
  }
}
