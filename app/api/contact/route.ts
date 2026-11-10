import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;
    console.log(`[CONTACT INQUIRY] From: ${name} (${email}), Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. Our support desk will reply within 2 hours.',
    });
  } catch (error) {
    console.error('Error handling contact request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

