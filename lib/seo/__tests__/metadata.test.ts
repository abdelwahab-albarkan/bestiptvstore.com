import { describe, it, expect } from 'vitest';
import { normalizeCanonicalPath, getCanonicalUrl, buildMetadata } from '@/lib/seo/metadata';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { SITE } from '@/lib/data/site';

describe('SEO Metadata & Canonical Utility Tests', () => {
  describe('normalizeCanonicalPath', () => {
    it('normalizes root path to empty string', () => {
      expect(normalizeCanonicalPath('/')).toBe('');
      expect(normalizeCanonicalPath('')).toBe('');
      expect(normalizeCanonicalPath('   ')).toBe('');
    });

    it('strips query parameters from path', () => {
      expect(normalizeCanonicalPath('/pricing?utm_source=facebook&utm_campaign=winter')).toBe('/pricing');
      expect(normalizeCanonicalPath('/channels?search=sports')).toBe('/channels');
    });

    it('strips hash fragments from path', () => {
      expect(normalizeCanonicalPath('/pricing#faq')).toBe('/pricing');
      expect(normalizeCanonicalPath('/setup/firestick#step-1')).toBe('/setup/firestick');
    });

    it('strips trailing slashes from deep paths', () => {
      expect(normalizeCanonicalPath('/pricing/')).toBe('/pricing');
      expect(normalizeCanonicalPath('/setup/firestick/')).toBe('/setup/firestick');
      expect(normalizeCanonicalPath('/best-iptv-usa-firestick///')).toBe('/best-iptv-usa-firestick');
    });

    it('adds leading slash if omitted', () => {
      expect(normalizeCanonicalPath('pricing')).toBe('/pricing');
      expect(normalizeCanonicalPath('best-iptv-usa-firestick')).toBe('/best-iptv-usa-firestick');
    });
  });

  describe('getCanonicalUrl', () => {
    it('generates clean root canonical pointing to SITE.url', () => {
      expect(getCanonicalUrl('/')).toBe('https://bestiptvstore.com');
      expect(getCanonicalUrl('')).toBe('https://bestiptvstore.com');
    });

    it('generates absolute canonical URL with no trailing slashes or queries', () => {
      expect(getCanonicalUrl('/pricing/')).toBe('https://bestiptvstore.com/pricing');
      expect(getCanonicalUrl('/pricing?gclid=123')).toBe('https://bestiptvstore.com/pricing');
      expect(getCanonicalUrl('/best-iptv-usa-firestick/')).toBe('https://bestiptvstore.com/best-iptv-usa-firestick');
    });
  });

  describe('buildMetadata', () => {
    it('generates correct canonical alternate and openGraph URL', () => {
      const meta = buildMetadata({
        title: 'Best IPTV Pricing',
        description: 'Test Description',
        path: '/pricing?foo=bar',
      });

      expect(meta.alternates?.canonical).toBe('https://bestiptvstore.com/pricing');
      expect(meta.openGraph?.url).toBe('https://bestiptvstore.com/pricing');
      expect(meta.robots).toMatchObject({
        index: true,
        follow: true,
      });
    });

    it('applies noindex and nofollow when noIndex is true', () => {
      const meta = buildMetadata({
        title: 'Secret Page',
        description: 'Private',
        path: '/private',
        noIndex: true,
      });

      expect(meta.robots).toMatchObject({
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      });
    });
  });

  describe('robots.ts verification', () => {
    it('returns valid Robots configuration matching technical SEO guidelines and allows Googlebot', () => {
      const result = robots();
      expect(result.sitemap).toBe('https://bestiptvstore.com/sitemap.xml');
      expect(result.host).toBe('https://bestiptvstore.com');
      
      const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
      
      // 1. Googlebot rule
      const googlebotRule = rules.find((r) => r.userAgent === 'Googlebot');
      expect(googlebotRule).toBeDefined();
      expect(googlebotRule?.allow).toBe('/');
      expect(googlebotRule?.disallow).toContain('/api/');
      expect(googlebotRule?.disallow).toContain('/admin/');
      expect(googlebotRule?.disallow).toContain('/checkout/');
      expect(googlebotRule?.disallow).not.toContain('/_next/');

      // 2. Googlebot-Image rule
      const googlebotImageRule = rules.find((r) => r.userAgent === 'Googlebot-Image');
      expect(googlebotImageRule).toBeDefined();
      expect(googlebotImageRule?.allow).toBe('/');

      // 3. Catch-all rule
      const genericRule = rules.find((r) => r.userAgent === '*');
      expect(genericRule).toBeDefined();
      expect(genericRule?.allow).toBe('/');
      expect(genericRule?.disallow).not.toContain('/_next/');
    });
  });

  describe('sitemap.ts verification', () => {
    it('returns exactly 1,000 indexable URLs with absolute canonical format', async () => {
      const entries = await sitemap();
      // Enforce the strict website cap of 1,000 public pages
      expect(entries.length).toBe(1000);

      // Verify no duplicate URLs exist
      const urls = entries.map((e) => e.url);
      const uniqueUrls = new Set(urls);
      expect(uniqueUrls.size).toBe(1000);

      // Verify every URL starts with https://bestiptvstore.com
      for (const entry of entries) {
        expect(entry.url.startsWith('https://bestiptvstore.com')).toBe(true);
        expect(entry.url).not.toContain('?');
        expect(entry.url).not.toContain('#');
        // No trailing slash unless it's root domain
        if (entry.url !== 'https://bestiptvstore.com') {
          expect(entry.url.endsWith('/')).toBe(false);
        }
      }

      // Verify core routes are present
      expect(urls).toContain('https://bestiptvstore.com');
      expect(urls).toContain('https://bestiptvstore.com/pricing');
      expect(urls).toContain('https://bestiptvstore.com/channels');
      expect(urls).toContain('https://bestiptvstore.com/directory');
    });
  });
});
