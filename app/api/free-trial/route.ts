import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Allowed streaming devices for free trial
const trialDeviceEnum = z.enum([
  'Firestick',
  'Android',
  'iOS',
  'Smart TV',
  'Windows',
  'Mac',
]);

const FreeTrialRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  device: trialDeviceEnum,
});

type FreeTrialRequest = z.infer<typeof FreeTrialRequestSchema>;

// In-memory rate limiting map: ip -> array of timestamps
// Note: In production multi-instance serverless deployments, move this to Upstash Redis or Cloudflare KV.
const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = 3;
const ONE_HOUR_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter((time) => now - time < ONE_HOUR_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_HOUR) {
    rateLimitMap.set(ip, recentTimestamps);
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Resolve client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = (forwarded ? forwarded.split(',')[0].trim() : null) || realIp || '127.0.0.1';

    // 2. Check rate limit (max 3 per hour per IP)
    const isAllowed = checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Maximum 3 trial requests per hour per IP. Please check your inbox or contact support.',
        },
        { status: 429 }
      );
    }

    // 3. Parse and validate JSON body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const validation = FreeTrialRequestSchema.safeParse(body);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString() || 'general';
        fieldErrors[fieldName] = issue.message;
      });

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, device } = validation.data;

    // 4. Operational dispatch configuration with safe fallbacks
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@streamb4.com';
    const resendApiKey = process.env.RESEND_API_KEY || '';

    // TODO: Connect to Resend when API key is configured in production environment
    // Example implementation:
    // if (resendApiKey) {
    //   const { Resend } = await import('resend');
    //   const resend = new Resend(resendApiKey);
    //   await resend.emails.send({
    //     from: `Support <${supportEmail}>`,
    //     to: [email],
    //     subject: 'Your 24-Hour IPTV Free Trial Activation Credentials',
    //     html: `<p>Hello ${name},</p><p>Your test line for ${device} is now active.</p>`,
    //   });
    // }

    console.log(`[FREE TRIAL DISPATCH] User: "${name}", Email: "${email}", Device: "${device}", IP: "${ip}", SenderFallback: "${supportEmail}", Timestamp: ${new Date().toISOString()}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Trial credentials will be sent to your email within 3 minutes.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[FREE TRIAL API ERROR]', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
