import { describe, it, expect } from 'vitest';
import { SITE } from '@/lib/data/site';
import { getPricingPlans } from '@/lib/data/loaders';
import {
  organizationSchema,
  websiteSchema,
  productSchema,
  faqSchema,
  breadcrumbSchema,
  articleSchema,
  howToSchema,
  reviewSchema,
} from '../schema';
import { FAQItem, Testimonial } from '@/lib/data/types';

describe('SEO Schema & JSON-LD Generators', () => {
  it('organizationSchema returns @type "Organization" with name = SITE.name', () => {
    const schema = organizationSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe(SITE.name);
    expect(schema.url).toBe(SITE.url);
    expect(schema.contactPoint.email).toBe(SITE.email);
    expect(schema.aggregateRating.ratingValue).toBe(SITE.stats.customerRating);
  });

  it('websiteSchema returns @type "WebSite" with valid potentialAction SearchAction', () => {
    const schema = websiteSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe(SITE.name);
    expect(schema.potentialAction['@type']).toBe('SearchAction');
    expect(schema.potentialAction.target).toContain('/channels?q=');
  });

  it('productSchema(getPricingPlans()[0]) returns @type "Product" with offers.price = 39.99 (the 3-month plan)', () => {
    const plans = getPricingPlans();
    expect(plans.length).toBeGreaterThan(0);

    const firstPlan = plans[0];
    const schema = productSchema(firstPlan);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Product');
    expect(schema.name).toContain(firstPlan.name);
    expect(schema.brand.name).toBe(SITE.name);
    expect(schema.offers.price).toBe(39.99); // Confirms live reading of 3-month plan price $39.99
    expect(schema.offers.priceCurrency).toBe('USD');
    expect(schema.offers.availability).toBe('https://schema.org/InStock');
  });

  it('faqSchema with 2 items returns mainEntity length 2', () => {
    const sampleFaqs: FAQItem[] = [
      {
        id: 'faq-1',
        category: 'general',
        question: 'What is IPTVSubs8K?',
        answer: 'A premium 8K and 4K streaming service for US viewers.',
      },
      {
        id: 'faq-2',
        category: 'devices',
        question: 'Does it work on Firestick?',
        answer: 'Yes, it works natively on all Amazon Fire TV models.',
      },
    ];

    const schema = faqSchema(sampleFaqs);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(Array.isArray(schema.mainEntity)).toBe(true);
    expect(schema.mainEntity.length).toBe(2);
    expect(schema.mainEntity[0].name).toBe('What is IPTVSubs8K?');
    expect(schema.mainEntity[1].acceptedAnswer.text).toBe(
      'Yes, it works natively on all Amazon Fire TV models.'
    );
  });

  it('breadcrumbSchema returns itemListElement with correct positions', () => {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Setup Guides', url: '/setup' },
      { name: 'Firestick', url: '/setup/firestick' },
    ];

    const schema = breadcrumbSchema(breadcrumbs);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.length).toBe(3);

    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe('Home');
    expect(schema.itemListElement[0].item).toBe(`${SITE.url}/`);

    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe('Setup Guides');
    expect(schema.itemListElement[1].item).toBe(`${SITE.url}/setup`);

    expect(schema.itemListElement[2].position).toBe(3);
    expect(schema.itemListElement[2].name).toBe('Firestick');
    expect(schema.itemListElement[2].item).toBe(`${SITE.url}/setup/firestick`);
  });

  it('articleSchema generates valid Article JSON-LD', () => {
    const article = {
      title: 'How to Choose the Best IPTV Service in USA',
      description: 'Comprehensive 2026 technical guide for American cord cutters.',
      date: '2026-11-04',
      author: 'Streaming Desk',
      image: '/images/blog/best-iptv.webp',
      slug: 'how-to-choose-best-iptv',
    };

    const schema = articleSchema(article);
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe(article.title);
    expect(schema.url).toBe(`${SITE.url}/blog/${article.slug}`);
    expect(schema.publisher.name).toBe(SITE.name);
  });

  it('howToSchema generates valid HowTo JSON-LD with numbered steps', () => {
    const howTo = {
      name: 'Set up IPTV on Firestick',
      description: '3-minute setup instructions using Downloader.',
      steps: [
        { name: 'Download App', text: 'Install Downloader from Amazon Appstore.' },
        { name: 'Enter Code', text: 'Enter code 12345 to download TiviMate.' },
      ],
    };

    const schema = howToSchema(howTo);
    expect(schema['@type']).toBe('HowTo');
    expect(schema.name).toBe(howTo.name);
    expect(schema.step.length).toBe(2);
    expect(schema.step[0].position).toBe(1);
    expect(schema.step[1].position).toBe(2);
  });

  it('reviewSchema generates valid AggregateRating JSON-LD', () => {
    const sampleReviews: Testimonial[] = [
      {
        id: 'rev-1',
        name: 'John',
        location: 'Texas',
        avatar: '/images/avatar.webp',
        rating: 5,
        device: 'Firestick',
        date: '2026-10-24',
        title: 'Great',
        comment: 'Excellent stream with zero buffering.',
        verified: true,
      },
    ];

    const schema = reviewSchema(sampleReviews);
    expect(schema['@type']).toBe('AggregateRating');
    expect(schema.ratingValue).toBe(SITE.stats.customerRating);
    expect(schema.reviewCount).toBe(SITE.stats.reviewCount);
  });
});

