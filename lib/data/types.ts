import { z } from 'zod';

/**
 * Service Plan Schema & TypeScript Type
 */
export const ServicePlanSchema = z.object({
  id: z.string().min(1, 'Plan ID is required'),
  name: z.string().min(1, 'Plan name is required'),
  duration: z.string().min(1, 'Duration string is required'),
  months: z.number().int().positive('Months must be a positive integer'),
  price: z.number().positive('Price must be greater than zero'),
  monthlyEquivalent: z.number().positive('Monthly equivalent must be greater than zero'),
  savingsPercent: z.number().nonnegative('Savings percent must be non-negative'),
  isPopular: z.boolean().default(false),
  isBestValue: z.boolean().default(false),
  connections: z.number().int().positive('Connections must be at least 1').default(1),
  pricesByAccounts: z.record(z.string(), z.number().positive()),
  checkoutUrlsByAccounts: z.record(z.string(), z.string()).optional(),
  features: z.array(z.string().min(1)).min(1, 'At least one feature is required'),
  deliveryNote: z.string().optional(),
});

export type ServicePlan = z.infer<typeof ServicePlanSchema>;

/**
 * Channel Schema & Category Types
 */
export const ChannelSchema = z.object({
  name: z.string().min(1, 'Channel name is required'),
  resolution: z.string().min(1, 'Resolution is required'),
  category: z.string().min(1, 'Category is required'),
  isPopular: z.boolean().optional(),
});

export const ChannelCategorySchema = z.object({
  id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Category name is required'),
  badge: z.string().min(1, 'Category badge is required'),
  count: z.string().min(1, 'Channel count label is required'),
  channels: z.array(ChannelSchema).min(1, 'At least one channel is required'),
});

export type Channel = z.infer<typeof ChannelSchema>;
export type ChannelCategory = z.infer<typeof ChannelCategorySchema>;

/**
 * FAQ Item Schema & Type
 */
export const FAQItemSchema = z.object({
  id: z.string().min(1, 'FAQ ID is required'),
  category: z.enum(['general', 'devices', 'channels', 'troubleshooting', 'billing']).default('general'),
  question: z.string().min(5, 'Question must be at least 5 characters'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
});

export type FAQItem = z.infer<typeof FAQItemSchema>;

/**
 * Testimonial Schema & Type
 */
export const TestimonialSchema = z.object({
  id: z.string().min(1, 'Testimonial ID is required'),
  name: z.string().min(1, 'Customer name is required'),
  location: z.string().min(1, 'Customer location is required'),
  avatar: z.string().min(1, 'Avatar path is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  device: z.string().min(1, 'Streaming device is required'),
  date: z.string().min(1, 'Review date is required'),
  title: z.string().min(1, 'Review title is required'),
  comment: z.string().min(10, 'Review comment must be at least 10 characters'),
  verified: z.boolean().default(true),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

/**
 * Feature Grid Item Schema & Type
 */
export const FeatureItemSchema = z.object({
  id: z.string().min(1, 'Feature ID is required'),
  title: z.string().min(1, 'Feature title is required'),
  description: z.string().min(5, 'Feature description is required'),
  icon: z.string().min(1, 'Icon name is required'),
  badge: z.string().min(1, 'Badge is required'),
});

export type FeatureItem = z.infer<typeof FeatureItemSchema>;

/**
 * Brand Configuration Schema & Type
 */
export const BrandConfigSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  legalEntity: z.string().min(1, 'Legal entity name is required'),
  domain: z.string().min(1, 'Domain is required'),
  url: z.string().url('URL must be a valid web address'),
  targetMarket: z.string().min(1, 'Target market is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters'),
  supportEmail: z.string().email('Support email must be a valid email address'),
  whatsappSupport: z.string().min(5, 'WhatsApp number is required'),
  whatsappLink: z.string().url('WhatsApp link must be a valid URL'),
  currency: z.string().default('USD'),
  locale: z.string().default('en-US'),
  primaryKeyword: z.string().min(1, 'Primary keyword is required'),
  secondaryKeywords: z.array(z.string().min(1)).min(1, 'At least one secondary keyword is required'),
});

export type BrandConfig = z.infer<typeof BrandConfigSchema>;
