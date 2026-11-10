import { SITE } from '@/lib/data/site';
import { ServicePlan, FAQItem, Testimonial } from '@/lib/data/types';

/**
 * Organization JSON-LD Generator
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/iptv/iptv-icon.webp`,
    sameAs: [
      SITE.whatsappUrl,
      'https://twitter.com/iptvsubs8k',
      'https://t.me/iptvsubs8k_support',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.whatsapp,
      email: SITE.email,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.stats.customerRating,
      reviewCount: SITE.stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

/**
 * WebSite JSON-LD Generator with SearchAction
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/channels?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product JSON-LD Generator for a given ServicePlan
 * Reads dynamically from the loaded plan object.
 */
export function productSchema(plan: ServicePlan) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${plan.name} IPTV Subscription — ${SITE.name}`,
    description: `Access +40,000 Live TV channels, +200,000 VODs in 4K/8K with AntiFreeze Technology™ for ${plan.duration}.`,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    offers: {
      '@type': 'Offer',
      price: plan.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE.url}/pricing`,
    },
  };
}

/**
 * FAQPage JSON-LD Generator
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList JSON-LD Generator
 */
export function breadcrumbSchema(items: { name: string; url?: string; item?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const targetUrl = item.url || item.item || '/';
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: targetUrl.startsWith('http') ? targetUrl : `${SITE.url}${targetUrl}`,
      };
    }),
  };
}

/**
 * Article JSON-LD Generator for Blog Posts
 */
export function articleSchema(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}) {
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE.url}${post.image}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    image: imageUrl,
    url: `${SITE.url}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/images/iptv/iptv-icon.webp`,
      },
    },
  };
}

/**
 * HowTo JSON-LD Generator for Device Setup Guides
 */
export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * Review / AggregateRating JSON-LD Generator
 */
export function reviewSchema(testimonials: Testimonial[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: SITE.stats.customerRating,
    reviewCount: testimonials.length > 0 ? SITE.stats.reviewCount : 0,
    bestRating: 5,
    worstRating: 1,
  };
}
