import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ShieldCheck, Zap, ArrowRight, HelpCircle, Lock } from 'lucide-react';
import { PricingTable } from '@/components/sections/PricingTable';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo/metadata';
import { productSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { getPricingPlans, getFaqs } from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: `Best IPTV USA Subscription Plans (2026) | 4K & 8K Pricing — ${SITE.name}`,
  description: 'Best IPTV USA subscription plans with 40,000+ live channels, 200,000 VODs, and native 4K sports. Instant 3-minute activation backed by our 7-day guarantee.',
  path: '/pricing',
  keywords: ['Best IPTV USA', 'Best IPTV USA subscription', 'Best IPTV USA pricing', 'buy Best IPTV USA'],
});

export default function PricingPage() {
  const plans = getPricingPlans();
  const allFaqs = getFaqs();
  // Filter 3 billing-focused FAQs
  const billingFaqs = allFaqs.filter((f) => f.category === 'billing' || f.id.includes('trial') || f.id.includes('guarantee')).slice(0, 3);

  // 1. Product JSON-LD for all 4 subscription plans
  const productsGraphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': plans.map((plan) => productSchema(plan)),
  };

  // 2. BreadcrumbList JSON-LD
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Pricing & Plans', url: '/pricing' },
  ]);

  return (
    <>
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsGraphJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12">
        {/* Header Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <Badge variant="default" className="text-xs uppercase font-bold tracking-wider mb-3">
            Simple & Transparent
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Best IPTV USA Subscription Plans &amp; Official 2026 Pricing
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
            Select your preferred <strong>Best IPTV USA</strong> subscription tier. Every plan includes full access to {SITE.stats.liveChannels}{' '}
            live channels, all sports packages, and pristine 4K &amp; 8K Ultra HD streaming. Looking for specific networks?{' '}
            <Link href="/channels" className="text-emerald-400 font-semibold underline hover:text-emerald-300">
              Browse our complete channels directory
            </Link>
            .
          </p>
        </div>

        {/* 4 Pricing Cards */}
        <PricingTable plans={plans} compact={true} />

        {/* Detailed Plan Comparison Table */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Best IPTV USA Plan Comparison: Features, Multi-Screen &amp; Specifications
            </h2>
            <p className="text-sm text-slate-400">
              Every <strong>Best IPTV USA</strong> package delivers our complete entertainment suite with instant 3-minute delivery.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                  <th scope="col" className="p-4 sm:p-5 font-bold text-white min-w-[200px]">
                    Features Included
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={`p-4 sm:p-5 font-bold text-center min-w-[120px] ${
                        p.isBestValue ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-200'
                      }`}
                    >
                      <div>{p.name}</div>
                      <div className="text-base text-white font-extrabold normal-case mt-1">
                        ${p.price}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal lowercase">
                        (${p.monthlyEquivalent.toFixed(2)}/mo)
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                {/* 9 Shared Core Features */}
                {plans[0].features.map((featureName, fIdx) => (
                  <tr key={fIdx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-slate-200">
                      {featureName}
                    </td>
                    {plans.map((p) => (
                      <td
                        key={p.id}
                        className={`p-4 sm:p-5 text-center ${
                          p.isBestValue ? 'bg-emerald-500/5' : ''
                        }`}
                      >
                        <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Plan Specific Variables */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-200">
                    Access Duration
                  </td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className={`p-4 sm:p-5 text-center font-semibold text-slate-200 ${
                        p.isBestValue ? 'bg-emerald-500/5 text-emerald-300' : ''
                      }`}
                    >
                      {p.duration}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-200">
                    Savings vs Monthly Term
                  </td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className={`p-4 sm:p-5 text-center font-bold ${
                        p.savingsPercent > 0
                          ? 'text-emerald-400'
                          : 'text-slate-500'
                      } ${p.isBestValue ? 'bg-emerald-500/5' : ''}`}
                    >
                      {p.savingsPercent > 0 ? `Save ${p.savingsPercent}%` : 'Standard Rate'}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-200">
                    Money-Back Guarantee
                  </td>
                  {plans.map((p) => (
                    <td
                      key={p.id}
                      className={`p-4 sm:p-5 text-center text-emerald-400 font-semibold ${
                        p.isBestValue ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      {SITE.stats.guaranteePeriod} 100% Risk-Free
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="py-12 border-y border-slate-800/80 bg-slate-900/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs uppercase font-bold tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Safe &amp; Encrypted 256-Bit Checkout</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Accepted Payment Methods for Best IPTV USA Subscriptions
            </h2>
            <h3 className="text-lg font-semibold text-emerald-400">
              Subscribe to Best IPTV USA with Instant M3U &amp; Xtream Codes Activation
            </h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Our <strong>Best IPTV USA</strong> checkout supports all major secure payment providers with immediate automated line delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <Image
                  src="/images/visa-logo.webp"
                  alt="Best IPTV USA — Visa and card checkout"
                  width={50}
                  height={28}
                  className="object-contain max-h-7"
                />
                <span className="text-xs font-semibold text-slate-200">Visa</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <Image
                  src="/images/mastercard-logo.webp"
                  alt="Best IPTV USA — Mastercard"
                  width={40}
                  height={28}
                  className="object-contain max-h-7"
                />
                <span className="text-xs font-semibold text-slate-200">Mastercard</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <Image
                  src="/images/paypal-logo.webp"
                  alt="Best IPTV USA — PayPal"
                  width={45}
                  height={28}
                  className="object-contain max-h-7"
                />
                <span className="text-xs font-semibold text-slate-200">PayPal</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-950 border border-slate-800">
                <Image
                  src="/images/crypto-logo.webp"
                  alt="Best IPTV USA — Cryptocurrency"
                  width={40}
                  height={28}
                  className="object-contain max-h-7"
                />
                <span className="text-xs font-semibold text-slate-200">Bitcoin &amp; USDT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated In-Depth SEO Analysis: Pricing & Value */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Best IPTV USA Offers Unmatched Value for American Cord-Cutters
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              American households spend an average of $135 to $190 every month on traditional cable television and fragmented streaming apps. <strong>Best IPTV USA</strong> consolidates all your live entertainment into one affordable, high-performance subscription. With <strong>Best IPTV USA</strong>, you receive over 40,000 live channels, complete NFL and NBA passes, pay-per-view events, and 200,000 movies and series in crystal-clear 4K UHD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">
                Best IPTV USA Multi-Screen Flexibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every <strong>Best IPTV USA</strong> subscription option allows you to select 1, 2, 3, or 4 simultaneous connections. Whether streaming on the living room Firestick, bedroom Apple TV, or mobile device, <strong>Best IPTV USA</strong> powers your whole household smoothly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">
                Best IPTV USA Zero Buffering Technology
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Powered by proprietary Anti-Freeze 9.2 algorithms and dedicated Tier-1 North American CDN nodes, <strong>Best IPTV USA</strong> eliminates stutter, packet loss, and ISP throttling even during high-traffic Sunday football broadcasts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-teal-400">
                Best IPTV USA 100% Risk-Free Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We stand behind our broadcast quality. Every <strong>Best IPTV USA</strong> purchase includes our comprehensive 7-day money-back guarantee. If <strong>Best IPTV USA</strong> does not exceed your expectations, our 24/7 support desk processes your refund immediately.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4 text-slate-300 text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-white">
              Best IPTV USA Technical Reliability &amp; Instant Provisioning
            </h3>
            <p>
              When evaluating streaming services in North America, stability and customer care make all the difference. While cheap, unauthorized resellers frequently disappear, <strong>Best IPTV USA</strong> operates an established, resilient streaming infrastructure with 99.9% verified server uptime. Our <strong>Best IPTV USA</strong> packages feature instant automated activation: within 3 minutes of checkout, your <strong>Best IPTV USA</strong> Xtream Codes API credentials and <strong>Best IPTV USA</strong> M3U playlist URLs are delivered directly to your email and screen.
            </p>
            <p>
              Every active <strong>Best IPTV USA</strong> subscriber receives automatic daily Electronic Program Guide (EPG) updates, ultra-fast channel zapping under 0.5 seconds, and direct access to live US customer support. If you require multi-room viewing, <strong>Best IPTV USA</strong> accounts can be configured for up to 4 simultaneous devices with dedicated individual streams.
            </p>
            <p>
              Join over 35,000 satisfied American viewers who have made the switch to <strong>Best IPTV USA</strong>. Whether you choose our 3-month starter tier or maximize your savings with our 12-month multi-connection package, <strong>Best IPTV USA</strong> delivers the premier cord-cutting experience in 2026. Start your journey with <strong>Best IPTV USA</strong> today and enjoy television without borders or contracts.
            </p>
          </div>
        </section>

        {/* Refund Policy Summary Card */}
        <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Risk-Free Guarantee</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Best IPTV USA {SITE.stats.guaranteePeriod} Money-Back Promise
              </h3>
              <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                If you encounter any persistent streaming issues with your <strong>Best IPTV USA</strong> line that our 24/7 technical desk cannot fix to your satisfaction, simply email us within 7 days for an immediate full refund.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/refund-policy">Read Refund Policy</Link>
              </Button>
              <Button asChild variant="gradient" size="sm">
                <Link href="/free-trial">Test Best IPTV USA Free</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Billing-Specific FAQ */}
        <div className="py-8">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Best IPTV USA Frequently Asked Billing &amp; Activation Questions
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Common questions about subscribing to <strong>Best IPTV USA</strong> answered by our billing team:
            </p>
          </div>
          <FAQ faqs={billingFaqs} showCategories={false} />
        </div>

        {/* Final Conversion Section */}
        <FinalCTA
          headline="Ready to Cut Cable with Best IPTV USA in 8K?"
          subheadline={`Pick any Best IPTV USA subscription plan with confidence. Every purchase is protected by our ${SITE.stats.guaranteePeriod} money-back guarantee, or test Best IPTV USA first with a free ${SITE.stats.trialDuration} trial pass.`}
          primaryCta={{ label: `Test Best IPTV USA Free First`, href: '/free-trial' }}
          secondaryCta={{ label: `Browse Best IPTV USA Channels`, href: '/channels' }}
        />
      </main>
    </>
  );
}
