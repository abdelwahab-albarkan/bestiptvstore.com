import { describe, it, expect } from 'vitest';
import {
  getPricingPlans,
  getChannelCategories,
  getFaqs,
  getTestimonials,
  getFeatures,
  getBrandConfig,
} from '../loaders';
import {
  ServicePlanSchema,
  ChannelSchema,
  FAQItemSchema,
  TestimonialSchema,
  BrandConfigSchema,
} from '../types';

describe('Data Layer Loaders & Schema Validation', () => {
  describe('getPricingPlans()', () => {
    it('should successfully load and validate all pricing plans from project-data', () => {
      const plans = getPricingPlans();
      expect(Array.isArray(plans)).toBe(true);
      expect(plans.length).toBe(3);

      // Verify exact plans and order
      expect(plans.map((p) => p.id)).toEqual(['3-months', '6-months', '12-months']);
      expect(plans.map((p) => p.price)).toEqual([39.99, 56.99, 79.99]);

      // Verify the 12-months plan has bestValue and popular
      const plan12 = plans.find((p) => p.id === '12-months');
      expect(plan12?.isBestValue).toBe(true);
      expect(plan12?.isPopular).toBe(true);

      plans.forEach((plan) => {
        expect(plan.id).toBeDefined();
        expect(plan.name).toBeDefined();
        expect(plan.price).toBeGreaterThan(0);
        expect(plan.months).toBeGreaterThan(0);
        expect(plan.monthlyEquivalent).toBeGreaterThan(0);
        expect(Array.isArray(plan.features)).toBe(true);
        expect(plan.features.length).toBe(9);
        expect(plan.pricesByAccounts).toBeDefined();
        expect(plan.pricesByAccounts['1']).toBe(plan.price);
      });
    });

    it('should fail schema validation if required fields in a plan are missing', () => {
      const invalidPlan = {
        id: 'invalid-plan',
        // missing name, months, price, features
      };
      const result = ServicePlanSchema.safeParse(invalidPlan);
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map((i) => i.path[0]);
        expect(paths).toContain('name');
        expect(paths).toContain('price');
        expect(paths).toContain('months');
        expect(paths).toContain('features');
      }
    });

    it('should fail validation if price is zero or negative', () => {
      const invalidPricePlan = {
        id: 'bad-price',
        name: 'Free Hack',
        duration: '1 Month',
        months: 1,
        price: -10, // Invalid: negative
        monthlyEquivalent: 0, // Invalid: must be positive
        savingsPercent: 0,
        connections: 1,
        pricesByAccounts: { '1': -10 },
        features: ['Some feature'],
      };
      const result = ServicePlanSchema.safeParse(invalidPricePlan);
      expect(result.success).toBe(false);
    });
  });

  describe('getChannelCategories()', () => {
    it('should load channel categories and their listed channels', () => {
      const categories = getChannelCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);

      categories.forEach((cat) => {
        expect(cat.id).toBeDefined();
        expect(cat.name).toBeDefined();
        expect(cat.badge).toBeDefined();
        expect(Array.isArray(cat.channels)).toBe(true);
        expect(cat.channels.length).toBeGreaterThan(0);

        cat.channels.forEach((ch) => {
          expect(ch.name).toBeDefined();
          expect(ch.resolution).toBeDefined();
          expect(ch.category).toBeDefined();
        });
      });
    });

    it('should fail schema validation on channel missing resolution or name', () => {
      const invalidChannel = {
        name: '', // Empty string fails
        resolution: '4K',
        category: 'Sports',
      };
      const result = ChannelSchema.safeParse(invalidChannel);
      expect(result.success).toBe(false);
    });
  });

  describe('getFaqs()', () => {
    it('should load all FAQs with valid questions and answers', () => {
      const faqs = getFaqs();
      expect(Array.isArray(faqs)).toBe(true);
      expect(faqs.length).toBeGreaterThan(0);

      faqs.forEach((faq) => {
        expect(faq.id).toBeDefined();
        expect(faq.question.length).toBeGreaterThanOrEqual(5);
        expect(faq.answer.length).toBeGreaterThanOrEqual(10);
        expect(['general', 'devices', 'channels', 'troubleshooting', 'billing']).toContain(faq.category);
      });
    });

    it('should fail schema validation if answer is missing or too short', () => {
      const invalidFaq = {
        id: 'faq-bad',
        question: 'Is this real?',
        answer: 'No', // too short (< 10 chars)
      };
      const result = FAQItemSchema.safeParse(invalidFaq);
      expect(result.success).toBe(false);
    });
  });

  describe('getTestimonials()', () => {
    it('should load real customer reviews with verified flag and rating between 1 and 5', () => {
      const reviews = getTestimonials();
      expect(Array.isArray(reviews)).toBe(true);
      expect(reviews.length).toBeGreaterThan(0);

      reviews.forEach((rev) => {
        expect(rev.id).toBeDefined();
        expect(rev.name).toBeDefined();
        expect(rev.location).toBeDefined();
        expect(rev.rating).toBeGreaterThanOrEqual(1);
        expect(rev.rating).toBeLessThanOrEqual(5);
        expect(rev.verified).toBe(true);
        expect(rev.avatar.startsWith('/images/')).toBe(true);
      });
    });

    it('should fail schema validation if rating is out of bounds', () => {
      const invalidReview = {
        id: 'rev-bad',
        name: 'John Doe',
        location: 'New York',
        avatar: '/images/avatar.webp',
        rating: 6, // Out of bounds (> 5)
        device: 'Firestick',
        date: 'Today',
        title: 'Super',
        comment: 'This is a long enough review comment here.',
        verified: true,
      };
      const result = TestimonialSchema.safeParse(invalidReview);
      expect(result.success).toBe(false);
    });
  });

  describe('getFeatures()', () => {
    it('should load core technical features', () => {
      const features = getFeatures();
      expect(Array.isArray(features)).toBe(true);
      expect(features.length).toBe(6);

      features.forEach((feat) => {
        expect(feat.id).toBeDefined();
        expect(feat.title).toBeDefined();
        expect(feat.description).toBeDefined();
        expect(feat.icon).toBeDefined();
        expect(feat.badge).toBeDefined();
      });
    });
  });

  describe('getBrandConfig()', () => {
    it('should parse and validate brand configuration from brand.md', () => {
      const brand = getBrandConfig();
      expect(brand.name).toBe('IPTVSubs8K');
      expect(brand.domain).toBe('iptvprostar.com');
      expect(brand.url).toBe('https://iptvprostar.com');
      expect(brand.supportEmail).toBe('support@streamb4.com');
      expect(brand.primaryKeyword).toBe('Best IPTV USA');
      expect(Array.isArray(brand.secondaryKeywords)).toBe(true);
      expect(brand.secondaryKeywords.length).toBeGreaterThan(0);
    });

    it('should fail schema validation if support email is invalid', () => {
      const invalidBrand = {
        name: 'Brand',
        legalEntity: 'Entity',
        domain: 'brand.com',
        url: 'https://brand.com',
        targetMarket: 'US',
        tagline: 'Tagline',
        shortDescription: 'Short description with enough characters.',
        supportEmail: 'not-an-email', // Invalid email
        whatsappSupport: '+123456789',
        whatsappLink: 'https://wa.me/123456789',
        primaryKeyword: 'Keyword',
        secondaryKeywords: ['Sec'],
      };
      const result = BrandConfigSchema.safeParse(invalidBrand);
      expect(result.success).toBe(false);
    });
  });
});

