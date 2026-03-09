import z from 'zod/v3';
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailSchema = z.object({
    from: z.string().min(1),
    subject: z.string(),
    to: z.string().email()
})


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = emailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Request Body" },
        { status: 400 }
      );
    }
    const {from,subject, to} = body;
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      react: EmailTemplate(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}