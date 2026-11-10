import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import {
  ServicePlanSchema,
  ServicePlan,
  ChannelCategorySchema,
  ChannelCategory,
  FAQItemSchema,
  FAQItem,
  TestimonialSchema,
  Testimonial,
  FeatureItemSchema,
  FeatureItem,
  BrandConfigSchema,
  BrandConfig,
} from './types';

/**
 * Resolves the absolute path to the project-data directory.
 */
function getProjectDataDir(): string {
  // Support both standard cwd and potential nested directory executions
  const standardPath = path.join(process.cwd(), 'project-data');
  if (fs.existsSync(standardPath)) {
    return standardPath;
  }
  const fallbackPath = path.resolve(__dirname, '../../project-data');
  if (fs.existsSync(fallbackPath)) {
    return fallbackPath;
  }
  throw new Error(`[Data Loader Error] Could not locate /project-data directory at: ${standardPath}`);
}

/**
 * Generic helper to safely read and parse JSON data from /project-data.
 */
function loadJsonFile<T>(filename: string): T {
  const dir = getProjectDataDir();
  const filePath = path.join(dir, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`[Data Loader Error] Required data file is missing: ${filePath}`);
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawContent) as T;
  } catch (error) {
    throw new Error(
      `[Data Loader Error] Failed to parse JSON from file "${filename}": ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Loads and validates all subscription pricing plans from /project-data/plans.json
 */
export function getPricingPlans(): ServicePlan[] {
  const raw = loadJsonFile<unknown>('plans.json');
  const result = z.array(ServicePlanSchema).safeParse(raw);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] plans.json: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Loads and validates channel categories and individual channel listings from /project-data/channels.json
 */
export function getChannelCategories(): ChannelCategory[] {
  const raw = loadJsonFile<unknown>('channels.json');
  const result = z.array(ChannelCategorySchema).safeParse(raw);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] channels.json: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Loads and validates all Frequently Asked Questions from /project-data/faqs.json
 */
export function getFaqs(): FAQItem[] {
  const raw = loadJsonFile<unknown>('faqs.json');
  const result = z.array(FAQItemSchema).safeParse(raw);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] faqs.json: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Loads and validates verified customer reviews from /project-data/testimonials.json
 */
export function getTestimonials(): Testimonial[] {
  const raw = loadJsonFile<unknown>('testimonials.json');
  const result = z.array(TestimonialSchema).safeParse(raw);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] testimonials.json: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Loads and validates core performance features from /project-data/features.json
 */
export function getFeatures(): FeatureItem[] {
  const raw = loadJsonFile<unknown>('features.json');
  const result = z.array(FeatureItemSchema).safeParse(raw);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] features.json: ${errorDetails}`);
  }

  return result.data;
}

/**
 * Loads and parses brand configuration from /project-data/brand.md
 */
export function getBrandConfig(): BrandConfig {
  const dir = getProjectDataDir();
  const filePath = path.join(dir, 'brand.md');

  if (!fs.existsSync(filePath)) {
    throw new Error(`[Data Loader Error] Missing brand configuration at: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  // Extract key-value pairs formatted as `- **Key:** Value`
  const extractField = (label: string): string => {
    const regex = new RegExp(`-\\s*\\*\\*${label}:\\*\\*\\s*(.*)`, 'i');
    const match = raw.match(regex);
    return match ? match[1].trim() : '';
  };

  const secondaryKeywordsRaw = extractField('Secondary Keywords');
  const secondaryKeywords = secondaryKeywordsRaw
    ? secondaryKeywordsRaw.split(',').map((k) => k.trim())
    : [];

  const rawConfig = {
    name: extractField('Name'),
    legalEntity: extractField('Legal Entity'),
    domain: extractField('Domain'),
    url: extractField('URL'),
    targetMarket: extractField('Target Market'),
    tagline: extractField('Tagline'),
    shortDescription: extractField('Short Description'),
    supportEmail: extractField('Support Email'),
    whatsappSupport: extractField('WhatsApp Support'),
    whatsappLink: extractField('WhatsApp Link'),
    currency: extractField('Currency') || 'USD',
    locale: extractField('Locale') || 'en-US',
    primaryKeyword: extractField('Primary Keyword'),
    secondaryKeywords,
  };

  const result = BrandConfigSchema.safeParse(rawConfig);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `[${issue.path.join('.')}] ${issue.message}`)
      .join('; ');
    throw new Error(`[Data Loader Validation Failed] brand.md: ${errorDetails}`);
  }

  return result.data;
}
