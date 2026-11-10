import { getAllPosts } from '@/lib/blog';
import { getAllSeoPages } from '@/lib/seo/pages';

export type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
};

export const MAX_TOTAL_PUBLIC_PAGES = 1000;

export const ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/channels', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/free-trial', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/setup', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/setup/firestick', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/setup/android', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/setup/ios', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/setup/smart-tv', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/setup/windows', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/setup/mac', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
  { path: '/directory', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Returns dynamic blog routes populated from the MDX blog loader.
 */
export async function getBlogRoutes(): Promise<RouteEntry[]> {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly',
      lastModified: new Date(post.frontmatter.date),
    }));
  } catch (err) {
    console.error('[getBlogRoutes Error]', err);
    return [];
  }
}

/**
 * Returns dynamic programmatic SEO routes populated from the SEO page plan database.
 * Enforces the strict maximum website limit of 1,000 public pages (accounting for core & blog routes).
 */
export async function getSeoRoutes(): Promise<RouteEntry[]> {
  try {
    const pages = getAllSeoPages();
    // Core (16) + Blog (5) = 21 non-programmatic public pages
    const maxSeoPages = Math.max(0, MAX_TOTAL_PUBLIC_PAGES - (ROUTES.length + 5));
    const activePages = pages.slice(0, maxSeoPages);

    return activePages.map((page) => {
      let priority = 0.7;
      if (page.priority.startsWith('P1')) priority = 0.9;
      else if (page.priority.startsWith('P2')) priority = 0.8;
      else if (page.priority.startsWith('P3')) priority = 0.7;
      else if (page.priority.startsWith('P4')) priority = 0.6;

      return {
        path: `/${page.slug}`,
        priority,
        changeFrequency: 'weekly',
        lastModified: new Date('2026-11-06'),
      };
    });
  } catch (err) {
    console.error('[getSeoRoutes Error]', err);
    return [];
  }
}
