import type { Metadata } from 'next';
import { SITE } from '@/lib/data/site';

export interface BuildMetadataParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Normalizes a URL path to prevent duplicate content, trailing slash mismatches,
 * and stray query strings or hash fragments in canonical tags.
 */
export function normalizeCanonicalPath(rawPath: string): string {
  if (!rawPath) return '';
  // Strip query strings and hash anchors
  const [withoutQuery] = rawPath.split('?');
  const [withoutHash] = withoutQuery.split('#');
  const trimmed = withoutHash.trim();

  // Root path
  if (!trimmed || trimmed === '/') {
    return '';
  }

  // Ensure leading slash and remove any trailing slashes
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

/**
 * Centralized absolute canonical URL generator.
 * Strips queries, fragments, and trailing slashes while anchoring to the official SITE.url.
 */
export function getCanonicalUrl(rawPath: string): string {
  const normalizedPath = normalizeCanonicalPath(rawPath);
  return `${SITE.url}${normalizedPath}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = '/images/packimages2/lucid-origin_Photorealistic_American_living_room_in_the_evening_a_group_of_friends_cheering_i-0.webp',
  noIndex = false,
  keywords,
}: BuildMetadataParams): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`;

  // Use absolute title for root to prevent double branding; use template for child routes
  const titleConfig =
    path === '/'
      ? {
          default: title,
          template: `%s | ${SITE.name}`,
        }
      : title.includes(SITE.name)
      ? { absolute: title }
      : {
          default: title,
          template: `%s | ${SITE.name}`,
        };

  return {
    metadataBase: new URL(SITE.url),
    title: titleConfig,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
