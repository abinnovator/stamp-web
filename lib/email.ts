export type SendEmailOptions = {
  to: string;
  subject: string;
  from?: string;
};

/**
 * Sends an email using the EmailTemplate via /api/send.
 * `from` defaults to the FROM_EMAIL env var, or the Resend test address for local dev.
 */
export async function sendEmail({
  to,
  subject,
  from = process.env.FROM_EMAIL ?? 'onboarding@resend.dev',
}: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, from }),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error('[sendEmail] Failed:', json.error);
    return { success: false, error: json.error };
  }

  return { success: true, id: json.id };
}
