import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
  Tv,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  Clock,
  ExternalLink,
} from 'lucide-react';

import {
  getAllSeoPages,
  getSeoPageBySlug,
  getAllSeoPageSlugs,
  SeoPage,
} from '@/lib/seo/pages';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema } from '@/lib/seo/schema';
import { SITE } from '@/lib/data/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DynamicPageSeoContent } from '@/components/sections/DynamicPageSeoContent';

export const revalidate = 86400; // 24 hours ISR

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSeoPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found | Best IPTV USA',
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const kwTitle = page.primaryKeyword
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const metaTitle = `${kwTitle} | Best IPTV USA 4K Service & Setup Guide (2026)`;

  return buildMetadata({
    title: metaTitle,
    description: `Discover ${page.primaryKeyword} on Best IPTV USA. 40,000+ live channels, 4K sports, Anti-Freeze 9.2 technology, and instant 24h activation.`,
    path: `/${page.slug}`,
    keywords: ['Best IPTV USA', page.primaryKeyword, ...page.secondaryKeywords],
  });
}

export default async function DynamicSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Generate Schemas
  const breadcrumbsJsonLd = breadcrumbSchema(
    page.breadcrumbs.map((b) => ({
      name: b.name,
      url: b.url,
    }))
  );

  const faqJsonLd = faqSchema(
    page.faqs.map((f) => ({
      question: f.q,
      answer: f.a,
    }))
  );

  let specificSchemaJsonLd: Record<string, unknown> | null = null;
  if (page.schemaType === 'HowTo') {
    specificSchemaJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: page.h1,
      description: page.metaDescription,
      step: page.sections.steps.steps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.title,
        text: s.text,
      })),
    };
  } else if (page.schemaType === 'Product') {
    specificSchemaJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${page.primaryKeyword} — BestIPTVUSA4K Subscription`,
      description: page.metaDescription,
      brand: {
        '@type': 'Brand',
        name: SITE.name,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '14.99',
        highPrice: '69.99',
        offerCount: '4',
        availability: 'https://schema.org/InStock',
        url: `${SITE.url}/pricing`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1420',
      },
    };
  } else {
    specificSchemaJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.h1,
      description: page.metaDescription,
      author: {
        '@type': 'Organization',
        name: SITE.name,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/images/iptv/iptv-icon.webp`,
        },
      },
      datePublished: '2026-01-15T08:00:00+00:00',
      dateModified: '2026-11-06T12:00:00+00:00',
    };
  }

  return (
    <>
      {/* Structured SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {specificSchemaJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificSchemaJsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-800 bg-slate-950/80 backdrop-blur py-3 text-xs text-slate-400"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <Link href="/directory" className="hover:text-emerald-400 transition-colors">
            {page.silo}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
          <span className="text-slate-200 font-medium truncate" aria-current="page">
            {page.primaryKeyword}
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2">
            <Badge variant="cyan" className="uppercase tracking-wider text-xs px-3 py-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-400" />
              {page.badge}
            </Badge>
            <span className="text-xs text-slate-400 font-medium">Updated 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            <span className="text-white">
              {page.primaryKeyword.charAt(0).toUpperCase() + page.primaryKeyword.slice(1)}:
            </span>{' '}
            <span className="text-emerald-400">Best IPTV USA</span> Provider (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Looking for high-performance <strong>{page.primaryKeyword}</strong>? <strong>Best IPTV USA</strong> delivers over 40,000 live channels, ultra-low latency sports with zero buffering, and instant 3-minute activation across North America.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto h-13 px-8 text-base shadow-xl shadow-emerald-500/20">
              <Link href="/free-trial">
                Start 24-Hour Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-13 px-8 text-base">
              <Link href="/pricing">
                View Subscription Plans
              </Link>
            </Button>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-slate-300">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <Tv className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>40,000+ Channels</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <Server className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>99.9% Anti-Freeze</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>7-Day Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {page.quickHighlights.map((hl, idx) => (
              <Card key={idx} className="p-5 border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">Best IPTV USA: {hl.label}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{hl.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Section 1: Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Best IPTV USA Overview: {page.sections.overview.title}
            </h2>
            <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-4">
              <p>{page.sections.overview.content}</p>
              <p>
                As the recognized <strong>Best IPTV USA</strong> provider, our dedicated high-speed server infrastructure ensures an uninterrupted viewing experience with true 60 frames per second video streams for {page.primaryKeyword}.
              </p>
            </div>
          </div>

          {/* Section 2: Features Comparison Table */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Best IPTV USA Feature Comparison &amp; Specifications for {page.primaryKeyword}
              </h2>
              <p className="text-slate-400 text-sm">
                How our <strong>Best IPTV USA</strong> service compares to standard legacy providers for {page.primaryKeyword}:
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
                    <th className="py-3.5 px-4 sm:px-6 font-semibold">Evaluation Criteria</th>
                    <th className="py-3.5 px-4 sm:px-6 font-semibold text-emerald-400">Best IPTV USA (BestIPTVUSA4K)</th>
                    <th className="py-3.5 px-4 sm:px-6 font-semibold text-slate-400">Generic / Free Providers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  {page.sections.features.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">{row.feature}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-emerald-300 bg-emerald-950/10 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{row.us}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500/70 flex-shrink-0" />
                          <span>{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Step-by-Step Guide */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                How to Setup Best IPTV USA for {page.primaryKeyword} in 3 Simple Steps
              </h2>
              <p className="text-slate-400 text-sm">
                Follow this simple step-by-step tutorial to configure your <strong>Best IPTV USA</strong> stream in less than 5 minutes:
              </p>
            </div>

            <div className="space-y-4">
              {page.sections.steps.steps.map((st) => (
                <Card key={st.step} className="p-5 border-slate-800 bg-slate-900/40 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-slate-950 font-extrabold flex items-center justify-center flex-shrink-0 text-sm shadow-md">
                    {st.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-base">Step {st.step}: Best IPTV USA — {st.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{st.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 4: Deep Dive & Troubleshooting */}
          <div className="space-y-4 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Best IPTV USA Server Infrastructure &amp; Anti-Freeze Architecture for {page.primaryKeyword}
            </h2>
            <div className="text-slate-300 text-base leading-relaxed space-y-4">
              <p>{page.sections.deepDive.content}</p>
              <p>
                Our <strong>Best IPTV USA</strong> technical operations center continuously monitors stream packet health and switches CDN endpoints automatically if any localized network congestion is detected for {page.primaryKeyword}.
              </p>
            </div>
          </div>

          {/* Section 5: Pros & Cons */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Best IPTV USA Verified Advantages &amp; Hardware Considerations for {page.primaryKeyword}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-emerald-900/40 bg-emerald-950/10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="font-bold text-base text-emerald-400">Best IPTV USA Core Advantages</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {page.sections.prosAndCons.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 border-slate-800 bg-slate-900/40 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <HelpCircle className="w-5 h-5" />
                  <h3 className="font-bold text-base text-amber-400">Best IPTV USA Technical Requirements</h3>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {page.sections.prosAndCons.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Section 6: In-Depth Editorial Guide & Benchmark */}
          <DynamicPageSeoContent primaryKeyword={page.primaryKeyword} silo={page.silo} cluster={page.cluster} />

          {/* Mid-Page Conversion CTA Card */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 p-8 sm:p-12 text-center shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-5">
              <Badge variant="cyan" className="uppercase font-bold text-xs tracking-wider">
                Risk-Free Streaming
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Ready to Experience the Best IPTV USA Service?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join thousands of satisfied US cord-cutters. Test our <strong>Best IPTV USA</strong> 40,000+ live channels and 4K sports with an instant 24-hour test line, or subscribe with our 7-day money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto h-12 px-8 font-bold">
                  <Link href="/free-trial">
                    Get Best IPTV USA Free Trial Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8">
                  <Link href="/pricing">
                    View Best IPTV USA Plans ($14.99/mo)
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Section 7: FAQs */}
          <div className="space-y-6" id="faq">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions About Best IPTV USA &amp; {page.primaryKeyword}
              </h2>
              <p className="text-slate-400 text-sm">
                Common questions answered by our <strong>Best IPTV USA</strong> streaming engineering team:
              </p>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 open:bg-slate-900/70 transition-colors"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-white group-hover:text-emerald-400 list-none">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-90 flex-shrink-0 ml-2" />
                  </summary>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Section 7: Related Guides & Internal Links */}
          <div className="space-y-6 border-t border-slate-800 pt-12">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Related Guides & Resources</h3>
                <p className="text-xs sm:text-sm text-slate-400">Explore complementary streaming tutorials and device setups</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                <Link href="/directory">
                  View All Guides
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {page.relatedSlugs.map((rel, idx) => (
                <Link
                  key={idx}
                  href={`/${rel.slug}`}
                  className="group p-4 rounded-xl border border-slate-800 bg-slate-900/30 hover:bg-slate-900/60 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {rel.cluster}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 group-hover:text-emerald-400 mt-3 pt-2 border-t border-slate-800/40">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

