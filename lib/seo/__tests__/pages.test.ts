import { describe, it, expect } from 'vitest';
import { getAllSeoPages, getSeoPageBySlug, getAllSeoPageSlugs } from '../pages';

describe('SEO Pages Engine (Programmatic 979 Pages)', () => {
  it('loads all 979 SEO pages from master database', () => {
    const pages = getAllSeoPages();
    expect(pages.length).toBe(979);
  });

  it('guarantees 100% unique slugs across all pages', () => {
    const slugs = getAllSeoPageSlugs();
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(979);
  });

  it('retrieves specific pages by slug with complete metadata and content', () => {
    const tivimate = getSeoPageBySlug('tivimate-companion');
    expect(tivimate).toBeDefined();
    expect(tivimate?.primaryKeyword).toBe('tivimate companion');
    expect(tivimate?.silo).toBe('Apps & Players');
    expect(tivimate?.schemaType).toBe('HowTo');
    expect(tivimate?.faqs.length).toBeGreaterThanOrEqual(3);
    expect(tivimate?.relatedSlugs.length).toBe(6);

    const pricing = getSeoPageBySlug('cheap-iptv-service');
    expect(pricing).toBeDefined();
    expect(pricing?.silo).toBe('Pricing & Value');
    expect(pricing?.schemaType).toBe('Product');
  });

  it('ensures each page has valid breadcrumbs and SEO tags', () => {
    const pages = getAllSeoPages();
    pages.forEach((p) => {
      expect(p.metaTitle.length).toBeGreaterThan(10);
      expect(p.metaDescription.length).toBeGreaterThan(50);
      expect(p.h1.length).toBeGreaterThan(10);
      expect(p.breadcrumbs.length).toBe(3);
      expect(p.sections.steps.steps.length).toBeGreaterThanOrEqual(4);
    });
  });
});

