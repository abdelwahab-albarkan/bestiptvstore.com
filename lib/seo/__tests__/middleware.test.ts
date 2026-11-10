import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

describe('Middleware SEO Redirect & Normalization Tests', () => {
  it('redirects trailing slash to non-trailing slash with 301', () => {
    const req = new NextRequest('https://bestiptvstore.com/pricing/', {
      headers: { host: 'bestiptvstore.com' },
    });
    const res = middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://bestiptvstore.com/pricing');
  });

  it('redirects uppercase URL to lowercase with 301', () => {
    const req = new NextRequest('https://bestiptvstore.com/Pricing', {
      headers: { host: 'bestiptvstore.com' },
    });
    const res = middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://bestiptvstore.com/pricing');
  });

  it('redirects www to non-www in a single 301 hop', () => {
    const req = new NextRequest('https://www.bestiptvstore.com/pricing', {
      headers: { host: 'www.bestiptvstore.com' },
    });
    const res = middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://bestiptvstore.com/pricing');
  });

  it('normalizes www, uppercase, and trailing slash in a single hop (no chains)', () => {
    const req = new NextRequest('https://www.bestiptvstore.com/Pricing/?utm_source=seo', {
      headers: { host: 'www.bestiptvstore.com' },
    });
    const res = middleware(req);
    expect(res.status).toBe(301);
    // Everything resolved in ONE hop
    expect(res.headers.get('location')).toBe('https://bestiptvstore.com/pricing?utm_source=seo');
  });

  it('preserves query strings during redirection', () => {
    const req = new NextRequest('https://bestiptvstore.com/pricing/?gclid=xyz123', {
      headers: { host: 'bestiptvstore.com' },
    });
    const res = middleware(req);
    expect(res.status).toBe(301);
    expect(res.headers.get('location')).toBe('https://bestiptvstore.com/pricing?gclid=xyz123');
  });

  it('does not redirect valid canonical URL', () => {
    const req = new NextRequest('https://bestiptvstore.com/pricing', {
      headers: { host: 'bestiptvstore.com' },
    });
    const res = middleware(req);
    // Should be next() with status 200 (not 301)
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('bypasses API, sitemap, and robots requests', () => {
    const reqRobots = new NextRequest('https://bestiptvstore.com/robots.txt', {
      headers: { host: 'bestiptvstore.com' },
    });
    expect(middleware(reqRobots).status).toBe(200);

    const reqSitemap = new NextRequest('https://bestiptvstore.com/sitemap.xml', {
      headers: { host: 'bestiptvstore.com' },
    });
    expect(middleware(reqSitemap).status).toBe(200);

    const reqApi = new NextRequest('https://bestiptvstore.com/api/health', {
      headers: { host: 'bestiptvstore.com' },
    });
    expect(middleware(reqApi).status).toBe(200);
  });

  it('never blocks Googlebot or Google-InspectionTool crawler', () => {
    const reqGooglebot = new NextRequest('https://bestiptvstore.com/pricing', {
      headers: {
        host: 'bestiptvstore.com',
        'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });
    const res = middleware(reqGooglebot);
    expect(res.status).toBe(200);
    expect(res.status).not.toBe(403);

    const reqInspectionTool = new NextRequest('https://bestiptvstore.com/channels', {
      headers: {
        host: 'bestiptvstore.com',
        'user-agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)',
      },
    });
    const resTool = middleware(reqInspectionTool);
    expect(resTool.status).toBe(200);
    expect(resTool.status).not.toBe(403);
  });
});

