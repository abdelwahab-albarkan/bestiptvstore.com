import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BAD_BOTS = ['semrushbot', 'ahrefsbot', 'mj12bot', 'dotbot'];

export function middleware(request: NextRequest) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();

  // Explicitly whitelist Googlebot & major verified search engine crawlers
  const isSearchEngineBot =
    userAgent.includes('googlebot') ||
    userAgent.includes('google-inspectiontool') ||
    userAgent.includes('bingbot') ||
    userAgent.includes('applebot');

  // 1. Block known aggressive scrapers / bad bots by user-agent (403 Forbidden)
  if (!isSearchEngineBot && BAD_BOTS.some((bot) => userAgent.includes(bot))) {
    return new NextResponse('Access denied: Automated scraper blocked.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const { pathname, search } = request.nextUrl;

  // 2. Bypass redirects for Next.js internals, static assets, and API routes
  const isExcluded =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.includes('.');

  if (!isExcluded) {
    const rawHost = request.headers.get('host') || request.nextUrl.host || '';
    const isWww = rawHost.toLowerCase().startsWith('www.');
    const isLocalhost =
      rawHost.includes('localhost') ||
      rawHost.includes('127.0.0.1') ||
      rawHost.startsWith('192.168.') ||
      rawHost.startsWith('10.');

    // Identify protocol from x-forwarded-proto or fallback to url.protocol
    const forwardedProto = request.headers.get('x-forwarded-proto');
    const currentProto = forwardedProto || request.nextUrl.protocol.replace(':', '') || 'https';

    // In production, enforce HTTPS if request came via HTTP
    const shouldEnforceHttps =
      !isLocalhost &&
      process.env.NODE_ENV === 'production' &&
      currentProto === 'http';

    // Target host: remove 'www.' prefix if present
    const targetHost = isWww ? rawHost.replace(/^www\./i, '') : rawHost;

    // Target protocol: HTTPS in production if on HTTP
    const targetProto = shouldEnforceHttps ? 'https' : currentProto;

    // Target path: strip trailing slash (except root '/')
    let cleanPath = pathname;
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.replace(/\/+$/, '');
    }

    // Target path: normalize uppercase characters to lowercase
    const lowerPath = cleanPath.toLowerCase();
    if (cleanPath !== lowerPath) {
      cleanPath = lowerPath;
    }

    // Check if any normalization rule was triggered
    const needsHostRedirect = isWww;
    const needsProtoRedirect = shouldEnforceHttps;
    const needsPathRedirect = cleanPath !== pathname;

    if (needsHostRedirect || needsProtoRedirect || needsPathRedirect) {
      // Assemble the single-hop 301 redirect destination preserving search query
      const destination = `${targetProto}://${targetHost}${cleanPath}${search}`;

      // Prevent redirect loops: only redirect if destination differs from incoming URL
      const currentUrl = `${currentProto}://${rawHost}${pathname}${search}`;
      if (destination !== currentUrl) {
        return NextResponse.redirect(destination, 301);
      }
    }
  }

  // 3. Pass x-pathname header so server components can read the path if needed
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next (Next.js internals)
     * - api/health (health endpoint)
     * - favicon.ico (favicon)
     * - images (static images directory)
     * - robots.txt (search crawler rules)
     * - sitemap.xml (search sitemap)
     */
    '/((?!_next|api/health|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
};

