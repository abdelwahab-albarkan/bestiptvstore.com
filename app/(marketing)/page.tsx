import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { LogoBar } from '@/components/sections/LogoBar';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { PricingTable } from '@/components/sections/PricingTable';
import { ChannelGrid } from '@/components/sections/ChannelGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { HomeSeoContent } from '@/components/sections/HomeSeoContent';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { buildMetadata } from '@/lib/seo/metadata';
import { productSchema } from '@/lib/seo/schema';
import {
  getPricingPlans,
  getChannelCategories,
  getFeatures,
  getFaqs,
  getTestimonials,
} from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Best IPTV USA (2026) | Premium 4K & 8K Subscription — BestIPTVUSA4K',
  description: 'Best IPTV USA service with 40,000+ live channels & uncompressed 4K sports. Instant 24-hour free trial with 99.9% anti-freeze stability.',
  path: '/',
});

export default function HomePage() {
  const plans = getPricingPlans();
  const categories = getChannelCategories();
  const features = getFeatures();
  const faqs = getFaqs();
  const testimonials = getTestimonials();

  // Generate Product JSON-LD for all 4 subscription plans
  const productsGraphSchema = {
    '@context': 'https://schema.org',
    '@graph': plans.map((plan) => productSchema(plan)),
  };

  return (
    <main>
      {/* Product JSON-LD Schema for Plans */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsGraphSchema) }}
      />
      <Hero />
      <TrustBar />
      <LogoBar />
      <FeatureGrid features={features} />
      <PricingTable plans={plans} />
      <ChannelGrid categories={categories} />
      <HomeSeoContent />
      <HowItWorks />
      <Testimonials testimonials={testimonials} />
      <FAQ faqs={faqs} />
      <FinalCTA />
    </main>
  );
}
