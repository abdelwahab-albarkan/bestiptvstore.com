import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data/site';
import { ROUTES, getBlogRoutes, getSeoRoutes } from '@/lib/seo/routes';
import { getCanonicalUrl } from '@/lib/seo/metadata';

export const revalidate = 86400; // Cache sitemap for 24 hours (ISR)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [dynamicBlogRoutes, seoRoutes] = await Promise.all([
    getBlogRoutes(),
    getSeoRoutes(),
  ]);

  // Aggregate all registered marketing, blog, and programmatic SEO routes
  const allRoutes = [...ROUTES, ...dynamicBlogRoutes, ...seoRoutes];
  const now = new Date();

  const seenUrls = new Set<string>();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of allRoutes) {
    if (!route || !route.path) continue;

    // Guard: exclude any internal, admin, or checkout routes from sitemap
    if (
      route.path.startsWith('/api') ||
      route.path.startsWith('/admin') ||
      route.path.startsWith('/checkout')
    ) {
      continue;
    }

    // Generate normalized absolute canonical URL
    const url = getCanonicalUrl(route.path);

    // Deduplicate URLs to avoid duplicate entries in sitemap XML
    if (seenUrls.has(url)) {
      continue;
    }
    seenUrls.add(url);

    sitemapEntries.push({
      url,
      lastModified: route.lastModified || now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  return sitemapEntries;
}

